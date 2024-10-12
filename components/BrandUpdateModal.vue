<script setup>
const brandName = ref("");
const description = ref("");
const imageFile = ref(null);
const imagePreview = ref(null);
const isDialogVisible = ref(false);

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
    // Close the dialog after submission
    isDialogVisible.value = false;
};

</script>

<template>
    <div>
        <!-- Trigger Button for Dialog -->
        <button @click="isDialogVisible = true" class="text-blue-500 hover:underline mr-2">
            <Icon name="material-symbols:edit-square-outline-rounded" class="w-6 h-6" />        </button>

        <!-- PrimeVue Dialog Component -->
        <Dialog :visible = "isDialogVisible" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" maximizable
            header="Update Brand" :modal="true" :closable="false" :style="{ width: '50vw' }">

                <form @submit.prevent="submitForm">
                    <div class="grid grid-cols-12 gap-6">
                        <div class="col-span-7">
                            <!-- Brand Name -->
                            <div class="flex flex-col mb-2 gap-1">
                                <label for="brandName">Brand Name *</label>
                                <input v-model="brandName" type="text" required placeholder="Enter Brand Name"
                                    class="bg-opacity-25 bg-transparent outline-none border-[1px] px-3 py-2 rounded border-slate-400" />
                            </div>
                            <!-- Small Description -->
                            <div class="flex flex-col mt-2 gap-1">
                                <label for="description">Small Description</label>
                                <textarea v-model="description" placeholder="Enter Product Description"
                                    class="h-[105px] bg-opacity-25 bg-transparent outline-none border-[1px] px-3 py-2 rounded border-slate-400"></textarea>
                            </div>
                        </div>
                        <!-- Drag and Drop Image Upload and Preview -->
                        <div class="col-span-5 flex flex-col gap-1">
                            <label for="imageUpload">Upload Image</label>
                            <div class="border border-dashed border-slate-400 rounded-md flex flex-col items-center justify-center h-48 cursor-pointer hover:bg-gray-50"
                                @dragover="preventDefault" @drop="handleDrop" @click="$refs.fileInput.click()">
                                <Icon v-if="!imagePreview" icon="mdi:cloud-upload-outline"
                                    class="w-12 h-12 text-slate-400" />
                                <p v-if="!imagePreview" class="text-sm text-slate-500">Drag & Drop or Click to Upload
                                </p>
                                <img v-if="imagePreview" :src="imagePreview" alt="Image Preview"
                                    class="w-full h-full object-cover rounded-md border" />
                            </div>
                            <input type="file" ref="fileInput" accept="image/*" @change="handleImageUpload"
                                class="hidden" />
                        </div>
                    </div>
                </form>
            
            <template #footer>
                <div class="w-full flex flex-row items-center justify-between">
                    <button @click="isDialogVisible = false" class="py-2 px-3 flex items-center gap-2 bg-rose-500 text-white rounded-md"
                        type="button">
                        Cancel
                        <Icon name="material-symbols:cancel-outline-rounded" />
                    </button>
                    <button @click="submitForm" class="py-2 px-3 flex items-center gap-2 bg-slate-500 text-white rounded-md" type="button">
                        Update Now <i class="pi pi-send"></i>
                    </button>
                </div>
            </template>
        </Dialog>
    </div>
</template>
<style>
.p-dialog {
    --p-dialog-background: #111827;
    --p-dialog-color: #D1D5DB;
    --p-dialog-border-color: var(--p-dialog-background)
}
</style>