"use client";

import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form).entries());
    const password = formData.password as string;
     
    console.log("Form Data:", formData);

    
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

    const {data, error} = await authClient.signUp.email({
      ...formData as { name: string; imageUrl: string; email: string; password: string },
    })
    if(data) {
      toast.success("Account created successfully");
      redirect("/login");
    }
    if(error) {
      toast.error("error: " + error.message);
      return;
    }

  }

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit}>
        <FieldGroup className="mx-auto max-w-sm">
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input id="name" name="name" placeholder="Jordan Lee" />
          </Field>
          <Field>
            <FieldLabel htmlFor="imageUrl">Image URL</FieldLabel>
            <Input
              id="imageUrl"
              name="image"
              placeholder="https://example.com/image.jpg"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
            />
            <FieldDescription>
              We&apos;ll send updates to this address.
            </FieldDescription>
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
            <Button type="submit">Submit</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
