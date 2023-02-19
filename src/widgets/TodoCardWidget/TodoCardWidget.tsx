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
            todo={todo.state}
            author={
                <UserLink id={user.state?.id} isLoading={user.isLoading}>
                    {user.state?.username}
                </UserLink>
            }
        />
    );
};

export { TodoCardWidget };
