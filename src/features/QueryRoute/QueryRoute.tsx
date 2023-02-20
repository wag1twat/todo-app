import React from "react";
import { Queries, useQueriesGuardRoute } from "./model";

interface QueriesGuardRouteProps<K extends string> {
    queries: Queries<K>;
}

const QueriesGuardRoute = <K extends string>({
    queries,
    children
}: React.PropsWithChildren<QueriesGuardRouteProps<K>>) => {
    useQueriesGuardRoute(queries);
    return <React.Fragment>{children}</React.Fragment>;
};

export { QueriesGuardRoute };
