export const selectById = (state, productId) =>
    state.product.products.find(p => p.id === productId)