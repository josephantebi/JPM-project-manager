import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LogInUserProvider } from "./Providers/log-in-user-provider";
// import { DataProvider } from "./Providers/data-provider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LogInUserProvider>
      <QueryClientProvider client={queryClient}>
        {/* <DataProvider> */}
        <App />
        {/* </DataProvider> */}
      </QueryClientProvider>
    </LogInUserProvider>
  </React.StrictMode>
);
