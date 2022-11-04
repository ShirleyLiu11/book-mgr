import { defineComponent, ref, onMounted} from 'vue';
import { user } from '@/services';
import { message } from 'ant-design-vue';
import { result, formatTimestamp } from '@/helpers/utils';
import AddOne from './AddOne/index.vue';

const columns = [
    
    {
        title: 'Account',
        dataIndex: 'account',
    },
    {
        title: 'Create date',
        slots: {
            customRender: 'createdAt',
        }
    },
    {
        title: 'Actions',
        slots: {
            customRender: 'actions',
        }
    }
    
]

export default defineComponent({
    components: {
        AddOne,
    },
    setup() {
        const list = ref([]);
        const total = ref(0);
        const curPage = ref(1);
        const showAddModal = ref(false);
        const keyword = ref('');
        const isSearch = ref(false);

        const getUser = async () => {
            const res = await user.list(curPage.value, 10, keyword.value)

            result(res).success(({ data: { list: resList, total: resTotal } }) => {
                list.value = resList;
                total.value = resTotal;
            });
        };

        onMounted(() => {
            getUser();
        });
        //delete user
        const remove = async ({ _id }) => {
            const res = await user.remove(_id);

            result(res).success(({ msg }) => {
                message.success(msg);
                getUser();
            });
        };

        //switch page
        const setPage = (page) => {
            curPage.value = page;
            getUser();
        };

        //reset password
        const resetPassword = async ({ _id }) => {
            const res = await user.resetPassword(_id);

            result(res).success(({ msg }) => {
                message.success(msg);
            });
        };

        const onSearch = () => {
            getUser();
            isSearch.value = !!keyword.value;
        };

        const backAll = () => {
            isSearch.value = false;
            keyword.value = '';
            getUser();
        };

        
        return {
            list,
            total,
            curPage,
            columns,
            formatTimestamp,
            remove,
            showAddModal,
            getUser,
            setPage,
            resetPassword,
            isSearch,
            keyword,
            backAll,
            onSearch,
        };
    },

});