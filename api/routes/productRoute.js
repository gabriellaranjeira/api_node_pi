module.exports = app => {
  const controller = app.controllers.productController;

  app.route('/produtos')
    .get(controller.listProduct)
	.post(controller.saveProduct)
	
  app.route('/produtos/:productId')
	.get(controller.getProduct)
	.put(controller.updateProduct)
	.delete(controller.removeProduct)

}