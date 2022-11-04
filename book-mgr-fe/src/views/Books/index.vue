<template>
    <div>
        <a-card>
            <h2 class="header">Book List</h2>

            <a-divider />

            <space-between>
                <div class="search">
                    <a-input-search
                        placeholder="Search by title"
                        enter-button
                        v-model:value="keyword"
                        @search="onSearch"
                    />
                    <a v-if="isSearch" href="javascript:;" @click="backAll">Back</a>
                </div>

                <a-button @click="show = true">Add new one</a-button>
            </space-between>

            <a-divider />
            <a-table 
                :columns="columns" 
                :data-source="list"
                :pagination="false"
                bordered
                >
                <template #publishDate="data">
                    {{ formatTimestamp(data.record.publishDate) }}   
                </template>
                <template #count="data">
                    <a href="javascript:;" @click="updateCount('IN_COUNT', data.record)">In</a>
                    {{ data.record.count }}  
                    <a href="javascript:;" @click="updateCount('OUT_COUNT', data.record)">Out</a>  
                </template>
                <template #actions="record">
                    <a href="javascript:;" @click="toDetail(record)">Detail</a>
                    &nbsp;
                    <a href="javascript:;" @click="update(record)">Edit</a>
                    &nbsp;
                    <a href="javascript:;" @click="remove(record)">Delete</a>
                </template>
            </a-table>

            <space-between style="margin-top: 24px;">
                <div />
                <a-pagination 
                    v-model:current="curPage"
                    :total="total"
                    :page-size="10"
                    @change="setPage"
                />
            </space-between>
            
        </a-card>
        
        <add-one 
            v-model:show="show" 
                      
        />
        <update 
            v-model:show="showUpdateModal"   
            :book="curEditBook"     
            @update="updateCurBook"  
        />
    </div>
</template>

<script src="./index.jsx"></script>

<style lang="scss" scoped>
    @import './index.scss';
</style>