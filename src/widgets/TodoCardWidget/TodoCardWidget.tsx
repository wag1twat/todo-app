import React from "react";
import { TodoAuthor } from "./TodoAuthor";
import { FallbackTodoCard, TodoCard } from "./TodoCard";
import { useTodoCardWidget } from "./TodoCardWidgetProvider";

const TodoCardWidget: React.FC = () => {
    const { todo, user } = useTodoCardWidget();

    if (todo.isLoading) {
        return <FallbackTodoCard />;
    }

    return (
        <TodoCard
            todo={todo.state}
            author={
                <TodoAuthor id={user.state?.id} isLoading={user.isLoading}>
                    {user.state?.username}
                </TodoAuthor>
            }
        />
    );
};

export { TodoCardWidget };
