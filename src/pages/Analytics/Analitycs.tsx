import React from "react";
import { Heading, Stack } from "@chakra-ui/react";
import { AnalitycsTable } from "../../entities";
import { Core } from "../../processes";
import { ContentLayout } from "../../processes/theme";

const Analytics = () => {
    const [errorEvents] = React.useState(() =>
        Core.analytics().getErrorEvents()
    );

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
