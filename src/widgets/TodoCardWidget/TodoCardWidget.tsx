import React from "react";
import { UserLink } from "../../shared";
import { FallbackTodoCard, TodoCard } from "./TodoCard";
import { useTodoCardWidget } from "./TodoCardWidgetProvider";

const TodoCardWidget: React.FC = () => {
    const { todo, user } = useTodoCardWidget();

    if (todo.isLoading) {
        return <FallbackTodoCard />;
    }

    return (
        <TodoCard
            todo={todo.data}
            author={
                <UserLink id={user.data?.id} isLoading={user.isLoading}>
                    {user.data?.username}
                </UserLink>
            }
        />
    );
};

export { TodoCardWidget };
