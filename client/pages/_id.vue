<template>
  <div class="product-view">
    <div class="container">
      <div class="product-wrapper">
        <div class="product-left">
          <!--    Image gallery    -->
          <img v-for="(image) in product.images"
               :src="`${$config.imagePath}/${image.name}`"
               :alt="image.name"
               v-if="image"
               style="width: 200px; height: auto">
        </div>
        <div class="product-right">
          <!--    info    -->
          <h3 v-if="product.name">Name: <b>{{ product.name }}</b></h3>
          <p v-if="product.color">Color: <b>{{ product.color }}</b></p>
          <p v-if="product.birthday">Birthday: <b>{{ (product.birthday)| dateFilter($i18n.locale) }}</b></p>
          <p v-if="product.gender">Gender: <b>{{ product.gender }}</b></p>
          <p v-if="product.description">Description <b>{{ product.description }}</b></p>
        </div>
      </div>

      <div class="related-products">
        <!-- other products -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.title,
      meta: [
        //facebook
        // { property: 'og:site_name', content: 'I Love Painting' },
        // { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.metaProduct.url,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.metaProduct.name,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.metaProduct.description,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.metaProduct.image_url,
        },
        // { property: 'og:image:width', content: '740' },
        // { property: 'og:image:height', content: '300' },

        //twitter
        // { name: "twitter:site", content: "@bobross" },
        // { name: "twitter:card", content: "summary_large_image" },
        {
          hid: "twitter:url",
          name: "twitter:url",
          content: this.metaProduct.url,
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.metaProduct.name,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.metaProduct.description,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: this.metaProduct.image_url,
        },
      ]
    }
  },
  data() {
    return {
      product: {},
      metaProduct: {},
    }
  },
  mounted() {
    const id = this.$route.params.id;
    if (id) {
      this.$axios.$get(`/products/${id}`)
        .then(product => {
          this.product = product;
          this.setMetaSchema();
        })
        .catch(err => console.log(err));
    }
  },
  methods: {
    setMetaSchema() {
      this.metaProduct = JSON.parse(JSON.stringify(this.product));
      this.metaProduct.images = this.metaProduct.images.find(img => img.selected);
      this.metaProduct.image_url = `${process.env.imagePath}/${this.metaProduct.images.name}`;
      this.metaProduct.url = `${process.env.baseUrl}/${this.metaProduct.name}`;
    }
  },
}
</script>

<style lang="scss">
</style>
