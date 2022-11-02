import { defineComponent, ref, onMounted } from 'vue';
import { book } from '@/services';
import { message, Modal, Input } from 'ant-design-vue';
import { result, formatTimestamp } from '@/helpers/utils';
import AddOne from './AddOne/index.vue';
import Update from './Update/index.vue';


export default defineComponent({
    components: {
        AddOne,
        Update,
    },

    setup() {
        const columns = [
            {
                title: 'Book Title',
                dataIndex: 'name',
            },
            {
                title: 'Author',
                dataIndex: 'author',
            },
            {
                title: 'Price',
                dataIndex: 'price',
            },
            {
                title: 'In Stock',
                slots: {
                    customRender: 'count',
                }
            },
            {
                title: 'Publish Date',
                dataIndex: 'publishDate',
                slots: {
                    customRender: 'publishDate',
                }
            },
            {
                title: 'Category',
                dataIndex: 'classify',
            },
            {
                title: 'Actions',
                slots: {
                    customRender: 'actions',
                }
            },
            
            
        ];

        const show = ref(false);
        const showUpdateModal = ref(false);
        const list = ref([]);
        const total = ref(0);
        const curPage = ref(1);
        const keyword = ref ('');
        const isSearch  = ref(false);
        const curEditBook = ref({});

        //get book list
        const getList = async () => {
            const res = await book.list({
                page: curPage.value,
                size: 10,
                keyword: keyword.value,
            });

            result(res).success(({ data }) => {
                const { list: l, total: t } = data;
                list.value = l;
                total.value = t;
            });
        }

        onMounted(async () => {
            getList();           
        });

        //set page number
        const setPage = (page) => {
            curPage.value = page;

            getList();
        };

        //trigger search
        const onSearch = () => {
            getList();
            isSearch.value = Boolean(keyword.value);
        };

        //back to all list
        const backAll = () => {
            keyword.value = '';
            isSearch.value = false;
            getList();
        };

        //delete a book from list
        const remove = async ({ text: record }) => {
            
            const { _id } = record;

            const res = await book.remove(_id);

            result(res).success(({ msg }) => {
                message.success(msg);
                getList();
            });
        };
        //edit stock num
        const updateCount = (type, record) => {
            let word = 'add';

            if (type === 'OUT_COUNT') {
                word = 'reduce';
            }
            
            Modal.confirm({
                title: `How much stock to ${word}?`,
                content: (
                    <div>
                        <Input class="__book_input_count"/>
                    </div>
                ),
                onOk: async () => {
                    const el = document.querySelector('.__book_input_count');

                    let num = el.value;

                    const res = await book.updateCount({
                        id: record._id,
                        num,
                        type,
                    });

                    result(res).success((data) => {
                        if (type === 'IN_COUNT') {
                            //stock in
                            num = Math.abs(num);
                        } else {
                            //stock out
                            num = -Math.abs(num);
                        }
                    
                        const one = list.value.find((item) => {
                            return item._id === record._id;
                        });

                        if (one) {
                            one.count = one.count + num;

                            message.success(`${word} ${Math.abs(num)} book(s) successfully`);
                        }
                    });
                },
            });          
        };
        //edit update book information
        const update = ( { record }) => {
            showUpdateModal.value = true;
              curEditBook.value = record;
        };

        const updateCurBook = (newData) => {
            Object.assign(curEditBook.value, newData);
        };

        return{
            columns,
            show,
            list,
            formatTimestamp,
            curPage,
            total,
            setPage,
            keyword,
            onSearch,
            backAll,
            isSearch,
            remove,
            updateCount,
            showUpdateModal,
            update,
            curEditBook,
            updateCurBook
        };
    },



});