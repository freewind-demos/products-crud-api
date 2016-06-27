Products CURD Api
=================

```
npm install
node app.js
```

Endpoints
---------

### `GET /products` 

Returns all products information:

```
curl http://localhost:3000/products/
```

- `200` and products information in JSON

### `GET /products/:id`

Returns specified product information:

```
curl http://localhost:3000/products/1
```

- `200` and specified product information in JSON
- `404` if not found

### `DELETE /products/:id`

Delete specified product:

```
curl -X DELETE http://localhost:3000/products/1
```

Returns: 

- `204` if deleted successfully
- `404` if not found

### `POST /products`

Create new product:

```
curl -X POST \
     -d '{"name":"Apple", "unit": "个", "price": 3.4, "barcode": "23232"}' \
     -H "Content-Type: application/json" \
     http://localhost:3000/products
```

Returns: 

- `201` and created product if created successfully, and the id should be increased each time
- `400` if any field missing or has invalid type

### `PUT /products/:id`

Modify existing product:

```
curl -X PUT \
     -d '{"name":"Orange", "unit": "个", "price": 5.5, "barcode": "sdfsdfsf"}' \
     -H "Content-Type: application/json" \
     http://localhost:3000/products/1
```

Returns: 

- `200` and updated product if update successfully
- `400` if any field missing or has invalid type
- `404` if specified product is not existent