import { Number, Record, Static } from "runtypes"

const limiterDto = Record({
    _start: Number.optional(),
    _limit: Number.optional()
})

type LimiterDto = Static<typeof limiterDto>

export type { LimiterDto }
export { limiterDto }