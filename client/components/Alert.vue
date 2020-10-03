<template>
  <div class="container">
    <b-alert
      :show="dismissCountDown"
      :variant="this.type"
      fade
      @dismiss-count-down="countDownChanged"
    >{{ this.message }}
    </b-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      type: '',
      dismissSecs: 10,
      dismissCountDown: 0,
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'showMessage') {
        this.message = state.alert.message
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
}
</style>
