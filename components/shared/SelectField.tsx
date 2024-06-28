"use client";

import { Control, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectFields<T extends Record<string, any>, K extends Path<T>> = {
  control: Control<T>;
  name: K;
  label: string;
  placeholder: string;
  description: string;
  selectValues: {
    label: string;
    value: string;
  }[];
  className?: string;
};

const SelectField = <T extends Record<string, any>, K extends Path<T>>({
  control,
  name,
  label,
  description,
  placeholder,
  selectValues,
  className,
}: SelectFields<T, K>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {selectValues.map((select) => (
                <SelectItem
                  key={`${select.label}-${select.value}`}
                  value={select.value}
                >
                  {select.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectField;
