import { UrlSerializer } from "shulga-app-core"
import { defRenderVariant, renderVariantKey } from "src/features/ToggleRenderVariantUrlQuery/model"

const serializer = new UrlSerializer('')

const root = serializer.build()

const todosDefaultQeries = {
    [renderVariantKey]: defRenderVariant
}
const todosRoute = root.extend().path('todos').build()
const todosRouteWithDefaultQueries = todosRoute.queries(todosDefaultQeries)
const todoRoute = todosRoute.extend().param('todoId').build()
const usersRoute = root.extend().path('users').build()
const userRoute = usersRoute.extend().param('userId').build()
const postsRoute = root.extend().path('posts').build()
const postRoute = postsRoute.extend().param("postId").build()

const routes = {
    todosRoute,
    todosRouteWithDefaultQueries,
    todoRoute,
    usersRoute,
    userRoute,
    postsRoute,
    postRoute,
}

export default routes