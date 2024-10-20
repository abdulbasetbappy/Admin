<script setup lang="ts">
useHead({
  title: 'Categories'
})
</script>

<template>
  <div>
    <layout-title-back title="All Categories" />
    <div class="flex flex-row items-center justify-between gap-6">
      <custom-summary-bar title="Total Categories" icon="material-symbols:shopping-bag" total="71" />

      <custom-summary-bar title="Best Selling" icon="material-symbols:shoppingmode" total="Beauty"  />

      <custom-summary-bar title="Active " icon="mdi:basket-plus" total="58" :active="true"
      />

      <custom-summary-bar title="Inactive" icon="mdi:basket-remove" total="23" :active="true"
         />
    </div>
    <CategoriesDetails />
  </div>
</template>
