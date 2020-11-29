import Vue from 'vue';

Vue.filter('dateFilter', (value) => {
  const date = new Date(value)
  return date.toLocaleString(['en-US'], {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  })
})
