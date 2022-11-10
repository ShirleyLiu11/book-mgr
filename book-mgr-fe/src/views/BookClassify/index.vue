<template>
    <div>
        <a-card title="Book Category Management">
            <div>
                <a-input 
                    v-model:value="title"
                    placeholder="Input book category" 
                    style="width: 200px"
                ></a-input>
                &nbsp;
                <a-button @click="add" type="primary">Add</a-button>
            </div>
            <a-divider />
            <div>
                <a-table
                bordered
                :columns="columns"
                :data-source="list"
                :pagination="false"
                >
                    <template #actions="{ record }">
                        <a-button 
                            size="small" 
                            type="primary"
                            @click="updateTitle(record)"
                        >
                            Edit
                        </a-button>
                        &nbsp;
                        <a-button 
                            size="small" 
                            @click="remove(record)"
                            type="danger"
                        >
                            Delete
                        </a-button>
                    </template>
                </a-table>
            </div>
        </a-card>    
    </div>
</template>

<script src="./index.jsx"></script>