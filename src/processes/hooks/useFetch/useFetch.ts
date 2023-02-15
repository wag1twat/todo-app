import React from 'react'
import { AxiosError } from 'axios'
import { axiosInstance } from '../../axios'

const useGet = <T extends unknown>(initialState: T) => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [state, setState] = React.useState<T | undefined>(() => initialState)
    const [error, setError] = React.useState(undefined)

    const get = React.useCallback(async (url:string) => {
        try {
           setIsLoading(true)

            const response = await axiosInstance.get(url)

           setState(response.data)
        }

        catch(err){
            setState(undefined)
            setError(undefined)
        }

        finally{
            setIsLoading(false)
        }
    }, [])

    return { isLoading, get, state, error }
}

export { useGet }