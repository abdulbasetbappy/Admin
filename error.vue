<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});
</script>

<template>
  <NuxtLayout>
    <div class="w-full h-full flex items-center justify-center flex-col gap-4">
      <p class="text-4xl font-bold">{{ error.statusCode }}</p>
      <p class="text-xl" v-if="error.message">{{ error.message }}</p>
      <NuxtLink class="py-2 px-3 bg-slate-500 text-white rounded-md flex justify-around items-center gap-2
      " to="/">
      <Icon name="line-md:home-alt-twotone" class="w-5 h-5" />
       <p>Go back home</p>
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>
