import React from "react";
import { Heading } from "@chakra-ui/react";
import { Layout } from "../../shared";

const Analytics = () => {
    return (
        <Layout>
            <Heading>Analytics</Heading>
        </Layout>
    );
};

const FallbackAnalytics = () => {
    return (
        <Layout>
            <Heading>Analytics</Heading>
        </Layout>
    );
};

export { FallbackAnalytics };
export default Analytics;
