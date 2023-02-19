import { Text } from "@chakra-ui/react";
import { AnalitycsErrorEvent, Core } from "../../processes";
import { Paper } from "../../shared";

interface AnalyticsErrorWidgetProps {
    event: (AnalitycsErrorEvent & { key: string }) | undefined;
}

const AnalyticsErrorWidget: React.FC<AnalyticsErrorWidgetProps> = ({
    event
}) => {
    if (event === undefined) {
        return null;
    }

    const { key, name, message, stack } = event;

    return (
        <Paper p={4}>
            <Text>
                {Core.analytics().getDateTime(key)?.toLocaleString({
                    dateStyle: "medium",
                    timeStyle: "medium"
                })}
            </Text>
            {[name, message, stack].map((value, index) => {
                return (
                    <Text key={index} whiteSpace="pre-line">
                        {value.trim()}
                    </Text>
                );
            })}
        </Paper>
    );
};

export { AnalyticsErrorWidget };
