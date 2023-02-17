import { Flex, Heading, Input, Stack } from "@chakra-ui/react";
import React, { useDeferredValue } from "react";
import { TodosCards, TodosTable, useTodos, useUsers } from "../../entities";
import { useGlobalLoader } from "../../processes";
import {
    Layout,
    ReloadHeader,
    ToggleView,
    useValidateView
} from "../../shared";

const Todos: React.FC = () => {
    const [username, setUsername] = React.useState<string>("");
    const defferedUsername = useDeferredValue(username);

    const view = useValidateView();

    const users = useUsers();

    const todos = useTodos();

    useGlobalLoader(todos.isLoading || users.isLoading);

    const getAuthor = React.useCallback(
        (userId: number) => {
            return users.state.find((user) => user.id === userId)?.username;
        },
        [users.state]
    );

    const filteredTodos = React.useMemo(() => {
        return todos.state.filter((todo) =>
            Boolean(
                getAuthor(todo.userId)
                    ?.toLocaleLowerCase()
                    .includes(defferedUsername.toLocaleLowerCase())
            )
        );
    }, [todos.state, defferedUsername]);

    return (
        <Layout>
            <Stack width="100%" spacing={4}>
                <Flex
                    alignItems={"center"}
                    justifyContent={[
                        "unset",
                        "space-between",
                        "space-between",
                        "space-between",
                        "space-between"
                    ]}
                    flexDirection={["column", "row", "row", "row", "row"]}
                >
                    <Stack
                        width="100%"
                        direction={"row"}
                        spacing={4}
                        alignItems="center"
                    >
                        <ReloadHeader
                            isLoading={todos.isLoading}
                            isDisabled={todos.isLoading || todos.isFetching}
                            refetch={todos.refetch}
                        >
                            Todos
                        </ReloadHeader>
                        <ToggleView />
                    </Stack>
                    <Input
                        mt={[4, "unset", "unset", "unset", "unset"]}
                        size="sm"
                        width="100%"
                        maxWidth={["unset", "300px", "300px", "300px", "300px"]}
                        isDisabled={todos.isLoading || todos.isFetching}
                        placeholder="Username..."
                        value={defferedUsername}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Flex>

                {view === "list" && todos.state.length > 0 && (
                    <TodosTable todos={filteredTodos} getAuthor={getAuthor} />
                )}
                {view === "card" && (
                    <TodosCards todos={filteredTodos} getAuthor={getAuthor} />
                )}
            </Stack>
        </Layout>
    );
};

const FallbackTodos = () => {
    return (
        <Stack>
            <Heading>Todos</Heading>
        </Stack>
    );
};

export { FallbackTodos };
export default Todos;
