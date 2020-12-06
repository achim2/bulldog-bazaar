import Vue from 'vue';

Vue.filter('dateFilter', (value, locale = 'en-US') => {
  const date = new Date(value)
  return date.toLocaleString([locale], {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  })
})
