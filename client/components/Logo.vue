<template>
  <div class="brand">
    <img :src="require(`~/assets/images/logo.png`)"
         alt="logo"
         class="logo"
    />
    <span>Icon Bulls</span>
  </div>
</template>

<style lang="scss" scoped>
.brand {
  display: flex;
  align-items: center;

  .logo {
    width: 50px;
    height: 45.5px;
  }

  span {
    margin: 5px 0 0 10px;
    font-weight: bold;
  }
}
</style>
