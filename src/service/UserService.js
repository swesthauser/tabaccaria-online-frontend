import api from '../config/Api';

const UserService = {
    getById: (id) => {
        return api.get(`/users/${id}`);
    },
    create: (dto) => {
        return api.post(`/users`, dto);
    },
    getFavoritesByUser: (id) => {
        return api.get(`/users/${id}/favorites`);
    },
    getOwnArticles: (id) => {
        return api.get(`/users/${id}/own`);
    },
    addFavorite: (userDTO, userId, articleId) => {
        return api.put(`/users/${userId}/addArticle/${articleId}`, userDTO);
    },
    removeFavorite: (userDTO, userId, articleId) => {
        return api.put(`/users/${userId}/removeArticle/${articleId}`, userDTO);
    },
    update: (id, dto) => {
        return api.put(`/users/${id}`, dto);
    } 
};

export default UserService;