
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
                        <a-input 
                        size="large" 
                        placeholder="Account"
                        v-model:value="loginForm.account"
                        >
                            <template
                            v-slot:prefix
                            >
                                <UserOutlined />
                            </template>
                        </a-input>
                       
                    </div>

                    <div class="item">
                        <a-input 
                        size="large" 
                        placeholder="Password"
                        v-model:value="loginForm.password"
                        >
                            <template
                            v-slot:prefix
                            >
                                <LockOutlined />
                            </template>
                        </a-input>

                    </div>

                    <div class="item">
                        <a href="">Forget Password</a>
                    </div>

                    <div class="item">
                        <a-button 
                        size="large" 
                        type="primary"
                        @click="login"
                        >
                            Login
                        </a-button>
                    </div>
                </a-tab-pane>
                <a-tab-pane key="2" tab="Sign up" r>
                    <div class="item">
                        <a-input size="large" 
                        placeholder="Account"
                        v-model:value="regForm.account"
                        >
                            <template
                            v-slot:prefix
                            >
                                <UserOutlined />
                            </template>
                        </a-input>
                    
                    </div>

                    <div class="item">
                        <a-input size="large" 
                        placeholder="Password"
                        v-model:value="regForm.password"
                        >
                        <template
                        v-slot:prefix
                        >
                            <LockOutlined />
                        </template>
                        </a-input>
                    </div>

                    <div class="item">
                        <a-input 
                        size="large" 
                        placeholder="Invitation Code"
                        v-model:value="regForm.inviteCode"
                        >
                            <template
                            v-slot:prefix
                            >
                                <MailOutlined />
                            </template>
                        </a-input>
                    </div>

                    <div class="item">
                        <a-button 
                        @click="register" 
                        size="large" 
                        type="primary">
                            Sign up
                        </a-button>
                    </div>
                </a-tab-pane>
            </a-tabs>

        </div>
    </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
    @import './index.scss';
</style>

