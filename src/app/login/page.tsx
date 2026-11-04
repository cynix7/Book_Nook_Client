"use client";

import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function LogInPage() {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form).entries());
    const password = formData.password as string;

    
    if (!/[A-Z]/.test(password)) {
      toast.error("Must have an Uppercase letter in the password");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Must have a Lowercase letter in the password");
      return;
    }
    if (password.length < 8) {
      toast.error("Length must be at least 8 characters");
      return;
    }

    const {data, error} = await authClient.signIn.email({
      ...formData as {email: string; password: string },
    })
    if(data) {
      toast.success("Login successful");
      redirect("/");
    }
    if(error) {
      toast.error(error.message || "An error occurred during login");
      return;
    }

  }

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit}>
        <FieldGroup className="mx-auto max-w-sm">

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              
            />
          </Field>
          <Field orientation="horizontal">
            <Button type="submit">Login</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
