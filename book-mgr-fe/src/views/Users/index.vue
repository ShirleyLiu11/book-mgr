<template>
    <div>
        <a-card v-only-admin>
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
                <div>
                    <a-button @click="showAddModal = true">Add User</a-button>
                    &nbsp;
                    <a-upload
                        action="http://localhost:3000/upload/file"
                    >
                        <a-button @click="upload" type="primary">Upload Excel</a-button>
                    </a-upload>                  
                </div>    
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
                    <template #character="{ record }">
                        <a href="javascript:;" @click="onEdit(record)"><EditOutlined /></a>
                        {{ getCharacterInfoById(record.character).title }}    
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
        <a-modal
        v-model:visible="showEditCharacterModal"
        title="Edit Role"
        @ok="updateCharacter"
        >
            <a-select
                v-model:value="editForm.character"
                style="width: 220px"
            >
                <a-select-option 
                    v-for="item in characterInfo"
                    :key="item._id"
                    :value="item._id"
                >
                    {{ item.title }}
                </a-select-option>
            </a-select>
        </a-modal>
    </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>

    @import './index.scss';

</style>