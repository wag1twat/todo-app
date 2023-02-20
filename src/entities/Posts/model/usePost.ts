import React from 'react'
import { useQuery } from 'react-query';
import { Undefined } from 'runtypes';
import { axiosInstance, Core } from '../../../processes';
import { Post, postConract } from './usePosts';


const usePost = (id: number | undefined) => {
    const post = useQuery(['post', id], {
        queryFn: () => axiosInstance.get<Post>(Core.api().post(String(id)).exec()),
        select: ( { data } ) => data,
        onSettled(data, error) {
            postConract.Or(Undefined).check(data)
        },
        enabled: id !== undefined
    })

    return post
}

export {  usePost }