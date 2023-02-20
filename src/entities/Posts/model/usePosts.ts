import React from 'react'
import { useQuery } from 'react-query';
import { Array, Number, Record, Static, String, Undefined } from 'runtypes';
import { axiosInstance, Core,  } from '../../../processes';

const postConract = Record({
    userId: Number,
    id: Number,
    title: String,
    body: String
})

type Post = Static<typeof postConract>

interface UsePostsProps {
    _start?: number,
    _limit?: number,
}

const usePosts = (props: UsePostsProps = {}) => {
    const { _start, _limit, } = props

    const posts = useQuery(['posts', _start, _limit], {
        queryFn: () => axiosInstance.get<Post[]>(Core.api().posts().query({ _start, _limit })),
        select: ( { data } ) => data,
        onSettled(data, error) {
            Array(postConract).Or(Undefined).check(data)
        },
        enabled: (_start !== undefined || _limit !== undefined),
        cacheTime: 5000,
        refetchOnWindowFocus: false,
        
    })

    return posts
}

export type { Post }
export { postConract, usePosts }