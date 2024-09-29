import { Deposit } from "@peanut/webkit";
import { UseQueryResult } from "@tanstack/react-query";
import { _getLocalLink } from "~/src/helpers";
import { list } from "~/src/hooks/useLocalLinkStorage";

export const combine = (results: UseQueryResult<Deposit[], Error>[]) => {
  const filteredData = results
    .flatMap((result) => result.data ?? [])
    .filter((item): item is Deposit => item !== undefined)
    .sort((a, b) => b.timestamp - a.timestamp)
    .map((item) => {
      const localLink = list().find((link) => {
        try {
          const url = new URL(link.link);
          const linkId = url.searchParams.get("i");
          return linkId === item.id;
        } catch (error) {
          console.error("Invalid URL:", link.link);
          return false;
        }
      });

      if (localLink) {
        localLink.link = _getLocalLink(localLink?.link);
      }

      return {
        ...item,
        localLink,
      };
    });

  return {
    data: filteredData,
    loading: results.some((result) => result.isLoading),
  };
};
