<script setup>
const brandName = ref("");
const description = ref("");
const imageFile = ref(null);
const imagePreview = ref(null);
const isDialogVisible = ref(false);
const categoryType = ref("Parent Category"); // State to handle category type selection
const parentCategories = ref(["Category 1", "Category 2", "Category 3"]); // List of parent categories
const selectedParentCategory = ref(null); // Selected parent category

// Function to handle image file change and preview
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  processFile(file);
};

// Function to handle drag-and-drop files
const handleDrop = (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  processFile(file);
};

// Common function to process the file and show preview
const processFile = (file) => {
  if (file) {
    imageFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result; // Display image preview
    };
    reader.readAsDataURL(file);
  }
};

// Prevent the default dragover behavior
const preventDefault = (event) => {
  event.preventDefault();
};

// Function to handle the form submission
const submitForm = () => {
  console.log("Brand Name:", brandName.value);
  console.log("Description:", description.value);
  console.log("Image File:", imageFile.value);
  console.log("Category Type:", categoryType.value);
  console.log("Selected Parent Category:", selectedParentCategory.value);
  isDialogVisible.value = false; // Close the dialog after submission
};

const specifications = ref([
  { image: "", name: "", description: "" }, // Initial empty specification
]);

// Method to add a new specification
const addSpecification = () => {
  specifications.value.push({ key: "", value: "" });
};

// Method to remove a specification
const removeSpecification = (index) => {
  specifications.value.splice(index, 1);
};

const isToggled = ref(false);
</script>

<template>
  <div>
    <!-- Trigger Button for Dialog -->
    <button
      @click="isDialogVisible = true"
      class="py-2 px-3 flex items-center gap-2 bg-slate-500 text-white rounded-md"
      type="button"
    >
      Create Category
      <Icon
        name="material-symbols:add-circle-outline-rounded"
        class="w-5 h-5"
      />
    </button>

    <!-- PrimeVue Dialog Component -->
    <Dialog
      :visible="isDialogVisible"
      @update:visible="isDialogVisible = $event"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      header="Create Category"
      :modal="true"
      :closable="true"
      :style="{ width: '50vw' }"
    >
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-7">
            <!-- Category Name -->
            <div class="flex flex-col mb-2 gap-1">
              <label for="brandName">Category Name *</label>
              <input
                v-model="brandName"
                type="text"
                required
                placeholder="Enter Category Name"
                class="bg-opacity-25 bg-transparent outline-none border-[1px] px-3 py-2 rounded border-slate-400"
              />
            </div>

            <!-- Small Description -->
            <div class="flex flex-col mt-2 gap-1">
              <label for="description">Small Description</label>
              <textarea
                v-model="description"
                placeholder="Enter Category Description"
                class="h-[105px] bg-opacity-25 bg-transparent outline-none border-[1px] px-3 py-2 rounded border-slate-400"
              ></textarea>
            </div>
          </div>

          <!-- Drag and Drop Image Upload and Preview -->
          <div class="col-span-5 flex flex-col gap-1">
            <label for="imageUpload">Upload Image</label>
            <div
              class="border border-dashed border-slate-400 rounded-md flex flex-col items-center justify-center h-48 cursor-pointer hover:bg-slate-400"
              @dragover="preventDefault"
              @drop="handleDrop"
              @click="$refs.fileInput.click()"
            >
              <Icon
                v-if="!imagePreview"
                icon="mdi:cloud-upload-outline"
                class="w-12 h-12 text-slate-400"
              />
              <p v-if="!imagePreview" class="text-sm text-slate-500">
                Drag & Drop or Click to Upload
              </p>
              <img
                v-if="imagePreview"
                :src="imagePreview"
                alt="Image Preview"
                class="w-full h-full object-cover rounded-md border"
              />
            </div>
            <input
              type="file"
              ref="fileInput"
              accept="image/*"
              @change="handleImageUpload"
              class="hidden"
            />
          </div>
        </div>
        <div class="flex flex-row gap-6">
          <!-- Sub Categories -->
          <div class="card border-none mt-2 w-full">
            <label class="font-semibold text-base">Sub Categories</label>

            <!-- Dynamic input fields -->
            <div
              v-for="(spec, index) in specifications"
              :key="index"
              class="flex items-center gap-2 mt-2"
            >
              <div>
                <div
                  class="border border-dashed border-slate-400 rounded-md flex flex-col items-center justify-center h-14 w-16 cursor-pointer hover:bg-slate-400"
                  @dragover="preventDefault"
                  @drop="handleDrop"
                  @click="$refs.fileInput.click()"
                >
                  <Icon
                    v-if="!imagePreview"
                    icon="mdi:cloud-upload-outline"
                    class="w-12 h-12 text-slate-400"
                  />
                  <p v-if="!imagePreview" class="text-sm text-slate-500">
                    Image
                  </p>
                  <img
                    v-if="imagePreview"
                    :src="imagePreview"
                    alt="Image Preview"
                    class="w-full h-full object-cover rounded-md border"
                  />
                </div>
                <input
                  type="file"
                  ref="fileInput"
                  accept="image/*"
                  @change="handleImageUpload"
                  class="hidden"
                />
              </div>
              <input
                type="text"
                class="w-2/5 p-2 border border-slate-400 outline-none bg-transparent rounded-md"
                placeholder="Name"
                v-model="spec.key"
              />
              <input
                type="text"
                class="w-full p-2 border outline-none border-slate-400 bg-transparent rounded-md"
                placeholder="Description"
                v-model="spec.value"
              />
              <div class="flex items-center justify-between gap-3">
                <button
                  type="button"
                  @click="removeSpecification(index)"
                  class="text-red-500 hover:text-red-700"
                >
                  <Icon name="mdi:minus-circle-outline" class="w-5 h-5" />
                </button>
                <!-- Add new specification button -->
                <button
                  type="button"
                  @click="addSpecification"
                  class="text-purple-700 hover:text-purple-900"
                >
                  <Icon name="mdi:plus-circle-outline" class="w-5 h-5 mr-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <template #footer>
        <div class="w-full flex flex-row items-center justify-between">
          <div class="flex items-center justify-center">
            <label for="toggle" class="flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="toggle"
                class="sr-only peer"
                v-model="isToggled"
              />
              <div
                class="block relative bg-cyan-900 w-16 h-9 p-1 rounded-full before:absolute before:bg-cyan-300 before:w-7 before:h-7 before:p-1 before:rounded-full before:transition-all before:duration-500 before:left-1 peer-checked:before:left-8 peer-checked:before:bg-slate-300 peer-checked:bg-slate-700"
              ></div>
            </label>
            <p class="ml-4 text-lg font-semibold">
              {{ isToggled ? "Active" : "Inactive" }}
            </p>
          </div>
          <div class="flex flex-row gap-4">
            <button
              @click="isDialogVisible = false"
              class="py-2 px-3 flex items-center gap-2 bg-rose-500 text-white rounded-md text-lg"
              type="button"
            >
              Cancel
              <Icon name="material-symbols:cancel-outline-rounded" />
            </button>
            <button
              @click="submitForm"
              class="py-2 flex items-center gap-2 px-3 bg-slate-500 text-white rounded-md text-lg"
              type="button"
            >
              Submit <i class="pi pi-send"></i>
            </button>
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<style>
.p-dialog {
  --p-dialog-background: #111827;
  --p-dialog-color: #d1d5db;
  --p-dialog-border-color: var(--p-dialog-background);
}
</style>
