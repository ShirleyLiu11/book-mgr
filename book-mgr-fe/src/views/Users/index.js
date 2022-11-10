import { defineComponent, ref, onMounted, reactive} from 'vue';
import { user } from '@/services';
import { message } from 'ant-design-vue';
import { EditOutlined } from '@ant-design/icons-vue';
import { result, formatTimestamp } from '@/helpers/utils';
import AddOne from './AddOne/index.vue';
import { getCharacterInfoById } from '@/helpers/character';
import store from '@/store';

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
        title: 'Role',
        slots: {
            customRender: 'character',
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
        EditOutlined,
    },
    setup() {
        const list = ref([]);
        const total = ref(0);
        const curPage = ref(1);
        const showAddModal = ref(false);
        const keyword = ref('');
        const isSearch = ref(false);
        const showEditCharacterModal = ref(false);

        const editForm = reactive({
            character: '',
            currrent: {},
        });

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

        const onEdit = (record) => {
            editForm.currrent = record;
            editForm.character = record.character;

            showEditCharacterModal.value = true;
        };

        const updateCharacter = async () => {
            const  res = await user.editCharacter(editForm.character, editForm.currrent._id);

            result(res).success(({ msg }) => {
                message.success(msg);

                showEditCharacterModal.value = false;
                editForm.currrent.character = editForm.character;
            });
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
            onEdit,
            updateCharacter,
            getCharacterInfoById,
            showEditCharacterModal,
            editForm,
            characterInfo: store.state.characterInfo,
            
        };
    },

});