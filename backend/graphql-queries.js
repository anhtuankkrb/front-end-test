export function getProductsQuery() {
  return `query GetProducts($cursor: String) {
    products(first: 6, after: $cursor, sortKey: CREATED_AT, reverse: true) {
      nodes {
        id
        title
        onlineStorePreviewUrl
        featuredImage {
          altText
          url
        }
        priceRange{
          minVariantPrice{
             amount
             currencyCode
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }`
}

export function searchProductsByTitleQuery(q) {
  return `query SearchProductsByTitle($q: String) {
    products(first: 10, query: $q, sortKey: CREATED_AT, reverse: true) {
      nodes {
        id
        title
        featuredImage {
          altText
          url
        }
        priceRange{
          minVariantPrice{
             amount
             currencyCode
          }
        }
      }
    }
  }`

}

export function deleteProductByIdQuery() {
  return `mutation productDelete($id: ID!){
    productDelete(input: {id: $id}) {
      deletedProductId
      userErrors {
        field
        message
      }
    }
  }`

}

export function updateProductByIdQuery() {
  return `mutation productUpdate($id: ID!, $title: String){
      productUpdate(input: {id: $id, title: $title}) {
        product {
          id
          title
        }
        userErrors {
          field
          message
        }
      }
    }`
}

export function creactProductQuery() {
  return `mutation productCreate($title: String){
      productCreate(input: {title: $title}) {
        product {
          id
          title
        }
        userErrors {
          field
          message
        }
      }
    }`
}

export function setProductPriceQuery() {
  return `mutation productUpdatePrice($id: ID!, $variants: [ProductVariantsBulkInput!]!) {
      productVariantsBulkCreate(productId: $id, strategy: REMOVE_STANDALONE_VARIANT, variants: $variants) {
        product { 
          id 
        }
        userErrors { 
          field 
          message 
        }
      }
    }
  `
}