<script setup lang="ts">
useHead({
  title: 'Users'
})
</script>

<template>
  <div>
    <LayoutTitleBack title="All Users" />
    <div class="flex flex-row items-center justify-between gap-6">
      <custom-summary-bar title="Total Users" icon="fa6-solid:users" total="271" />

      <custom-summary-bar title="Verified User" icon="pajamas:partner-verified" total="200"  />

      <custom-summary-bar title="Active " icon="material-symbols:interactive-space-rounded" total="258" :active="true"
      />

      <custom-summary-bar title="Banned" icon="solar:user-block-rounded-bold" total="16" :active="true"
         />
    </div>
    <users-details />
  </div>
</template>
