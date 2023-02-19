import { Grid } from "@chakra-ui/react";
import { Todo } from "../model";
import { TodoCard, TodoAuthor } from "../../../widgets/TodoCardWidget";

interface TodosCardsProps {
    todos: Todo[];
    getAuthor: (userId: number) => string | undefined;
}

const TodosCards: React.FC<React.PropsWithChildren<TodosCardsProps>> = ({
    todos,
    getAuthor
}) => {
    return (
        <Grid
            gap={4}
            alignSelf="center"
            gridTemplateColumns={[
                "1fr",
                "1fr",
                "1fr 1fr",
                "1fr 1fr 1fr",
                "1fr 1fr 1fr"
            ]}
        >
            {todos.map((todo) => {
                return (
                    <TodoCard
                        key={todo.id}
                        todo={todo}
                        useNavigate
                        author={
                            <TodoAuthor id={todo.userId}>
                                {getAuthor(todo.userId)}
                            </TodoAuthor>
                        }
                    />
                );
            })}
        </Grid>
    );
};

export { TodosCards };
