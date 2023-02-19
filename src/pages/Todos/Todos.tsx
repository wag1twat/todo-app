import { Flex, Input, Stack } from "@chakra-ui/react";
import React, { useDeferredValue } from "react";
import { useSearchParams } from "react-router-dom";
import { TodosCards, TodosTable, useTodos, useUsers } from "../../entities";
import {
    ToggleRenderVariantUrlQuery,
    useValidateRenderVariant
} from "../../features";
import { useGlobalLoader } from "../../processes";
import { ContentLayout } from "../../processes/theme";
import { ReloadHeader } from "../../shared";

const Todos: React.FC = () => {
    const [searchParams] = useSearchParams();

    const [username, setUsername] = React.useState<string>(
        () => searchParams.get("username") || ""
    );

    const defferedUsername = useDeferredValue(username);

    const { renderVariant } = useValidateRenderVariant();

    const users = useUsers();

    const todos = useTodos({
        onSettled: () => {
            users.refetch();
        }
    });

    useGlobalLoader(todos.isLoading || users.isLoading);

    const getAuthor = React.useCallback(
        (userId: number) => {
            return users.state.find((user) => user.id === userId)?.username;
        },
        [users.state]
    );

    const filteredTodos = React.useMemo(() => {
        return todos.state.filter((todo) =>
            getAuthor(todo.userId)
                ?.toLocaleLowerCase()
                .includes(defferedUsername.toLocaleLowerCase())
        );
    }, [todos.state, defferedUsername, getAuthor]);

    return (
        <ContentLayout>
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
                            isLoading={todos.isLoading || todos.isFetching}
                            isDisabled={todos.isLoading || todos.isFetching}
                            refetch={todos.refetch}
                        >
                            Todos
                        </ReloadHeader>
                        <ToggleRenderVariantUrlQuery />
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

                {renderVariant === "list" && todos.state.length > 0 && (
                    <TodosTable todos={filteredTodos} getAuthor={getAuthor} />
                )}
                {renderVariant === "card" && (
                    <TodosCards todos={filteredTodos} getAuthor={getAuthor} />
                )}
            </Stack>
        </ContentLayout>
    );
};

const FallbackTodos = () => {
    return (
        <ContentLayout>
            <Stack
                width="100%"
                direction={"row"}
                spacing={4}
                alignItems="center"
            >
                <ReloadHeader isLoading={false} isDisabled={true}>
                    Todos
                </ReloadHeader>
                <ToggleRenderVariantUrlQuery />
            </Stack>
        </ContentLayout>
    );
};

export { FallbackTodos };
export default Todos;
