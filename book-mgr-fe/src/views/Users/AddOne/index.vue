<template>
    <div>
        <a-modal
            title="Add a user"
            :visible="props.show"
            @ok="submit"
            @cancel="close"
        >
            <a-form :label-col="{ span: 6 }" >
                <a-form-item  label="Account">
                    <a-input v-model:value="addForm.account" />
                </a-form-item>
                <a-form-item  label="Password">
                    <a-input v-model:value="addForm.password" />
                </a-form-item>
                <a-form-item  label="Role">
                    <a-select
                        v-model:value="addForm.character"
                    >
                        <a-select-option 
                            v-for="item in characterInfo"
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