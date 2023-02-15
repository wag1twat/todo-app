import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./entities";
import { Analytics, Todos } from "./pages";
import { ErrorBoundary, ProcessCheck, RoutesManager } from "./processes";

function App() {
    return (
        <ChakraProvider>
            <ErrorBoundary stage="development">
                <ProcessCheck />
            </ErrorBoundary>
            <main>
                <Header />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Todos />} />
                        <Route path={RoutesManager.todos} element={<Todos />} />
                        <Route
                            path={RoutesManager.analytics}
                            element={<Analytics />}
                        />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </BrowserRouter>
            </main>
        </ChakraProvider>
    );
}

export default App;
