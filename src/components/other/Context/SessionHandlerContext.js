import React, { createContext, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import axios from 'axios';

const SessionHandlerContext = createContext();
export default SessionHandlerContext;

export const SessionHandlerContextProvider = (props) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const history = useHistory();

    const setActiveUser = (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        // AuthorityService.initAuthoritySet(user);
    };

    // const setActiveUserAvatar = (avatar) => {
    //     setUser(user => ({...user, avatar}));
    // };

    const logout = () => {
        // RoleService.clearRoles();
        // AuthorityService.clearAuthorities();
        localStorage.clear();
        setUser(null)
        history.push("/login");
    };

    const login = (data) => {
        axios.post('http://localhost:2020/login', data)
            .then((res) => {
                // localStorage.setItem("token", response.headers["authorization"])
                setActiveUser(res.data)
                history.push('/');
                // setActiveUserAvatar(response.data.avatar)
            })
    }

    const loadActiveUser = () => {
        // UserService.getOwnUser().then(res => {

        //     setActiveUser(res.data);
        // });

        // UserService.getOwnAvatar().then(res => {
        //     setActiveUserAvatar(res.data.avatar);
        // })
        setActiveUser(JSON.parse(localStorage.getItem('user')));

    };

    useEffect(() => {
        loadActiveUser();
        //eslint-disable-next-line
    }, []);

    return (
        <div>
            <SessionHandlerContext.Provider
                value={{
                    user,
                    setActiveUser,
                    login,
                    logout,
                    loadActiveUser
                }}
            >
                {props.children}
            </SessionHandlerContext.Provider>
        </div>
    );
};
