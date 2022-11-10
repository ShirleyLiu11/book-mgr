<template>
    <div>
        <a-card
            :title="simple ? 'Recently Added Books' : ''"
        >
            <div v-if="!simple">
                <h2>Book List</h2>

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

                    <a-button 
                        v-only-admin 
                        @click="show = true"
                    >
                        Add new one
                    </a-button>
                </space-between>

                <a-divider />

            </div>
            
            <a-table 
                :columns="columns" 
                :data-source="list"
                :scroll="{ x: 'max-content'}"
                :pagination="false"
                bordered
                >
                <template #publishDate="data">
                    {{ formatTimestamp(data.record.publishDate) }}   
                </template>

                <template #classify="{ record }">
                    {{ getClassifyTitleById(record.classify) }}
                </template>
                  
                <template #count="data">
                    <a href="javascript:;" @click="updateCount('IN_COUNT', data.record)">In</a>
                    {{ data.record.count }}  
                    <a href="javascript:;" @click="updateCount('OUT_COUNT', data.record)">Out</a>  
                </template>

                <template #actions="record" v-if="!simple">
                    <a href="javascript:;" @click="toDetail(record)">Detail</a>
                    &nbsp;
                    <a v-only-admin href="javascript:;" @click="update(record)">Edit</a>
                    &nbsp;
                    <a v-only-admin href="javascript:;" @click="remove(record)">Delete</a>
                </template>
            </a-table>

            <flex-end v-if="!simple" style="margin-top: 24px;">              
                <a-pagination 
                    v-model:current="curPage"
                    :total="total"
                    :page-size="10"
                    @change="setPage"          
                />
            </flex-end>
            
        </a-card>
        
        <add-one 
            v-model:show="show" 
            @getList="getList"
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