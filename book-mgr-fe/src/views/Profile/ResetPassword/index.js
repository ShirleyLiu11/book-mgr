import { defineComponent, reactive } from "vue";
import { profile } from "@/services";
import { result } from "@/helpers/utils";
import { message } from "ant-design-vue";

export default defineComponent({
setup() {
    const form = reactive({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const resetPassword = async () => {
        const {
            confirmNewPassword,
            newPassword,
            oldPassword,
        } = form;

        if (confirmNewPassword !== newPassword) {
            message.error('Confirm password does not match new password');
            return;
        }
        
        const res = await profile.resetPassword(
            newPassword,
            oldPassword,
        );
        
        result(res).success(({ msg }) => {
            message.success(msg);

            form.oldPassword = '';
            form.newPassword = '';
            form.confirmNewPassword = '';

        });


    };

    return {
        form,
        resetPassword,
    };
}
});