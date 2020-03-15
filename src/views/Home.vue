<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logoKN.png" />
    <Orders />
  </div>
</template>

<script>
// @ is an alias to /src
import Orders from '@/components/Orders.vue'

export default {
  name: 'Home',
  components: {
    Orders,
  },
}
</script>
