<template>
    <div>
        <a-card title="Reset Password Application List">
            <a-table
                bordered
                :data-source="list"
                :columns="columns"
                :pagination="false"
            >
                <template #actions="{ record }">
                    <a-button size="small" type="primary" @click="changeStatus(record, 2)">Reset</a-button>
                    &nbsp;
                    <a-button size="small" type="danger" @click="changeStatus(record, 3)">Ignore</a-button>
                </template>
            </a-table>

            <flex-end style="margin-top: 24px">
                <a-pagination
                    v-model:current="curPage"
                    :pageSize="20"
                    :total="total"
                    @change="setPage"
                    :showSizeChanger="false"
                >

                </a-pagination>
            </flex-end>

        </a-card>

    </div>
</template>

<script src="./index.js"></script>