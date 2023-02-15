import React from "react";
import { apiManager, useGet } from "../../processes";

const Todos: React.FC = React.memo(() => {
    console.log("render");

    const { get } = useGet();

    React.useEffect(() => {
        get(apiManager().todos().url);
    }, []);

    return <div>Todos</div>;
});

export { Todos };
