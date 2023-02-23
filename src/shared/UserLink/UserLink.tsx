import { UserOutlined } from "@ant-design/icons";
import { Box, Icon, chakra } from "@chakra-ui/react";
import { RouterLink } from "src/shared";

interface UserLinkProps {
    id: number | undefined;
    isLoading?: boolean;
}

const UserLink: React.FC<React.PropsWithChildren<UserLinkProps>> = ({
    id,
    isLoading,
    children
}) => {
    return (
        <Box textAlign={"end"}>
            <RouterLink
                // TODO:
                to={"/"}
                isDisabled={isLoading || id === undefined}
                isLoading={isLoading}
            >
                <chakra.span>{children}</chakra.span>
                <chakra.span ml={2}>
                    <Icon as={UserOutlined} fontSize="16px" />
                </chakra.span>
            </RouterLink>
        </Box>
    );
};

export { UserLink };
