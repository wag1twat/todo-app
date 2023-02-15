import { Flex } from "@chakra-ui/react";

const Main: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    return <Flex p={6}>{children}</Flex>;
};

export { Main };
