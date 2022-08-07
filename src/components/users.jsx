import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";

const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState(); // useState([])
    const [selectedProf, setSelectedProf] = useState(); // useState(null) стаарйся всегда задавать начальное значение
    const pageSize = 4;

    useEffect(() => {
        api.professions
            .fetchAll()
            .then(response => setProfession(response));
    }, []);

    useEffect(() => {
        setCurrentPage(1); // лучше перенеси в handleProfessionSelect
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setCurrentPage(1); // вот так будет лучше
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const filterUsers = selectedProf
        ? allUsers.filter(user => JSON.stringify(user.profession) === JSON.stringify(selectedProf)) // тут можно куда проще user.profession._id === selectedProf._id
        : allUsers;

    const count = filterUsers ? filterUsers.length : 0;
    const usersCrop = paginate(filterUsers, currentPage, pageSize);

    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <div className="d-flex justify-content-center">
            {professions && (
                <div className="d-flex flex-column flex-shrin-0 p-3 me-2">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button className="btn btn-secondary mt-2" onClick={clearFilter}>Очистить</button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
                {count > 0 && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Качества</th>
                                <th scope="col">Провфессия</th>
                                <th scope="col">Встретился, раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Избранное</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {usersCrop.map((user) => (
                                <User {...rest} {...user} key={user._id} />
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};
Users.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default Users;

// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import Pagination from "./pagination";
// import User from "./user";
// import api from "../api";
// import paginate from "../utils/paginate";
// import GroupList from "./groupList";
// import SearchStatus from "./searchStatus";

// const Users = ({ users: allUsers, ...rest }) => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [professions, setProfession] = useState(api.professions.fetchAll());
//     const [selectedProf, setSelectedProf] = useState();
//     const pageSize = 2;

//     useEffect(() => {
//         api.professions.fetchAll().then((data) => setProfession(data));
//     }, []);

//     useEffect(() => {
//         setCurrentPage(1);
//     }, [selectedProf]);

//     const handleProfessionSelect = (item) => {
//         setSelectedProf(item);
//     };
//     const handlerPageChange = (pageIndex) => {
//         setCurrentPage(pageIndex);
//     };
//     const filterdUsers = selectedProf
//         ? allUsers.filter((user) => user.profession === selectedProf)
//         : allUsers;

//     const count = filterdUsers.length;

//     const userCrop = paginate(filterdUsers, currentPage, pageSize);

//     const clearFilter = () => {
//         setSelectedProf();
//     };

//     return (
//         <div className="d-flex">
//             {professions && (
//                 <div className="d-flex flex-column flex-shrink-0 p-3">
//                     <GroupList
//                         selectedItem={selectedProf}
//                         items={professions}
//                         onItemSelect={handleProfessionSelect}
//                     />
//                     <button
//                         className="btn btn-secondary mt-2"
//                         onClick={clearFilter}
//                     >
//                             Очистить
//                     </button>
//                 </div>
//             )}
//             <div className="d-flex flex-column">
//                 <SearchStatus length={count} />
//                 {count > 0 && (
//                     <table className="table">
//                         <thead>
//                             <tr>
//                                 <th scope="col">Имя</th>
//                                 <th scope="col">Качества</th>
//                                 <th scope="col">Профессия</th>
//                                 <th scope="col">Встретился, раз</th>
//                                 <th scope="col">Оценка</th>
//                                 <th scope="col">Bookmark</th>
//                                 <th />
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {userCrop.map((user) => (
//                                 <User key={user._id} {...rest} {...user} />
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//                 <div className="d-flex justify-content-center">
//                     <Pagination
//                         itemsCount={count}
//                         pageSize={pageSize}
//                         currentPage={currentPage}
//                         onPageChange={handlerPageChange}
//                     />
//                 </div>
//             </div>

//         </div>
//     );
// };

// Users.propTypes = {
//     users: PropTypes.array
// };

// export default Users;
