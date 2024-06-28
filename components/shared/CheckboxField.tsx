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
import { Checkbox } from "@/components/ui/checkbox";

type CheckboxFields<T extends Record<string, any>, K extends Path<T>> = {
  control: Control<T>;
  name: K;
  label: string;
  description: string;
  className?: string;
};

const CheckboxField = <T extends Record<string, any>, K extends Path<T>>({
  control,
  name,
  label,
  description,
  className,
}: CheckboxFields<T, K>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CheckboxField;
