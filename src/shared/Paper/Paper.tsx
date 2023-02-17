import { Box, BoxProps } from "@chakra-ui/react";

const Paper: React.FC<BoxProps> = (props) => {
    return (
        <Box
            boxShadow={
                "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)"
            }
            borderRadius="sm"
            {...props}
        />
    );
};

export { Paper };
