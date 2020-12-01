import React, { createContext, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import axios from 'axios';
// import UserService from "../../../service/UserService";
import ArticleService from "../../../service/ArticleService";
import UserService from "../../../service/UserService";
import OrderService from "../../../service/OrderService";
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
    const [personalFavorites, setPersonalFavorites] = useState([]);
    const [personalShoppingCart, setPersonalShoppingCart] = useState({});
    const [personalArticleInfo, setPersonalArticleInfo] = useState([]);
    const [personalArticles, setPersonalArticles] = useState([]);
    const [allArticles, setAllArticles] = useState([]);
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
                getShoppingCart(res.data.id);
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
                setPersonalFavorites(res.data);
            })
            .catch(err => {
                console.error('Error in SessionHandlerContext: ', err);
            });
    };

    const getShoppingCart = (userId) => {
        OrderService.getPersonalShoppingCart(userId)
            .then(res => {
                if (res.data !== null) {
                    setPersonalShoppingCart(res.data);
                    if (res.data.orderDetailsList !== undefined) {
                        console.log('SHOW ARTICLES INFO ', res.data.orderDetailsList)
                        setPersonalArticleInfo(res.data.orderDetailsList);
                        var articleArray = [];
                        res.data.orderDetailsList.map((a) => {
                            articleArray.push(a.article);
                        });
                        console.log('SHOW ARTICLES ', articleArray);
                        setPersonalArticles(articleArray);
                    }
                } else {
                    createShoppingCart(userId);
                }
            })
            .catch(err => {
                console.error('Error in SessionHandlerContext: ', err);
            });
    }

    const createShoppingCart = (userId) => {
        const dto = { userId: userId, orderNumber: generateRandomString() }
        OrderService.createOwnShoppingCart(dto)
            .then(res => {
                setPersonalShoppingCart(res.data);
            })
            .catch(err => {
                console.error('Error in SessionHandlerContext: ', err);
            });
    }

    const generateRandomString = () => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    // const addToShoppingCart = (a, q) => {

    // }

    const getAllArticles = () => {
        ArticleService.getAll()
            .then(res => {
                setAllArticles(res.data);
            })
            .catch(err => {
                console.error('Error in SessionHandlerContext: ', err);
            })
    }

    useEffect(() => {
        loadActiveUser();
        //eslint-disable-next-line
    }, []);

    useEffect((userId) => {
        getFavorites(userId);
        getShoppingCart(userId);
        //eslint-disable-next-line
    }, [user]);

    useEffect(() => {
        getAllArticles();
    }, [])

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
                    personalFavorites,
                    addFavorite,
                    removeFavorite,
                    getShoppingCart,
                    personalShoppingCart,
                    personalArticleInfo,
                    personalArticles,
                    getAllArticles,
                    allArticles
                }}
            >
                {props.children}
            </SessionHandlerContext.Provider>
        </div>
    );
};
