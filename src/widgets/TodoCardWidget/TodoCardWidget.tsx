import React from "react";
import { TodoCard } from "./TodoCard";
import { useTodoCardWidget } from "./TodoCardWidgetProvider";

const TodoCardWidget: React.FC = () => {
    const { todo, user } = useTodoCardWidget();

    return <TodoCard todo={todo.state} author={user.state?.username} />;
};

export { TodoCardWidget };
