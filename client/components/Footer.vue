<template>
  <div class="footer">
    <div class="container">
      <ul>
        <li>
          <nuxtLink :to="{name: 'contact'}">Contact us</nuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
.footer {
  background: darkgrey;
}
</style>
