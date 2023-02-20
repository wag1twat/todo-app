import { Flex, Input, Stack } from "@chakra-ui/react";
import React, { useDeferredValue } from "react";
import { useSearchParams } from "react-router-dom";
import { TodosCards, TodosTable, useTodos, useUsers } from "../../entities";
import { ToggleRenderVariantUrlQuery } from "../../features";
import {
    defRenderVariant,
    renderVariantKey
} from "../../features/ToggleRenderVariantUrlQuery/model";
import { useGlobalLoader } from "../../processes";
import { ContentLayout } from "../../processes/theme";
import { ReloadHeader } from "../../shared";

const Todos: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const username = searchParams.get("username") || "";

    const renderVariant =
        searchParams.get(renderVariantKey) || defRenderVariant;

    const users = useUsers();

    const todos = useTodos();

    useGlobalLoader(todos.isLoading || users.isLoading);

    const getAuthor = React.useCallback(
        (userId: number) => {
            return users.data?.find((user) => user.id === userId)?.username;
        },
        [users.data]
    );

    const filteredTodos = React.useMemo(() => {
        return todos.data?.filter((todo) =>
            Boolean(
                getAuthor(todo.userId)
                    ?.toLocaleLowerCase()
                    .includes(username.toLocaleLowerCase())
            )
        );
    }, [todos.data, username, getAuthor]);

    console.log(filteredTodos?.map((t) => getAuthor(t.userId)));
    return (
        <ContentLayout>
            <Stack width="100%" spacing={4}>
                <Flex
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
                        alignItems="center"
                        direction={"row"}
                        spacing={4}
                        height="fit-content"
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
                        value={username}
                        onChange={(e) => {
                            setSearchParams((prev) => {
                                prev.set("username", e.target.value);
                                return prev;
                            });
                        }}
                    />
                </Flex>

                {renderVariant === "list" && (
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
                alignItems={"center"}
                direction={"row"}
                spacing={4}
                height="fit-content"
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
