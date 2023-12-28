import React from "react";
import "../App.css";

import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";

const List = ({ contacts, setContacts }) => {
  console.log(contacts);
  const handleDelete = async (id) => {
    try {
      // const res = await fetch(`http://localhost:8000/api/v1/${id}`, {
      const res = await fetch(`https://contact-server-nine.vercel.app/api/v1/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const updatedContacts = contacts.filter((user) => user._id !== id);
        setContacts(updatedContacts);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {contacts.map((person) => {
        const { _id, name, image,age } = person;
        return (
          <article key={_id} className="person">
            <img src={image} alt={name} />
            <div className="head">
              <h4>{name}</h4>
              <h5>{age}</h5>
              <div>
                <MdDelete
                  cursor='pointer' onClick={() => handleDelete(_id)}
                  style={{ color: "red", fontSize: "35",marginRight:"10" }}
                />
                <Link to={`/edit/${_id}`}>
                  <MdEdit style={{ color: "#1231c9", fontSize: "35" }} />
                </Link>
              </div>
              {/* <p>{age} years</p> */}
            </div>
          </article>
        );
      })}
    </>
  );
};

export default List;
