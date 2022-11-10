<template>
    <div>
        <a-card title="Change Password">
            <a-form :model="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 4 }">
                <a-form-item label="Original Password">
                    <a-input type="password" v-model:value="form.oldPassword" />
                </a-form-item>
                <a-form-item label="New Password">
                    <a-input type="password" v-model:value="form.newPassword" />
                </a-form-item>
                <a-form-item label="Confirm New Password">
                    <a-input type="password" v-model:value="form.confirmNewPassword" />

                    <div style="margin-top: 24px;">
                        <a-button @click="resetPassword" type="primary">Change</a-button>
                    </div>
                </a-form-item>

            </a-form>
        </a-card>
    </div>
</template>

<script src="./index.js"></script>