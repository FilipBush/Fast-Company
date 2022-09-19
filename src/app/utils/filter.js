export default function filterProf(users, selectedProf) {
    return users.filter((user) => user.profession._id === selectedProf._id);
}
