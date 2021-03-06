import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined, AttachFile, MoreVert } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import axios from "./axios";

function Chat({ messages }) {
  const [input,setInput]=useState('')

  const sendMessage = async (e)=>{
    e.preventDefault()
    var date =new Date()
    date = date.toString()
    try{ await axios.post('messages/new',{
      message: input,
      name:"DEMO APP",
      timestamp: date,
      received:false
      }
     
      )
     
    }catch(err){
      console.log(err);
    }
    setInput('')
  }
 
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at ...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            key={message._id}
            className={`chat__message ${message.received && "chat__receiver"}`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input type="text" value={input} onChange={e=>setInput(e.target.value)} placeholder="Type a message" />
          <button onClick={sendMessage}type="submit">send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
