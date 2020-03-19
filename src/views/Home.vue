<template>
  <div class="home">
    <div class="center"><img alt="Vue logo" src="../assets/logoKN.png" /></div>

    <div class="p-grid">
      <div :class="orderColumnClass">
        <FilmOrdersListColumn @toggle-enlarge="toggleOrderColumnEnlarge" />
      </div>
      <div :class="productSimpleColumnClass">
        <FilmProductSimpleColumn @toggle-enlarge="toggleProductSimpleColumnEnlarge" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import FilmOrdersListColumn from '@/components/FilmOrdersListColumn.vue'
import FilmProductSimpleColumn from '@/components/FilmProductSimpleColumn.vue'

export default {
  name: 'Home',
  components: {
    FilmOrdersListColumn,
    FilmProductSimpleColumn,
  },
  data: () => ({
    orderColumnEnlarge: true,
    productSimpleColumnEnlarge: true,
    jobColumnEnlarge: true,
  }),
  methods: {
    toggleOrderColumnEnlarge() {
      this.orderColumnEnlarge = !this.orderColumnEnlarge
    },
    toggleProductSimpleColumnEnlarge() {
      this.productSimpleColumnEnlarge = !this.productSimpleColumnEnlarge
    },
    toggleJobColumnEnlarge() {
      this.jobColumnEnlarge = !this.jobColumnEnlarge
    },
  },
  computed: {
    orderColumnClass: function() {
      return this.orderColumnEnlarge ? 'p-col-12' : 'p-col-2'
    },
    productSimpleColumnClass: function() {
      return this.productSimpleColumnEnlarge ? 'p-col-12' : 'p-col-2'
    },
    jobColumnClass: function() {
      return this.jobColumnEnlarge ? 'p-col-3' : 'p-col-1'
    },
  },
}
</script>

<style>
.center {
  width: 100%;
  text-align: center;
  padding: 0 0 24px 0;
}
</style>
