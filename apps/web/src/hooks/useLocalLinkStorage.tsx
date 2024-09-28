import { useState, useEffect } from "react";
import { LocalLink } from "../types";

export function useLocalLinkStorage(): [
  LocalLink[],
  {
    add: (link: LocalLink) => void;
    remove: (txHash: string) => void;
    update: (link: LocalLink) => void;
    list: () => LocalLink[];
  },
] {
  const key = "peanut-links";
  const initialValue: LocalLink[] = [];

  const list = () => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    }
    return initialValue;
  };

  // Get the initial value from localStorage or use the initialValue
  const [links, setLinks] = useState<LocalLink[]>(() => {
    return list();
  });

  // Update localStorage whenever links change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(links));
    }
  }, [links]);

  // Function to add a new link
  const add = (newLink: LocalLink) => {
    setLinks((prevLinks) => [...prevLinks, newLink]);
  };

  // Function to remove a link by txHash
  const remove = (txHash: string) => {
    setLinks((prevLinks) => prevLinks.filter((link) => link.txHash !== txHash));
  };

  // Function to update a link
  const update = (updatedLink: LocalLink) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.txHash === updatedLink.txHash ? updatedLink : link,
      ),
    );
  };

  return [links, { add, remove, update, list }];
}
