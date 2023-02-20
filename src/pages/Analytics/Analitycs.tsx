import React from "react";
import { Heading, Stack } from "@chakra-ui/react";
import { analytics } from "src/processes";
import { ContentLayout } from "src/processes/theme";
import { AnalitycsTable } from "src/entities";

const Analytics = () => {
    const [errorEvents] = React.useState(() => analytics().getErrorEvents());

    return (
        <ContentLayout>
            <Stack width="100%" spacing={4}>
                <Heading>Analytics</Heading>
                <AnalitycsTable events={errorEvents} />
            </Stack>
        </ContentLayout>
    );
};

const FallbackAnalytics = () => {
    return (
        <ContentLayout>
            <Stack width="100%" spacing={4}>
                <Heading>Analytics</Heading>
            </Stack>
        </ContentLayout>
    );
};

export { FallbackAnalytics };
export default Analytics;
