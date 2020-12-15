<template>
  <div v-if="url"
       class="fb-page"
       :data-href="url"
       data-tabs="timeline"
       data-width="450"
       data-height=""
       data-small-header="false"
       data-adapt-container-width="true"
       data-hide-cover="false"
       data-show-facepile="true">
    <blockquote :cite="url"
                class="fb-xfbml-parse-ignore">
      <a :href="url">Facebook</a>
    </blockquote>
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
    'url'
  ],
};
</script>
