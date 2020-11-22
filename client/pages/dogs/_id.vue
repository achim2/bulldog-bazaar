<template>
  <div class="product-view">
    <div class="container">
      <div class="product-wrapper">
        <div class="product-left">
          <!--    Image gallery    -->
          <img :src="`${$config.imagePath}/${product.imageUrl}`" :alt="product.name" v-if="product.imageUrl">
        </div>
        <div class="product-right">
          <!--    info    -->
          <h3 v-if="product.name">Name: <b>{{ product.name }}</b></h3>
          <p v-if="product.color">Color: <b>{{ product.color }}</b></p>
          <p v-if="product.birthday">Birthday: <b>{{ product.birthday }}</b></p>
          <p v-if="product.sex">Sex: <b>{{ product.sex }}</b></p>
          <p v-if="product.description">Description <b>{{ product.description }}</b></p>
        </div>
      </div>

      <div class="related-products">
        <!-- other dogs -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
    }
  },
  mounted() {
    const id = this.$route.params.id;
    if (id) {
      this.$axios.$get(`/products/${id}`)
        .then(product => {
          console.log("current product: ", product);
          this.product = product;
        })
        .catch(err => console.log(err));
    }
  },
}
</script>

<style lang="scss">
</style>
