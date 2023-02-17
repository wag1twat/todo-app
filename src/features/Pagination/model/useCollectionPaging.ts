import React from "react";

const useCollectionPaging = <T extends unknown>(
    collection: T[] = [],
    defaultOption: 5 | 10 | 20 | 50 = 10
) => {
    const [options] = React.useState(() => [5, 10, 20, 50]);

    const [option, setOption] = React.useState(defaultOption);

    const [page, setPage] = React.useState<number>(1);

    const count = React.useMemo(
        () => Math.ceil(collection.length / option),
        [collection.length, option]
    );

    const items = React.useMemo(
        () => [...collection].slice((page - 1) * option, page * option),
        [collection, option, page]
    );

    const nextPage = React.useCallback(() => {
        setPage((prevPage) => {
            const nextPage = prevPage + 1;
            return count >= nextPage ? nextPage : prevPage
        });
    }, [count]);

    const prevPage = React.useCallback(() => {
        setPage((prevPage) => {
            const nextPage = prevPage - 1;
            return nextPage >= 1 ? nextPage : prevPage
        });
    }, []);

    return {
        items,
        option,
        options,
        count,
        setOption,
        page,
        nextPage,
        prevPage,
        setPage
    };
};

export { useCollectionPaging };
