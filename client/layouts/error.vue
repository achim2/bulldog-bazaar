<template>
  <div>
    <h1 v-if="error.statusCode === 404">404 - Page not found</h1>
    <h1 v-if="error.statusCode === 500">500 - Internal server error</h1>
    <h1 v-else>An error occurred</h1>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error'
}
</script>
