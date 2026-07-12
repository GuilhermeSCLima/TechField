"use client";

import {
  createContext,
  useCallback,
  useState,
} from "react";

import NotifyContainer, {
  NotifyData,
} from "./NotifyContainer";

import { NotifyType } from "./NotifyItem";

interface NotifyContextData {
  notify: (
    title: string,
    message: string,
    type?: NotifyType,
    duration?: number
  ) => void;
}

export const NotifyContext =
  createContext<NotifyContextData | null>(
    null
  );

export function NotifyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<
    NotifyData[]
  >([]);

  const remove = useCallback(
    (id: string) => {
      setItems((old) =>
        old.filter((x) => x.id !== id)
      );
    },
    []
  );

  const notify = useCallback(
    (
      title: string,
      message: string,
      type: NotifyType = "info",
      duration = 5000
    ) => {
      const id = crypto.randomUUID();

      setItems((old) => [
        ...old,
        {
          id,
          title,
          message,
          type,
          duration,
        },
      ]);
    },
    []
  );

  return (
    <NotifyContext.Provider
      value={{ notify }}
    >
      {children}

      <NotifyContainer
        items={items}
        remove={remove}
      />
    </NotifyContext.Provider>
  );
}