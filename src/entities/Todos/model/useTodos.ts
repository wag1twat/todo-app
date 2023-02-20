import React from 'react'
import { useQuery } from 'react-query';
import { Array, Boolean, Number, Record, Static, String, Undefined } from 'runtypes';
import { axiosInstance, Core,  } from '../../../processes';

const todoContract = Record({
    completed: Boolean,
    id:Number,
    title: String,
    userId:Number
})

type Todo = Static<typeof todoContract>


const useTodos = () => {
    const todos = useQuery(['todos'], {
        queryFn: () => axiosInstance.get<Todo[]>(Core.api().todos().exec()),
        select: ( { data } ) => data,
        onSettled(data, error) {
            Array(todoContract).Or(Undefined).check(data)
        },
    })

    return todos
}

export type { Todo }
export { todoContract, useTodos }