import { useQuery } from 'react-query';
import api from 'src/processes/core/api';

const useTodo = (id: number | undefined) => {    
    return useQuery(['todo', id], {
        queryFn: () => api.getTodo({ ':todoId': `${id}` }),
        select: ( { data } ) => data,
        enabled: id !== undefined
    })
}

export { useTodo }