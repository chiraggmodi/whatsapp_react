import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVert from "@material-ui/icons/MoreVert";
// import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
// import MicIcon from '@material-ui/icons/Mic';
import { useParams } from "react-router-dom";
import firebase from "firebase";

import "./Chat.css"
import db from './firebase';
import { useStateValue } from './StateProvider';

export default function Chat () {

    const [seed, setSeed] = useState('');
    const [input, setinput] = useState('');
    const [roomName, setRoomName] = useState("");
    const { roomId } = useParams();
    const [messages, setMessages] = useState([]);

    const [{ user }] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ));

            db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp", "asc").onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            });


        }

    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setinput('');
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/4.5/api/human/${seed}.svg`} />
                <div className="chat_headerinfo">
                    <h3>{roomName}</h3>
                    <p>Last seen {" "}
                        {new Date(
                            messages[messages.length - 1]?.data.timestamp?.toDate()
                        ).toUTCString()}</p>
                </div>

                <div className="chat_headerRight">
                    <IconButton ><SearchOutlinedIcon /></IconButton>
                    <IconButton ><AttachFile /></IconButton>
                    <IconButton ><MoreVert /></IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map(message => (

                    <p key={message.id} className={`chat__message ${message.data.name === user.displayName && " chat__receiver"}`}>
                        <span className={`chat__name`}>{message.data.name} </span>
                        { message.data.message}
                        < span className="chat__timestamp" > {new Date(message.data.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))
                }



            </div >

            <div className="chat__footer">
                {/* <InsertEmoticon /> */}

                <form>
                    <input type="text" value={input} onChange={(e) => setinput(e.target.value)} placeholder="type message" />
                    <button type="submit" onClick={sendMessage}>Send Message</button>
                </form>
                {/* <MicIcon /> */}
            </div>
        </div >
    )
}
