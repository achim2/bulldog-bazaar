<template>
  <div>
    <div class="container">
      <h1 class="title">{{ $t('welcome') }}</h1>

      <br>
      <br>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p>

      <div class="row">
        <div class="col-sm-6 col-md-4"
             v-for="item in items" :key="item._id">
          <nuxtLink :to="localePath(`/${item.name}`)" class="product">
            <picture>
              <source :data-srcset="`${$config.imagePath}/${item.images[0].name}`"
                      type="image/webp"
                      class="lazyload"/>
              <source :data-srcset="`${$config.imagePath}/${item.images[0].name}`"
                      type="image/jpeg"
                      class="lazyload"/>
              <img :data-src="`${$config.imagePath}/${item.images[0].name}`"
                   :alt="item.name"
                   class="lazyload"/>
            </picture>
            <h3>{{ item.name }}</h3>
            <p>{{ item.color }}</p>
          </nuxtLink>
        </div>
      </div>

      <br>
      <br>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p>

      <br>
      <br>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p>

      <br>
      <br>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p>

      <br>
      <br>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p>

      <br>
      <br>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p>

      <br>
      <br>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p>

      <br>
      <br>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p>

      <br>
      <br>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p>

      <br>
      <br>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p>

    </div>
  </div>
</template>

<script>
export default {
  component: {},
  data() {
    return {
      items: [],
    }
  },
  mounted() {
    this.$axios.$get('/products/filtered')
      .then(res => {
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
