import React from 'react'
import { Array, Boolean, Number, Record, Static, String, Undefined } from 'runtypes';
import { ApiManager, useGet } from '../../../processes';

const todo = Record({
    completed: Boolean,
    id:Number,
    title: String,
    userId:Number
})

type Todo = Static<typeof todo>

const useTodos = () => {
    const todos = useGet<Todo[]>(['todos'], { initialState: [], cacheTime: 5000 });

    React.useEffect(() => {
        todos.get(ApiManager.todosManager.todos.url);
    }, [todos.get]);

    React.useEffect(() => {
        Array(todo).Or(Undefined).check(todos.state)
    }, [todos.state])

    return todos
}

export type { Todo }
export { useTodos }