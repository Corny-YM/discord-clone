"use client";

import { QueryClientProvider, useQueryClient } from "@tanstack/react-query";

interface Props {
  children: React.ReactNode;
}

const QueryProvider = ({ children }: Props) => {
  //   const [queryClient] = useState(() => new QueryClient());
  const queryClient = useQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
