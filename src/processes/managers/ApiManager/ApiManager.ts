import { EnvKeys } from "../EnvManager"

class ApiManager  {
    static url = process.env[EnvKeys.REACT_APP_API]

    static todosManager = {
        todos: {
            url: `${this.url}/todos`,
        },
        todo: {
            url: (id: number) => {
                return `${this.todosManager.todos.url}/${id}`
            }
        }
    }

    static usersManager = {
        users: {
            url: `${this.url}/users`,
        },
        user: {
            url: (id: number) => {
                return `${this.usersManager.users.url}/${id}`
            }
        }
    }
}


export { ApiManager }