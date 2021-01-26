import React, { useState, useEffect } from 'react';
import { Avatar } from "@material-ui/core";
import { Link } from 'react-router-dom';

import "./SidebarChat.css";
import db from "./firebase";

function SidebarChat ({ addNewChat, id, name }) {
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState('');

    useEffect(() => {

        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    useEffect(() => {
        if (id) {
            db.collection("rooms").doc(id).collection("messages").orderBy("timestamp", "desc").onSnapshot(snapshot => (
                setMessages(snapshot.docs.map((doc) => doc.data()))
            ))
        }
    }, [id])

    const creatChat = () => {
        const roomName = prompt("Please enter name");

        if (roomName) {
            db.collection("rooms").add({
                name: roomName
            })
        }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/4.5/api/human/${seed}.svg`} />

                <div className="siderbarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
            <div onClick={creatChat} className="sidebarChat">
                <h2>Add new chat </h2>
            </div>
        )
}

export default SidebarChat
