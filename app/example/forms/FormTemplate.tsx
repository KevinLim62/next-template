"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { formTemplateSchema } from "@/lib/formSchema";
import InputField from "@/components/shared/InputField";
import SelectField from "@/components/shared/SelectField";
import CheckboxField from "@/components/shared/CheckboxField";
import DatePickerField from "@/components/shared/DatePickerField";
import RadioField from "@/components/shared/RadioField";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "./actions";

const FormTemplate = () => {
  // const { mutate } = useMutation({
  //   mutationKey: ['createUser'],
  //   mutationFn: (data: z.infer<typeof formTemplateSchema>) => createUser(data),
  //   onMutate: () => {
  //     console.log('On Mutate');
  //   },
  //   onError: () => {
  //     console.log('On Error');
  //   },
  //   onSuccess: (data) => {
  //     console.log('On Success')
  //   }
  // })

  // Form hook
  const form = useForm<z.infer<typeof formTemplateSchema>>({
    resolver: zodResolver(formTemplateSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      address: [
        {
          address: "",
        },
      ],
      type: "",
      notification: "",
      birthDate: new Date(),
      accept: false,
    },
  });

  //Field array hook
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: form.control, // control props comes from useForm (optional: if you are using FormProvider)
      name: "address",
    }
  );

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formTemplateSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await createUser(values);
  }

  return (
    // Uses of reuseable field components such as input, checkbox, radio group, select, date picker...
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="min-w-[800px] mt-10"
      >
        <div className="flex flex-row justify-center gap-5">
          <div className="w-full space-y-8">
            <InputField
              control={form.control}
              name="username"
              label="Username"
              placeholder="example123"
              description="This is your public display name"
            />
            <InputField
              control={form.control}
              name="password"
              label="Password"
              placeholder="#####"
              description="This is account password"
            />
            <InputField
              control={form.control}
              name="email"
              label="Email"
              placeholder="example123@gmail.com"
              description="This is user email"
            />
            <SelectField
              control={form.control}
              name="type"
              label="Account Type"
              placeholder="User / Admin / Guest"
              description="This is account type"
              selectValues={[
                {
                  label: "Guest",
                  value: "guest",
                },
                {
                  label: "User",
                  value: "user",
                },
                {
                  label: "Admin",
                  value: "admin",
                },
              ]}
            />
          </div>
          <div className="w-full space-y-8">
            <DatePickerField
              control={form.control}
              name="birthDate"
              label="Date of birth"
              placeholder="Pick a date"
              description="Your date of birth is used to calculate your age"
              className="flex flex-col gap-2"
            />
            <RadioField
              control={form.control}
              name="notification"
              label="Notify me about"
              description="Choose your notification type"
              radioValues={[
                {
                  label: "All new messages",
                  value: "all",
                },
                {
                  label: "Direct messages and mentions",
                  value: "mentions",
                },
                {
                  label: "Nothing",
                  value: "none",
                },
              ]}
            />
            {fields.map((field, index) => (
              <div key={index}>
                <InputField
                  control={form.control}
                  name={`address.${index}.address`}
                  label={`Address ${index + 1}`}
                  placeholder="Address"
                  description="This is user address"
                />
                {fields.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    size="sm"
                    variant="secondary"
                    className="ml-auto mt-1 flex"
                  >
                    DELETE
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              size="default"
              variant="default"
              className="ml-auto mt-1 flex"
              onClick={() =>
                append({
                  address: "",
                })
              }
            >
              Append
            </Button>
          </div>
        </div>
        <div className="w-1/2 space-y-5 mt-5">
          <CheckboxField
            className="flex flex-row items-start space-x-3 space-y-0 rounded-md py-4"
            control={form.control}
            name="accept"
            label="Accept terms and conditions"
            description="You agree to our Terms of Service and Privacy Policy."
          />
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default FormTemplate;
