import api from '../config/Api';


const OrderService = {
    getPersonalShoppingCart: (userId) => {
        return api.get(`/orders/cart/${userId}`);
    },
    createOwnShoppingCart: (dto) => {
        return api.post(`/orders`, dto);
    },
    updateOrderDetails: (orderDetailId, dto) => {
        return api.put(`/ordersdetails/${orderDetailId}`, dto);
    },
    deleteOrderDetails: (orderDetailId) => {
        return api.delete(`/ordersdetails/${orderDetailId}`);
    },
    updatePersonalShoppingCart: (id, dto) => {
        return api.put(`/orders/${id}`, dto);
    },
    createOrderDetail: (dto) => {
        return api.post(`/ordersdetails`, dto);
    }

}
export default OrderService;