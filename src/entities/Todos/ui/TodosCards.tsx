import { Grid } from "@chakra-ui/react";
import { Todo } from "../model";
import { TodoCard } from "./TodoCard";

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
                        author={getAuthor(todo.userId)}
                        todo={todo}
                    />
                );
            })}
        </Grid>
    );
};

export { TodosCards };
