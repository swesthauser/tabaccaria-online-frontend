import api from '../config/Api';

const ArticleService = {
    getAll: () => {
        return api.get('/articles');
    },
    getShoppingCart: () => {
        return api.get('/shoppingcart');
    },
    getById: (id) => {
        return api.get(`/articles/${id}`);
    },
    create: (dto) => {
        return api.get(`/articles`, dto);
    },
    update: (dto) => {
        return api.put(`/shoppingcart`, dto);
    }
};

export default ArticleService;