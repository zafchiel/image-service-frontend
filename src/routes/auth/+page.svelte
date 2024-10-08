<script lang="ts">
  import { page } from "$app/stores";
  import LoginForm from "@/components/login-form.svelte";
  import RegisterForm from "@/components/register-form.svelte";
  import Button from "@/components/ui/button/button.svelte";

  let type: "login" | "register" = $state("login");

  $effect(() => {
    type =
      $page.url.searchParams.get("type") === "register" ? "register" : "login";
  });

  $effect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("type", type);
    history.replaceState(null, "", url);
  });
</script>

<main class="max-w-[1200px] mx-auto py-4">
  <section class="max-w-[400px]">
    <header>
      <h1 class="text-4xl font-bold">
        {type === "login" ? "Login" : "Register"}
      </h1>
    </header>
    {#if type === "login"}
      <LoginForm />
    {:else}
      <RegisterForm />
    {/if}
    <footer>
      <a
        class="text-sm text-primary underline-offset-4 hover:underline"
        href={type === "login" ? "/auth?type=register" : "/auth?type=login"}
      >
        {type === "login"
          ? "Don't have an account? Register instead"
          : "Have account already? Login instead"}
      </a>
    </footer>
  </section>
</main>
