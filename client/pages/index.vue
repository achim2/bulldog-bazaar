<template>
  <div>
    <Hero/>
    <div class="container">
      <h1 class="title">
        Bulldog bazaar home page
      </h1>
      <br>

      <div class="row">
        <div class="col-sm-6 col-md-4"
             v-for="item in items" :key="item._id">
          <nuxtLink :to="`/${item.name}`" class="product">
            <img :src="`${$config.imagePath}/${item.images[0].name}`"
                 :alt="item.name">
            <h3>{{ item.name }}</h3>
            <p>{{ item.color }}</p>
          </nuxtLink>
        </div>
      </div>

      <br>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p>

      <br>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p>

      <br>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p>

      <br>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p>

      <br>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p>

    </div>
  </div>
</template>

<script>
import Hero from '@/components/Hero';

export default {
  component: {
    Hero,
  },
  data() {
    return {
      items: [],
    }
  },
  mounted() {
    this.$axios.$get('/products/filtered')
      .then(res => {
        console.log(res)
        this.items = res;
      })
      .catch(err => console.log(err));
  },
}
</script>

<style lang="scss">
.product {
  img {
    display: block;
    width: 100%;
  }
}
</style>
