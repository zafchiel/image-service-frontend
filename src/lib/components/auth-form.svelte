<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { authSchema } from "$lib/auth-schema";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import SuperDebug from "sveltekit-superforms";

  export let data: SuperValidated<Infer<typeof authSchema>>;

  const form = superForm(data, {
    validators: zodClient(authSchema),
  });

  const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
  <Form.Field {form} name="email">
    <Form.Control let:attrs>
      <Form.Label>Email</Form.Label>
      <Input {...attrs} bind:value={$formData.email} />
    </Form.Control>
    <Form.Description>This is your email.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="password">
    <Form.Control let:attrs>
      <Form.Label>Password</Form.Label>
      <Input {...attrs} bind:value={$formData.password} type="password" />
    </Form.Control>
    <Form.Description>Min 8 characters.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button>Submit</Form.Button>
</form>
<SuperDebug data={$formData} />
