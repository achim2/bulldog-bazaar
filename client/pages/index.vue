<template>
  <div>
    <div class="container">
      <h1 class="title">{{ $t('welcome') }}</h1>

      <br>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae
        repellat temporibus veritatis.</p>

      <div class="row">
        <div class="col-sm-6 col-md-4"
             v-for="item in items" :key="item._id">
          <nuxtLink :to="localePath(`/${item.slug}`)" class="product">
            <img :data-src="`${$config.imagePath}/${item.selectedFilename}`"
                 :alt="item.name"
                 class="lazyload"/>
            <h3>{{ item.name }}</h3>
            <p>{{ item.color }}</p>
          </nuxtLink>
        </div>
      </div>

      <br>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae
        repellat temporibus veritatis.</p>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    this.$axios.$get('/products/filtered')
      .then(res => {
        this.items = res;
      });
  },
};
</script>

<style lang="scss">
</style>
