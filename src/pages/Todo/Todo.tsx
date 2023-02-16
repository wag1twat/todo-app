import { Heading, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const Todo = () => {
    const { id } = useParams();
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
