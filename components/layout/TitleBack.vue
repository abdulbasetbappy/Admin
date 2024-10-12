<template>
  <div>
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">{{ title }}</h1>
      <button @click="goBack" class="py-2 px-3 bg-slate-500 text-white rounded-md">
        <i class="pi pi-arrow-circle-left"></i> Back
      </button>
    </div>
    <hr class="my-2 border dark:border-gray-700" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
defineProps({
  title: String
})

const goBack = () => {
  router.back() // Navigate to the previous page
}
</script>