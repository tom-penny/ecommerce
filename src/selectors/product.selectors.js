export const selectById = (state, productId) =>
    state.products.products.find(p => p.id === productId)