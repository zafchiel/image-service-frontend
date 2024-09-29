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

  function handleSubmit(event: Event) {
    event.preventDefault();
    submitted = true;

    validateForm();
  }

  $effect(() => {
    if (submitted) {
      validateForm();
    }
  });
</script>

<form method="POST" onsubmit={handleSubmit} class="space-y-2">
  <Label for="email">Email</Label>
  <Input
    type="email"
    id="email"
    name="email"
    required
    bind:value={formData.email}
  />
  {#if errors?.email}
    <p class="text-red-500">{errors.email}</p>
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
    <p class="text-red-500">{errors.username}</p>
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
    <p class="text-red-500">{errors.password}</p>
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
    <p class="text-red-500">{errors.repeatPassword}</p>
  {/if}

  <Button type="submit">Register</Button>
</form>
