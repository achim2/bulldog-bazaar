<template>
  <div class="product-view">
    <div class="container">
      <div class="product-wrapper">
        <div class="product-left">
          <!--    Image gallery    -->
          <picture v-for="(image, index) in product.images"
                   v-if="image"
                   :key="index"
          >
            <source :data-srcset="`${$config.imagePath}/${image.name}`"
                    :alt="image.name"
                    type="image/webp"
                    class="lazyload product-image"/>
            <source :data-srcset="`${$config.imagePath}/${image.name}`"
                    :alt="image.name"
                    type="image/jpeg"
                    class="lazyload product-image"/>
            <img :data-src="`${$config.imagePath}/${image.name}`"
                 :alt="image.name"
                 class="lazyload product-image"/>
          </picture>

        </div>
        <div class="product-right">
          <!--    info    -->
          <h3 v-if="product.name">{{ $t('name') }}: <b>{{ product.name }}</b></h3>
          <p v-if="product.color">{{ $t('color') }}: <b>{{ $t(product.color) }}</b></p>
          <p v-if="product.birthday">{{ $t('birthday') }}: <b>{{ (product.birthday)| dateFilter($i18n.locale) }}</b></p>
          <p v-if="product.gender">{{ $t('gender') }}: <b>{{ $t(product.gender) }}</b></p>
          <div v-for="desc in product.description">
            <p v-if="desc.text && desc.locale === $i18n.locale">{{ $t('description') }}: <b>{{ desc.text }}</b></p>
          </div>
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
      //english meta
      this.metaProduct = JSON.parse(JSON.stringify(this.product));
      this.metaProduct.images = this.metaProduct.images.find(img => img.selected);
      this.metaProduct.image_url = `${process.env.imagePath}/${this.metaProduct.images.name}`;
      this.metaProduct.url = `${process.env.baseUrl}/${this.metaProduct.slug}`;
      this.metaProduct.description = this.metaProduct.description[0].text;
    }
  },
}
</script>

<style lang="scss">
.product-image {
  width: 200px;
  height: auto;
}
</style>
