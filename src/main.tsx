import * as ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

async function deferRender() {
  const { worker } = await import("./msw/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
      retryOnMount: false,
    },
    mutations: {
      onError: (error) => {
        console.log(error);
      },
    },
  },
});

deferRender().then(() => {
  root.render(
    <QueryClientProvider client={queryClient}>
      <ToastContainer theme="dark" />
      <CssBaseline />
      <App />
    </QueryClientProvider>
  );
});
