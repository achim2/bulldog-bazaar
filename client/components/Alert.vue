<template>
  <b-alert
    class="container"
    :show="dismissCountDown"
    :variant="this.type"
    fade
    @dismiss-count-down="countDownChanged"
    dismissible>
    <p v-for="message in messages">{{ message }}</p>
  </b-alert>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      type: '',
      dismissSecs: 10,
      dismissCountDown: 0,
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'showMessage') {
        this.messages = state.alert.message
        this.type = state.alert.type
        this.dismissCountDown = this.dismissSecs
      }
    })
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
  },
}
</script>

<style lang="scss">
.alert {
  margin-top: 1rem;

  p:last-child {
    margin: 0;
  }
}
</style>
