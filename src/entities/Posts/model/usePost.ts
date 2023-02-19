import React from 'react'
import { Undefined } from 'runtypes';
import { Core, useGet } from '../../../processes';
import { Post, postConract } from './usePosts';


const usePost = (id: number | undefined) => {

    const posts = useGet<Post | undefined>(['post', id], { initialState: undefined, cacheTime: 5000, enabled: id !== undefined });

    React.useEffect(() => {
        posts.get(Core.api().post(String(id)).exec());
    }, [posts.get, id]);

    React.useEffect(() => {
        postConract.Or(Undefined).check(posts.state)
    }, [posts.state])

    return posts
}

export {  usePost }