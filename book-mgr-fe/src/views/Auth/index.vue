
<template>
    <div class="auth">
        <div class="bg"></div>
        
        <div class="title-info">
            <img src="https://cdn-icons-png.flaticon.com/512/3389/3389081.png" alt="icon">
            <h2 class="title">Library Management System Backstage</h2>
        </div>

        <div class="form">
            <a-tabs >
                <a-tab-pane key="1" tab="Login">
                    <div class="item">
                        <a-input size="large" placeholder="Account"/>
                       
                    </div>

                    <div class="item">
                        <a-input size="large" placeholder="Password"/>
                    </div>

                    <div class="item">
                        <a href="">Forget Password</a>
                    </div>

                    <div class="item">
                        <a-button size="large" type="primary">
                            Login
                        </a-button>
                    </div>
                </a-tab-pane>
                <a-tab-pane key="2" tab="Sign up" r>
                    <div class="item">
                        <a-input size="large" placeholder="Account"/>
                    </div>

                    <div class="item">
                        <a-input size="large" placeholder="Password"/>
                    </div>

                    <div class="item">
                        <a-input size="large" placeholder="Invitation Code"/>
                    </div>

                    <div class="item">
                        <a-button size="large" type="primary">
                            Sign up
                        </a-button>
                    </div>
                </a-tab-pane>
            </a-tabs>

        </div>
    </div>
</template>

<script scr="./index.js"></script>

<style lang="scss" scoped>
    @import './index.scss';
</style>