import { Flex, CircularProgress } from "@chakra-ui/react";

interface LoaderProps {
    isLoading: boolean;
    error: undefined;
}

const Loader: React.FC<React.PropsWithChildren<LoaderProps>> = ({
    isLoading,
    error,
    children
}) => {
    if (isLoading) {
        return (
            <Flex justifyContent={"center"} alignItems="center">
                <CircularProgress isIndeterminate color="cyan.500" />
            </Flex>
        );
    }

    return <>{children}</>;
};

export { Loader };
