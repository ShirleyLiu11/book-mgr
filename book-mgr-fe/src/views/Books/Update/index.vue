<template>
    <div>
        <a-modal
            title="Add book"
            :visible="props.show"
            @ok="submit"
            @cancel="close"
        >
            <a-form :label-col="{ span: 6 }" >
                <a-form-item  label="Book Title">
                    <a-input v-model:value="editForm.name" />
                </a-form-item>
                <a-form-item  label="Price">
                    <a-input-number v-model:value="editForm.price" :min="0" :max="9999999999" />
                </a-form-item>
                <a-form-item label="Author">
                    <a-input v-model:value="editForm.author" />
                </a-form-item>
                <a-form-item label="Publish Date">
                    <a-date-picker v-model:value="editForm.publishDate"/>
                </a-form-item>
                <!-- classifyList -->
                <a-form-item label="Category"> 
                    <a-select
                        v-model:value="editForm.classify"
                        >
                        <a-select-option 
                            v-for="item in store.bookClassify"
                            :key="item._id"
                            :value="item._id"
                        >
                            {{ item.title }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script src="./index.js"></script>