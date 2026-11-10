import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "@/lib/auth"

// `inferAdditionalFields<typeof auth>()` lets the client know about the
// additional user fields (e.g. `role`) configured in lib/auth.ts
export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [inferAdditionalFields<typeof auth>()],
})

export const { signIn, signUp, useSession } = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
})
