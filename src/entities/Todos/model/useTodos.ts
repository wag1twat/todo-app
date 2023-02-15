import React from 'react'
import { Array, Boolean, Number, Record, Static, String, Undefined } from 'runtypes';
import { apiManager, useGet } from '../../../processes';

const todo = Record({
    completed: Boolean,
    id:Number,
    title: String,
    userId:Number
})

type Todo = Static<typeof todo>

const useTodos = () => {
    const todos = useGet<Todo[]>();

    React.useEffect(() => {
        todos.get(apiManager().todos().url);
    }, [todos.get]);

    React.useEffect(() => {
        Array(todo).Or(Undefined).check(todos.state)
    })

    return todos
}

export type { Todo }
export { useTodos }