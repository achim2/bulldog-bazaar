<template>
  <div>
    <div v-html="oembedHtml"
         v-if="oembedHtml"></div>

    <div class="fb-page"
         :data-href="url"
         v-else-if="url"></div>
  </div>
</template>

<script>
export default {
  head: {
    script: [
      {
        hid: 'facebook',
        type: 'text/javascript',
        src: '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2',
        async: true,
        defer: true
      }
    ]
  },
  props: [
    'oembedHtml',
    'url'
  ],
  mounted() {
    // FB.XFBML.parse(this.$el);
  },
};
</script>
