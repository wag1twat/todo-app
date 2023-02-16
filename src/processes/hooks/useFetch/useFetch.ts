import React from 'react'
import { AxiosError } from 'axios'
import { axiosInstance } from '../../axios'

const useGet = <T extends unknown>(initialState: T) => {
    const [url, setUrl] = React.useState<string | undefined>(undefined)
    const [isLoading, setIsLoading] = React.useState(false)
    const [state, setState] = React.useState<T | undefined>(() => initialState)
    const [error, setError] = React.useState(undefined)

    const get = React.useCallback(async (url:string) => {
        setUrl(url)
        try {
           setIsLoading(true)

            const response = await axiosInstance.get(url)

           setState(response.data)
        }

        catch(err){
            setState(() => initialState)
            setError(undefined)
        }

        finally{
            setIsLoading(false)
        }
    }, [])

    const refetch = React.useCallback( async () => {
        if(url) {
            get(url)
        }
    }, [get, url])

    return { isLoading, get, refetch, state, error }
}

export { useGet }