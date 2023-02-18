import { Url } from "./Url"

class Route extends Url {
    constructor(route: string) {
        super(route)
    }

    todos() {
        return {
            link: () => this.slash('todos'),
            path: () => this.slash('todos'),
        }
    }
    todo(){
        return {
            link: (id: string) => this.todos().link().slash(id),
            path: () => this.todos().path().slashColon('id'),
        }
    }

    users() {
        return {
            link: () => this.slash('users'),
            path: () => this.slash('users')
        }
    }
    user() {
        return {
            link: (id: string) => this.users().link().slash(id),
            path: () => this.users().path().slashColon('id')
        }
    }
    analytics() {
        return {
            link: () => this.slash('analytics'),
            path: () => this.slash('analytics')
        }
    }

    analyticsErrorEvent(){
         return {
            link: (key: string) => this.slash('analytics').slash(key),
            path: () => this.slash('analytics').slashColon('key')
        }
    }
}

export { Route }