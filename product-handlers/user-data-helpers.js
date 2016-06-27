function validData(data) {
  return typeof data.barcode == 'string' &&
    typeof data.name == 'string' &&
    typeof data.unit == 'string' &&
    typeof data.price == 'number';
}

function getProductData(id, body) {
  return {
    "id": id,
    "barcode": body.barcode,
    "name": body.name,
    "unit": body.unit,
    "price": body.price
  };
}

module.exports = {
  getProductData: getProductData,
  validData: validData
};