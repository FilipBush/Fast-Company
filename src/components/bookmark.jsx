import React from "react";

const BookMark = (props) => {
  const getBookMarkClasses = () => {
    let classes = "bi ";
    classes += props.bookMarkStatus? "bi-bookmark-fill": "bi-bookmark";
    return classes;
  }

  return (
    <i 
      className={getBookMarkClasses()}
      onClick = {()=> props.onBookMark(props.id)}
    >
    </i>
  )
}

export default BookMark;