import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";
import { GrUploadOption } from "react-icons/gr";

const EditContact = () => {
  let match = useParams();
  console.log(match)
  const [preview, setPreview] = useState("");
  const history = useNavigate();
  const [data, setData] = useState({
    name: "",
    age:"",
    image: "",
  });
  useEffect(() => {
    fetch(`https://contact-server-nine.vercel.app/api/v1/${match.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setData(data);
        setPreview(data.image);
      });
  }, []);

  const handleChange = (name) => (e) => {
    const value = name === "image" ? e.target.files[0] : e.target.value;
    setData({ ...data, [name]: value });
    if (e.target.files) {
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append("image", data.image);
      formData.append("name", data.name);
      formData.append("age", data.age);

      const res = await fetch(`https://contact-server-nine.vercel.app/api/v1/edit/${match.id}`, {
        method: "PUT",
        body: formData,
      });
      if (res.ok) {
        setData({ name: "", image: "" ,age: ""});
        history("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main>
      <section className="container">
        <div>
          <h3>Edit contact</h3>
        </div>

        {data.image && (
          <div style={styles.preview}>
            <img src={preview} style={styles.image} alt="Thumb" />
          </div>
        )}
        <input
          className="form-control"
          type="file"
          accept="image/*"
          name="image"
          style={{ display: "none" }}
          id="icon-file"
          onChange={handleChange("image")}
        />
        <label htmlFor="icon-file" style={styles.icon}>
          <div>
            <GrUploadOption
              style={{ color: "#1231c9", fontSize: "40", marginRight: "10" }}
            />{" "}
            Upload
          </div>
        </label>
        <input
          className="form-control"
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange("name")}
        />
        <input
          className="form-control"
          type="text"
          name="age"
          value={data.age}
          onChange={handleChange("age")}
        />
        <button className="save" onClick={handleSubmit}>
          Update
        </button>
      </section>
    </main>
  );
};

export default EditContact;

// Just some styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  preview: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
  },
  image: { maxWidth: "100%", height: 120, width: 120, borderRadius: "50%",marginBottom:20 },
  delete: {
    cursor: "pointer",
    padding: 15,
    marginBottom: "1rem",
    background: "red",
    color: "white",
    border: "none",
    outline: "white",
  },
  icon: {
    textAlign: "center",
    cursor: "pointer",
  },
};
