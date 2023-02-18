import React from "react";
import { Todo, User, useTodo, useUser } from "../../entities";
import { Get } from "../../processes";

interface TodoCardWidgetContext {
    todo: Get<Todo | undefined>;
    user: Get<User | undefined>;
}
const todoCardWidgetContext = React.createContext<TodoCardWidgetContext>(
    {} as TodoCardWidgetContext
);

const useTodoCardWidget = () => {
    return React.useContext(todoCardWidgetContext);
};

interface TodoCardWidgetProviderProps {
    id: string | undefined;
}
const TodoCardWidgetProvider: React.FC<
    React.PropsWithChildren<TodoCardWidgetProviderProps>
> = ({ id, ...props }) => {
    const todo = useTodo(id);

    const user = useUser(
        todo.state?.userId ? String(todo.state.userId) : undefined
    );

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
