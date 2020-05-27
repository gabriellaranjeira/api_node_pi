const uuidv4 = require('uuid/v4');

module.exports = app => {
  const productDB = app.data.productDB;
  const controller = {};
  const fs = require('fs');
  const bdLocation = "api/data/productDB.json";


  const {
    product: productMock,
  } = productDB;
  
  const updateInDB = () => {
	  console.log("");
	fs.writeFile(bdLocation, JSON.stringify(productDB), function (err) {
		if (err) return console.log(err);
	});
  }

  controller.listProduct = (req, res) => res.status(200).json(productDB);
  
  controller.saveProduct = (req, res) => {
	  console.log(req.body);
	  const product = req.body;
	  var d = new Date();
	  product.id = d.getTime();
	  productDB.push(product);
	  updateInDB();
	  console.log("all products", productDB);
	  
	  res.status(200).json(product);
  }
  
  controller.getProduct = (req, res) => {
	  const { 
      productId,
    } = req.params;
	
	console.log("getProduct", productId);
	
	  const foundProductIndex = productDB.findIndex(product => product.id == productId);

    if (foundProductIndex === -1) {
      res.status(404).json({
        message: 'Produto não encontrado na base.',
        success: false
      });
    } else {
		res.status(200).json(productDB[foundProductIndex])
	}
  }
  
  controller.updateProduct = (req, res) => {
	  const { 
      productId,
    } = req.params;
	
	console.log("updateProduct", productId);
	
	  const foundProductIndex = productDB.findIndex(product => product.id == productId);

    if (foundProductIndex === -1) {
      res.status(404).json({
        message: 'Produto não encontrado na base.',
        success: false
      });
    } else {
		var id = productDB[foundProductIndex].id;
		productDB[foundProductIndex] = req.body;
		productDB[foundProductIndex].id = id;
		updateInDB();
		res.status(200).json(productDB[foundProductIndex])
	}
  }
  
  controller.removeProduct = (req, res) => {
	  const { 
      productId,
    } = req.params;
	
	console.log("removeProduct", productId);
	
	  const foundProductIndex = productDB.findIndex(product => product.id == productId);

    if (foundProductIndex === -1) {
      res.status(404).json({
        message: 'Usuário não encontrado na base.',
        success: false
      });
    } else {
		productDB.splice(foundProductIndex, 1);
		updateInDB();
		res.status(200).json(productDB[foundProductIndex])
	}
  }

  return controller;
}