import api from '../config/Api';

const ArticleService = {
    getAll: () => {
        return api.get('/articles');
    },
    getById: (id) => {
        return api.get(`/articles/${id}`);
    },
    create: (dto) => {
        return api.post(`/articles`, dto);
    },
    update: (id, dto) => {
        return api.put(`/articles/${id}`, dto);
    },
    getFavorites: (userId) => {
        return api.get(`/articles/user/${userId}`)
    },
    delete: (id) => {
        return api.delete(`/articles/${id}`);
    }
};

export default ArticleService;