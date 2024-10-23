<script setup>
const {
  products,
  searchQuery,
  currentPage,
  itemsPerPage,
  all,
  loading,
  visible,
  isToggled,
  dataNotFound,
  exportDropdownOpen,
  itemsDropdownOpen,
  filteredProducts,
  totalPages,
  paginatedProducts,
  visiblePageNumbers,
  goToPage,
  exportToCSV,
  exportToExcel,
  exportToPDF,
  printTable,
  toggleExportDropdown,
  openItemsDropdown,
  openRoleDropdown,
  setRole,
  roleDropdownOpen,
} = useManageUser();
</script>

<template>
  <div class="container mx-auto p-4 mt-2 overflow-x-auto">
    <!--Table Top Seeting-->
    <div class="flex justify-between mb-4">
      <!-- Table Search Filter & Export-->
      <div class="mb-2 flex items-center gap-3 md:mb-0">
        <!-- Search -->
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search User..."
          class="px-4 py-2 border outline-none bg-transparent border-slate-400 rounded w-full md:w-64"
        />
        <!-- Export Dropdown -->
        <div class="relative inline-block text-left">
          <button
            @click="toggleExportDropdown"
            class="px-4 py-2 gap-2 border-slate-400 bg-slate-500 flex items-center text-white rounded hover:bg-slate-600"
          >
            Export as
            <Icon name="material-symbols:download" class="w-5 h-5" />
          </button>

          <div
            v-show="exportDropdownOpen"
            class="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white dark:bg-slate-600 ring-1 ring-black ring-opacity-5"
          >
            <ul class="">
              <li
                @click="exportToCSV"
                class="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Export as CSV
              </li>
              <li
                @click="exportToExcel"
                class="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Export as Excel
              </li>
              <li
                @click="exportToPDF"
                class="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300  hover:rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Export as PDF
              </li>
              <li
                @click="printTable"
                class="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Print
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Items Per Page Filter -->
      <div>
        <!-- Select Per Page Custom Dropdown -->
        <div class="relative inline-block text-left">
          <div>
            <label class="mr-2 font-medium">Users Per Page:</label>
            <button
              type="button"
              class="inline-flex justify-between w-24 rounded border border-slate-400 bg-transparent px-2 py-2 pr-0 text-slate-500 font-bold dark:text-slate-300 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800"
              @click="openItemsDropdown"
              aria-expanded="true"
              aria-haspopup="true"
            >
              <p>{{ itemsPerPage === all ? "All" : itemsPerPage }}</p>
              <Icon
                name="material-symbols:expand-more"
                class="w-6 h-6 text-slate-400 transition-all duration-300 ease-in-out"
                :class="{ 'transform rotate-180': itemsDropdownOpen }"
              />
            </button>
          </div>
          <div
            v-show="itemsDropdownOpen"
            class="absolute top-11 right-0 z-10 w-24 rounded-md bg-white dark:bg-slate-600 shadow-lg ring-1 ring-black ring-opacity-5"
          >
            <ul
              class=""
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <li
                v-for="item in [25, 50, 100, all]"
                :key="item"
                @click="(itemsPerPage = item), (itemsDropdownOpen = false)"
                class="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:rounded-md cursor-pointer"
              >
                {{ item === all ? "All" : item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--Table Data Seeting-->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-transparent rounded-sm">
        <!-- Table Header -->
        <thead class="bg-slate-300 dark:bg-slate-700">
          <tr>
            <th class="py-2 px-4">SN</th>
            <th class="py-2 px-4 text-left">Image</th>
            <th class="py-2 px-4 text-left">Name</th>
            <th class="py-2 px-4 text-left">Contact</th>
            <th class="py-2 px-4 text-left">Role</th>
            <th class="py-2 px-4">Status</th>
            <th class="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <!-- Table Body -->
        <tbody>
          <!--Table Rows-->
          <tr
            v-for="product in paginatedProducts"
            :key="product.id"
            class="rounded dark:hover:bg-slate-800 hover:bg-slate-200"
          >
            <!--Table Serial Number-->
            <td class="py-2 px-4 text-center">{{ product.id }}</td>
            <!--Table Image-->
            <td class="py-2 px-4 text-center">
              <img
                :src="'https://dummyimage.com/50x50/000/fff&text=50x50'"
                alt="Product Image"
                class="rounded-lg object-cover w-[50px] h-[50px]"
              />
            </td>
            <!--Table Name-->
            <td class="py-2 px-4 text-left">Abdul Baset Bappy</td>
            <!--Table Contact-->
            <td class="py-2 px-4 text-left">
              <p>+8801799568976</p>
              <p>xxxx-xxxx-xx@gmail.com</p>
            </td>
            <!--Table Role-->
            <td class="py-2 px-4 text-left">
              <div class="relative inline-block w-full text-left">
                <div>
                  <button
                    type="button"
                    class="inline-flex justify-between w-24 rounded border border-slate-400 bg-transparent px-2 py-2 text-slate-400 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                    @click="openRoleDropdown(product.id)"
                    aria-expanded="true"
                    aria-haspopup="true"
                  >
                    {{ product.role || "User" }}
                    <Icon
                      name="material-symbols:expand-more"
                      class="w-6 h-6 text-slate-400 transition-all duration-300 ease-in-out"
                      :class="{ 'transform rotate-180': roleDropdownOpen === product.id }" />
                  </button>
                </div>
                <div
                  v-show="product.id === roleDropdownOpen"
                  class="absolute z-10 mt-1 w-24 rounded-md  bg-white dark:bg-slate-600 ring-1 ring-black ring-opacity-5 shadow-lg"
                >
                  <ul
                    @click="setRole(product.id, role)"
                    class=""
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <li
                      v-for="role in ['User', 'Manager', 'Admin']"
                      :key="role"
                      @click="product.role = role"
                      class="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:rounded-md cursor-pointer"
                    >
                      {{ role }}
                    </li>
                  </ul>
                </div>
              </div>
            </td>
            <!--Table Status-->
            <td class="py-2 px-4 text-center">
              <div class="flex items-center justify-center">
                <label for="toggle" class="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="toggle"
                    class="sr-only peer"
                    v-model="isToggled"
                  />
                  <div
                    class="block relative bg-rose-950 w-10 h-6 p-1 rounded-full before:absolute before:bg-rose-300 before:w-4 before:h-4 before:p-1 before:rounded-full before:transition-all before:duration-500 before:left-1 peer-checked:before:left-5 peer-checked:before:bg-slate-300 peer-checked:bg-slate-700"
                  ></div>
                </label>
                <p class="ml-2 text-base font-semibold">
                  {{ isToggled ? "Active" : "Banned" }}
                </p>
              </div>
            </td>
            <!--Table Actions-->
            <td class="py-2 px-4 text-center">
              <button @click="visible = true" class="text-red-500">
                <Icon
                  name="material-symbols:delete-outline-rounded"
                  class="w-6 h-6"
                />
              </button>
            </td>
          </tr>
          <tr v-if="loading">
            <td colspan="6" class="text-center py-4 h-64 w-full">
              <LayoutLoading />
            </td>
          </tr>
          <tr v-if="dataNotFound">
            <td colspan="6" class="text-center py-4">No products found.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Pagination -->
    <div class="flex flex-col md:flex-row justify-between items-center mt-4">
      <div class="mb-2 md:mb-0">
        Showing
        <span class="font-semibold">{{
          (currentPage - 1) * itemsPerPage + 1 || 0
        }}</span>
        to
        <span class="font-semibold">{{
          Math.min(currentPage * itemsPerPage, filteredProducts.length) || 0
        }}</span>
        of
        <span class="font-semibold">{{ filteredProducts.length }}</span> entries
      </div>
      <div class="flex space-x-2">
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-1 border rounded disabled:opacity-50 border-slate-400 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          v-for="page in visiblePageNumbers"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'px-3 py-1 border rounded',
            page === currentPage
              ? 'bg-slate-700 text-white'
              : 'bg-transparent text-slate-400 hover:bg-slate-700',
          ]"
        >
          {{ page }}
        </button>
        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border rounded disabled:opacity-50 border-slate-400 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
    <!-- Delete User Dialog -->
    <div class="card flex justify-center">
      <Dialog
        @update:visible="visible = $event"
        :visible="visible"
        modal
        header="Delete"
        :style="{ width: '25rem' }"
      >
        <div class="flex items-center flex-col justify-center">
          <Icon
            name="line-md:folder-remove-twotone"
            class="w-32 h-32 text-red-500"
          />
          <p class="text-2xl my-4 mb-6">Are You Sure To Delete ?</p>
        </div>
        <div class="flex justify-between gap-2">
          <button
            class="py-2 px-3 flex items-center gap-2 bg-slate-500 text-white rounded-md text-lg"
            @click="visible = false"
            type="button"
          >
            Cancel
            <Icon name="material-symbols:cancel-outline-rounded" />
          </button>
          <button
            class="py-2 flex items-center gap-2 px-3 bg-rose-500 text-white rounded-md text-lg"
            @click="visible = false"
            type="button"
          >
            Delete <i class="pi pi-send"></i>
          </button>
        </div>
      </Dialog>
    </div>
  </div>
</template>
