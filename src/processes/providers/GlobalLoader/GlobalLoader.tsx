import { Box, CircularProgress } from "@chakra-ui/react";
import React from "react";
import { useMaxZIndex } from "src/processes/hooks";

interface GlobalLoaderContext {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const globalLoaderContext = React.createContext<GlobalLoaderContext>(
    {} as GlobalLoaderContext
);

const useGlobalLoader = (isLoading: boolean) => {
    const ctx = React.useContext(globalLoaderContext);

    React.useEffect(() => {
        ctx.setIsLoading(isLoading);
    }, [isLoading]);
};

const GlobalLoaderProvider: React.FC<React.PropsWithChildren<{}>> = ({
    children,
    ...props
}) => {
    const [isLoading, setIsLoading] = React.useState(false);

    const zIndex = useMaxZIndex();
    return (
        <globalLoaderContext.Provider
            value={{
                setIsLoading
            }}
            {...props}
        >
            <Box
                hidden={!isLoading}
                position="fixed"
                width="100vw"
                height="100vh"
                zIndex={zIndex}
                backgroundColor="#fff"
                opacity={"0.7"}
                pointerEvents="painted"
            >
                <CircularProgress
                    isIndeterminate
                    color="cyan.500"
                    top="50%"
                    left="50%"
                />
            </Box>
            {children}
        </globalLoaderContext.Provider>
    );
};

export { useGlobalLoader, globalLoaderContext, GlobalLoaderProvider };
