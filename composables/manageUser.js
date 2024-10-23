import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

export function useManageUser() {
  // State Variables
  const products = ref([]);
  const searchQuery = ref("");
  const currentPage = ref(1);
  const itemsPerPage = ref(25);
  const all = "all";
  const loading = ref(true);
  const visible = ref(false);
  const isToggled = ref(true);
  const dataNotFound = ref(false);

  // Items Filter By Number Dropdown
  const itemsDropdownOpen = ref(false);
  const openItemsDropdown = () => {
    itemsDropdownOpen.value = !itemsDropdownOpen.value;
  };
  //Export Toggle Dropdown
  const exportDropdownOpen = ref(false);
  const toggleExportDropdown = () => {
    exportDropdownOpen.value = !exportDropdownOpen.value;
  };
  // Role Dropdown
  const roleDropdownOpen = ref(null);
  const openRoleDropdown = (id) => {
    roleDropdownOpen.value = roleDropdownOpen.value === id ? null : id;
  };
  // Method to set role
  const setRole = (id, role) => {
    const product = products.value.find((prod) => prod.id === id);
    if (product) {
      product.role = role;
      roleDropdownOpen.value = null;
    }
  };

  // Watcher to track changes in the toggle's value
  watch(isToggled, (newValue) => {
    console.log("Toggle value:", newValue);
  });

  // Fetch Products from DummyJSON
  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products?limit=150");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      products.value = data.products.map((product) => ({
        id: product.id,
        name: product.title,
        category: product.category,
        price: product.price,
        stock: product.stock,
      }));
      if (products.value.length === 0) dataNotFound.value = true;
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to fetch products. Please try again later.");
    } finally {
      loading.value = false;
    }
  };
  // Fetch Products on Component Mount
  onMounted(() => {
    fetchProducts();
  });
  // Computed Properties
  const filteredProducts = computed(() => {
    if (!searchQuery.value) return products.value;
    return products.value.filter((product) =>
      Object.values(product)
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())
    );
  });

  //Total Pages
  const totalPages = computed(() => {
    if (itemsPerPage.value === all) return 1;
    return Math.ceil(filteredProducts.value.length / itemsPerPage.value);
  });
  // Paginated Products
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
        pages.push(1, 2, 3, "...", totalPages.value);
      } else if (currentPage.value >= totalPages.value - 2) {
        pages.push(
          1,
          "...",
          totalPages.value - 2,
          totalPages.value - 1,
          totalPages.value
        );
      } else {
        pages.push(1, "...", currentPage.value, "...", totalPages.value);
      }
    }
    return pages;
  });
  // Methods
  const goToPage = (page) => {
    if (page === "..." || page < 1 || page > totalPages.value) return;
    currentPage.value = page;
  };

  // Export to CSV
  const exportToCSV = () => {
    if (paginatedProducts.value.length === 0) {
      alert("No data available to export.");
      return;
    }
    const headers = ["SN", "Name", "Role", "Email", "Phone"];
    const rows = paginatedProducts.value.map((product) => [
      product.id,
      product.name,
      product.category,
      product.price.toFixed(2),
      product.stock,
    ]);

    let csvContent = headers.join(",") + "\n";
    rows.forEach((row) => {
      csvContent +=
        row
          .map((field) =>
            typeof field === "string" && field.includes(",")
              ? `"${field.replace(/"/g, '""')}"`
              : field
          )
          .join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Users.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toggleExportDropdown();
  };
  // Export to Excel Function (Using xlsx library)
  const exportToExcel = () => {
    const headers = ["SN", "Name", "Category", "Price", "Stock"];
    const rows = products.value.map((product) => [
      product.id,
      product.name,
      product.category,
      product.price.toFixed(2),
      product.stock,
    ]);

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    XLSX.utils.book_append_sheet(wb, ws, "Products");

    XLSX.writeFile(wb, "Products.xlsx");
    toggleExportDropdown();
  };
  // Export to PDF Function (Using jsPDF)
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Products List", 20, 20);

    const headers = [["SN", "Name", "Category", "Price", "Stock"]];
    const rows = products.value.map((product) => [
      product.id,
      product.name,
      product.category,
      product.price.toFixed(2),
      product.stock,
    ]);

    doc.autoTable({
      head: headers,
      body: rows,
    });

    doc.save("Products.pdf");
    toggleExportDropdown();
  };
  // Print Function
  const printTable = () => {
    window.print();
    toggleExportDropdown();
  };

  // Return all the necessary state and functions
  return {
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
  };
}
