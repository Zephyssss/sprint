import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const { addTag } = require("../../services/tag.service.js")

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vName = (value) => {
  if (value.length < 1 || value.length > 30) {
    return (
      <div className="alert alert-danger" role="alert">
        The name must be between 1 and 30 characters.
      </div>
    );
  }
};

const AddBoard = (props) => {
  //use when validate form-group
  const form = useRef();
  //use for count error
  const checkBtn = useRef();
  const tagadd = JSON.parse(localStorage.getItem("tagadd"))

  const [name, setName] = useState("");
  const [infor, setInfor] = useState("");
  const [message, setMessage] = useState("");
  
  const handleAdd = (e) => {
    e.preventDefault();
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      addTag(name,infor,tagadd.idboard,tagadd.type)
      .then(()=>{
        props.history.push("/board/"+tagadd.idboard);
        localStorage.removeItem("tagadd")
        window.location.reload();
      })
      .catch((err)=>{
        console.log(err.response)

      })
    }
  };

  const handleReturn = ()=>{
    props.history.push("/board/"+tagadd.idboard);
    localStorage.removeItem("tagadd")
    window.location.reload();
  }

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeInfor = (e) => {
    const infor = e.target.value;
    setInfor(infor);
  };
  return (
    <div className="col-md-12">
      <svg onClick={()=>handleReturn()} width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-arrow-left-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
        <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
      </svg>
      <div className="card card-container">
        <h2>NEW TAG</h2>
        <Form onSubmit={handleAdd} ref={form}>
          <div className="form-group">
            <label htmlFor="name">Name Tag</label>
            <Input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={onChangeName}
              validations={[required, vName]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="infor">Detail</label>
            <Input
              type="text"
              className="form-control"
              name="infor"
              value={infor}
              onChange={onChangeInfor}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block">Add Tag</button>
          </div>
          {message && (
            <div className="form-group">
              <div className={"alert alert-danger"} role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default AddBoard;
