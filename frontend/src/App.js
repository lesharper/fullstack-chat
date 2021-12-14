import React, {useState, useEffect} from "react";
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


function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [usernameData, setUsernameData] = useState(null);
    const [email, setEmail] = useState(null);
    const [id, setId] = useState(null);

    useEffect(() => {
        authentication(setIsAuth, setUsernameData, setEmail, setId);
    }, []);

    return (
        <div className="App">
            <UsernameContext.Provider value={{usernameData, setUsernameData}}>
                <AuthContext.Provider value={{isAuth, setIsAuth}}>
                    <EmailContext.Provider value={{email, setEmail}}>
                        <IdContext.Provider value={{id, setId}}>
                                <Routes>
                                    <Route path="/" element={<Layout/>}>
                                        <Route exact path="/" element={<HomePage/>}/>
                                        <Route path="/registr" element={<RegisterPage/>}/>
                                        <Route path="/login" element={<LoginPage/>}/>

                                        <Route path="/chat" element={<ChatPage/>}/>
                                        <Route path="/chat/:id" element={<MessangerPage/>}/>

                                        <Route path="*" element={<NotFoundPage/>}/>
                                    </Route>
                                </Routes>
                        </IdContext.Provider>
                    </EmailContext.Provider>
                </AuthContext.Provider>
            </UsernameContext.Provider>
        </div>
    );
}

export default App;
