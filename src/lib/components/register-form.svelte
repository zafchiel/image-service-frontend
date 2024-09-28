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
    passwordConfirmation: "",
  });

  function handleSubmit(event: Event) {
    event.preventDefault();

    const result = v.safeParse(RegisterSchema, formData);

    if (result.success) {
      console.log("Form submitted:", result.output);
    } else {
      console.error(result.issues);
    }
  }
</script>

<form method="POST" onsubmit={handleSubmit} class="space-y-2">
  <Label for="email">Email</Label>
  <Input type="email" id="email" name="email" bind:value={formData.email} />

  <Label for="username">Username</Label>
  <Input
    type="text"
    id="username"
    name="username"
    bind:value={formData.username}
  />

  <Label for="password">Password</Label>
  <Input
    type="password"
    id="password"
    name="password"
    bind:value={formData.password}
  />

  <Label for="passwordConfirmation">Confirm Password</Label>
  <Input
    type="password"
    id="passwordConfirmation"
    name="passwordConfirmation"
    bind:value={formData.passwordConfirmation}
  />

  <Button type="submit">Register</Button>
</form>
