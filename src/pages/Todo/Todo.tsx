import { Flex, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { TodoCard, useTodo, useUser } from "../../entities";
import { useGlobalLoader } from "../../processes";
import { ReloadHeader } from "../../shared";

const Todo = () => {
    const { id } = useParams();

    const todo = useTodo(id);

    const user = useUser(
        todo.state?.userId ? String(todo.state.userId) : undefined
    );

    useGlobalLoader(todo.isLoading);

    return (
        <Flex justifyContent={"center"}>
            <Stack spacing={4} direction="column">
                <ReloadHeader
                    isLoading={todo.isLoading}
                    isDisabled={todo.isLoading || todo.isFetching}
                    refetch={todo.refetch}
                >
                    Todo #{id}
                </ReloadHeader>
                <TodoCard author={user.state?.username} todo={todo.state} />
            </Stack>
        </Flex>
    );
};

const FallbackTodo = () => {
    return null;
};

export { FallbackTodo };
export default Todo;
