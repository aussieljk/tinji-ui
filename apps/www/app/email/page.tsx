import { CodeBlock } from "@tinji/ui/shared/code-block";
import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "open source is the foundation of all modern software",
  title: "ui.tinji.dev email",
};

export default function Page() {
  const initialization = `import { tinji } from '@tinji';

tinji.email.init({
  apiKey: process.env.TINJI_KEY,
  environment: 'production', // or 'sandbox'
});`;

  const sendingEmails = `// Send a transactional email
await tinji.email.send({
  from: 'noreply@yourapp.com',
  to: 'user@example.com',
  subject: 'Welcome to Our App!',
  text: 'Thanks for signing up.',
  html: '<p>Thanks for signing up.</p>',
});`;

  const domains = `// Create and verify a sending domain
await tinji.email.domains.create({
  domain: 'yourapp.com',
});

// List verified domains
await tinji.email.domains.list();

// Delete a domain
await tinji.email.domains.delete('domain_abc123');`;

  const templates = `// Create an email template
await tinji.email.templates.create({
  name: 'Welcome Template',
  subject: 'Welcome!',
  html: '<h1>Welcome {{name}}</h1>',
});

// Retrieve a template
await tinji.email.templates.retrieve('tmpl_abc123');

// Update a template
await tinji.email.templates.update('tmpl_abc123', {
  html: '<h1>Hello {{name}}!</h1>',
});

// Delete a template
await tinji.email.templates.delete('tmpl_abc123');`;

  const webhooks = `// Webhook events
tinji.email.webhooks.on('email.delivered', (event) => {
  console.log('Email delivered:', event.data);
});

tinji.email.webhooks.on('email.bounced', (event) => {
  console.log('Email bounced:', event.data);
});`;

  const utilities = `// Validate webhook signature
const isValid = tinji.email.utils.verifySignature({
  payload: req.body,
  signature: req.headers['tinji-email-infra-signature'],
  secret: 'whsec_email_123',
});`;

  return (
    <main className="container mb-16 w-full flex-1 lg:mb-20">
      <div className="mx-auto mt-12 max-w-2xl text-muted-foreground lg:mt-16 [&_a:not([data-slot='button'])]:text-foreground [&_strong]:text-foreground">
        <h2 className="mt-12 scroll-m-20 font-heading font-semibold text-2xl text-foreground first:mt-0 [&+p]:mt-4! *:[code]:text-2xl">
          Initialization
        </h2>
        <CodeBlock code={initialization} copyButton={false} language="tsx" />
        <h2 className="mt-12 scroll-m-20 font-heading font-semibold text-2xl text-foreground first:mt-0 [&+p]:mt-4! *:[code]:text-2xl">
          Sending Emails
        </h2>
        <CodeBlock code={sendingEmails} copyButton={false} language="tsx" />
        <h2 className="mt-12 scroll-m-20 font-heading font-semibold text-2xl text-foreground first:mt-0 [&+p]:mt-4! *:[code]:text-2xl">
          Domains
        </h2>
        <CodeBlock code={domains} copyButton={false} language="tsx" />
        <h2 className="mt-12 scroll-m-20 font-heading font-semibold text-2xl text-foreground first:mt-0 [&+p]:mt-4! *:[code]:text-2xl">
          Templates
        </h2>
        <CodeBlock code={templates} copyButton={false} language="tsx" />
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
