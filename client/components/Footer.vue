<template>
  <footer>
    <div class="container">
      <ul>
        <li>
          <nuxtLink :to="{name: 'contact'}">Contact us</nuxtLink>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
}
</script>

<style lang="scss">
footer {
  height: 100px;
  background: darkgrey;
}
</style>
