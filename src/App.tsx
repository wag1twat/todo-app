import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "src/entities";
import {
    ErrorBoundary,
    GlobalLoaderProvider,
    Guards,
    route
} from "src/processes";
import {
    FallbackAnalytics,
    FallbackTodos,
    FallbackTodo,
    FallbackPosts,
    FallbackAnalyticsErrorEvent
} from "./pages";
import theme, { MainLayout } from "src/processes/theme";
import { QueriesGuardRoute } from "src/features";
import {
    defRenderVariant,
    isRenderVariant,
    renderVariantKey
} from "src/features/ToggleRenderVariantUrlQuery/model";

const TodosPage = React.lazy(() => import("src/pages/Todos/Todos"));
const AnalyticsPage = React.lazy(() => import("src/pages/Analytics/Analitycs"));
const AnalyticsErrorEventPage = React.lazy(
    () => import("src/pages/AnalyticsErrorEvent/AnalyticsErrorEvent")
);
const TodoPage = React.lazy(() => import("src/pages/Todo/Todo"));
const PostsPage = React.lazy(() => import("src/pages/Posts/Posts"));

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
