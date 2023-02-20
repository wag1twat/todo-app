import React from "react";
import { UseQueryResult } from "react-query/types/react";
import { Todo, User, useTodo, useUser } from "../../entities";

interface TodoCardWidgetContext {
    todo: UseQueryResult<Todo>;
    user: UseQueryResult<User>;
}
const todoCardWidgetContext = React.createContext<TodoCardWidgetContext>(
    {} as TodoCardWidgetContext
);

const useTodoCardWidget = () => {
    return React.useContext(todoCardWidgetContext);
};

interface TodoCardWidgetProviderProps {
    id: number | undefined;
}
const TodoCardWidgetProvider: React.FC<
    React.PropsWithChildren<TodoCardWidgetProviderProps>
> = ({ id, ...props }) => {
    const todo = useTodo(id);

    const user = useUser(todo.data?.userId);

    return (
        <todoCardWidgetContext.Provider
            value={{
                user,
                todo
            }}
            {...props}
        />
    );
};

export { useTodoCardWidget, todoCardWidgetContext, TodoCardWidgetProvider };
