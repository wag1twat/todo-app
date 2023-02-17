import { Heading, IconButton, Stack, Icon } from "@chakra-ui/react";
import { RedoOutlined } from "@ant-design/icons";

interface ReloadHeaderProps {
    isLoading: boolean;
    isDisabled: boolean;
    refetch: () => void;
}

const ReloadHeader: React.FC<React.PropsWithChildren<ReloadHeaderProps>> = ({
    isLoading,
    isDisabled,
    refetch,
    children
}) => {
    return (
        <Stack direction={"row"} spacing={4} alignItems="center">
            <Heading>{children}</Heading>
            <IconButton
                aria-label="Refetch"
                size="sm"
                isLoading={isLoading}
                isDisabled={isDisabled}
                onClick={refetch}
            >
                <Icon as={RedoOutlined} />
            </IconButton>
        </Stack>
    );
};

export { ReloadHeader };
