import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const columns = [
            {
                title: 'name',
                dataIndex: 'name',
            },
            {
                title: 'age',
                dataIndex: 'age',
            },
        ]

        const dataSource = [
            {
                name: 'xiaohong',
                age: 2,
                
            },
        ]
        return{
            columns,
            dataSource,
        };
    },
});