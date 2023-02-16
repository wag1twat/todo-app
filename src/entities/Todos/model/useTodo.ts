import React from 'react'
import { Undefined } from 'runtypes';
import { ApiManager, useGet } from '../../../processes';
import { Todo, todoContract } from './useTodos';


const useTodo = (id: string | undefined) => {    
    const todo = useGet<Todo | undefined>(['todo', String(id)], { initialState: undefined, cacheTime: 5000 });

    React.useEffect(() => {
        todo.get(ApiManager.todosManager.todo.url(id));
    }, [todo.get, id]);

    React.useEffect(() => {
        todoContract.Or(Undefined).check(todo.state)
    }, [todo.state])

    return todo
}

export { useTodo }