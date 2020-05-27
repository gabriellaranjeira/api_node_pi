const uuidv4 = require('uuid/v4');

module.exports = app => {
  const userDB = app.data.userDB;
  const controller = {};
  const fs = require('fs');
  const bdLocation = "api/data/userDB.json";


  const {
    user: userMock,
  } = userDB;
  
  const updateInDB = () => {
	fs.writeFile(bdLocation, JSON.stringify(userDB), function (err) {
		if (err) return console.log(err);
	});
  }
  
  const verifyLogin = (email, senha) => {
	const foundUserIndex = userDB.findIndex((user => user.email == email && user.senha == senha));
	return foundUserIndex;
  }

  controller.listUser = (req, res) => res.status(200).json(userDB);
  
  controller.saveUser = (req, res) => {
	  console.log(req.body);
	  const user = req.body;
	  var d = new Date();
	  user.id = d.getTime();
	  userDB.push(user);
	  updateInDB();
	  res.status(200).json(user);
  }
  
  controller.getUser = (req, res) => {
	  const { 
      userId,
    } = req.params;
	
	console.log("getUser", userId);
	
	  const foundUserIndex = userDB.findIndex(user => user.id == userId);

    if (foundUserIndex === -1) {
      res.status(404).json({
        message: 'Usuário não encontrado na base.',
        success: false
      });
    } else {
		res.status(200).json(userDB[foundUserIndex])
	}
  }
  
  controller.updateUser = (req, res) => {
	  const { 
      userId,
    } = req.params;
	
	console.log("updateUser", userId);
	
	  const foundUserIndex = userDB.findIndex(user => user.id == userId);

    if (foundUserIndex === -1) {
      res.status(404).json({
        message: 'Usuário não encontrado na base.',
        success: false
      });
    } else {
		var id = userDB[foundUserIndex].id;
		userDB[foundUserIndex] = req.body;
		userDB[foundUserIndex].id = id;
		updateInDB();
		res.status(200).json(userDB[foundUserIndex])
	}
  }
  
  controller.removeUser = (req, res) => {
	  const { 
      userId,
    } = req.params;
	
	console.log("remoteUser", userId);
	
	  const foundUserIndex = userDB.findIndex(user => user.id == userId);

    if (foundUserIndex === -1) {
      res.status(404).json({
        message: 'Usuário não encontrado na base.',
        success: false
      });
    } else {
		userDB.splice(foundUserIndex, 1);
		updateInDB();
		res.status(200).json(userDB[foundUserIndex])
	}
  }
  
  controller.login = (req, res) => {
	  var response = {};
	  
	  var index = verifyLogin(req.body.email, req.body.senha);
	  console.log(index);
	  response = (index === -1) ? {status:false} : {status:true, user:userDB[index]} 
	  res.status(200).json(response);
  }
  
  //customerWalletsMock.data.splice(foundCustomerIndex, 1, newCustomer);

  return controller;
}