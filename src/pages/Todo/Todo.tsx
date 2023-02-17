import { Heading, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { TodoCard, useTodo } from "../../entities";
import { useGlobalLoader } from "../../processes";

const Todo = () => {
    const { id } = useParams();

    const todo = useTodo(id);

    useGlobalLoader(todo.isLoading);
    return (
        <Stack spacing={4} direction="column">
            <Heading>Todo #{id}</Heading>
            <TodoCard todo={todo.state} />
        </Stack>
    );
};

const FallbackTodo = () => {
    return null;
};

export { FallbackTodo };
export default Todo;
