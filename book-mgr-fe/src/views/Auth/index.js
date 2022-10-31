import { defineComponent, reactive } from 'vue';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue';

import { auth } from '@/services';



export default defineComponent({
    components: {
        UserOutlined,
        LockOutlined,
        MailOutlined,
      },
    setup() {
        //register form infromation
        const regForm = reactive({
            account: '',
            password: '',
        });

        const register = () => {
            auth.register(regForm.account, regForm.password);
        };

        return{
            //regieter information
            regForm,
            register,
        };

    },

});