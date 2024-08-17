import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, FC } from "react";

const queryClient = new QueryClient();

const QueryProvider: FC<{ children: ReactNode }> = ({
  children,
}): ReactNode => (
  <QueryClientProvider
    client={queryClient}
    children={children}
  />
);

export default QueryProvider;
