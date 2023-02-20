import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./entities";
import {
    ErrorBoundary,
    GlobalLoaderProvider,
    Guards,
    route
} from "./processes";
import {
    FallbackAnalytics,
    FallbackTodos,
    FallbackTodo,
    FallbackPosts,
    FallbackAnalyticsErrorEvent
} from "./pages";
import theme, { MainLayout } from "./processes/theme";
import { QueriesGuardRoute } from "./features";
import {
    defRenderVariant,
    isRenderVariant,
    renderVariantKey
} from "./features/ToggleRenderVariantUrlQuery/model";

const TodosPage = React.lazy(() => import("./pages/Todos/Todos"));
const AnalyticsPage = React.lazy(() => import("./pages/Analytics/Analitycs"));
const AnalyticsErrorEventPage = React.lazy(
    () => import("./pages/AnalyticsErrorEvent/AnalyticsErrorEvent")
);
const TodoPage = React.lazy(() => import("./pages/Todo/Todo"));
const PostsPage = React.lazy(() => import("./pages/Posts/Posts"));

function App() {
    return (
        <ChakraProvider theme={theme}>
            <GlobalLoaderProvider>
                <BrowserRouter>
                    <ErrorBoundary stage="development">
                        <Header />
                    </ErrorBoundary>
                    <MainLayout>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Navigate
                                        to={route()
                                            .todos()
                                            .path()
                                            .query({
                                                renderVariant: defRenderVariant
                                            })
                                            .exec()}
                                        replace
                                    />
                                }
                            />
                            <Route
                                path="*"
                                element={
                                    <Navigate
                                        to={route()
                                            .todos()
                                            .path()
                                            .query({
                                                renderVariant: defRenderVariant
                                            })
                                            .exec()}
                                        replace
                                    />
                                }
                            />
                            <Route
                                path={route().todos().path().exec()}
                                element={
                                    <ErrorBoundary stage="development">
                                        <React.Suspense
                                            fallback={<FallbackTodos />}
                                        >
                                            <QueriesGuardRoute
                                                queries={{
                                                    [renderVariantKey]: {
                                                        def: defRenderVariant,
                                                        guard: (value) =>
                                                            isRenderVariant(
                                                                value
                                                            )
                                                    }
                                                }}
                                            >
                                                <TodosPage />
                                            </QueriesGuardRoute>
                                        </React.Suspense>
                                    </ErrorBoundary>
                                }
                            />

                            <Route
                                path={route().todo().path().exec()}
                                element={
                                    <ErrorBoundary stage="development">
                                        <React.Suspense
                                            fallback={<FallbackTodo />}
                                        >
                                            <TodoPage />
                                        </React.Suspense>
                                    </ErrorBoundary>
                                }
                            />

                            <Route
                                path={route().analytics().path().exec()}
                                element={
                                    <ErrorBoundary stage="development">
                                        <React.Suspense
                                            fallback={<FallbackAnalytics />}
                                        >
                                            <AnalyticsPage />
                                        </React.Suspense>
                                    </ErrorBoundary>
                                }
                            />

                            <Route
                                path={route()
                                    .analyticsErrorEvent()
                                    .path()
                                    .exec()}
                                element={
                                    <ErrorBoundary stage="development">
                                        <React.Suspense
                                            fallback={
                                                <FallbackAnalyticsErrorEvent />
                                            }
                                        >
                                            <AnalyticsErrorEventPage />
                                        </React.Suspense>
                                    </ErrorBoundary>
                                }
                            />

                            <Route
                                path={route().posts().path().exec()}
                                element={
                                    <ErrorBoundary stage="development">
                                        <React.Suspense
                                            fallback={<FallbackPosts />}
                                        >
                                            <QueriesGuardRoute
                                                queries={{
                                                    _start: {
                                                        def: "0",
                                                        guard: (value) =>
                                                            Guards.isNumber(
                                                                Number(value)
                                                            )
                                                    },
                                                    _limit: {
                                                        def: "5",
                                                        guard: (value) =>
                                                            Guards.isNumber(
                                                                Number(value)
                                                            )
                                                    }
                                                }}
                                            >
                                                <PostsPage />
                                            </QueriesGuardRoute>
                                        </React.Suspense>
                                    </ErrorBoundary>
                                }
                            />
                        </Routes>
                    </MainLayout>
                </BrowserRouter>
            </GlobalLoaderProvider>
        </ChakraProvider>
    );
}

export default App;
