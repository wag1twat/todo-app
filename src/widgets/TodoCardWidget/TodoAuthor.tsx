import { UserOutlined } from "@ant-design/icons";
import { Box, Icon, chakra } from "@chakra-ui/react";
import { Core } from "../../processes";
import { RouterLink } from "../../shared";

interface TodoAuthorProps {
    id: number | undefined;
    isLoading?: boolean;
}

const TodoAuthor: React.FC<React.PropsWithChildren<TodoAuthorProps>> = ({
    id,
    isLoading,
    children
}) => {
    return (
        <Box textAlign={"end"}>
            <RouterLink
                to={Core.route().user().link(String(id)).exec()}
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

export { TodoAuthor };
