import React from 'react'
import { useQuery } from 'react-query';
import { Array, Number, Record, Static, String, Undefined } from 'runtypes';
import { axiosInstance, Core } from '../../../processes';

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
    userId?: number,
}

const useComments = (props: UseCommentProps = {}) => {
    const { postId, userId } = props

    const comments = useQuery(['comments', postId, userId], {
        queryFn: () => axiosInstance.get<Comment[]>(Core.api().comments().query({
             postId, userId
        })),
        select: ( { data } ) => data,
        onSettled(data, error) {
            Array(commentContract).Or(Undefined).check(data)
        },
        enabled: postId !== undefined || userId !== undefined
    })

    return comments
}

export type { Comment }
export { commentContract, useComments }