import { defineComponent, onMounted, ref } from "vue";
import { log } from '@/services';
import { result, formatTimestamp } from "@/helpers/utils";
import { getLogInfoByPath } from '@/helpers/log';


export default defineComponent({
    props: {
        simple: Boolean,
    },

    setup(props) {

        const curPage = ref(1);
        const total = ref(0);
        const list = ref([]);
        const loading = ref(true);

        const columns = [
            {
                title: 'Account',
                dataIndex: 'account',
        
            },
            {
                title: 'Operation',
                dataIndex: 'action',
            },
            {
                title: 'Record Time',
                slots: {
                    customRender: 'createdAt',
                },
            },
        ];

        if (!props.simple) {
            columns.push({
                title: 'Action',
                slots: {
                    customRender: 'action',
                },
            });
        }

        const getList = async () => {
            loading.value = true;

            const res = await log.list(curPage.value, 20);

            loading.value = false;

            result(res).success(({ data: { list: l, total: t } }) => {
                l.forEach((item) => {
                    item.action = getLogInfoByPath(item.request.url);
                    item.account = item.user.account;
                })

                list.value = l;
                total.value = t;
            });
           
             };

        onMounted(() => {
            getList();
        });

        const setPage = (page) => {
            curPage.value = page;
            getList();
        };

        const remove = async ({ _id }) => {
            const res = await log.remove(_id);
        };

        return {
            curPage,
            total,
            list,
            columns,
            setPage,
            loading,
            formatTimestamp,
            remove,
            simple: props.simple,
        };

    },  
});