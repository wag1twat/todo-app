import React from "react";
import { Heading, Stack } from "@chakra-ui/react";
import { Layout } from "../../shared";
import { Managers } from "../../processes";
import { AnalitycsTable } from "../../entities";

const Analytics = () => {
    const [errorEvents] = React.useState(() =>
        Managers.analytics().getErrorEvents()
    );

    return (
        <Layout>
            <Stack width="100%" spacing={4}>
                <Heading>Analytics</Heading>
                <AnalitycsTable events={errorEvents} />
            </Stack>
        </Layout>
    );
};

const FallbackAnalytics = () => {
    return (
        <Layout>
            <Stack width="100%" spacing={4}>
                <Heading>Analytics</Heading>
            </Stack>
        </Layout>
    );
};

export { FallbackAnalytics };
export default Analytics;
