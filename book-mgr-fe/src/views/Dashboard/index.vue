<template>
    <div>
        <a-spin :spinning="loading">
            <a-card>
                <div class="list">
                    <div class="item">
                        <div class="count">Total {{ baseInfo.total.book }}</div>
                        <div class="title">Book</div>
                    </div>
                    <div class="item">
                        <div class="count">Total {{ baseInfo.total.user }}</div>
                        <div class="title">User</div>
                    </div>
                    <div class="item">
                        <div class="count">Total {{ baseInfo.total.log }}</div>
                        <div class="title">Log</div>
                    </div>
                </div>
        </a-card>
        </a-spin>

        <div class="table-list">
            <div class="left">
                <book simple/>
            </div>
            <div class="right">
                <log simple/>
            </div>
        </div>
    </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
    @import './index.scss';
</style>