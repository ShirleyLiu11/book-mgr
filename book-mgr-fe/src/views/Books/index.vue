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
                />
                </div>

                <a-button>Add new one</a-button>
            </space-between>

            <a-divider />
            <a-table :columns="columns" :data-source="dataSource">
                
            </a-table>
            
        </a-card>
    </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
    @import './index.scss';
</style>