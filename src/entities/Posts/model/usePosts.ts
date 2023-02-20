import { useQuery } from 'react-query';
import { api } from 'src/processes';
import { LimiterQueries } from 'src/processes/core/types';

const usePosts = (props: LimiterQueries = {}) => {
    const { _start, _limit, } = props

    return useQuery(['posts', _start, _limit], {
        queryFn: () => api().getPosts({ queries: { _start, _limit } }),
        select: ( { data } ) => data,
        enabled: (_start !== undefined || _limit !== undefined),
        cacheTime: 5000,
        keepPreviousData: true
    })
}

export { usePosts }