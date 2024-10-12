<script setup lang="ts">
useHead({
  title: 'Products'
})
</script>

<template>
  <div>
    <layout-title-back title="All Products" />
    <div class="flex flex-row items-center justify-between gap-6">
      <custom-summary-bar title="Total Items" icon="material-symbols:shopping-bag" total="3,571" />

      <custom-summary-bar title="Total Offered Items" icon="material-symbols:shoppingmode" total="1,130"  />

      <custom-summary-bar title="Active Items" icon="mdi:basket-plus" total="1,458" :active="true"
      totalDataCount="+45%"/>

      <custom-summary-bar title="Inactive" icon="mdi:basket-remove" total="1,903" :active="true"
        totalDataCount="-55%" />
    </div>
    <products-details />
  </div>
</template>
