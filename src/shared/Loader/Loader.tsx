import { Box, CircularProgress } from "@chakra-ui/react";

interface LoaderProps {
    isLoading: boolean;
    error: undefined;
    LoaderElement: React.ReactElement;
}

const Loader: React.FC<React.PropsWithChildren<LoaderProps>> = ({
    isLoading,
    error,
    LoaderElement,
    children
}) => {
    if (isLoading) {
        return (
            <Box>
                {LoaderElement ? (
                    LoaderElement
                ) : (
                    <CircularProgress isIndeterminate color="cyan.300" />
                )}
            </Box>
        );
    }

    return <>{children}</>;
};

export { Loader };
