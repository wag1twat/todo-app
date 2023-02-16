import { User } from "../../Users"
import { Todo } from "./useTodos"

interface MergeUserIntoTodo extends Pick<Todo, 'id' | 'title' | 'completed'> {
    author: string | null
}

const mergeUsersIntoTodo = (todos: Todo[] = [], users: User[] = []) : MergeUserIntoTodo[] => {
    return todos.map(({ id, title, completed, userId }) => {
        const author = users.find(user => user.id === userId)
        return {
            id, 
            title, 
            completed,
            author: author ? author.username : null
        }
    })
}

export type { MergeUserIntoTodo }
export { mergeUsersIntoTodo }