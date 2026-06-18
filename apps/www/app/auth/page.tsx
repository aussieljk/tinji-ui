import { CodeBlock } from "@tinji/ui/shared/code-block";
import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "open source is the foundation of all modern software",
  title: "ui.tinji.dev auth",
};

export default function Page() {
  const initialization = `import { tinji } from '@tinji';

tinji.auth.init({
  apiKey: process.env.TINJI_KEY,
  environment: 'production', // or 'sandbox'
});`;

  const users = `// Register a new user
await tinji.auth.users.register({
  email: 'jane@example.com',
  password: 'securePassword123',
});

// Log in a user
await tinji.auth.users.login({
  email: 'jane@example.com',
  password: 'securePassword123',
});

// Retrieve user profile
await tinji.auth.users.retrieve('user_abc123');

// Update user profile
await tinji.auth.users.update('user_abc123', {
  name: 'Jane Doe',
});

// Delete user
await tinji.auth.users.delete('user_abc123');`;

  const sessions = `// Validate session token
const session = await tinji.auth.sessions.validate('session_token_123');

// Log out
await tinji.auth.sessions.logout('session_token_123');`;

  const passwordReset = `// Request password reset email
await tinji.auth.passwords.requestReset({
  email: 'jane@example.com',
});

// Confirm password reset
await tinji.auth.passwords.confirmReset({
  token: 'reset_token_123',
  newPassword: 'newSecurePassword456',
});`;

  const webhooks = `// Webhook events
tinji.auth.webhooks.on('user.registered', (event) => {
  console.log('New user registered:', event.data);
});

tinji.auth.webhooks.on('user.deleted', (event) => {
  console.log('User deleted:', event.data);
});`;

  const utilities = `// Validate webhook signature
const isValid = tinji.auth.utils.verifySignature({
  payload: req.body,
  signature: req.headers['tinji-auth-signature'],
  secret: 'whsec_auth_123',
});`;

  return (
    <main className="container mb-16 w-full flex-1 lg:mb-20">
      <div className="mx-auto mt-12 max-w-2xl text-muted-foreground lg:mt-16 [&_a:not([data-slot='button'])]:text-foreground [&_strong]:text-foreground">
        <h2 className="mt-12 scroll-m-20 font-heading font-semibold text-2xl text-foreground first:mt-0 [&+p]:mt-4! *:[code]:text-2xl">
          Initialization
        </h2>
        <CodeBlock code={initialization} copyButton={false} language="tsx" />
        <h2 className="mt-12 scroll-m-20 font-heading font-semibold text-2xl text-foreground first:mt-0 [&+p]:mt-4! *:[code]:text-2xl">
          Users
        </h2>
        <CodeBlock code={users} copyButton={false} language="tsx" />
        <h2 className="mt-12 scroll-m-20 font-heading font-semibold text-2xl text-foreground first:mt-0 [&+p]:mt-4! *:[code]:text-2xl">
          Sessions
        </h2>
        <CodeBlock code={sessions} copyButton={false} language="tsx" />
        <h2 className="mt-12 scroll-m-20 font-heading font-semibold text-2xl text-foreground first:mt-0 [&+p]:mt-4! *:[code]:text-2xl">
          Password Reset
        </h2>
        <CodeBlock code={passwordReset} copyButton={false} language="tsx" />
        <h2 className="mt-12 scroll-m-20 font-heading font-semibold text-2xl text-foreground first:mt-0 [&+p]:mt-4! *:[code]:text-2xl">
          Webhooks
        </h2>
        <CodeBlock code={webhooks} copyButton={false} language="tsx" />
        <h2 className="mt-12 scroll-m-20 font-heading font-semibold text-2xl text-foreground first:mt-0 [&+p]:mt-4! *:[code]:text-2xl">
          Utilities
        </h2>
        <CodeBlock code={utilities} copyButton={false} language="tsx" />
      </div>
    </main>
  );
}
