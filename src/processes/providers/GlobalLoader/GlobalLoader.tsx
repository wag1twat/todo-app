import { Box, CircularProgress, useTheme } from "@chakra-ui/react";
import React from "react";

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

    const theme = useTheme();

    const zIndex = React.useMemo(() => {
        const zIndices = Object.values(theme.zIndices).filter(
            (value) => typeof value === "number"
        ) as number[];
        return Math.max(...zIndices) + 1;
    }, [theme.zIndices]);
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
                pointerEvents="none"
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

export { useGlobalLoader, GlobalLoaderProvider };
