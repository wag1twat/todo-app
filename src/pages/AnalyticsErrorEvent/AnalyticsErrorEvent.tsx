import { Heading, Stack } from "@chakra-ui/react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { analytics, route } from "../../processes";
import { ContentLayout } from "../../processes/theme";
import { AnalyticsErrorWidget } from "../../widgets";

const AnalyticsErrorEvent = () => {
    const { key } = useParams();

    const navigate = useNavigate();

    const [event] = React.useState(() => analytics().getErrorEvent(key));

    React.useEffect(() => {
        if (event === undefined) {
            navigate(route().analytics().link().exec());
        }
    }, [event]);
    return (
        <ContentLayout>
            <Stack spacing={4}>
                <Heading>{event?.name}</Heading>
                <AnalyticsErrorWidget event={event} />
            </Stack>
        </ContentLayout>
    );
};

const FallbackAnalyticsErrorEvent = () => {
    return (
        <ContentLayout>
            <Stack spacing={4}>
                <Heading>Event</Heading>
            </Stack>
        </ContentLayout>
    );
};

export { FallbackAnalyticsErrorEvent };
export default AnalyticsErrorEvent;
