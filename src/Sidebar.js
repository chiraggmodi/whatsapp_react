import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import "./Sidebar.css"
import SidebarChat from "./SidebarChat";
import db from "./firebase";
import { useStateValue } from './StateProvider';

function Sidebar () {
    const [chatRoom, setChatRooms] = useState([]);
    const [{ user }] = useStateValue();

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
            setChatRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })
            ))
        ));

        return () => {
            unsubscribe();
        }
    }, [])
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <div className="siderbar__headerRight">
                    <IconButton ><DonutLargeIcon /></IconButton>
                    <IconButton ><ChatIcon /></IconButton>
                    <IconButton ><MoreVertIcon /></IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchcontainer">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="search or start" />
                </div>
            </div>

            <div className="sidebar__chat">
                <SidebarChat addNewChat />
                {
                    chatRoom.map(room => (
                        <SidebarChat key={room.id} name={room.data.name} id={room.id} />
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar;