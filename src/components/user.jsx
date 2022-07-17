import React, { useState } from "react"
import Quality from "./quality";
import BookMark from "./bookmark";

const User = (props) => {
  return (
    <tr key={props._id}>
      <td>{props.name}</td>
      <td>
        {props.qualities.map(item => (
          <Quality
            key = {item._id} 
            {...item}
          />
        ))}
      </td>
      <td>{props.profession.name}</td>
      <td>{props.completedMeetings}</td>
      <td>{props.rate} /5</td>
      <td>
        <BookMark
          onBookMark = {props.onBookMark}
          id = {props._id}
          bookMarkStatus = {props.bookmark}
        />
      </td>
      <td>
        <button 
          className="btn btn-danger" 
          onClick={() => props.onDelete(props._id)}
        >
          delete
        </button>
      </td>
    </tr>
  )
}

export default User;
