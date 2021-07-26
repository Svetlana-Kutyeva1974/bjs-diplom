"use strict"
const userForm = new UserForm();
userForm.loginFormCallback = data => ApiConnector.login(data, response => {
//if (response.success === true && response.userId) {
	if (response.success === true) {
		location.reload();
		return;
	}
	else {
		userForm.setLoginErrorMessage(response.error); 
		return;
	}
});

// регистрация
userForm.registerFormCallback = data => ApiConnector.register(data, response => {
	if (response.success === true) {
		location.reload();
		return;
	}
	else {
		userForm.setRegisterErrorMessage(response.error);
		return;
	}
});

//ApiConnector.logout(response => console.log(response));
