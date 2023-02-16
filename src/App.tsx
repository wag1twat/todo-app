import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header, Main } from "./entities";
import { ErrorBoundary, ProcessCheck, RoutesManager } from "./processes";
import { FallbackAnalytics, FallbackTodos } from "./pages";

const TodosPage = React.lazy(() => import("./pages/Todos/Todos"));
const AnalyticsPage = React.lazy(() => import("./pages/Analytics/Analitycs"));

function App() {
    return (
        <ChakraProvider>
            <Main>
                <Header />
                <ErrorBoundary stage="development">
                    <ProcessCheck />
                </ErrorBoundary>
                <BrowserRouter>
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
                            path={RoutesManager.todos}
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
                            path={RoutesManager.analytics}
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
