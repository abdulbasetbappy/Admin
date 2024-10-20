<script setup lang="ts">
useHead({
  title: 'Users'
})
</script>

<template>
  <div>
    <LayoutTitleBack title="All Users" />
    <div class="flex flex-row items-center justify-between gap-6">
      <custom-summary-bar title="Total Users" icon="material-symbols:shopping-bag" total="271" />

      <custom-summary-bar title="Verified User" icon="material-symbols:shoppingmode" total="200"  />

      <custom-summary-bar title="Active " icon="mdi:basket-plus" total="258" :active="true"
      />

      <custom-summary-bar title="Inactive" icon="mdi:basket-remove" total="16" :active="true"
         />
    </div>
    <users-details />
  </div>
</template>
