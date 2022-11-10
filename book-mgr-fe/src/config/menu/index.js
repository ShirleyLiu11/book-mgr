export default [
    {
        title: 'Dashboard',
        url: '/dashboard',
        onlyAdmin: true,
    },
    {
        title: 'Book Management',
        url: '/books',
        onlyAdmin: false,
    },
    {
        title: 'User Management',
        url: '/user',
        onlyAdmin: true,
    },
    {
        title: 'Operation Log',
        url: '/log',
        onlyAdmin: true,
    },
    {
        title: 'Others',
        onlyAdmin: false,
        children: [
            {
                title: 'Book Category Management',
                url: '/book-classify',
                onlyAdmin: true,
            },
            {
                title: 'Reset Password List',
                url: '/reset/password',
                onlyAdmin: true,
            },
            {
                title: 'Invite Code Management',
                url: '/invite-code',
                onlyAdmin: true,
            },
            
        ],
    },
    {
        title: 'Settings',
        url: '/profile',
        onlyAdmin: false,
    },
];