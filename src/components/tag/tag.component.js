import React, { useState, useRef, useEffect } from "react";
import SquareTag from "../tag/squaretag.component.js"
import "../tag/tag.css"

const { logout } = require("../../services/auth.service.js");
const { retriveTags } = require("../../services/tag.service.js")
const { deleteTag } = require("../../services/tag.service.js")


const Tag = (props) => {
  const user =JSON.parse(localStorage.getItem("user"))
  
  const [tags1, setTags1] = useState([]);
  const [tags2, setTags2] = useState([]);
  const [tags3, setTags3] = useState([]);

  useEffect(()=>{
    retriveTags(props.match.params.idboard)
    .then((res)=>{
      const tags = res.data.data;
      const type1 = tags.filter((el)=>{return el.type==1})
      const type2 = tags.filter((el)=>{return el.type==2})
      const type3 = tags.filter((el)=>{return el.type==3})
      setTags1(type1);
      setTags2(type2);
      setTags3(type3);
    })
    .catch((err)=>{
      console.log(err.response)
    })
  },[])

  const handleDelete = (idtag, type)=>{
    deleteTag(idtag)
    .then(()=>{
      if(type==1){
        const newTag = tags1.filter((tag)=>{
        return tag._id!=idtag
      })
      setTags1(newTag);
      }
      if(type==2){
        const newTag = tags2.filter((tag)=>{
          return tag._id!=idtag
        })
        setTags2(newTag);
      }
      if(type==3){
        const newTag = tags3.filter((tag)=>{
          return tag._id!=idtag
        })
        setTags3(newTag);
      }
    })
  }

  const handleUpdate = (idtag, nametag, infortag)=>{
    const tagupdate ={
      idboard: props.match.params.idboard,
      name: nametag,
      infor: infortag
    }
    localStorage.setItem("tagupdate",JSON.stringify(tagupdate));
    props.history.push("/updatetag/"+idtag);
    window.location.reload();
  }

  const handleUpdateuser = ()=>{
    props.history.push("/updateuser");  
    window.location.reload();
  }

  const renderTag =(tags)=>{
    const list = tags.map((el) => {
      return <SquareTag  tag={el} onClickDelete={handleDelete} onClickUpdate={handleUpdate}/>;
    })
    return list;
  };

  const handleAdd = (type)=>{
    const board = {
      idboard: props.match.params.idboard,
      type: type
    }
    localStorage.setItem("tagadd", JSON.stringify(board));
    props.history.push("/addtag");
    window.location.reload();
  }

  console.log(renderTag(tags2))
  
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand" href="/">SPRINT RETROSPECTIVE</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <button className= "btn" onClick={handleUpdateuser}>
                <a class="nav-link" >{user.username} <span class="sr-only">(current)</span></a>
              </button>
            </li>
            <li class="nav-item">
              <button className= "btn">
                <a class="nav-link" href="/login" onClick={logout}>Log out</a>
              </button>
            </li>
          </ul>
        </div>
      </nav>
        <div class="row">
          <div class="col-sm">
            <div class="d-flex justify-content-center">
              <div className="customAddTag">
                <button className= "btn btn-info" onClick ={ ()=> handleAdd("1")}>
                  <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-plus-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                  </svg>
                </button>
              </div>
            </div>
            {renderTag(tags1)}
          </div>
          <div class="col-sm">
            <div class="d-flex justify-content-center">
              <div className="customAddTag">
                <button className= "btn btn-warning" onClick ={ ()=> handleAdd("2")}>
                  <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-plus-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                  </svg>
                </button>
              </div>
            </div>
            {renderTag(tags2)} 
          </div>
          <div class="col-sm">
            <div class="d-flex justify-content-center">
              <div className="customAddTag">
                <button className= "btn btn-success" onClick ={ ()=> handleAdd("3")}>
                  <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-plus-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                  </svg>
                </button>
              </div>
            </div>
            {renderTag(tags3)}
          </div>
        </div>
    </div>
  );
};

export default Tag;

