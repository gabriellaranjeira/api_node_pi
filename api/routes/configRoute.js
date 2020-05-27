module.exports = app => {
  const controller = app.controllers.configController;

  app.route('/configuracoes')
    .post(controller.updateConfig)

}