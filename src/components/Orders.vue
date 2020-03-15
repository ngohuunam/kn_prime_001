<template>
  <div>
    <DataTable :value="orders" :filters="filters" :expandedRows.sync="expandedRows" @row-expand="onRowExpand" @row-collapse="onRowCollapse" :paginator="true" :rows="10" :rowHover="true">
      <template #header>
        <div class="table-header-container">
          <Button icon="pi pi-plus" label="Expand All" @click="expandAll" />
          <Button icon="pi pi-minus" label="Collapse All" @click="collapseAll" />
          <div style="text-align: right">
            <InputText v-model="filters['global']" placeholder="Global Search" size="50" />
          </div>
        </div>
      </template>
      <Column :expander="true" headerStyle="width: 3em" />
      <Column field="foreignTitle" header="Foreign Title" filterMatchMode="contains">
        <template #filter>
          <InputText type="text" v-model="filters['foreignTitle']" class="p-column-filter" placeholder="Contains" />
        </template>
      </Column>
      <Column field="vietnameseTitle" header="Vietnamese Title" filterMatchMode="contains">
        <template #filter>
          <InputText type="text" v-model="filters['vietnameseTitle']" class="p-column-filter" placeholder="Contains" />
        </template>
      </Column>
      <Column field="shortTitle" header="Short Title" filterMatchMode="contains">
        <template #filter>
          <InputText type="text" v-model="filters['shortTitle']" class="p-column-filter" placeholder="Contains" />
        </template>
      </Column>
      <Column field="year" header="Year" filterMatchMode="contains" :sortable="true">
        <template #filter>
          <InputText type="text" v-model="filters['year']" class="p-column-filter" placeholder="Contains" />
        </template>
      </Column>
      <Column field="month" header="Month" filterMatchMode="contains" :sortable="true">
        <template #filter>
          <InputText type="text" v-model="filters['month']" class="p-column-filter" placeholder="Contains" />
        </template>
      </Column>
      <Column field="day" header="Day" filterMatchMode="contains" :sortable="true">
        <template #filter>
          <InputText type="text" v-model="filters['day']" class="p-column-filter" placeholder="Contains" />
        </template>
      </Column>
      <Column field="nkc" header="NKC" filterMatchMode="contains" :sortable="true">
        <template #body="slotProps">
          <span>{{ new Date(slotProps.data.nkc).toLocaleDateString('vi') }}</span>
        </template>
      </Column>

      <template #expansion="slotProps">
        <DataTable :value="products.filter(_prod => _prod.orderId === slotProps.data._id)" editMode="cell">
          <Column field="product" header="Product"></Column>
          <!-- <Column field="job" header="Job"></Column> -->
          <Column field="createdAt" header="Created At" filterMatchMode="contains" :sortable="true">
            <template #body="slotProps">
              <span>{{ slotProps.data.createdAt ? new Date(slotProps.data.createdAt).toLocaleDateString('vi') : '---' }}</span>
            </template>
          </Column>
          <Column field="startAt" header="Start At" filterMatchMode="contains" :sortable="true">
            <template #body="slotProps">
              <span v-if="slotProps.data[slotProps.column.field] > 0">{{ new Date(slotProps.data.startAt).toLocaleDateString('vi') }}</span>
            </template>
            <template #editor="slotProps">
              <!-- <InputText v-if="slotProps.data[slotProps.column.field] < 1" v-model="slotProps.data[slotProps.column.field]" /> -->
              <Calendar v-model="slotProps.data[slotProps.column.field]" :showTime="true" :showButtonBar="true" dateFormat="dd.mm.yy" />
            </template>
          </Column>
          <Column field="doneAt" header="Done At" filterMatchMode="contains" :sortable="true">
            <template #body="slotProps">
              <span>{{ slotProps.data.doneAt ? new Date(slotProps.data.doneAt).toLocaleDateString('vi') : '---' }}</span>
            </template>
          </Column>
          <Column field="endAt" header="End At" filterMatchMode="contains" :sortable="true">
            <template #body="slotProps">
              <span>{{ slotProps.data.endAt ? new Date(slotProps.data.endAt).toLocaleDateString('vi') : '---' }}</span>
            </template>
          </Column>
          <!-- <Column field="mainStaff" header="Main Staff" :sortable="true"></Column>
          <Column field="backupStaff" header="Backup Staff" :sortable="true"></Column> -->
          <template #footer>
            <div style="text-align:left">
              <Button abel="Add" icon="pi pi-plus" @click="addNewProd(slotProps.data)" />
            </div>
          </template>
        </DataTable>
      </template>
      <template #empty>No records found.</template>
    </DataTable>

    <Dialog :visible.sync="dialogVisible" :style="{ width: '400px' }" header="Product Details" :modal="true">
      <div class="p-cardialog-content">
        <div class="p-grid p-fluid" v-if="newProd">
          <div class="p-col-4">
            <label for="prod">Product</label>
          </div>
          <div class="p-col-8">
            <InputText id="prod" v-model="newProd.product" :disabled="false" autocomplete="off" focus />
          </div>
        </div>
      </div>

      <template #footer>
        <Button label="Save" icon="pi pi-check" @click="saveNewProd" class="p-button-success" />
        <Button label="Delete" icon="pi pi-times" @click="deleteNewProd" class="p-button-danger" />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Orders',
  props: {},
  data: () => ({
    expandedRows: [],
    customers: null,
    selectedCustomers: null,
    newProd: null,
    filters: {},
    dialogVisible: false,
  }),
  methods: {
    onRowExpand(event) {
      this.$toast.add({ severity: 'info', summary: 'Row Expanded', detail: 'Title: ' + event.data.shortTitle, life: 3000 })
    },
    onRowCollapse(event) {
      this.$toast.add({ severity: 'success', summary: 'Row Collapsed', detail: 'Title: ' + event.data.shortTitle, life: 3000 })
    },
    expandAll() {
      this.expandedRows = this.orders.filter(order => order.shortTitle)
      this.$toast.add({ severity: 'success', summary: 'All Rows Expanded', life: 3000 })
    },
    collapseAll() {
      this.expandedRows = []
      this.$toast.add({ severity: 'success', summary: 'All Rows Collapsed', life: 3000 })
    },
    addNewProd(data) {
      // console.log(data)
      this.newProd = {
        _id: '',
        orderId: data._id,
        foreignTitle: data.foreignTitle,
        vietnameseTitle: data.vietnameseTitle,
        shortTitle: data.shortTitle,
        nkc: data.nkc,
        day: data.day,
        month: data.month,
        year: data.year,
        client: data.client,
        product: '',
        jobs: [],
        createdAt: null,
        startAt: null,
        doneAt: null,
        endAt: null,
        logs: [],
      }
      this.dialogVisible = true
    },
    deleteNewProd() {
      this.newProd = null
      this.dialogVisible = false
    },
    saveNewProd() {
      this.newProd.createdAt = Date.now()
      this.newProd._id = this.newProd.orderId + '.' + this.newProd.product
      this.$store.commit('ADD_PROD', this.newProd)
      this.deleteNewProd()
    },
  },
  computed: mapState(['orders', 'products', 'jobs']),
  mounted: function() {
    this.$socket.client.emit('all', 'orders')
    this.$socket.client.emit('all', 'products')
    // if (this.jobs.length == 0) {
    //   this.$socket.client.emit('all', 'jobs')
    // }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
