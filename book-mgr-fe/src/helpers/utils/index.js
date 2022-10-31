import { message } from 'ant-design-vue';
export const result = (response, authShowErrorMsg = true) => {
    const { data } = response;

    if ((data.code === 0) && authShowErrorMsg) {
        message.error(data.msg);
    }

    return {
        success(cb){
            if (data.code !== 0) {
                cb(data, response);
            }

        },
        fail(){
            if (data.code === 0) {
                cb(data, response);
            }
        },
        finally(){
            cb(data, response);
        },

    };
};