import { defineComponent, reactive } from 'vue';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue';
import { auth } from '@/services';
import { result } from '@/helpers/utils';
import { message } from 'ant-design-vue';



export default defineComponent({
    components: {
        UserOutlined,
        LockOutlined,
        MailOutlined,
      },
    setup() {
        //register form related
        const regForm = reactive({
            account: '',
            password: '',
            inviteCode: '',
        });
        //register logic
        const register =  async () => {
            if (regForm.account === '') {
                message.info('Please enter your account');
                return;
            }

            if (regForm.password === '') {
                message.info('Please enter your password');
                return;
            }

            if (regForm.inviteCode === '') {
                message.info('Please enter your invitation code');
                return;
            }

            const res = await auth.register(
                regForm.account, 
                regForm.password, 
                regForm.inviteCode
            );

            result(res).success((data) => {
                message.success(data.msg);
            });

            
        };
        //login form related
        const loginForm = reactive({
            account: '',
            password: '',
        });
        //login logic
        const login = async () => {
            if (loginForm.account === '') {
                message.info('Please Enter Your Account!');
                return;
            }

            if (loginForm.password === '') {
                message.info('Please Enter Your Password!');
                return;
            }

            const res = await auth.login(loginForm.account, loginForm.password);

            result(res).success((data) => {
                message.success(data.msg);
            });
            
        };

        return{
            //register related
            regForm,
            register,

            //login related
            loginForm,
            login,
        };

    },

});
