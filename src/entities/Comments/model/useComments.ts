import React from 'react'
import { Array, Number, Record, Static, String, Undefined } from 'runtypes';
import { Core, useGet } from '../../../processes';

const commentContract = Record({
    body: String,
    email: String,
    id: Number,
    name: String,
    postId: Number
})

type Comment = Static<typeof commentContract>

interface UseCommentProps {
    postId?: number,
    userId?: number
}

const useComments = (props: UseCommentProps = {}) => {
    const { postId, userId } = props

    const comments = useGet<Comment[]>(['comments', postId, userId], { initialState: [], cacheTime: 5000, enabled: postId !== undefined && userId !== undefined });

    React.useEffect(() => {
        comments.get(Core.api().comments().query({
            postId, userId
        }));
    }, [comments.get, postId, userId]);

    React.useEffect(() => {
        Array(commentContract).Or(Undefined).check(comments.state)
    }, [comments.state])

    return comments
}

export type { Comment }
export { commentContract, useComments }