import React from "react";
import "./style.css";
import Router from "./routes";
import Toast from "./components/Toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toast />
    </QueryClientProvider>
  );
}

export default App;
