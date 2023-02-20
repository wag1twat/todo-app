import { useQuery } from 'react-query';
import { api } from 'src/processes';

const useTodos = () => {
    return useQuery(['todos'], {
        queryFn: api().getTodos,
        select: ( { data } ) => data,
        keepPreviousData: true
    })
}

export { useTodos }