<script setup>
import { usePrimeVue } from 'primevue/config';
import { useToast } from "primevue/usetoast";
import Editor from 'primevue/editor';



// Reactive object to hold form data
const formData = ref({})
const value = ref(null);
const editor = ref('');
const countries = ref([
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' }
]);


const specifications = ref([
    { key: '', value: '' } // Initial empty specification
]);

// Method to add a new specification
const addSpecification = () => {
    specifications.value.push({ key: '', value: '' });
};

// Method to remove a specification
const removeSpecification = (index) => {
    specifications.value.splice(index, 1);
};

// Form submission handler
const handleSubmit = async () => {
    console.log('Form Data:', formData.value)

    // Send the form data to the provided API endpoint
    try {
        const { data, error } = await useFetch(props.apiendpoint, {
            method: 'POST',
            body: formData.value,
        })

        if (error.value) {
            console.error('Error submitting data:', error.value)
        } else {
            console.log('API response:', data.value)
        }
    } catch (error) {
        console.error('Submission failed:', error)
    }
}


/// File Upload
const $primevue = usePrimeVue();
const toast = useToast();

const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);

const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
    removeFileCallback(index);
    totalSize.value -= parseInt(formatSize(file.size));
    totalSizePercent.value = totalSize.value / 10;
};

const onClearTemplatingUpload = (clear) => {
    clear();
    totalSize.value = 0;
    totalSizePercent.value = 0;
};

const onSelectedFiles = (event) => {
    files.value = event.files;
    files.value.forEach((file) => {
        totalSize.value += parseInt(formatSize(file.size));
    });
};

const uploadEvent = (callback) => {
    totalSizePercent.value = totalSize.value / 10;
    callback();
};

const onTemplatedUpload = () => {
    toast.add({ severity: "info", summary: "Success", detail: "File Uploaded", life: 3000 });
};

