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

  function handleSubmit(event: Event) {
    event.preventDefault();

    const result = v.safeParse(LoginSchema, formData);

    if (result.success) {
      console.log("Form submitted:", result.output);
    } else {
      console.error(result.issues);
    }
  }
</script>

<form onsubmit={handleSubmit} class="space-y-2">
  <Label for="email">Email</Label>
  <Input type="email" id="email" name="email" bind:value={formData.email} />

  <Label for="password">Password</Label>
  <Input
    type="password"
    id="password"
    name="password"
    bind:value={formData.password}
  />

  <Button type="submit">Login</Button>
</form>
