import { defineComponent, reactive, withCtx } from "vue";
import { book } from '@/services';
import { message } from 'ant-design-vue';
import store from '@/store';
import { clone, result } from '@/helpers/utils';


const defaultFormData = {
    name: '',
    price: 0,
    author: '',
    publishDate: 0,
    classify: '',
    count: '',
};
export default defineComponent({
    props: {
        show: Boolean,
    },
    setup(props, context) {
        
        const addForm = reactive(clone(defaultFormData));

        if (store.state.bookClassify.length) {
            addForm.classify = store.state.bookClassify[0]._id;
        }
        

        const submit = async () => {
            const form = clone(addForm);
            form.publishDate = addForm.publishDate.valueOf();
            const res = await book.add(form);
            
            result(res).success((d, { data }) => {
                Object.assign(addForm, defaultFormData);
                message.success(data.msg);

                context.emit('getList');
                
            });
        };

        const close = () => {
            context.emit('update:show', false);
        };


        return {
            addForm,
            submit,
            props,
            close,
            store: store.state,
        };
    },
});
