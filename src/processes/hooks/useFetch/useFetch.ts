import React from 'react'
import { AxiosError , } from 'axios'
import { axiosInstance } from '../../axios'
import { useEnv } from '../useEnv'
import { DateTime } from 'luxon'

interface ConfigGet<T extends unknown> {
    cacheTime?: number
    initialState: T,
}
interface E {
    code: string
    name: string
    message: string
}

const useGet = <T extends unknown>(key: (string)[], config: ConfigGet<T>) => {
    const { REACT_APP_NAME = 'app' } = useEnv()
    const { initialState, cacheTime = 5000 } = config
    const [url, setUrl] = React.useState<string | undefined>(undefined)
    const [isLoading, setIsLoading] = React.useState(false)
    const [isFetching, setIsFetching] = React.useState(false)
    const [state, setState] = React.useState<T>(() => initialState)
    const [error, setError] = React.useState<Partial<E> | undefined>(undefined)

    const get = React.useCallback(async (url:string) => {
        setUrl(url)

        const cacheKey = `${REACT_APP_NAME}-${key.join(',')}`

        try {
            setIsFetching(true)

            const cache = await caches.open(cacheKey)

            const now = DateTime.now().toMillis()
            let expire = globalThis.localStorage.getItem(cacheKey)
            if(expire && +expire < now) {
                await cache.delete(url)
            }

            let cacheResponse = await cache.match(url)

            if(cacheResponse) {
                const json = await cacheResponse.json()
                setError(undefined)
                return setState(() => json)
            }

            setIsLoading(true)

            await axiosInstance.get<T>(url)

            await cache.add(url)

            expire = String(DateTime.now().toMillis() + cacheTime)
            globalThis.localStorage.setItem(cacheKey, expire)

            cacheResponse = await cache.match(url)

            if(cacheResponse && cacheResponse.ok) {
                const json = await cacheResponse.json()
                 setError(undefined)
                return setState(() => json)
            }

            setError(undefined)
            return setState(() => initialState)
        }
        catch(err) {
            if(err instanceof AxiosError) {
                setError(() => ({
                    code: (err as AxiosError).code,
                    name: (err as AxiosError).name,
                    message: (err as AxiosError).message,
                }))
            }
        }
        finally {
            setIsLoading(false)
            setIsFetching(false)
        }
    }, [cacheTime])

    const refetch = React.useCallback( async () => url ? get(url): undefined, [get, url])


    return { isLoading, isFetching, get, refetch, state, error }
}

export { useGet }