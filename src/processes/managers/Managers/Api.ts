import { Url } from "./Url"

class Api extends Url  {
    constructor(api: string) {
        super(api)
    }

    todos() {
        return this.slash('todos')
    }
    todo(id: string) {
        return this.todos().slash(id)
    }
    users() {
        return this.slash('users')
    }
    user(id: string) {
        return this.users().slash(id)
    }
}

export { Api }
