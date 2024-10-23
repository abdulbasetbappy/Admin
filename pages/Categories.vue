<script setup lang="ts">
useHead({
  title: 'Categories'
})
</script>

<template>
  <div>
    <layout-title-back title="All Categories" />
    <div class="flex flex-row items-center justify-between gap-6">
      <custom-summary-bar title="Total Categories" icon="iconamoon:category-fill" total="71" />

      <custom-summary-bar title="Best Selling" icon="mdi:sale" total="Beauty"  />

      <custom-summary-bar title="Active " icon="material-symbols:interactive-space-rounded" total="58" :active="true"
      />

      <custom-summary-bar title="Inactive" icon="ion:cloud-offline" total="23" :active="true"
         />
    </div>
    <CategoriesDetails />
  </div>
</template>
