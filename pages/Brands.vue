<script setup lang="ts">
useHead({
  title: 'Brands'
})
</script>

<template>
  <div>
    <layout-title-back title="All Brands" />
    <div class="flex flex-row items-center justify-between gap-6">
      <custom-summary-bar title="Total Brands" icon="material-symbols:shopping-bag" total="271" />

      <custom-summary-bar title="Best Selling" icon="material-symbols:shoppingmode" total="Uniliver"  />

      <custom-summary-bar title="Active " icon="material-symbols:interactive-space-rounded" total="258" :active="true"
      />

      <custom-summary-bar title="Inactive" icon="ion:cloud-offline" total="16" :active="true"
         />
    </div>
    <brands-details />
  </div>
</template>
