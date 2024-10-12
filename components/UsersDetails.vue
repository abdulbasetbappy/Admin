<script setup>
// State Variables
const products = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(25);
const all = 'all';
const loading = ref(false);

// Fetch Products from DummyJSON
const fetchProducts = async () => {
    loading.value = true;
    try {
        const response = await fetch('https://dummyjson.com/products?limit=150');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        products.value = data.products.map(product => ({
            id: product.id,
            name: product.title,
            category: product.category,
            price: product.price,
            stock: product.stock,
        }));
    } catch (error) {
        console.error('Error fetching products:', error);
        alert('Failed to fetch products. Please try again later.');
    } finally {
        loading.value = false;
    }
};

// Computed Properties
const filteredProducts = computed(() => {
    if (!searchQuery.value) return products.value;
    return products.value.filter(product =>
        Object.values(product).join(' ').toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const totalPages = computed(() => {
    if (itemsPerPage.value === all) return 1;
    return Math.ceil(filteredProducts.value.length / itemsPerPage.value);
});

const paginatedProducts = computed(() => {
    if (itemsPerPage.value === all) return filteredProducts.value;
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredProducts.value.slice(start, end);
});

watch([searchQuery, itemsPerPage], () => {
    currentPage.value = 1;
});

// Pagination Logic with Ellipses
const visiblePageNumbers = computed(() => {
    const pages = [];
    const maxVisible = 5;
    if (totalPages.value <= maxVisible) {
        for (let i = 1; i <= totalPages.value; i++) {
            pages.push(i);
        }
    } else {
        if (currentPage.value <= 3) {
            pages.push(1, 2, 3, '...', totalPages.value);
        } else if (currentPage.value >= totalPages.value - 2) {
            pages.push(1, '...', totalPages.value - 2, totalPages.value - 1, totalPages.value);
        } else {
            pages.push(1, '...', currentPage.value, '...', totalPages.value);
        }
    }
    return pages;
});

// Methods
const goToPage = (page) => {
    if (page === '...' || page < 1 || page > totalPages.value) return;
    currentPage.value = page;
};

const exportToCSV = () => {
    if (paginatedProducts.value.length === 0) {
        alert('No data available to export.');
        return;
    }
    const headers = ['ID', 'Name', 'Category', 'Price', 'Stock'];
    const rows = paginatedProducts.value.map(product => [
        product.id,
        product.name,
        product.category,
        product.price.toFixed(2),
        product.stock,
    ]);

    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
        csvContent += row.map(field => (typeof field === 'string' && field.includes(',') ? `"${field.replace(/"/g, '""')}"` : field)).join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'products.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

onMounted(() => {
    fetchProducts();
});
const visible = ref(false);
</script>

<template>
    <div class="container mx-auto p-4">
        <div class="flex justify-end mb-4">
            <user-create-model />
        </div>

        <div class="flex justify-between mb-2">
            <div class="mb-2 flex items-center gap-3 md:mb-0">
                <input v-model="searchQuery" type="text" placeholder="Search Category..."
                    class="px-4 py-2 border outline-none bg-transparent border-slate-400 rounded w-full md:w-64" />
                <button @click="exportToCSV"
                    class="px-4 py-2 gap-2 border-slate-400 bg-slate-500 flex items-center text-white rounded hover:bg-slate-600"
                    :disabled="loading || products.length === 0">
                    Export 
                    <Icon name="material-symbols:download" class="w-5 h-5" />
                </button>
            </div>
            <div>
                <label class="mr-2 font-medium">Items per page:</label>
                <select v-model.number="itemsPerPage"
                    class="px-2 py-1 border border-slate-400 bg-transparent text-slate-400 rounded">
                    <option :value="25">25</option>
                    <option :value="50">50</option>
                    <option :value="100">100</option>
                    <option :value="all">All</option>
                </select>
            </div>
        </div>

        <div class="overflow-x-auto">
            <table class="min-w-full bg-transparent  rounded-sm">
                <thead class="bg-slate-300 dark:bg-slate-700">
                    <tr>
                        <th class="py-2 px-4">ID</th>
                        <th class="py-2 px-4">Image</th>
                        <th class="py-2 px-4">Name</th>
                        <th class="py-2 px-4 text-left">Category</th>
                        <th class="py-2 px-4">Price</th>
                        <th class="py-2 px-4">Stock</th>
                        <th class="py-2 px-4">Status</th>
                        <th class="py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in paginatedProducts" :key="product.id"
                        class=" rounded dark:hover:bg-slate-800 hover:bg-slate-200">
                        <td class="py-2 px-4 text-center">{{ product.id }}</td>
                        <td class="py-2 px-4 text-center">
                            <img :src="'https://dummyimage.com/50x50/000/fff&text=50x50'" alt="Product Image"
                                class="rounded-lg object-cover w-[50px] h-[50px]" />
                        </td>
                        <td class="py-2 px-4 text-left">{{ product.name }}</td>
                        <td class="py-2 px-4 text-left">{{ product.category }}</td>
                        <td class="py-2 px-4 text-center">${{ product.price.toFixed(2) }}</td>
                        <td class="py-2 px-4 text-center">{{ product.stock }}</td>
                        <td class="py-2 px-4 text-center">{{ product.status || 'Active' }}</td>
                        <td class="py-2 px-4 text-center">
                            <button class="">
                                <UserUpdateModel/>
                            </button>
                            <button @click="visible = true" class="text-red-500">
                                <Icon name="material-symbols:delete-outline-rounded" class="w-6 h-6" />
                            </button>
                        </td>
                    </tr>
                    <tr v-if="paginatedProducts.length === 0 && !loading">
                        <td colspan="6" class="text-center py-4">No products found.</td>
                    </tr>
                    <tr v-if="loading">
                        <td colspan="6" class="text-center py-4">Loading products...</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="flex flex-col md:flex-row justify-between items-center mt-4">
            <div class="mb-2 md:mb-0">
                Showing <span class="font-semibold">{{ (currentPage - 1) * itemsPerPage + 1 || 0 }}</span> to
                <span class="font-semibold">{{ Math.min(currentPage * itemsPerPage, filteredProducts.length) || 0
                    }}</span> of
                <span class="font-semibold">{{ filteredProducts.length }}</span> entries
            </div>
            <div class="flex space-x-2">
                <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
                    class="px-3 py-1 border rounded disabled:opacity-50 border-slate-400 disabled:cursor-not-allowed">Previous</button>
                <button v-for="page in visiblePageNumbers" :key="page" @click="goToPage(page)"
                    :class="['px-3 py-1 border rounded', page === currentPage ? 'bg-slate-700 text-white' : 'bg-transparent text-slate-400 hover:bg-slate-700']">
                    {{ page }}
                </button>
                <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
                    class="px-3 py-1 border rounded disabled:opacity-50 border-slate-400 disabled:cursor-not-allowed">Next</button>
            </div>
        </div>
        <div class="card flex justify-center">
            <Dialog @update:visible="visible = $event" :visible="visible" modal header="Delete" :style="{ width: '25rem' }">

                <div class="flex items-center flex-col justify-center">
                    <Icon name="line-md:folder-remove-twotone" class="w-32 h-32 text-red-500" />
                    <p class="text-2xl my-4 mb-6">Are You Sure To Delete ?</p>
                </div>
                <div class="flex justify-between gap-2">
                    <button 
                        class="py-2 px-3 flex items-center gap-2 bg-slate-500 text-white rounded-md text-lg"
                        @click="visible = false"
                        type="button">
                        Cancel
                        <Icon name="material-symbols:cancel-outline-rounded" />
                    </button>
                    <button 
                        class="py-2 flex items-center gap-2 px-3 bg-rose-500 text-white rounded-md text-lg"
                        @click="visible = false"
                        type="button">
                        Delete <i class="pi pi-send"></i>
                    </button>
                </div>
            </Dialog>
        </div>
    </div>
</template>
