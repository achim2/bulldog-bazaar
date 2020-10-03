<template>
  <div class="container">
    <h1 class="title">
      Bulldog bazaar home page
    </h1>
    <br>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p><br>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p><br>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p><br>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p><br>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p><br>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p><br>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p><br>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p><br>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p><br>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p><br>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p><br>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p><br>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p><br>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p><br>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p><br>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque id ipsa, praesentium quasi sequi voluptas. Alias amet blanditiis, dolor et fuga, harum illo maxime nulla quam recusandae repellat temporibus veritatis.</p>

  </div>
</template>

<script>
export default {
  async mounted() {
    await this.$axios.$get()
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err));
  },
}
</script>

<style>
</style>
