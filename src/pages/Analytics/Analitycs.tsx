import React from "react";
import { Stack, Text } from "@chakra-ui/react";

const Analytics = () => {
    return <div>Analytics</div>;
};

const FallbackAnalytics = () => {
    return (
        <Stack>
            <Text>Analytics</Text>
        </Stack>
    );
};

export { FallbackAnalytics };
export default Analytics;
