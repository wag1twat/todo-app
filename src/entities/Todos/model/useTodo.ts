import React from 'react'
import { Undefined } from 'runtypes';
import { Core, useGet } from '../../../processes';
import { Todo, todoContract } from './useTodos';


const useTodo = (id: number | undefined) => {    
    const todo = useGet<Todo | undefined>(['todo', String(id)], { initialState: undefined, cacheTime: 5000, enabled: id !== undefined });

    React.useEffect(() => {
        todo.get(Core.api().todo(String(id)).exec());
    }, [todo.get, id]);

    React.useEffect(() => {
        todoContract.Or(Undefined).check(todo.state)
    }, [todo.state])

    return todo
}

export { useTodo }