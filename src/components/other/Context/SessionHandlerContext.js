import React, { createContext, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import axios from 'axios';
// import UserService from "../../../service/UserService";
import ArticleService from "../../../service/ArticleService";
import UserService from "../../../service/UserService";
const SessionHandlerContext = createContext();
export default SessionHandlerContext;


let exampleUser = {
    id: "4028810e76140b0d0176141002d20005",
    email: "tester02@gurtnerbarbon.ch",
    firstName: "A",
    lastName: "B",
    streetNumber: "Teststr. 50",
    zipPlace: "8000 Zurich"
};

export const SessionHandlerContextProvider = (props) => {
    // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [ownFavorites, setOwnFavorites] = useState([]);
    // const [favorites, setFavorites] = useState([]);
    // const [shoppingCart, setShoppingCart] = useState([])
    const history = useHistory();

    const setActiveUser = (user) => {
        // if (user === undefined) {
        //     localStorage.setItem("user", JSON.stringify(exampleUser));
        //     setUser(exampleUser);  
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
                localStorage.setItem("token", res.headers["authorization"])
                setActiveUser(res.data)
                getFavorites(res.data.id);
                history.push('/');
            })
    }

    const loadActiveUser = () => {
        setActiveUser(JSON.parse(localStorage.getItem('user')));
    };

    const addFavorite = (userDTO, userId, articleId) => {
        UserService.addFavorite(userDTO, userId, articleId)
            .then()
            .catch(err => {
                console.error('Error in SessionHandlerContext: ', err);
            });
    };

    const removeFavorite = (userDTO, userId, articleId) => {
        UserService.removeFavorite(userDTO, userId, articleId)
            .then()
            .catch(err => {
                console.error('Error in SessionHandlerContext: ', err);
            });
    };

    const getFavorites = (userId) => {
        ArticleService.getFavorites(userId)
            .then(res => {
                setOwnFavorites(res.data);
            })
            .catch(err => {
                console.error('Error in SessionHandlerContext: ', err);
            });
    }

    useEffect(() => {
        loadActiveUser();
        //eslint-disable-next-line
    }, []);

    useEffect((userId) => {
        getFavorites(userId);
        //eslint-disable-next-line
    }, [user]);

    return (
        <div>
            <SessionHandlerContext.Provider
                value={{
                    user,
                    setActiveUser,
                    login,
                    logout,
                    loadActiveUser,
                    getFavorites,
                    ownFavorites,
                    addFavorite,
                    removeFavorite
                }}
            >
                {props.children}
            </SessionHandlerContext.Provider>
        </div>
    );
};
