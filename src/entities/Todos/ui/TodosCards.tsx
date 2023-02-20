import { Grid } from "@chakra-ui/react";
import { TodoCard } from "../../../widgets";
import { UserLink } from "../../../shared";
import { TodoDto } from "../../../processes/core/Api";

interface TodosCardsProps {
    todos: TodoDto[] | undefined;
    getAuthor: (userId: number) => string | undefined;
}

const TodosCards: React.FC<React.PropsWithChildren<TodosCardsProps>> = ({
    todos = [],
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
                            <UserLink id={todo.userId}>
                                {getAuthor(todo.userId)}
                            </UserLink>
                        }
                    />
                );
            })}
        </Grid>
    );
};

export { TodosCards };
