import { Heading, Stack } from "@chakra-ui/react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Core } from "../../processes";
import { Layout } from "../../shared";
import { AnalyticsErrorWidget } from "../../widgets";

const AnalyticsErrorEvent = () => {
    const { key } = useParams();

    const navigate = useNavigate();

    const [event] = React.useState(() => Core.analytics().getErrorEvent(key));

    React.useEffect(() => {
        if (event === undefined) {
            navigate(Core.route().analytics().link().exec());
        }
    }, [event]);
    return (
        <Layout>
            <Stack spacing={4}>
                <Heading>{event?.name}</Heading>
                <AnalyticsErrorWidget event={event} />
            </Stack>
        </Layout>
    );
};

const FallbackAnalyticsErrorEvent = () => {
    return (
        <Layout>
            <Stack spacing={4}>
                <Heading>Event</Heading>
            </Stack>
        </Layout>
    );
};

export { FallbackAnalyticsErrorEvent };
export default AnalyticsErrorEvent;
