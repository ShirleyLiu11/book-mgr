<template>
    <div>
        <a-card title="Invite Code Management">
            <div>
                <a-input-number  v-model:value="count" :min="1" :max="10000" />
                &nbsp;
                <a-button type="primary" @click="add">Add</a-button>
            </div>
            <a-divider />
            <div>
                <a-table
                    bordered
                    :columns="columns"
                    :data-source="list"
                    :pagination="false"
                >
                    <template #status="{ record }">
                        {{ record.user ? 'Used' : 'Unused'}}
                    </template>
                    <template #actions="{ record }">
                        <a-button 
                            @click="remove(record)" 
                            type="danger"
                            size="small"
                        >
                            Delete
                        </a-button>
                    </template>
                </a-table>
            </div>
            <flex-end style="margin-top: 24px;">
                <a-pagination 
                    v-model:current="curPage"
                    :pageSize="20"
                    :total="total"
                    @change="setPage"
                    :showSizeChanger="false"

                />
            </flex-end>
        </a-card>
    </div>
</template>

<script src="./index.js"></script>