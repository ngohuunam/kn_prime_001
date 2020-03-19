<template>
  <div class="home">
    <div class="center"><img alt="Vue logo" src="../assets/logoKN.png" /></div>

    <div class="p-grid">
      <div :class="orderColumnClass">
        <FilmOrdersListColumn @toggle-enlarge="toggleOrderColumnEnlarge" />
      </div>
      <!-- <div :class="productColumnClass">
        <ProductColumn @toggle-enlarge="toggleProductColumnEnlarge" />
      </div>
      <div :class="jobColumnClass">
        <JobColumn @toggle-enlarge="toggleJobColumnEnlarge" />
      </div> -->
      <!-- <div class="p-col">
        <ProductTable :_id="slotProps.data._id" />
      </div> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import FilmOrdersListColumn from '@/components/FilmOrdersListColumn.vue'
// import ProductTable from '@/components/ProductTable.vue'

export default {
  name: 'Home',
  components: {
    FilmOrdersListColumn,
    // ProductTable,
  },
  data: () => ({
    orderColumnEnlarge: true,
    productColumnEnlarge: true,
    jobColumnEnlarge: true,
  }),
  methods: {
    toggleOrderColumnEnlarge() {
      this.orderColumnEnlarge = !this.orderColumnEnlarge
    },
    toggleProductColumnEnlarge() {
      this.productColumnEnlarge = !this.productColumnEnlarge
    },
    toggleJobColumnEnlarge() {
      this.jobColumnEnlarge = !this.jobColumnEnlarge
    },
  },
  computed: {
    orderColumnClass: function() {
      return this.orderColumnEnlarge ? 'p-col-12' : 'p-col-2'
    },
    productColumnClass: function() {
      return this.productColumnEnlarge ? 'p-col-3' : 'p-col-1'
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
