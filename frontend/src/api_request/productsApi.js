const host = '';

async function getProducts(endCursor) {
    let result = await fetch(`${host}/api/products?${endCursor ? 'endCursor=' + endCursor : ''}`);

    if (!result.ok) {
        throw new Error('Server error');
    }
    result = await result.json();
    if (!result.data) {
        throw new Error('Server error');
    }
    return {
        products: result.data.products.nodes,
        pageInfo: result.data.products.pageInfo
    };

}

async function searchProductsByTitle(q) {
    let result = await fetch(`${host}/api/products/search?q=${q}`);
    if (!result.ok) {
        throw new Error('Server error');
    }
    result = await result.json();
    if (!result.data) {
        throw new Error('Server error');
    }
    return result.data.products.nodes;

}

async function removeProductsById(id) {
    let result = await fetch(`${host}/api/products/${id}`, { method: 'DELETE' });
    if (!result.ok) {
        throw new Error('Server error');
    }
    result = await result.json();
    if (!result.data) {
        throw new Error('Server error');
    }
    return result;
}

async function updateProductsById(id, title) {
    let result = await fetch(`${host}/api/products/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: title }) })
    if (!result.ok) {
        throw new Error('Server error');
    }
    result = await result.json();
    if (!result.data) {
        throw new Error('Server error');
    }
    return result;

}

async function createProduct(title, price) {
    let result = await fetch(`${host}/api/products`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: title, price: price }) })
    if (!result.ok) {
        throw new Error('Server error');
    }
    result = await result.json();
    if (!result.data) {
        throw new Error('Server error');
    }
    return result;

}

export { getProducts, searchProductsByTitle, removeProductsById, updateProductsById, createProduct };


