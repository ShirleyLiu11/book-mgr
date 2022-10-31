<template>
    <div class="basic-layout">
        <div class="app-header">
            <div class="left">
                <img src="https://cdn-icons-png.flaticon.com/512/3389/3389081.png" alt="icon">
                <div class="title">Library Management System</div>
            </div>
            <div class="right">
                <div class="hello-msg">Hello, xx</div>
                <div class="logout">Log Out</div>
            </div>
        </div>
        <div class="app-header-placeholder"></div>
        <div class="app-content">
            <div class="left">
                <app-nav />
            </div>
            <div class="right">
                <router-view />
            </div>
        </div>

    </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
    @import './index.scss';
</style>