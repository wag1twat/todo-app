import React from 'react'
import { useQuery } from 'react-query';
import { Undefined } from 'runtypes';
import { axiosInstance, Core,  } from '../../../processes';
import { Todo, todoContract } from './useTodos';


const useTodo = (id: number | undefined) => {    
    const todo = useQuery(['todo', id], {
        queryFn: () => axiosInstance.get<Todo>(Core.api().todo(String(id)).exec()),
        select: ( { data } ) => data,
        onSettled(data, error) {
             todoContract.Or(Undefined).check(data)
        },
        enabled: id !== undefined
    })

    return todo
}

export { useTodo }