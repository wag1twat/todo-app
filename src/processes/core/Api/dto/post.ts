import { Number, Record, Static, String } from "runtypes"

const postDto = Record({
    userId: Number,
    id: Number,
    title: String,
    body: String
})

type PostDto = Static<typeof postDto>

export type { PostDto }
export { postDto }