<template>
  <div class="container">
    <div>
      <Logo/>
      <h1 class="title">
        Bulldog bazaar home page
      </h1>
      <NuxtLink to="/admin">Go to Admin</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  async mounted() {
    await this.$axios.$get()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  },
}
</script>

<style>
</style>
