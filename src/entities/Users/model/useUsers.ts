import { useQuery } from 'react-query';
import { api } from '../../../processes';

const useUsers = () => {
    const users = useQuery(['users'], {
        queryFn: api().getUsers,
        select: ( { data } ) => data,
    })

    return users
}

export { useUsers }