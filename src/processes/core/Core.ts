import { Analitycs } from "./Analytics"
import { Api } from "./Api"
import { Env } from "./Env"
import { Queries } from "./Queries"
import { Route } from "./Route"


const env = () => new Env()
const api = () => new Api(env().API)
const route = (route: string = '') => new Route(route)
const queries = () => new Queries()
const analytics = () => new Analitycs()

export { env, api, route, queries, analytics }