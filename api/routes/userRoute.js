module.exports = app => {
  const controller = app.controllers.userController;

  app.route('/usuarios')
    .get(controller.listUser)
	.post(controller.saveUser)
	
  app.route('/usuarios/:userId')
	.get(controller.getUser)

  app.route('/login')
	.post(controller.login)

}