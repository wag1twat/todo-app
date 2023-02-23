import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "src/entities";
import { ErrorBoundary, GlobalLoaderProvider } from "src/processes";
import { FallbackTodos, FallbackTodo, FallbackPosts } from "./pages";
import theme, { MainLayout } from "src/processes/theme";
import { QueriesGuardRoute } from "src/features";
import {
    defRenderVariant,
    isRenderVariant,
    renderVariantKey
} from "src/features/ToggleRenderVariantUrlQuery/model";
import routes from "src/processes/core/routes";
import { Guards } from "shulga-app-core";

const TodosPage = React.lazy(() => import("src/pages/Todos/Todos"));
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
                                        to={
                                            routes.todosRouteWithDefaultQueries
                                                .path
                                        }
                                        replace
                                    />
                                }
                            />
                            <Route
                                path="*"
                                element={
                                    <Navigate
                                        to={
                                            routes.todosRouteWithDefaultQueries
                                                .path
                                        }
                                        replace
                                    />
                                }
                            />
                            <Route
                                path={routes.todosRoute.path}
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
                                path={routes.todoRoute.path}
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
                                path={routes.postsRoute.path}
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
