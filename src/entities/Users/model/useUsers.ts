import React from 'react'
import { useQuery } from 'react-query';
import { Array, Number, Record, Static, String, Undefined } from 'runtypes';
import { axiosInstance, Core } from '../../../processes';

const geoContact = Record({
    lat: String, lng: String
})

const addressContract = Record({
    city: String,
    geo: geoContact,
    street: String,
    suite: String,
    zipcode: String,
})

const companyContract = Record({
    bs: String,
    catchPhrase: String,
    name: String
})

const userContract = Record({
    address: addressContract,
    company: companyContract,
    email: String,
    id: Number,
    name: String,
    phone: String,
    username: String,
    website: String
})

type User = Static<typeof userContract>

const useUsers = () => {
    const users = useQuery(['users'], {
        queryFn: () => axiosInstance.get<User[]>(Core.api().users().exec()),
        select: ( { data } ) => data,
        onSettled(data) {
            Array(userContract).Or(Undefined).check(data)
        },
    })

    return users
}

export type { User }
export { userContract, useUsers }