const formatSize = (bytes) => {
    const k = 1024;
    const dm = 3;
    const sizes = $primevue.config.locale.fileSizeTypes;

    if (bytes === 0) {
        return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
};
const isToggled = ref(true);

// Watcher to track changes in the toggle's value
watch(isToggled, (newValue) => {
    console.log('Toggle value:', newValue) 
})

</script>


<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <!-- Conditionally render fields based on props -->
            <div class="grid grid-cols-12 gap-5">
                <!--Inputs-->
                <div class="col-span-7 ">
                    <!--Name-->
                    <div class="flex flex-col mb-2 gap-1">
                        <label for="username">Name *</label>
                        <input v-model="value" type="text" required placeholder="Enter Product Name"
                            class=" bg-opacity-25 bg-transparent outline-none border-[1px] px-3 py-2 rounded  border-slate-400" />
                    </div>
                    <!--Brand & Category-->
                    <div class="flex flex-row mb-2 gap-2">
                        <div class="w-full flex flex-col gap-2">
                            <label for="brand">Brand</label>
                            <div class="card flex justify-center">
                                <Select v-model="formData.brand" :options="countries" filter optionLabel="name"
                                    placeholder="Select a Brand" class="w-full">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value" class="flex items-center">
                                            <img :alt="slotProps.value.label"
                                                src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                                                :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`"
                                                style="width: 18px" />
                                            <div>{{ slotProps.value.name }}</div>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                    <template #option="slotProps">
                                        <div class="flex items-center">
                                            <img :alt="slotProps.option.label"
                                                src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                                                :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`"
                                                style="width: 18px" />
                                            <div>{{ slotProps.option.name }}</div>
                                        </div>
                                    </template>
                                </Select>
                            </div>
                        </div>

                        <div class="w-full flex flex-col gap-2">
                            <label for="Category">Category *</label>
                            <div class="card flex justify-center">
                                <Select v-model="formDatacategory" :options="countries" :invalid="formData.category"
                                    filter optionLabel="name" placeholder="Select a Category" class="w-full">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value" class="flex items-center">
                                            <img :alt="slotProps.value.label"
                                                src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                                                :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`"
                                                style="width: 18px" />
                                            <div>{{ slotProps.value.name }}</div>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                    <template #option="slotProps">
                                        <div class="flex items-center">
                                            <img :alt="slotProps.option.label"
                                                src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                                                :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`"
                                                style="width: 18px" />
                                            <div>{{ slotProps.option.name }}</div>
                                        </div>
                                    </template>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <!--Model & SKU -->
                    <div class="flex flex-row mb-2 gap-2">
                        <div class="w-full flex flex-col gap-1">
                            <label for="sku">SKU</label>
                            <input v-model="value" type="text" required placeholder="Enter SKU"
                                class=" bg-opacity-25 bg-transparent outline-none border-[1px] px-3 py-2 rounded  border-slate-400" />
                        </div>
                        <div class="w-full flex flex-col gap-1">
                            <label for="model">Model</label>
                            <input v-model="value" type="text" required placeholder="Enter Mdoel"
                                class=" bg-opacity-25 bg-transparent outline-none border-[1px] px-3 py-2 rounded  border-slate-400" />
                        </div>
                    </div>
                    <!--Price & Discount-->
                    <div class="flex flex-row gap-2">
                        <div class="w-full flex flex-col gap-1">
                            <label for="price">Price *</label>
                            <input v-model="value" type="text" required placeholder="Enter Price"
                                class=" bg-opacity-25 bg-transparent outline-none border-[1px] px-3 py-2 rounded  border-slate-400" />
                        </div>
                        <div class="w-full flex flex-col gap-1">
                            <label for="discount">Discount</label>
                            <input v-model="value" type="text" required placeholder="Enter Discount"
                                class=" bg-opacity-25 bg-transparent outline-none border-[1px] px-3 py-2 rounded  border-slate-400" />
                        </div>
                    </div>
                    <!-- Small Description -->
                    <div class="flex flex-col mt-2 gap-1">
                        <label for="Description">Small Description</label>
                        <textarea v-model="value" type="text" required placeholder="Enter Product Name"
                            class="h-[105px] bg-opacity-25 bg-transparent outline-none border-[1px] px-3 py-2 rounded  border-slate-400" />
                    </div>
                </div>
                <!--Images-->
                <div class="col-span-5">
                    <!-- Add Fiels as needed -->
                    <div class="card mt-4">
                        <Toast />
                        <FileUpload name="demo[]" url="/api/upload" @upload="onTemplatedUpload($event)" :multiple="true"
                            accept="image/*" :maxFileSize="1000000" @select="onSelectedFiles">
                            <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
                                <div class="flex flex-wrap justify-between items-center flex-1 gap-2">
                                    <div class="flex gap-2">
                                        <Button @click="chooseCallback()" icon="pi pi-images" rounded outlined
                                            severity="secondary"></Button>
                                        <Button @click="uploadEvent(uploadCallback)" icon="pi pi-cloud-upload" rounded
                                            outlined severity="success"
                                            :disabled="!files || files.length === 0"></Button>
                                        <Button @click="clearCallback()" icon="pi pi-times" rounded outlined
                                            severity="danger" :disabled="!files || files.length === 0"></Button>
                                    </div>
                                    <ProgressBar :value="totalSizePercent" :showValue="false"
                                        class="md:w-20rem h-1 w-full md:ml-auto">
                                        <span class="whitespace-nowrap">{{ totalSize }}B / 1Mb</span>
                                    </ProgressBar>
                                </div>
                            </template>
                            <template
                                #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
                                <div class="flex flex-col gap-2">
                                    <div v-if="files.length > 0">
                                        <h5>Pending</h5>
                                        <div class="flex flex-wrap gap-2">
                                            <div v-for="(file, index) of files" :key="file.name + file.type + file.size"
                                                class="p-1 rounded flex flex-col border border-slate-500 items-center">
                                                <div>
                                                    <img role="presentation" :alt="file.name" :src="file.objectURL"
                                                        class="h-[5.5rem] w-[6.1rem] rounded-sm object-cover" />
                                                </div>

                                                <div class="flex flex-col items-center">
                                                    <p class="text-xs">{{ formatSize(file.size) }}</p>
                                                    <div class="flex items-center justify-between gap-2">
                                                        <Badge value="Pending" class="text-xs" severity="warn" />
                                                        <button class=""
                                                            @click="onRemoveTemplatingFile(file, removeFileCallback, index)"
                                                            severity="danger">
                                                            <i
                                                                class="pi pi-trash text-rose-100 bg-rose-600 p-1 rounded"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div v-if="uploadedFiles.length > 0">
                                        <h5>Completed</h5>
                                        <div class="flex flex-wrap gap-2">
                                            <div v-for="(file, index) of uploadedFiles"
                                                :key="file.name + file.type + file.size"
                                                class="p-1 relative rounded flex flex-col border border-slate-500 items-center">
                                                <div>
                                                    <img role="presentation" :alt="file.name" :src="file.objectURL"
                                                        width="100" height="50"
                                                        class="h-[5.5rem] w-[6.1rem] rounded-sm object-cover" />
                                                </div>
                                                <div class="flex flex-col items-center">
                                                    <p class="text-xs">{{ formatSize(file.size) }}</p>
                                                    <div class="flex items-center justify-between gap-1">
                                                        <Badge value="Complete" class="text-xs" severity="success" />
                                                        <button class=""
                                                            @click="onRemoveTemplatingFile(file, removeUploadedFileCallback, index)"
                                                            severity="danger">
                                                            <i
                                                                class="pi pi-trash text-rose-100 bg-rose-600 p-1 rounded"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template #empty>
                                <div class="flex items-center justify-center flex-col">
                                    <i
                                        class="pi pi-cloud-upload !border-2 !rounded-full !p-8 !text-4xl !text-muted-color" />
                                    <p class="mt-6 mb-0">Drag and drop files to here to upload.</p>
                                </div>
                            </template>
                        </FileUpload>
                    </div>
                </div>
            </div>
            <!-- Description -->
            <div class="card mt-2">
                <label class="font-semibold text-base" for="Description">Product Details</label>
                <Editor v-model="editor" editorStyle="height: 320px" />
            </div>
            <!-- Specification -->
            <div class="card border-none mt-2">
                <label class="font-semibold text-base">Specification</label>

                <!-- Dynamic input fields -->
                <div v-for="(spec, index) in specifications" :key="index" class="flex items-center gap-2 mt-2">
                    <input type="text" class="w-1/2 p-2 border border-slate-400 outline-none bg-transparent  rounded-md"
                        placeholder="Key" v-model="spec.key" />
                    <input type="text" class="w-1/2 p-2 border outline-none border-slate-400 bg-transparent rounded-md"
                        placeholder="Value" v-model="spec.value" />
                    <div class="flex items-center justify-between gap-3">
                        <button type="button" @click="removeSpecification(index)"
                            class="text-red-500 hover:text-red-700">
                            <Icon name="mdi:minus-circle-outline" class="w-5 h-5" />
                        </button>
                        <!-- Add new specification button -->
                        <button type="button" @click="addSpecification" class=" text-purple-700 hover:text-purple-900">
                            <Icon name="mdi:plus-circle-outline" class="w-5 h-5 mr-1" />
                        </button>
                    </div>
                </div>


            </div>
            <!-- Submit Button -->
            <div class=" w-full flex justify-between items-center pt-5">
                <div class="flex items-center justify-center">
                    <label for="toggle" class="flex items-center cursor-pointer">
                        <input type="checkbox" id="toggle" class="sr-only peer" v-model="isToggled">
                        <div
                            class="block relative bg-cyan-900 w-16 h-9 p-1 rounded-full before:absolute before:bg-cyan-300 before:w-7 before:h-7 before:p-1 before:rounded-full before:transition-all before:duration-500 before:left-1 peer-checked:before:left-8 peer-checked:before:bg-slate-300 peer-checked:bg-slate-700">
                        </div>
                    </label>
                    <p class="ml-4 text-lg font-semibold">{{ isToggled ? 'Active' : 'Inactive' }}</p>
                </div>
                <button class="py-3 px-4 text-lg bg-slate-500 text-white rounded-md mt-3" type="submit">Submit <i
                        class="pi pi-send"></i>
                </button>
            </div>
        </form>
    </div>
</template>


<style scoped>
.p-select {
    --p-select-background: transparent;
    --p-select-placeholder-color: #94a3b8;
    --p-select-hover-border-color: #94a3b8;
    --p-select-padding-y: 0.5rem;
    --p-select-focus-ring-width: 0px;
}


.p-badge {
    --p-badge-padding: 0.10rem 0.25rem;
}

.p-fileupload {
    --p-fileupload-color: #94a3b8;
    --p-fileupload-background: transparent;
    --p-fileupload-border-color: #94a3b8;
}

.p-editor,
.p-editor-toolbar,
.p-editor-content {
    --p-editor-toolbar-background: transparent;
    --p-editor-content-background: transparent;
    --p-editor-overlay-background: #111827;
    --p-editor-overlay-color: #dfe5f4;
    --p-editor-overlay-option-color: #dfe5f4;
    --p-editor-overlay-padding: 0px;
    --p-editor-overlay-border-color: #94a3b8;
    --p-editor-toolbar-border-color: #94a3b8;
    --p-editor-content-border-color: #94a3b8;
    --p-editor-content-color: #94a3b8;
    --p-editor-toolbar-item-hover-color: #e11d48;
    --p-editor-toolbar-item-active-color: #e11d48;
}
</style>