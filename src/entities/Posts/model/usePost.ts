import { useQuery } from 'react-query';
import { Guards } from 'shulga-app-core';
import api from 'src/processes/core/api';

const usePost = (id: number | undefined) => {
    return useQuery(['post', id], {
        queryFn: () => api.getPost({ ':postId': `${id}` }),
        select: ( { data } ) => data,
        enabled: Guards.isNumber(id)
    })
}

export {  usePost }