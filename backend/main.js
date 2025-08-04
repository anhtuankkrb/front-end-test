import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { createAdminApiClient } from '@shopify/admin-api-client';
import { getProductsQuery, searchProductsByTitleQuery, deleteProductByIdQuery, updateProductByIdQuery, creactProductQuery, setProductPriceQuery } from './graphql-queries.js';


dotenv.config({ path: './.env' });
const app = express();
app.use(bodyParser.json());

const client = createAdminApiClient({
  storeDomain: process.env.STORE_DOMAIN,
  apiVersion: process.env.API_VERION,
  accessToken: process.env.ACCESS_TOKEN,
});
app.use(express.static('dist'));

app.get('/api/products', async (req, res) => {
  const cursor = req.query?.endCursor;
  const result = await client.request(getProductsQuery(), {
    variables: {
      cursor: cursor,
    },
  });
  res.json(result);
})

app.get('/api/products/search', async (req, res) => {
  const q = req.query.q;
  const result = await client.request(searchProductsByTitleQuery(q), {
    variables: {
      q: `title:*${q}*`,
    },
  });
  res.json(result);
})

app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const result = await client.request(deleteProductByIdQuery(), {
    variables: {
      id: `gid://shopify/Product/${id}`,
    }
  });
  res.json(result);
})

app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const result = await client.request(updateProductByIdQuery(), {
    variables: {
      id: `gid://shopify/Product/${id}`,
      title: title,
    }
  });
  res.json(result);
})

app.post('/api/products', async (req, res) => {
  const { title, price } = req.body;
  const newProduct = await client.request(creactProductQuery(), {
    variables: {
      title: title,
    }
  });
  const result = await client.request(setProductPriceQuery(), {
    variables: {
      id: newProduct.data.productCreate.product.id,
      variants: [
        {
          price: price,
        },
      ],
    }
  });
  res.json(result);
})

app.listen(process.env.PORT , () => {
  console.log(`Listening on port ${process.env.PORT}`);
})