<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { Label } from "./ui/label";
  import { RegisterSchema } from "$lib/auth-schema";
  import { Button } from "./ui/button";
  import * as v from "valibot";

  let formData = $state({
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  });

  let errors = $state<Record<string, string> | null>(null);
  let submitted = $state(false);

  function validateForm() {
    const result = v.safeParse(RegisterSchema, formData);

    if (result.success) {
      errors = null;
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

    const result = v.safeParse(RegisterSchema, formData);

    if (!result.success) {
      console.error(result.issues);
      return;
    }

    const { email, username, password } = result.output;

    try {
      const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        body: JSON.stringify({ email, username, password }),
      });

      if (!res.ok) {
        throw new Error("Failed to register, error: " + res.statusText);
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
    aria-invalid="true"
    bind:value={formData.email}
  />
  {#if errors?.email}
    {@render errorMessage(errors.email)}
  {/if}

  <Label for="username">Username</Label>
  <Input
    type="text"
    id="username"
    name="username"
    required
    bind:value={formData.username}
  />
  {#if errors?.username}
    {@render errorMessage(errors.username)}
  {/if}

  <Label for="password">Password</Label>
  <Input
    type="password"
    id="password"
    name="password"
    required
    bind:value={formData.password}
  />
  {#if errors?.password}
    {@render errorMessage(errors.password)}
  {/if}

  <Label for="repeatPassword">Confirm Password</Label>
  <Input
    type="password"
    id="repeatPassword"
    name="repeatPassword"
    required
    bind:value={formData.repeatPassword}
  />
  {#if errors?.repeatPassword}
    {@render errorMessage(errors.repeatPassword)}
  {/if}

  <Button type="submit">Register</Button>
</form>
