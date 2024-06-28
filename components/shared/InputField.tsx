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
import { Input } from "../ui/input";

type InputFields<T extends Record<string, any>, K extends Path<T>> = {
  control: Control<T>;
  name: K;
  label: string;
  placeholder: string;
  description: string;
  className?: string;
};

const InputField = <T extends Record<string, any>, K extends Path<T>>({
  control,
  name,
  label,
  description,
  placeholder,
  className,
}: InputFields<T, K>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
