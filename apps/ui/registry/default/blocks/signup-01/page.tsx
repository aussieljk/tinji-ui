"use client";

import { GalleryVerticalEndIcon } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/registry/default/ui/card";
import { Checkbox } from "@/registry/default/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Form } from "@/registry/default/ui/form";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";

export default function Page() {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <GalleryVerticalEndIcon aria-hidden="true" className="size-5" />
          </div>
          <span className="font-semibold">Acme Inc</span>
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Create your account</CardTitle>
            <CardDescription>
              Get started for free. No credit card required.
            </CardDescription>
          </CardHeader>
          <CardPanel>
            <Form className="flex flex-col gap-6" onSubmit={onSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <Field name="firstName">
                  <FieldLabel>First name</FieldLabel>
                  <Input
                    autoComplete="given-name"
                    placeholder="Olivia"
                    required
                    type="text"
                  />
                  <FieldError>Required.</FieldError>
                </Field>
                <Field name="lastName">
                  <FieldLabel>Last name</FieldLabel>
                  <Input
                    autoComplete="family-name"
                    placeholder="Martin"
                    required
                    type="text"
                  />
                  <FieldError>Required.</FieldError>
                </Field>
              </div>
              <Field name="email">
                <FieldLabel>Email</FieldLabel>
                <Input
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  type="email"
                />
                <FieldError>Please enter a valid email.</FieldError>
              </Field>
              <Field name="password">
                <FieldLabel>Password</FieldLabel>
                <Input
                  autoComplete="new-password"
                  minLength={8}
                  placeholder="••••••••"
                  required
                  type="password"
                />
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
                <FieldError match="tooShort">
                  Password must be at least 8 characters.
                </FieldError>
                <FieldError match="valueMissing">
                  Please enter a password.
                </FieldError>
              </Field>
              <Field name="terms">
                <Label>
                  <Checkbox name="terms" required />I agree to the Terms and
                  Privacy Policy.
                </Label>
              </Field>
              <Button loading={loading} type="submit">
                Create account
              </Button>
            </Form>
          </CardPanel>
        </Card>
        <p className="text-center text-muted-foreground text-sm">
          Already have an account?{" "}
          <a
            className="text-foreground underline underline-offset-4"
            href="#login"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
