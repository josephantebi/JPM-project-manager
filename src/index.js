import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LogInUserProvider } from "./Providers/log-in-user-provider";
import { UserDataProvider } from "./Providers/DataProvider";

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
        <UserDataProvider>
          <App />
        </UserDataProvider>
        {/* </DataProvider> */}
      </QueryClientProvider>
    </LogInUserProvider>
  </React.StrictMode>
);
