import React from 'react'
import { apiManager, useGet } from '../../../processes';

const useTodos = () => {
    const todos = useGet();

    React.useEffect(() => {
        todos.get(apiManager().todos().url);
    }, [todos.get]);

    return todos
}

export { useTodos }