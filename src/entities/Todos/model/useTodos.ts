import React from 'react'
import { Boolean, Number, Record, Static, String } from 'runtypes';
import { apiManager, useGet } from '../../../processes';

const todo = Record({
    completed: Boolean,
    id:Number,
    title: String,
    userId:Number
})

type Todo = Static<typeof todo>

const useTodos = () => {
    const todos = useGet();

    React.useEffect(() => {
        todos.get(apiManager().todos().url);
    }, [todos.get]);

    React.useEffect(() => {
        todo.check(todos.state)
    })

    return todos
}

export type { Todo }
export { useTodos }