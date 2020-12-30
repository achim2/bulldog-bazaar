<template>
  <section class="section--product" v-if="product">
    <PageTitle :title="product.name" v-if="product.name"></PageTitle>


    <div class="container">
      <div class="row">
        <div v-for="(image) in product.images"
             :key="image.index"
             class="col-md-6"
             :style="{'order': image.index}">
          <CustomImage :image="image"
                       v-if="image">
          </CustomImage>
        </div>

        <!--    info    -->
        <div class="col-md-6">
          <div class="details">

            <p v-if="product.name"><b>{{ $t('name') }}</b> {{ $t(product.name) }}</p>
            <p v-if="product.color"><b>{{ $t('color') }}</b> {{ $t(product.color.toLowerCase()) }}</p>
            <p v-if="product.birthday"><b>{{ $t('birthday') }}</b> {{ (product.birthday)| dateFilter($i18n.locale) }}</p>
            <p v-if="product.gender"><b>{{ $t('gender') }}</b> {{ $t(product.gender) }}</p>

          </div>
        </div>

        <div class="col-md-12 col-lg-6"
             v-for="desc in product.description"
             v-if="desc.text && desc.locale === $i18n.locale">
          <div class="details">
            <p><b>{{ $t('description') }}</b>{{ desc.text }}</p>
          </div>
        </div>
      </div>

      <div class="text-center my-5">
        <nuxtLink :to="localePath({name: 'transport'})" class="btn btn-info">{{ $t('how to get') }}</nuxtLink>
      </div>
    </div>

  </section>
</template>

<script>
import CustomImage from '../components/CustomImage';
import PageTitle from '../components/PageTitle';

export default {
  async asyncData({ params, $axios, error }) {
    // const product = await $axios.$get(`https://api.nuxtjs.dev/posts/${params.id}`) // id: 1
    const product = await $axios.$get(`products/${params.id}`);
    product.metaUrl = `${process.env.baseUrl}/${product.slug}`;
    product.metaName = product.name;
    product.metaFilename = `${process.env.imagePath}/${product.selectedFilename}`;
    product.metaDescription = product.description[0].text;
    return { product };
  },
  head() {
    return {
      meta: [
        //facebook
        // { property: 'og:site_name', content: 'I Love Painting' },
        // { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.product.metaUrl,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.product.metaName,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.product.metaDescription,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.product.metaFilename,
        },
        // { property: 'og:image:width', content: '740' },
        // { property: 'og:image:height', content: '300' },

        //twitter
        // { name: "twitter:site", content: "@bobross" },
        // { name: "twitter:card", content: "summary_large_image" },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: this.product.metaUrl,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.product.metaName,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.product.metaDescription,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.product.metaFilename,
        },
      ]
    };
  },
};
</script>

<style lang="scss" scoped>
.section--product {
}

.details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  padding: 15px 50px;

  p {
    font-weight: 300;

    &:not(:last-child) {
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid $footer;
    }
  }

  b {
    display: block;
    font-weight: 600;
  }
}
</style>
