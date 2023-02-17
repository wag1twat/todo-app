import React from 'react'
import { Array, Boolean, Number, Record, Static, String, Undefined } from 'runtypes';
import { Managers, useGet } from '../../../processes';

const todoContract = Record({
    completed: Boolean,
    id:Number,
    title: String,
    userId:Number
})

type Todo = Static<typeof todoContract>

const useTodos = () => {
    const todos = useGet<Todo[]>(['todos'], { initialState: [], cacheTime: 5000 });

    React.useEffect(() => {
        todos.get(Managers.api().todos().exec());
    }, [todos.get]);

    React.useEffect(() => {
        Array(todoContract).Or(Undefined).check(todos.state)
    }, [todos.state])

    return todos
}

export type { Todo }
export { todoContract, useTodos }