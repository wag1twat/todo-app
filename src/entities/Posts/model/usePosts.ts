import React from 'react'
import { Array, Number, Record, Static, String, Undefined } from 'runtypes';
import { Core, useGet } from '../../../processes';

const postConract = Record({
    userId: Number,
    id: Number,
    title: String,
    body: String
})

type Post = Static<typeof postConract>

interface UsePostsProps {
    _start?: number,
    _limit?: number
}

const usePosts = (props: UsePostsProps = {}) => {
    const { _start, _limit } = props

    const posts = useGet<Post[]>(['posts', _start, _limit], { initialState: [], cacheTime: 5000 });

    React.useEffect(() => {
        posts.get(Core.api().posts().query({ _start, _limit }));
    }, [posts.get, _start, _limit]);

    React.useEffect(() => {
        Array(postConract).Or(Undefined).check(posts.state)
    }, [posts.state])

    return posts
}

export type { Post }
export { postConract, usePosts }