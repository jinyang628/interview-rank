import z from "zod";

export const injectButtonRequestSchema = z.object({
  injectedScript: z.function(),
});

export type InjectButtonRequest = z.infer<typeof injectButtonRequestSchema>;
