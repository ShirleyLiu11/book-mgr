<template>
    <div>
        <a-card>
            <space-between>
                <h2>{{ d.name }}</h2>
                <div>
                    <a-button size="small" type="primary" @click="showUpdateModal = true">Edit</a-button>
                    &nbsp;
                    <a-button size="small" type="danger" @click="remove">Delete</a-button>
                </div>
            </space-between>

            <a-divider />

            <div class="base-info">
                <div class="items">
                    <div class="item">
                        <div class="title">Price</div>
                        <div class="content">{{ d.price }}</div>
                    </div>
                    <div class="item"> 
                        <div class="title">Author</div>
                        <div class="content">{{ d.author }}</div>
                    </div>
                    <div class="item">
                        <div class="title">Category</div>
                        <div class="content">{{ d.classify }}</div>
                    </div>
                </div>
                <div class="items">
                    <div class="item">
                        <div class="title">Publish Date</div>
                        <div class="content">{{ formatTimestamp(d.publishDate) }}</div>
                    </div>
                    <div class="item">
                        <div class="title">In stock count</div>
                        <div class="content">{{ d.count }}</div>
                    </div>
                    <div class="item" />

                </div>
            </div>
        </a-card>

        <div class="log">
            <a-card title="Stock Log ">
            <template #extra>
                <span>
                    <a href="javascript:;" @click="logFilter('IN_COUNT')">
                        <CheckOutlined v-if="curLogType === 'IN_COUNT'" />
                        Stock-in Log
                    </a>
                </span>
                <span style="margin-left: 16px;">
                    <a href="javascript:;" @click="logFilter('OUT_COUNT')">
                        <CheckOutlined v-if="curLogType === 'OUT_COUNT'"/>
                        Stock-out Log
                    </a>
                </span>                
            </template>
            <div>
                <a-table 
                    :data-source="log" 
                    :columns="columns" 
                    bordered 
                    :pagination="false"
                >
                    <template #createdAt="{ record }">
                        {{ formatTimestamp(record.meta.createdAt) }}
                    </template>
                </a-table>
            </div>
            <space-between style="margin-top: 24px;">
                <div />
                <a-pagination 
                    v-model:current="logCurPage"
                    :total="logTotal"
                    :page-size="10"
                    @change="setLogPage"
                />
            </space-between>

            </a-card>
        </div>      
    </div>
    <update 
        v-model:show="showUpdateModal"   
        :book="d"     
        @update="update"  
    />
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
    @import './index.scss';
</style>