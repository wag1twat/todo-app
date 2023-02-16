import { EnvKeys } from "../EnvManager"
import { UrlManager } from "../UrlManager"

type ApiKeys = 'todos' | 'users'

class ApiManager extends UrlManager {
    constructor(url: string ) {
        super(url)
    }

    todos() {
        return {
            id: (id: number) => {
                this.slash('todos').slash(String(id))
                return this
            },
            url: this.slash('todos').url
           
        }
   }

   users() {
        return {
            id: (id: number) => {
                this.slash('users').slash(String(id))
                return this
            },
            url: this.slash('users').url
        }
   }
}

const apiManager = () => new ApiManager(process.env[EnvKeys.REACT_APP_API] || "")

export type { ApiKeys }
export { apiManager }