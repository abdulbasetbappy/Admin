<template>
    <div class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 w-full">
      <div
        class="p-2 rounded-lg bg-white dark:bg-gray-800 shadow flex justify-between gap-2 h-full"
      >
        <div class="flex flex-col justify-between">
          <div class="text-gray-500 dark:text-gray-400 font-medium">{{ title }}</div>
          <div class="text-gray-700 dark:text-gray-200 font-bold text-lg">
            {{ total }}
            <span class="text-sm" :class="activeClass">{{ totalDataCount }}</span>
          </div>
        </div>
        <div
          class="bg-gradient-to-tl from-gray-600 to-gray-900 rounded-lg px-2 text-white flex items-center justify-center"
        >
          <Icon :name="icon" class="w-7 h-7" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { defineProps } from 'vue'
  
  // Props from parent
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    total: {
      type: String,
      required: true,
    },
    totalDataCount: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    }
  })
  
  // Computed property for dynamic class based on active status
  const activeClass = computed(() => {
    return props.active ? 'text-yellow-600' : 'text-red-600'
  })
  </script>
  
  <style scoped>
  /* Add any custom styles here if needed */
  </style>
  