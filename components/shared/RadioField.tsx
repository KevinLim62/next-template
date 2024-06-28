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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type RadioFields<T extends Record<string, any>, K extends Path<T>> = {
  control: Control<T>;
  name: K;
  label: string;
  description: string;
  radioValues: {
    label: string;
    value: string;
  }[];
  className?: string;
};

const RadioField = <T extends Record<string, any>, K extends Path<T>>({
  control,
  name,
  label,
  description,
  radioValues,
  className,
}: RadioFields<T, K>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {radioValues.map((radio) => (
                <FormItem
                  key={`${radio.label}-${radio.value}`}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={radio.value} />
                  </FormControl>
                  <FormLabel className="font-normal">{radio.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RadioField;
