import React from "react";

const useCollectionPaging = <T extends unknown>(
    defaultCollection: T[] = [],
    defaultOption: 5 | 10 | 20 | 50 = 10
) => {
    const [options] = React.useState(() => [5, 10, 20, 50]);

    const [option, setOption] = React.useState(defaultOption);

    const [page, setPage] = React.useState<number>(1);

    const count = React.useMemo(
        () => Math.ceil(defaultCollection.length / option),
        [defaultCollection.length, option]
    );

    const collection = React.useMemo(
        () => [...defaultCollection].slice((page - 1) * option, page * option),
        [defaultCollection, option, page]
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
        collection,
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
