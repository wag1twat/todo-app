import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header, Main } from "./entities";
import { ErrorBoundary, ProcessCheck, RoutesManager } from "./processes";
import { FallbackAnalytics, FallbackTodos, FallbackTodo } from "./pages";

const TodosPage = React.lazy(() => import("./pages/Todos/Todos"));
const AnalyticsPage = React.lazy(() => import("./pages/Analytics/Analitycs"));
const TodoPage = React.lazy(() => import("./pages/Todo/Todo"));

function App() {
    return (
        <ChakraProvider>
            <Main>
                <BrowserRouter>
                    <Header />
                    <ErrorBoundary stage="development">
                        <ProcessCheck />
                    </ErrorBoundary>
                    <Routes>
                        <Route
                            path="/"
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
                            path={RoutesManager.todosManager.todos.route}
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
                            path={RoutesManager.todosManager.todo.route()}
                            element={
                                <ErrorBoundary stage="development">
                                    <React.Suspense fallback={<FallbackTodo />}>
                                        <TodoPage />
                                    </React.Suspense>
                                </ErrorBoundary>
                            }
                        />

                        <Route
                            path={
                                RoutesManager.analyticsManager.analytics.route
                            }
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
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </BrowserRouter>
            </Main>
        </ChakraProvider>
    );
}

export default App;
