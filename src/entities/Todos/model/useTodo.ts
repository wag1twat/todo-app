import { useQuery } from 'react-query';
import { api } from '../../../processes';

const useTodo = (id: number | undefined) => {    
    return useQuery(['todo', id], {
        queryFn: () => api().getTodo({ id }),
        select: ( { data } ) => data,
        enabled: id !== undefined
    })
}

export { useTodo }