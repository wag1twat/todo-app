import { Flex } from "@chakra-ui/react";

const Main: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    return (
        <Flex as="main" flexDirection={"column"} pt={20} px={6} pb={6}>
            {children}
        </Flex>
    );
};

export { Main };
