import { Number, Record, Static, String } from "runtypes"

const commentDto = Record({
    body: String,
    email: String,
    id: Number,
    name: String,
    postId: Number
})

const commentsQeriesDto = Record({
    postId: Number.optional(),
})

type CommentDto = Static<typeof commentDto>
type CommentQeriesDto = Static<typeof commentsQeriesDto>

export type { CommentDto, CommentQeriesDto }
export { commentDto, commentsQeriesDto }