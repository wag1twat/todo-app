import { Box, BoxProps } from "@chakra-ui/react";

const TransitionBackdrop: React.FC<
    React.PropsWithChildren<BoxProps & { isActive: boolean }>
> = ({ isActive, ...props }) => {
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
            {...props}
        />
    );
};

export { TransitionBackdrop };
