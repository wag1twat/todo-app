import { Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { ContentLayout } from "src/processes/theme";
import { ReloadHeader } from "src/shared";
import {
    TodoCardWidgetProvider,
    todoCardWidgetContext,
    TodoCardWidget
} from "src/widgets";

const Todo = () => {
    const { id } = useParams();
    return (
        <ContentLayout justifyContent={"center"}>
            <Stack width="fit-content" spacing={4} direction="column">
                <TodoCardWidgetProvider id={id ? +id : undefined}>
                    <todoCardWidgetContext.Consumer>
                        {(ctx) => {
                            return (
                                <ReloadHeader
                                    isLoading={ctx.todo.isLoading}
                                    isDisabled={
                                        ctx.todo.isLoading ||
                                        ctx.todo.isFetching
                                    }
                                    refetch={ctx.todo.refetch}
                                >
                                    Todo #{ctx.todo.data?.id}
                                </ReloadHeader>
                            );
                        }}
                    </todoCardWidgetContext.Consumer>
                    <TodoCardWidget />
                </TodoCardWidgetProvider>
            </Stack>
        </ContentLayout>
    );
};

const FallbackTodo = () => {
    return (
        <ContentLayout justifyContent={"center"}>
            <Stack width="fit-content" spacing={4} direction="column">
                <ReloadHeader isLoading={false} isDisabled={true}>
                    Todo #
                </ReloadHeader>
            </Stack>
        </ContentLayout>
    );
};

export { FallbackTodo };
export default Todo;
