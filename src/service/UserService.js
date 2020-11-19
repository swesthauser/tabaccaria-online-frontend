import api from '../config/Api';

const UserService = {
    getById: (id) => {
        return api.get(`/users/${id}`)
    },
    create: (dto) => {
        return api.post(`/users`, dto);
    },
    getFavoritesByUser: (id) => {
        return api.get(`/users/${id}/favorites`)
    } 
};

export default UserService;