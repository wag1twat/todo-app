import { Heading, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useTodo } from "../../entities";

const Todo = () => {
    const { id } = useParams();

    const todo = useTodo(id);
    return (
        <Stack>
            <Stack direction={"row"} spacing={4} alignItems="flex-end">
                <Heading>Todo #{id}</Heading>
            </Stack>
        </Stack>
    );
};

const FallbackTodo = () => {
    return null;
};

export { FallbackTodo };
export default Todo;
