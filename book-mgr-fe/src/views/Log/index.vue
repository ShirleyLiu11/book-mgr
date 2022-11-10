<template>
    <div>
        <a-spin :spinning="loading">
            <a-card
                :title="simple ? 'Recently Operation Log' : ' '"
            >
                <div v-if="!simple">
                    <h2>Operation Log</h2>

                    <a-divider />  
                </div>
               

                <div>
                    <a-table
                    bordered
                    :columns="columns"
                    :data-source="list"
                    :pagination="false"
                    :scroll="{ x: 'max-content' }"
                    >
                    <template #createdAt="{ record }">
                        {{ formatTimestamp(record.meta.createdAt) }}
                    </template>
                    <template #action="{ record }" v-if="!simple">
                        <a href="javascript:;" @click="remove(record)">Delete</a>
                    </template>
                    </a-table>
                </div>


                <flex-end style="margin-top: 24px" v-if="!simple">
                    <a-pagination 
                    v-model:current="curPage"
                    :pageSize="20"
                    :total="total"
                    @change="setPage"
                    :showSizeChanger="false"
                    />
                </flex-end>
             </a-card>
            
        </a-spin>
    </div>
</template>

<script src="./index.js"></script>