import { useQuery } from 'react-query';
import { api } from '../../../processes';

interface UseCommentProps {
    postId?: number,
    userId?: number,
}

const useComments = (props: UseCommentProps = {}) => {
    const { postId, userId } = props

    const comments = useQuery(['comments', postId, userId], {
        queryFn: () => api().getComments({ queries: { postId, userId }}),
        select: ( { data } ) => data,
        enabled: postId !== undefined || userId !== undefined
    })

    return comments
}

export { useComments }