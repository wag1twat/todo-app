import React from 'react'
import { AxiosError , } from 'axios'
import { axiosInstance } from '../../axios'
import { DateTime } from 'luxon'
import { Core } from '../../core'

interface ConfigGet<T extends unknown> {
    initialState: T,
    cacheTime?: number
    onSettled?: (state: T) => void,
    enabled?: boolean
}
interface E {
    code: string
    name: string
    message: string
}

interface Get<T extends unknown> {
    isLoading: boolean;
    isFetching: boolean;
    get: (url: string) => Promise<void>;
    refetch: () => Promise<void | undefined>;
    state: T;
    error: Partial<E> | undefined;
}

const useGet = <T extends unknown>(key: (string | number | undefined | boolean)[], config: ConfigGet<T>): Get<T> => {
    const { initialState, cacheTime = 5000, onSettled, enabled = true } = config
    const [url, setUrl] = React.useState<string | undefined>(undefined)
    const [isLoading, setIsLoading] = React.useState(false)
    const [isFetching, setIsFetching] = React.useState(false)
    const [state, setState] = React.useState<T>(() => initialState)
    const [error, setError] = React.useState<Partial<E> | undefined>(undefined)

    const get = React.useCallback(async (url:string) => {
        if(!enabled) {
            return
        }
        setUrl(url)
        const cacheKey = `${Core.env().NAME}-${key.join(',')}`

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
                if(expire === null) {
                    expire = String(DateTime.now().toMillis() + cacheTime)
                    globalThis.localStorage.setItem(cacheKey, expire)
                }
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
                Core.analytics().sendErrorEvent({
                    name: (err as AxiosError).name,
                    message: (err as AxiosError).message,
                    stack: (err as AxiosError).stack || ""
                })
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
    }, [enabled, cacheTime])

    const refetch = React.useCallback( async () => url ? get(url): undefined, [get, url])

    React.useEffect(() => {
        if(enabled && onSettled) {
            onSettled(state)
        }
    }, [enabled, state])
    return { isLoading, isFetching, get, refetch, state, error }
}

export type { ConfigGet, Get }
export { useGet }