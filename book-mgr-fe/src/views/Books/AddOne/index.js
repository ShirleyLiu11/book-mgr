import { defineComponent, reactive } from "vue";
import { book } from '@/services';
import { message } from 'ant-design-vue';
import { clone, result } from '@/helpers/utils';


const defaultFormData = {
    name: '',
            price: 0,
            author: '',
            publishDate: 0,
            classify: '',
            count: 0,
};
export default defineComponent({
    props: {
        show: Boolean,
    },
    setup(props, context) {
        
        const addForm = reactive(clone(defaultFormData));

        const submit = async () => {
            const form = clone(addForm);
            form.publishDate = addForm.publishDate.valueOf();
            const res = await book.add(form);
            
            result(res).success((d, { data }) => {
                Object.assign(addForm, defaultFormData);
                message.success(data.msg);
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
        };
    },
});
