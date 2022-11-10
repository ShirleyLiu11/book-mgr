import { defineComponent, ref, onMounted } from "vue";
import { resetPassword } from '@/services';
import { result } from "@/helpers/utils";
import { message } from 'ant-design-vue';

const columns = [
    {
        title: 'Account',
        dataIndex: 'account',
    },
    {
        title: 'Actions',
        slots: {
            customRender: 'actions',
        },
    },

];

export default defineComponent({
    setup () {
        const list = ref([]);
        const curPage = ref(1);
        const total = ref(0);

        const getList = async () => {
            const res = await resetPassword.list(curPage.value, 20);

            result(res).success(({ data: { list: l, total: t } } ) => {
                list.value = l;
                total.value = t;
            });
        };

        onMounted(() => {
            getList();
        });

        const changeStatus = async ({ _id }, status ) => {
            const res = await resetPassword.updateStatus(_id, status);

            result(res).success(({ msg }) => {
                message.success(msg);
                getList();
            });
        };

        const setPage = (page) => {
            curPage.value = page;
            getList();
        };

        return {
            total,
            curPage,
            list,
            columns,
            changeStatus,
            setPage,
        };
    },
})