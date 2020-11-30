import api from '../config/Api';


const OrderService = {
    getOwnShoppingCart: (userId) => {
        return api.get(`/orders/cart/${userId}`);
    },
    // getAllOrdersByUser: (userId) => {
    //     return api.get(`/orders`)
    // },
    // TO DO - need progress in BE
    createOwnShoppingCart: (dto) => {
        return api.post(`/orders`, dto);
    },
    update: (orderId, dto) => {
        return api.put(`/orders/${orderId}`);
    }

}
export default OrderService;