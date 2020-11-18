import React, { useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../tag/tag.css"
import io from "socket.io-client";
import Board from "../board/board.component.js";

const ioClient = io.connect("https://sprintretrospective.herokuapp.com");

const { retriveBoards } = require("../../services/board.service.js");
const { deleteBoard } = require("../../services/board.service.js");
const { logout } = require("../../services/auth.service.js");

const Home = (props) => {
  const [boards, setboards] = useState([]);
  const user =JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    ioClient.on("changeboardhandle", (msg) =>{
      retriveBoards()
      .then((response) => {
        setboards(response.data.data);
      })
      .catch((err) => {
        console.log("home.component.js " + err);
      });
    });

    retriveBoards()
      .then((response) => {
        setboards(response.data.data);
      })
      .catch((err) => {
        console.log("home.component.js " + err);
      });
  }, []);

  const handleAddBoard=()=>{
    props.history.push("/addboard");
    window.location.reload();
  }
  
  const onClickDelete = (id)=>{
    deleteBoard(id)
    .then((response)=>{
      ioClient.emit("changeboard",{data: "deleteboard"})
      const newBoards = boards.filter((board)=>{
        return board._id!=id
      })
      setboards(newBoards);
    })
    .catch((err)=>{
      console.log("home.component.js onClick Delete err");
    })
  }

  const onClickUpdate = (id, name)=>{
    props.history.push("/updateboard/"+id);  
    localStorage.setItem("updateboard", name)
    window.location.reload();
  }

  const renderListBoard = boards.map((board) => {
    return <Board board={board} key={board._id} onClickDelete={onClickDelete} onClickUpdate={onClickUpdate} />;
  });

  if (!localStorage.getItem("user")) {
    props.history.push("/login");
    window.location.reload();
  }

  const handleUpdateuser = ()=>{
    props.history.push("/updateuser");  
    window.location.reload();
  }
  
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
      <div className="py-2 px-md-2">
        <button type="button" class="btn btn-primary" onClick={()=>handleAddBoard()}>
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
        &emsp; Add Board
        </button>
      </div>
      <div class="row">{renderListBoard}</div>
    </div>
  );
};

export default Home;
