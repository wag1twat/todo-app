import { useQuery } from 'react-query';
import api from 'src/processes/core/api';

const useUser = (id: number | undefined) => {
    const user = useQuery(['user', id], {
        queryFn: () => api.getUser({ ':userId': `${id}` }),
        select: ( { data } ) => data,
        enabled: id !== undefined,
    })

    return user
}

export {  useUser }