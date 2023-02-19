import { Heading, IconButton, Stack, Icon, StackProps } from "@chakra-ui/react";
import { RedoOutlined } from "@ant-design/icons";

interface ReloadHeaderProps extends StackProps {
    isLoading: boolean;
    isDisabled: boolean;
    refetch?: () => void;
}

const ReloadHeader: React.FC<React.PropsWithChildren<ReloadHeaderProps>> = ({
    isLoading,
    isDisabled,
    refetch,
    children,
    ...props
}) => {
    return (
        <Stack direction={"row"} spacing={4} alignItems="center" {...props}>
            <Heading>{children}</Heading>
            <IconButton
                aria-label="Refetch"
                size="sm"
                isLoading={isLoading}
                isDisabled={isDisabled || refetch === undefined}
                onClick={refetch}
            >
                <Icon as={RedoOutlined} />
            </IconButton>
        </Stack>
    );
};

export { ReloadHeader };
