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
    posts() {
        return this.slash('posts')
    }
    post(id: string) {
        return this.posts().slash(id)
    }
    comments() {
        return this.slash('comments')
    }
}

export { Api }
