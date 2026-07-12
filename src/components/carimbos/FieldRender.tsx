"use client";

import { useMemo, useState } from "react";
import { Field } from "./types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  field: Field;
  value: string;
  onChange: (value: string) => void;
}

export function FieldRenderer({ field, value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const suggestions = useMemo(() => {
    if (
      field.type !== "text" ||
      !field.autocomplete ||
      value.trim() === ""
    ) {
      return [];
    }

    return field.autocomplete.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
  }, [field, value]);

  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium">
        {field.label}
      </label>

      {field.type === "text" && (
        <div className="relative">
          <Input
            value={value}
            placeholder={field.placeholder}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            onChange={(e) => {
              onChange(e.target.value);
              setOpen(true);
            }}
          />

          {open && suggestions.length > 0 && (
            <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-md border bg-background shadow-lg">
              {suggestions.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="block w-full px-3 py-2 text-left text-sm hover:bg-accent transition-colors"
                  onMouseDown={() => onChange(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {field.type === "textarea" && (
        <Textarea
          value={value}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-32"
        />
      )}

      {field.type === "select" && (
        <Select
          value={value}
          onValueChange={onChange}
        >
          <SelectTrigger>
            <SelectValue placeholder={`Selecione ${field.placeholder}`} />
          </SelectTrigger>

          <SelectContent>
            {(field.selectItens ?? []).map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}