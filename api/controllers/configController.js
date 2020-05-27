const uuidv4 = require('uuid/v4');

module.exports = app => {
  const configDB = app.data.configDB;
  const controller = {};
  const fs = require('fs');
  const bdLocation = "api/data/configDB.json";

  const {
    config: configMock,
  } = configDB;
  
  const updateInDB = () => {
	  console.log("");
	fs.writeFile(bdLocation, JSON.stringify(configDB), function (err) {
		if (err) return console.log(err);
	});
  }
  
  controller.updateConfig = (req, res) => {
	  const { 
      productId,
    } = req.params;
	
	console.log("updateConfig");
	
	  configDB = req.body;
	  updateInDB();
	  
	  res.status(200).json(configDB)
  }
  
  return controller;
}