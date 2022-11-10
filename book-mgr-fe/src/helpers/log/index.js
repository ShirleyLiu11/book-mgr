const LOG_MAP = [
    ['/character/list', 'Get role list'],
    ['/log/list', 'Get log list'],
    ['/user/info', 'Get own login information']
];

export const getLogInfoByPath = (path) => {
    let title = '';
    LOG_MAP.forEach((item) => {
        if (path.includes(item[0])) {
            title = path.replace(item[0], item[1]);
        }
    });

    return title || path;
};

 