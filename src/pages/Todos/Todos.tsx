import React from "react";
import { useTodos } from "../../entities";

const Todos: React.FC = React.memo(() => {
    const todos = useTodos();

    return <div>Todos</div>;
});

export { Todos };
