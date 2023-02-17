import { IconButton, Icon } from "@chakra-ui/react";
import { BarsOutlined, AppstoreOutlined } from "@ant-design/icons";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import React, { useTransition } from "react";

const views = ["card", "list"] as const;

type Views = typeof views[number];

const useViewsQueries = () => {
    return {
        queries: views.reduce<Record<Views, string>>((acc, view) => {
            return { ...acc, [view]: `?view=${view}` };
        }, {} as Record<Views, string>)
    };
};

const useValidateView = () => {
    const viewsQueries = useViewsQueries();
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const view = searchParams.get("view");

    const validate = React.useCallback(() => {
        return view === null || !views.includes(view as Views)
            ? null
            : (view as Views);
    }, [view]);

    const correctView = React.useMemo(() => validate(), [validate]);

    React.useEffect(() => {
        if (correctView === null) {
            navigate(location.pathname + viewsQueries.queries.list, {
                replace: true
            });
        }
    }, [correctView, location.pathname]);

    return correctView;
};

const ToggleView = () => {
    const [isPending, startTransition] = useTransition();
    const viewsQueries = useViewsQueries();
    const view = useValidateView();
    const location = useLocation();
    const navigate = useNavigate();

    const toggle = React.useCallback(() => {
        if (view) {
            const index = views.indexOf(view);

            if (index >= views.length - 1) {
                navigate({
                    pathname: location.pathname,
                    search: viewsQueries.queries[views[0]]
                });

                return;
            }

            navigate({
                pathname: location.pathname,
                search: viewsQueries.queries[views[index + 1]]
            });

            return;
        }
    }, [view, location.pathname]);

    if (view === "card") {
        return (
            <IconButton
                size="sm"
                aria-label="Switch list view"
                onClick={() => {
                    startTransition(() => toggle());
                }}
                isDisabled={isPending}
            >
                <Icon as={AppstoreOutlined} />
            </IconButton>
        );
    }

    if (view === "list") {
        return (
            <IconButton
                size="sm"
                aria-label="Switch list view"
                onClick={() => {
                    startTransition(() => toggle());
                }}
                isDisabled={isPending}
            >
                <Icon as={BarsOutlined} />
            </IconButton>
        );
    }

    return null;
};

export { views, useValidateView, useViewsQueries, ToggleView };
