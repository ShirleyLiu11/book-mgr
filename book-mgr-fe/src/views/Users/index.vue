<template>
    <div>
        <a-card>
            <h2>User Management</h2>

            <a-divider></a-divider>
            <space-between>
                
                <div class="search">
                    <a-input-search
                        placeholder="Search by account"
                        enter-button
                        v-model:value="keyword"
                        @search="onSearch"
                    />
                    <a v-if="isSearch" href="javascript:;" @click="backAll">Back</a>
                </div>
                <a-button @click="showAddModal = true">Add User</a-button>
            </space-between>

            <a-divider></a-divider>

            <div>
                <a-table 
                    bordered
                    :pagination="false"
                    :columns="columns"
                    :data-source="list"
                >
                    <template #createdAt="{ record }">
                        {{ formatTimestamp(record.meta.createdAt) }}    
                    </template>
                    <template #actions="{ record }">
                        <a href="javascript:;" @click="resetPassword(record)">Reset Password</a>
                        &nbsp;
                        <a href="javascript:;" @click="remove(record)">Delete</a>
                    </template>
                </a-table>
            </div>

            <flex-end style="margin-top: 24px;" v-if="!isSearch">
                <a-pagination
                    v-model:current="curPage"
                    :total="total"
                    :page-size="10"
                    @change="setPage"
                ></a-pagination>
            </flex-end>

        </a-card>
        <add-one 
            v-model:show="showAddModal"
            @getList="getUser"
        />
    </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>

    @import './index.scss';

</style>