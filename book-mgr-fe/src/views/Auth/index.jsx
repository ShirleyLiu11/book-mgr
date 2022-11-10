import { defineComponent, reactive } from 'vue';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue';
import { auth, resetPassword } from '@/services';
import { result } from '@/helpers/utils';
import { getCharacterInfoById } from '@/helpers/character';
import { message, Modal, Input } from 'ant-design-vue';
import store from '@/store';
import { useRouter } from 'vue-router';
import { setToken } from '@/helpers/token';



export default defineComponent({
    components: {
        UserOutlined,
        LockOutlined,
        MailOutlined,
      },
    setup() {
        const router = useRouter();

        //register form related
        const regForm = reactive({
            account: '',
            password: '',
            inviteCode: '',
        });

        //forget password
        const forgetPassword = () => {
            Modal.confirm({
                title: 'Please enter the account to application.',
                content: (
                    <div>
                        <Input class="__forget_password_account"/>
                    </div>
                ),
                onOk: async () => {
                    const el = document.querySelector('.__forget_password_account');

                    let account = el.value;

                    const res = await resetPassword.add(account);

                    result(res).success(({ msg }) => {
                        message.success(msg);
                    });

                },
            });         
        };
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

            result(res).success(async({ msg, data: { user, token }}) => {
                message.success(msg);

                setToken(token);

                await store.dispatch('getCharacterInfo');

                store.commit('setUserInfo', user);

                store.commit('setUserCharacter', getCharacterInfoById(user.character));

                router.replace('/books');
            });
            
        };

        return{
            //register related
            regForm,
            register,

            //login related
            loginForm,
            login,

            //forget password
            forgetPassword,
        };

    },

});
