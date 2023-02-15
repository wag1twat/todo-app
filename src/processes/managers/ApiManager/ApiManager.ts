import { EnvKeys } from "../EnvManager"
import { UrlManager } from "../UrlManager"

type ApiKeys = 'todos'

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
}

const apiManager = () => new ApiManager(process.env[EnvKeys.REACT_APP_API] || "")

export type { ApiKeys }
export { apiManager }