import React, {useState, useEffect, useMemo} from "react";
import "./App.css";

import HomePage from "./Routing/HomePage";
import ChatPage from "./Routing/ChatPage";
import RegisterPage from "./Routing/RegisterPage";
import LoginPage from "./Routing/LoginPage";
import NotFoundPage from "./Routing/NotFoundPage";
import Layout from "./Routing/Layout";
import MessangerPage from "./Routing/MessangerPage";

import {authentication} from "./Actions/user";
import {Routes, Route} from "react-router-dom";

import {UsernameContext} from "./Context/Context";
import {AuthContext} from "./Context/Context";
import {EmailContext} from "./Context/Context";
import {IdContext} from "./Context/Context";
import {SocketContext} from "./Context/Context";

import io from "socket.io-client";

function App() {
    const socket = io.connect("http://localhost:5000")
    const [isAuth, setIsAuth] = useState(false);
    const [usernameData, setUsernameData] = useState(null);
    const [email, setEmail] = useState(null);
    const [id, setId] = useState(null);
    const [socketContext, setSocketContext] = useState(socket)

    useMemo(() => {
        console.log("Ауе")
        authentication(setIsAuth, setUsernameData, setEmail, setId);
    }, []);

    return (
        <div className="App">
            <UsernameContext.Provider value={{usernameData, setUsernameData}}>
                <AuthContext.Provider value={{isAuth, setIsAuth}}>
                    <EmailContext.Provider value={{email, setEmail}}>
                        <IdContext.Provider value={{id, setId}}>
                            <SocketContext.Provider value={{socketContext, setSocketContext}}>
                                <Routes>
                                    <Route path="/" element={<Layout/>}>
                                        <Route exact path="/" element={<HomePage/>}/>
                                        <Route path="/registr" element={<RegisterPage/>}/>
                                        <Route path="/login" element={<LoginPage/>}/>

                                        <Route path="/chat" element={<ChatPage/>}/>
                                        <Route path="/chat/:title" element={<MessangerPage/>}/>

                                        <Route path="*" element={<NotFoundPage/>}/>
                                    </Route>
                                </Routes>
                            </SocketContext.Provider>
                        </IdContext.Provider>
                    </EmailContext.Provider>
                </AuthContext.Provider>
            </UsernameContext.Provider>
        </div>
    );
}

export default App;
