import { useQuery } from 'react-query';
import { Guards } from 'shulga-app-core';
import api from 'src/processes/core/api';

interface Props {
    _start?: number,
    _limit?: number
}

const usePosts = (props: Props) => {
    const { _start, _limit, } = props

    return useQuery(['posts', _start, _limit], {
        queryFn: () => api.getPosts({ _start, _limit }),
        select: ( { data } ) => data,
        enabled: Guards.isNumber(_start) && Guards.isNumber(_limit),
        cacheTime: 5000,
        keepPreviousData: true
    })
}

export { usePosts }