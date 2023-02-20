import { useQuery } from 'react-query';
import { api } from '../../../processes';

const useUser = (id: number | undefined) => {
    const user = useQuery(['user', id], {
        queryFn: () => api().getUser({ id }),
        select: ( { data } ) => data,
        enabled: id !== undefined,
    })

    return user
}

export {  useUser }