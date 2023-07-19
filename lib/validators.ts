import {z} from "zod";

export const promptValidator = z.object({
    prompt: z.string().min(1, "Prompt is required."),
});
export type PromptValidator = z.infer<typeof promptValidator>;