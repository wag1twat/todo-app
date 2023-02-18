import { Flex, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { TodoCard, useTodo, useUser } from "../../entities";
import { useGlobalLoader } from "../../processes";
import { Layout, ReloadHeader } from "../../shared";

const Todo = () => {
    const { id } = useParams();

    const todo = useTodo(id);

    const user = useUser(
        todo.state?.userId ? String(todo.state.userId) : undefined
    );

    useGlobalLoader(todo.isLoading);

    return (
        <Layout justifyContent={"center"}>
            <Stack width="fit-content" spacing={4} direction="column">
                <ReloadHeader
                    isLoading={todo.isLoading}
                    isDisabled={todo.isLoading || todo.isFetching}
                    refetch={todo.refetch}
                >
                    Todo #{id}
                </ReloadHeader>
                <TodoCard author={user.state?.username} todo={todo.state} />
            </Stack>
        </Layout>
    );
};

const FallbackTodo = () => {
    return (
        <Layout justifyContent={"center"}>
            <Stack width="fit-content" spacing={4} direction="column">
                <ReloadHeader isLoading={false} isDisabled={true}>
                    Todo #
                </ReloadHeader>
            </Stack>
        </Layout>
    );
};

export { FallbackTodo };
export default Todo;
