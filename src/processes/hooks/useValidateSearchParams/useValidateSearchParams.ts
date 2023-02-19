import React from 'react'
import { useSearchParams } from "react-router-dom";

type Props = Record<string, (value: unknown) => unknown | undefined>;

type Result<V extends Props> = {
    [K in keyof V]: ReturnType<V[K]>;
};

const useValidateSearchParams = <T extends Props>(props: T) => {
    const [searchParams] = useSearchParams();

    const params = React.useMemo(() => Object.keys(props).reduce<Result<T>>((acc, key) => ({
        ...acc,
        [key]: props[key](searchParams.get(key))
    }), {} as Result<T>), [props]);

    return { params, searchParams }
};

export { useValidateSearchParams }