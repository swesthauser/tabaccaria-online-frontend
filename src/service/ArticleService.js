import api from '../config/Api';

const ArticleService = {
    getAll: () => {
        return api.get('/articles');
    },
    getById: (id) => {
        return api.get(`/articles/${id}`);
    },
    create: (dto) => {
        return api.get(`/articles`, dto);
    },
};

export default ArticleService;