import React from "react";
import { UseQueryResult } from "react-query/types/react";
import { useTodo, useUser } from "../../entities";
import { TodoDto, UserDto } from "src/processes/core/api/dto";

interface TodoCardWidgetContext {
    todo: UseQueryResult<TodoDto>;
    user: UseQueryResult<UserDto>;
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
