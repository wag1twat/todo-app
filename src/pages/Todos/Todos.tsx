import React from "react";
import { Main, useTodos } from "../../entities";

const Todos: React.FC = React.memo(() => {
    const todos = useTodos();

    return <Main>Todos</Main>;
});

export { Todos };
