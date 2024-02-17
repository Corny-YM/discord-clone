import qs from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useSocket } from "@/components/providers/socket-provider";

interface ChatQueryProps {
  queryKey: string;
  apiUrl: string;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
}

export const useChatQuery = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue,
}: ChatQueryProps) => {
  const { isConnected } = useSocket();

  const fetchMessages = async ({ pageParam = undefined }) => {
    const url = qs.stringifyUrl(
      {
        url: apiUrl,
        query: {
          cursor: pageParam,
          [paramKey]: paramValue,
        },
      },
      {
        skipNull: true,
      }
    );

    const res = await fetch(url);
    return res.json();
  };

  const {
    data,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    fetchNextPage,
  } = useInfiniteQuery({
    refetchInterval: isConnected ? false : 1000,
    initialPageParam: undefined,
    queryKey: [queryKey],
    queryFn: fetchMessages,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
  });

  return {
    data,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    fetchNextPage,
  };
};
