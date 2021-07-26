"use strict"
const objButton = new LogoutButton();

objButton.action = function () {
	ApiConnector.logout (response => {
		console.log(response);
		if (response.success === true) {
			location.reload();
			return;
		}
		else {
			console.log("Ошибка"); 
			return;
		}
	});
}

ApiConnector.current(response => {
	if (response.success === true) {
	ProfileWidget.showProfile(response.data);
	return;
}
else {
	console.log("Ошибка"); 
	return;
}
});

//конвертация таблица
let new_Table = new RatesBoard();
let f = function () {
	ApiConnector.getStocks(responseBody => {
		console.log(responseBody);
		if (responseBody.success === true) {
			new_Table.clearTable();
			new_Table.fillTable(responseBody.data);
			return;
		}
		else {
			console.log("Ошибка"); 
			return;
		}
	});
}
setInterval(f.call(new_Table), 10000);
//?

//операция пополнения
const userMoneyManager = new MoneyManager();
userMoneyManager.addMoneyCallback = data =>
ApiConnector.addMoney(data, (response) => {
	if((response.success === true)) {
		ProfileWidget.showProfile(response.data);
		userMoneyManager.setMessage(response.success, "Счет пополнен");
	}
else {
	userMoneyManager.setMessage(response.success, "Ошибка пополнения");
}
});

// конвертирование
userMoneyManager.conversionMoneyCallback = (data) => 
ApiConnector.convertMoney(data, (response) =>
{
	if(response.success === true) {
		ProfileWidget.showProfile(response.data);
		userMoneyManager.setMessage(response.success, "Конвертация выполнена");
//location.reload();
}
else {
	userMoneyManager.setMessage(response.success, "Ошибка конвертации");
}
});

// перевод валюты
userMoneyManager.sendMoneyCallback = data => 
ApiConnector.transferMoney(data, (response) =>
{
	if(response.success === true) {
		ProfileWidget.showProfile(response.data);
		userMoneyManager.setMessage(response.success, "Перевод выпополнен");
}
else {
	userMoneyManager.setMessage(response.success, "Ошибка перевода");
}
});

// избранное

const FavoritesUsers = new FavoritesWidget();
console.log("Адресная книга создана" + FavoritesUsers);

let f2 = function () {
	ApiConnector.getFavorites(responseBody => {
		if (responseBody.success === true) {
			FavoritesUsers.clearTable();
			FavoritesUsers.fillTable(responseBody.data);
			userMoneyManager.updateUsersList(responseBody.data);
   return;
}
else {
	FavoritesUsers.favoritesMessageBox(responseBody.error); 
	return;
}
});
}
f2.call(FavoritesUsers);

// добавление пользователя

FavoritesUsers.addUserCallback = (data) => 
ApiConnector.addUserToFavorites(data, (response) =>
{
	if(response.success === true) {
		console.log(`успешно   ${response.data}`);
		f2.call(FavoritesUsers);
		FavoritesUsers.setMessage(response.success, "Пользователь добавлен");
	}
	else {
		FavoritesUsers.setMessage(response.success, "Ошибка добавления");
	}
});

// удаление пользователя

FavoritesUsers.removeUserCallback = (id) => {
	ApiConnector.removeUserFromFavorites(id, (response) =>
	{
		if(response.success === true) {
			f2.call(FavoritesUsers);
			FavoritesUsers.setMessage(response.success, "Пользователь удален");
			return;
		}
		else {
			FavoritesUsers.setMessage(response.success, "Ошибка удаления");
		}
	});
}

