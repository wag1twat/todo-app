import React from 'react'
import { AxiosError } from 'axios'
import { axiosInstance } from '../../axios'

const useGet = () => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [state,setState] = React.useState(undefined)
    const [error,setError] = React.useState(undefined)

    const get = React.useCallback(async (url:string) => {
        try {
            // setIsLoading(true)

            const response = await axiosInstance.get(url)

            // setState(response.data)
        }

        catch(err){
            // setError(undefined)
        }

        finally{
            // setIsLoading(false)
        }
    }, [])

    return { isLoading, get, state, error }
}

export { useGet }