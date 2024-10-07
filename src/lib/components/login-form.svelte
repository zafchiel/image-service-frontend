<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { LoginSchema } from "$lib/auth-schema";
  import { Label } from "./ui/label";
  import { Button } from "./ui/button";
  import * as v from "valibot";

  let formData = $state({
    email: "",
    password: "",
  });

  let errors = $state<Record<string, string> | null>(null);
  let submitted = $state(false);

  function validateForm() {
    const result = v.safeParse(LoginSchema, formData);

    if (result.success) {
      errors = null;
      console.log("Form submitted:", result.output);
    } else {
      errors = result.issues.reduce(
        (acc, issue) => {
          if (issue?.path) {
            acc[issue.path[0].key as string] = issue.message;
          }
          return acc;
        },
        {} as Record<string, string>,
      );
    }
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    submitted = true;

    const result = v.safeParse(LoginSchema, formData);

    if (!result.success) {
      console.error(result.issues);
      return;
    }

    const { email, password } = result.output;

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        console.log(res)
        throw new Error("Failed to login, error: " + res.statusText);
      }

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  $effect(() => {
    if (submitted) {
      validateForm();
    }
  });
</script>

{#snippet errorMessage(msg: string)}
  <p class="text-red-500 text-xs">{msg}</p> 
{/snippet}

<form method="POST" onsubmit={handleSubmit} class="space-y-2">
  <Label for="email">Email</Label>
  <Input
    type="email"
    id="email"
    name="email"
    required
    aria-invalid={!!errors?.email}
    bind:value={formData.email}
  />
  {#if errors?.email}
    {@render errorMessage(errors.email)}
  {/if}

  <Label for="password">Password</Label>
  <Input
    type="password"
    id="password"
    name="password"
    required
    aria-invalid={!!errors?.password}
    bind:value={formData.password}
  />
  {#if errors?.password}
    {@render errorMessage(errors.password)}
  {/if}

  <Button type="submit">Login</Button>
</form>
