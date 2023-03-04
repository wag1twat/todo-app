import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "src/entities";
import { ErrorBoundary, GlobalLoaderProvider } from "src/processes";
import { FallbackTodos, FallbackTodo, FallbackPosts } from "./pages";
import theme, { MainLayout } from "src/processes/theme";
import routes from "src/processes/core/routes";

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
                                            <TodosPage />
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
                                            <PostsPage />
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
