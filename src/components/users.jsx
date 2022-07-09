import React, {useState} from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(prevState=>prevState.filter(user=>user._id !== userId));
  };

  const renderPhrase = (number) => {
    let phrase = 'Никто с тобой не тусанет';
    let phraseBg = 'bg-danger';

    if (number) {
      let phraseNoun = 'человека';
      
      phraseBg = 'bg-primary';
      
      if (number === 1 || number % 10 === 0 || (number >= 5 && number <= 19)) {
        phraseNoun = 'человек';
      }
      
      phrase = `${number} ${phraseNoun} тусанет с тобой`;
    }

    return <span className={`badge ${phraseBg}`}>{phrase}</span>
  }

  return (
    <>
      <h2>
        {renderPhrase(users.length)}
      </h2>
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user=>( // нет смысла проверки
              <tr> // нужен key
                <td scope="row">{user.name}</td>
                <td>{user.qualities.map(
                  quality=>(
                    <span className={`badge bg-${quality.color} m-1`}>
                      {quality.name}
                    </span>
                  )
                )}</td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{`${user.rate} /5`}</td>
                <td><button className="btn btn-danger" onClick={() => handleDelete(user._id)}>delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Users;
