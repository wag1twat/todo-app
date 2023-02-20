import { Number, Record, Static, String } from "runtypes"

const geoDto = Record({
    lat: String, lng: String
})

const addressDto = Record({
    city: String,
    geo: geoDto,
    street: String,
    suite: String,
    zipcode: String,
})

const companyDto = Record({
    bs: String,
    catchPhrase: String,
    name: String
})

const userDto = Record({
    address: addressDto,
    company: companyDto,
    email: String,
    id: Number,
    name: String,
    phone: String,
    username: String,
    website: String
})

type UserDto = Static<typeof userDto>

export type { UserDto }
export { userDto }