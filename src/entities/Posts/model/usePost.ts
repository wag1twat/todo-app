import { useQuery } from 'react-query';
import { api } from '../../../processes';

const usePost = (id: number | undefined) => {
    return useQuery(['post', id], {
        queryFn: () => api().getPost({ id }),
        select: ( { data } ) => data,
        enabled: id !== undefined
    })
}

export {  usePost }