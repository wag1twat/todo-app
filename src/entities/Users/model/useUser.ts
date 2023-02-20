import React from 'react'
import { useQuery } from 'react-query';
import {  Undefined } from 'runtypes';
import { axiosInstance, Core,  } from '../../../processes';
import { User, userContract } from './useUsers';

const useUser = (id: number | undefined) => {
    const user = useQuery(['user', id], {
        queryFn: () => axiosInstance.get<User>(Core.api().user(String(id)).exec()),
        select: ( { data } ) => data,
        onSettled(data, error) {
            userContract.Or(Undefined).check(data)
        },
        enabled: id !== undefined,
    })

    return user
}

export {  useUser }