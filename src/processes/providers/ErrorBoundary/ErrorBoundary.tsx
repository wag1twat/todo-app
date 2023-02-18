import React, { ErrorInfo } from "react";
import { Stack, Text } from "@chakra-ui/react";
import { Managers } from "../../managers";

interface Props {
    stage: NodeJS.ProcessEnv["NODE_ENV"];
}
interface State {
    hasError: boolean;
    name: string | undefined;
    message: string | undefined;
    stack: string | undefined;
}

class ErrorBoundary extends React.Component<
    React.PropsWithChildren<Props>,
    State
> {
    constructor(props: React.PropsWithChildren<Props>) {
        super(props);
        this.state = {
            hasError: false,
            name: undefined,
            message: undefined,
            stack: undefined
        };
    }

    static getDerivedStateFromError(error: unknown) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        Managers.analytics().sendErrorEvent({
            name: error.name,
            message: error.message,
            stack: errorInfo.componentStack
        });

        this.setState((prevState) => ({
            ...prevState,
            name: error.name,
            message: error.message,
            stack: errorInfo.componentStack
        }));
    }

    render() {
        if (process.env.NODE_ENV === "development" && this.state.hasError) {
            return (
                <Stack spacing={2}>
                    <Text fontSize="md">{this.state.name}</Text>
                    <Text fontSize="small">{this.state.message}</Text>
                    <Text fontSize="x-small">{this.state.stack}</Text>
                </Stack>
            );
        }

        return this.props.children;
    }
}

export { ErrorBoundary };
