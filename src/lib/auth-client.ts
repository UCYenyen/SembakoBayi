import { createAuthClient } from "better-auth/react";
import { phoneNumberClient, adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL as string,
  secret: process.env.BETTER_AUTH_SECRET as string,
  plugins: [phoneNumberClient(),adminClient()],
});
