"use client";

import NotifyItem, {
  NotifyType,
} from "./NotifyItem";

export interface NotifyData {
  id: string;
  title: string;
  message: string;
  type: NotifyType;
  duration: number;
}

interface NotifyContainerProps {
  items: NotifyData[];
  remove: (id: string) => void;
}

export default function NotifyContainer({
  items,
  remove,
}: NotifyContainerProps) {
  return (
    <div
      className="
        fixed
        bottom-6
        right-6
        z-[9999]
        flex
        flex-col
        gap-3
      "
    >
      {items.map((item) => (
        <NotifyItem
          key={item.id}
          {...item}
          onClose={remove}
        />
      ))}
    </div>
  );
}