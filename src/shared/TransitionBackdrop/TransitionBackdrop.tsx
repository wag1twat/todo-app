import { Box } from "@chakra-ui/react";

const TransitionBackdrop: React.FC<
    React.PropsWithChildren<{ isActive: boolean }>
> = ({ isActive, children }) => {
    return (
        <Box
            __css={
                isActive
                    ? {
                          opacity: 0.5,
                          pointerEvents: "none",
                          userSelect: "none"
                      }
                    : undefined
            }
        >
            {children}
        </Box>
    );
};

export { TransitionBackdrop };
