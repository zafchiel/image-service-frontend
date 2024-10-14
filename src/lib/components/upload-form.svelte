<script>
  import Button from "./ui/button/button.svelte";
  import Input from "./ui/input/input.svelte";
</script>

<section class="my-8">
  <h1>Upload your images</h1>
  <form class="flex gap-4">
    <Input type="file" name="file" multiple />
    <Button type="submit">Upload</Button>
  </form>
</section>
