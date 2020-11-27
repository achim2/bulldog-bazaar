<template>
  <div class="container my-5">
    <h2>Products</h2>
    <NuxtLink :to="{name: 'admin-products-add'}" class="btn btn-success">Add product</NuxtLink>
    <b-table striped
             hover
             bordered
             :items="items"
             :fields="['name', 'sex', 'color', 'edit', 'delete', 'status']"
    >
      <template #cell(name)="data">
        <NuxtLink :to="`/${data.item.id.toLowerCase()}`" target="_blank">{{data.item.name}}</NuxtLink>
      </template>
      <template #cell(status)="data">
        <b-form-checkbox v-model="data.value" @change="changeStatus(data)" size="lg" switch/>
      </template>
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
        this.setTableSchema(res)
      })
      .catch(err => console.log(err));
  },
  methods: {
    changeStatus(data) {
      this.$axios.$post('/admin/change-status',
        {
          id: data.item.id,
          userId: this.$auth.$state.user.id,
        }
      )
        .then(res => {
          this.items = this.items.map(item => item.id === data.item.id ? data.item : item);
          this.$notifier.showMessage({ message: [res.message], type: 'success' })
        })
        .catch(err => {
          const msg = err.response.data.message;
          this.$notifier.showMessage({ message: [msg], type: 'danger' })
        })
    },
    setTableSchema(data) {
      this.items = data.map(item => {
        return {
          id: item._id,
          name: item.name,
          sex: item.sex,
          color: item.color,
          edit: item._id,
          delete: item._id,
          status: item.status,
        }
      });
    },
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
                this.$notifier.showMessage({ message: [res], type: 'success' })
              })
              .catch(err => {
                const msg = err.response.data.message;
                this.$notifier.showMessage({ message: [msg], type: 'danger' })
              })
          }
        })
        .catch(err => {
          this.$notifier.showMessage({ message: ['Error occurred on delete item process', err], type: 'danger' })
        })
    },
  },
}
</script>
