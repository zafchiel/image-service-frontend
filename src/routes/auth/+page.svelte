<script lang="ts">
  // import { page } from "$app/stores";
  import AuthForm from "@/components/auth-form.svelte";
  import Button from "@/components/ui/button/button.svelte";

  let { data } = $props();

  let type: "login" | "register" = $state("login");

  // $effect(() => {
  //   type =
  //     $page.url.searchParams.get("type") === "register" ? "register" : "login";
  // });

  // $effect(() => {
  //   const url = new URL(window.location.href);
  //   url.searchParams.set("type", type);
  //   history.replaceState(null, "", url);
  // });
</script>

<main>
  <section class="flex flex-col items-center justify-center h-screen">
    <header>
      <h1 class="text-4xl font-bold">
        {type === "login" ? "Login" : "Register"}
      </h1>
    </header>
    <AuthForm data={data.form} />
    <footer>
      <Button onclick={() => (type = type === "login" ? "register" : "login")}>
        {type === "login" ? "Register instead" : "Login instead"}
      </Button>
    </footer>
  </section>
</main>
