import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const client = new QueryClient();

// React.StrictMode при дев окружении рендерит /App два раза

root.render(
    <React.StrictMode>
        <QueryClientProvider client={client}>
            <App />
        </QueryClientProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
