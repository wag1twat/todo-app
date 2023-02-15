import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header, Main } from "./entities";
import { Analytics, Todos } from "./pages";
import { ErrorBoundary, ProcessCheck, RoutesManager } from "./processes";

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
                                    <Todos />
                                </ErrorBoundary>
                            }
                        />

                        <Route
                            path={RoutesManager.todos}
                            element={
                                <ErrorBoundary stage="development">
                                    <Todos />
                                </ErrorBoundary>
                            }
                        />

                        <Route
                            path={RoutesManager.analytics}
                            element={
                                <ErrorBoundary stage="development">
                                    <Analytics />
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
