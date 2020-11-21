<template>
  <div class="sidebar">
    <Logo/>
    <ul>
      <li>
        <NuxtLink to="/">Home</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/admin/products">Products</NuxtLink>
        <ul>
          <li>
            <NuxtLink to="/admin/products/add">Add product</NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import Logo from '@/components/Logo';

export default {
  components: { Logo },
  component: {
    Logo,
  },
  data() {
    return {}
  },
  method: {}
}
</script>

<style lang="scss">
.sidebar {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 0;
  padding-top: 50px;
  transition: .2s ease;
  overflow: hidden;
}

@include media-breakpoint-up(md) {
  .sidebar {
    background: $secondary;
  }
}

</style>
