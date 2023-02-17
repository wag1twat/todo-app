import { EnvKeys } from "../EnvManager"

class Url {
    private value: string
    constructor(value: string) {
        this.value = value
    }

    public exec() {
        return this.value
    }

    /**
     * 
     * @param sepator string between value of values
     * @param values array of string for joined to base string with sepator
     * @returns { Url }
     */
    private separate(sepator: string, ...values: (string)[]): Url {
        this.value = [this.value, ...values].join(sepator)
        return this
    }

    /**
     * @param values array of string for joined to base string with separator - "/"
     * @example slash('user', 'posts')
     * @returns { Url }
     */
    public slash(...values: (string)[]): Url {
        return this.separate('/', ...values)
    }
    /**
     * @param values array of string for joined to base string with separator - "/:"
     * @example slashColon('userId', 'postId')
     * @returns { Url }
     */
    public slashColon(...values: (string)[]): Url {
        return this.separate('/:', ...values)
    }
}

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
}

// TODO: квери манагер
class Queries {
    private url: string
    constructor(url: string) {
        this.url = url
    }
}



class Managers {
    static api = () => new Api(process.env[EnvKeys.REACT_APP_API] || '/')
    static route = (route: string = '') => new Route(route)
}

export { Managers }