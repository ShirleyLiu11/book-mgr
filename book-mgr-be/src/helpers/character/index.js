`
-1 no permission
0 admin permission
1 add permission
2 delete permission
3 search permission
4 edit permission
`;

const defaultCharacters = [
    {
        title: 'Administrator',
        name: 'admin',
        power: { 
            book: [0],
            user: [0],
         },
    },
    {
        title: 'Member',
        name: 'member',
        power: { 
            book: [1],
            user: [-1],
         },
    },
];

module.exports = {
    defaultCharacters,
};