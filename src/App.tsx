import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header, Main } from "./entities";
import { ErrorBoundary, GlobalLoaderProvider, Core } from "./processes";
import {
    FallbackAnalytics,
    FallbackTodos,
    FallbackTodo,
    FallbackPosts,
    FallbackAnalyticsErrorEvent
} from "./pages";

const TodosPage = React.lazy(() => import("./pages/Todos/Todos"));
const AnalyticsPage = React.lazy(() => import("./pages/Analytics/Analitycs"));
const AnalyticsErrorEventPage = React.lazy(
    () => import("./pages/AnalyticsErrorEvent/AnalyticsErrorEvent")
);
const TodoPage = React.lazy(() => import("./pages/Todo/Todo"));
const PostsPage = React.lazy(() => import("./pages/Posts/Posts"));

function App() {
    return (
        <ChakraProvider>
            <GlobalLoaderProvider>
                <Main>
                    <BrowserRouter>
                        <ErrorBoundary stage="development">
                            <Header />
                        </ErrorBoundary>
                        <Routes>
                            <Route
                                path={Core.route().exec()}
                                element={
                                    <ErrorBoundary stage="development">
                                        <React.Suspense
                                            fallback={<FallbackTodos />}
                                        >
                                            <TodosPage />
                                        </React.Suspense>
                                    </ErrorBoundary>
                                }
                            />

                            <Route
                                path={Core.route().todos().path().exec()}
                                element={
                                    <ErrorBoundary stage="development">
                                        <React.Suspense
                                            fallback={<FallbackTodos />}
                                        >
                                            <TodosPage />
                                        </React.Suspense>
                                    </ErrorBoundary>
                                }
                            />

                            <Route
                                path={Core.route().todo().path().exec()}
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
                                path={Core.route().analytics().path().exec()}
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
                                path={Core.route()
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
                                path={Core.route().posts().path().exec()}
                                element={
                                    <ErrorBoundary stage="development">
                                        <React.Suspense
                                            fallback={<FallbackPosts />}
                                        >
                                            <PostsPage />
                                        </React.Suspense>
                                    </ErrorBoundary>
                                }
                            />
                            <Route
                                path="*"
                                element={<Navigate to="/" replace />}
                            />
                        </Routes>
                    </BrowserRouter>
                </Main>
            </GlobalLoaderProvider>
        </ChakraProvider>
    );
}

export default App;
