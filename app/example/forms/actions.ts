import { formTemplateSchema } from "@/lib/formSchema";
import { z } from "zod";

export async function createUser(payload: z.infer<typeof formTemplateSchema>) {
  const body = JSON.stringify({
    data: payload,
    url: "/orders",
    method: "POST",
  });

  try {
    const res = await fetch("/api/proxy", {
      body: body,
      method: "POST",
    });
    return await res.json();
  } catch (error: any) {
    return { error: error.message };
  }
}
