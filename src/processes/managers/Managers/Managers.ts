import { Analitycs } from "./Analytics"
import { Api } from "./Api"
import { Env } from "./Env"
import { Queries } from "./Queries"
import { Route } from "./Route"

class Managers {
    static env = () => new Env()
    static api = () => new Api(this.env().API)
    static route = (route: string = '') => new Route(route)
    static queries = () => new Queries()
    static analytics = () => new Analitycs()
}

export { Managers }