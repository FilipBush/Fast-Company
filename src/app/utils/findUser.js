export function findUser(users, searchItem) {
    const usersList = [];
    const searchUser = searchItem.toLowerCase();

    function isMatch(user, searchUser) {
        const searchItemRegExp = new RegExp(`${searchUser}`, "i");
        return Boolean(user.match(searchItemRegExp));
    };

    for (const user of users) {
        isMatch(user.name.toLowerCase(), searchUser) && usersList.push(user);
    }

    return usersList;
};
