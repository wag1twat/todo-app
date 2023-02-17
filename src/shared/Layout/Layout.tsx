import { Flex, FlexProps } from "@chakra-ui/react";

const Layout: React.FC<FlexProps> = (props) => {
    return (
        <Flex
            width={"100%"}
            maxWidth="1366px"
            mx="auto"
            justifyContent="center"
            {...props}
        />
    );
};

export { Layout };
