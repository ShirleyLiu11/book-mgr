const LOG_MAP = [
    ['/character/list', 'Get role list'],
    ['/log/list', 'Get log list'],
    ['/user/info', 'Get own login information'],
    ['/user/list', 'Get user list'],
    ['/book/list', 'Get book list'],
    ['/book-classify/list', 'Get book category list'],
    ['/book/add', 'Add book'],
    ['/book/update', 'Edit book information'],
    ['/auth/login', 'Login'],
    ['/auth/register', 'Sign in'],
    ['/invite/list', 'Get invite list'],
    ['/invite', 'Get invite code'],

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

 