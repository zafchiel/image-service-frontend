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

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  let errors = $state<any[]>([]);
  let submitted = $state(false);

  function handleSubmit(event: Event) {
    event.preventDefault();
    submitted = true;

    const result = v.safeParse(RegisterSchema, formData);

    if (result.success) {
      console.log("Form submitted:", result.output);
      errors = [];
    } else {
      console.error(result.issues);
      errors = result.issues;
    }
  }

  $effect(() => {
    if (submitted) {
      const result = v.safeParse(RegisterSchema, formData);

      if (result.success) {
        errors = [];
        console.log("Form submitted:", result.output);
      } else {
        console.error(result.issues);
        errors = result.issues;
      }
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
  {#each errors as error}
    {#if error.path[0].key === "email"}
      <p class="text-red-500">{error.message}</p>
    {/if}
  {/each}

  <Label for="username">Username</Label>
  <Input
    type="text"
    id="username"
    name="username"
    required
    bind:value={formData.username}
  />
  {#each errors as error}
    {#if error.path[0].key === "username"}
      <p class="text-red-500">{error.message}</p>
    {/if}
  {/each}

  <Label for="password">Password</Label>
  <Input
    type="password"
    id="password"
    name="password"
    required
    bind:value={formData.password}
  />
  {#each errors as error}
    {#if error.path[0].key === "password"}
      <p class="text-red-500">{error.message}</p>
    {/if}
  {/each}

  <Label for="repeatPassword">Confirm Password</Label>
  <Input
    type="password"
    id="repeatPassword"
    name="repeatPassword"
    required
    bind:value={formData.repeatPassword}
  />
  {#each errors as error}
    {#if error.path[0].key === "repeatPassword"}
      <p class="text-red-500">{error.message}</p>
    {/if}
  {/each}

  <Button type="submit">Register</Button>
</form>
