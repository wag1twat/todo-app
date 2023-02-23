import { useQuery } from 'react-query';
import { Guards } from 'shulga-app-core';
import api from 'src/processes/core/api';
import { CommentQeriesDto } from 'src/processes/core/api/dto';


const useComments = (props: CommentQeriesDto = {}) => {
    const { postId } = props

    const comments = useQuery(['comments', postId], {
        queryFn: () => api.getComments({ postId }),
        select: ( { data } ) => data,
        enabled: Guards.isNumber(postId)
    })

    return comments
}

export { useComments }