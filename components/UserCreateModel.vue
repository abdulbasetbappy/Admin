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

// Function to send the form data to the API
const formData = ref({
    name: "",
    password: "",
    email: '',
    phone: '12345678978',
    image: imageFile.value,
})

// Send Post Request to the API
const sendPostRequest = async (formData) => {
    try {
        const response = await fetch("http://localhost:3030/api/users/register", {
            method: "POST",
            body: formData,
        });
        if (response.ok) {
            console.log("User Created Successfully");
        } else {
            console.error("Failed to Create User");
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

</script>

<template>
    <div>
        <!-- Trigger Button for Dialog -->
        <button @click="isDialogVisible = true" class="py-2 px-3 flex items-center gap-2 bg-slate-500 text-white rounded-md" type="button">
            Add New User
            <Icon name="material-symbols:add-circle-outline-rounded" class="w-5 h-5" />
        </button>

        <!-- PrimeVue Dialog Component -->
        <Dialog :visible = "isDialogVisible" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" @update:visible="isDialogVisible = $event"
            header="Add User" :modal="true" :closable="true" :style="{ width: '50vw' }">

                <form @submit.prevent="submitForm">
                    <div class="grid grid-cols-12 gap-6">
                        <div class="col-span-7">
                            <!-- User Name -->
                            <div class="flex flex-col mb-2 gap-1">
                                <label for="brandName">User Name *</label>
                                <input v-model="formData.name" type="text" required placeholder="Enter User Name"
                                    class="bg-opacity-25 bg-transparent outline-none border-[1px] px-3 py-1 rounded border-slate-400" />
                            </div>
                            <!-- Small Description -->
                            <div class="flex flex-col mt-2 gap-1">
                                <label for="description">Enter Email</label>
                                <input v-model="formData.email" placeholder="Enter Email"
                                    class="bg-opacity-25 bg-transparent outline-none border-[1px] px-3 py-1 rounded border-slate-400">
                            </div>

                            <div class="flex flex-col mt-2 gap-1">
                                <label for="description">Enter Password</label>
                                <input v-model="formData.password" placeholder="Enter Your Password"
                                    class="bg-opacity-25 bg-transparent outline-none border-[1px] px-3 py-1 rounded border-slate-400">
                            </div>
                            <div class="flex flex-col mt-2 gap-1">
                                <label for="description">Confirm Password</label>
                                <input v-model="formData.password" placeholder="Confirm Your Password"
                                    class="bg-opacity-25 bg-transparent outline-none border-[1px] px-3 py-1 rounded border-slate-400">
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
                    <div class="flex items-center justify-center">
                        <label for="toggle" class="flex items-center cursor-pointer">
                            <input type="checkbox" id="toggle" class="sr-only peer" v-model="isToggled">
                            <div
                                class="block relative bg-cyan-900 w-16 h-9 p-1 rounded-full before:absolute before:bg-cyan-300 before:w-7 before:h-7 before:p-1 before:rounded-full before:transition-all before:duration-500 before:left-1 peer-checked:before:left-8 peer-checked:before:bg-slate-300 peer-checked:bg-slate-700">
                            </div>
                        </label>
                        <p class="ml-4 text-lg font-semibold">{{ isToggled ? 'Active' : 'Inactive' }}</p>
                    </div>
                    <div class="flex flex-row gap-4">
                        <button @click="isDialogVisible = false"
                            class="py-2 px-3 flex items-center gap-2 bg-rose-500 text-white rounded-md text-lg" type="button">
                            Cancel
                            <Icon name="material-symbols:cancel-outline-rounded" />
                        </button>
                        <button @click="sendPostRequest(formData)"
                            class="py-2 flex items-center gap-2 px-3 bg-slate-500 text-white rounded-md text-lg" type="button">
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
    --p-dialog-color: #D1D5DB;
    --p-dialog-border-color: var(--p-dialog-background)
}
</style>