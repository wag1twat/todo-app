import {
    Heading,
    IconButton,
    Stack,
    Icon,
    StackProps,
    forwardRef,
    As
} from "@chakra-ui/react";
import { RedoOutlined } from "@ant-design/icons";

interface ReloadHeaderProps extends StackProps {
    isLoading: boolean;
    isDisabled: boolean;
    refetch?: () => void;
}

const ReloadHeader = forwardRef<
    ReloadHeaderProps,
    As<StackProps & { ref?: React.LegacyRef<HTMLDivElement> }>
>(({ isLoading, isDisabled, refetch, children, ...props }, ref) => {
    return (
        <Stack
            direction={"row"}
            spacing={4}
            alignItems="center"
            ref={ref}
            {...props}
        >
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
});

export { ReloadHeader };
