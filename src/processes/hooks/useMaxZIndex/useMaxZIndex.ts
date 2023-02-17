import { useTheme } from "@chakra-ui/react";
import React from "react";

const useMaxZIndex = () => {
    const theme = useTheme();

    const zIndex = React.useMemo(() => {
        const zIndices = Object.values(theme.zIndices).filter(
            (value) => typeof value === "number"
        ) as number[];
        return Math.max(...zIndices) + 1;
    }, [theme.zIndices]);

    return zIndex
}

export { useMaxZIndex }