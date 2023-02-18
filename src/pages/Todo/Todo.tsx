import { Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { globalLoaderContext } from "../../processes";
import { Layout, ReloadHeader } from "../../shared";
import {
    todoCardWidgetContext,
    TodoCardWidget,
    TodoCardWidgetProvider
} from "../../widgets";

const Todo = () => {
    const { id } = useParams();
    return (
        <Layout justifyContent={"center"}>
            <Stack width="fit-content" spacing={4} direction="column">
                <globalLoaderContext.Consumer>
                    {(loader) => (
                        <TodoCardWidgetProvider id={id}>
                            <todoCardWidgetContext.Consumer>
                                {(ctx) => {
                                    loader.setIsLoading(ctx.todo.isLoading);
                                    return (
                                        <ReloadHeader
                                            isLoading={ctx.todo.isLoading}
                                            isDisabled={
                                                ctx.todo.isLoading ||
                                                ctx.todo.isFetching
                                            }
                                            refetch={ctx.todo.refetch}
                                        >
                                            Todo #{ctx.todo.state?.id}
                                        </ReloadHeader>
                                    );
                                }}
                            </todoCardWidgetContext.Consumer>
                            <TodoCardWidget />
                        </TodoCardWidgetProvider>
                    )}
                </globalLoaderContext.Consumer>
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
