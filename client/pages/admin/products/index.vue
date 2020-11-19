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
      const delItem = this.items.find(item => item.delete === id);
      const h = this.$createElement;
      const msgVNode = h('div', { domProps: { innerHTML: `Please confirm that you want to delete <b>${delItem.name}.</b>` } });

      this.$bvModal.msgBoxConfirm(
        [msgVNode],
        {
          title: 'Please Confirm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.$axios.$post('/admin/delete-product', { id: id })
              .then(res => {
                this.items = this.items.filter(item => item.delete !== id);
                this.$notifier.showMessage({ message: res, type: 'info' })
              })
              .catch(err => console.log(err))
          }
        })
        .catch(err => console.log(err))
    },
  },
}
</script>
