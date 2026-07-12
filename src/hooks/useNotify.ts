"use client";

import { useContext } from "react";
import { NotifyContext } from "../components/notify/NotifyProvider";

export function useNotify() {
  const context = useContext(NotifyContext);

  if (!context) {
    throw new Error(
      "useNotify deve ser utilizado dentro de NotifyProvider"
    );
  }

  return context;
}