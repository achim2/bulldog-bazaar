<template>
  <div class="container my-5">
    <h2>Products</h2>
    <b-table striped
             hover
             bordered
             :items="items"
    >
      <template #cell(edit)="data">
        <NuxtLink :to="`/admin/products/edit/${data.value.toLowerCase()}`" class="btn btn-info">Edit</NuxtLink>
      </template>
      <template #cell(delete)="data">
        <button v-on:click="deleteItem(data.value)" class="btn btn-danger">Delete</button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      items: [],
    }
  },
  mounted() {
    this.$axios.$get('/admin/products')
      .then(res => {
        this.items = res.map(item => {
          return {
            name: item.name,
            description: item.description,
            sex: item.sex,
            color: item.color,
            edit: item._id,
            delete: item._id,
          }
        });
      })
      .catch(err => console.log(err));
  },
  methods: {
    deleteItem(id) {
      this.$axios.$post('/admin/delete-product', { id: id })
        .then(res => {
          this.items = this.items.filter(item => item.delete !== id);
          this.$notifier.showMessage({ message: res, type: 'info' })
        })
        .catch(err => console.log(err))
    },
  },
}
</script>
