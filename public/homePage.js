"use strict";
const logoutButton = new LogoutButton();
logoutButton.action = () => ApiConnector.logout(response => {
  if (response.success)
    location.reload();
});

ApiConnector.current(response => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

const ratesBoard = new RatesBoard();
const ratesRequest = () => 
ApiConnector.getStocks(response => {
  console.log(response);
	if (response.success) {
	ratesBoard.clearTable();
	ratesBoard.fillTable(response.data);
	}
});
ratesRequest();
setInterval(ratesRequest, 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = data =>
ApiConnector.addMoney(data, response => {
  if (response.success) { 
    ProfileWidget.showProfile(response.data);
	moneyManager.setMessage(false, "счет успешно пополнен");
} else 
    moneyManager.setMessage(true, response.data);  
  });

moneyManager.conversionMoneyCallback = data =>
ApiConnector.convertMoney(data, response => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
	moneyManager.setMessage(false, "конвертация выполнена");
} else 
    moneyManager.setMessage(true, response.data);  
  });

moneyManager.sendMoneyCallback = data =>
ApiConnector.transferMoney(data, response =>{
  if (response.success) {
    ProfileWidget.showProfile(response.data);
	moneyManager.setMessage(false, "перевод успешно выполнен");
} else 
    moneyManager.setMessage(true, response.data);  
  });
  
const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
  if (response.success) {
	favoritesWidget.clearTable();
	favoritesWidget.fillTable(response.data);
	moneyManager.updateUsersList(response.data);
  }
});

favoritesWidget.addUserCallback = data =>
ApiConnector.addUserToFavorites(data, response => {
  if (response.success) {
	favoritesWidget.clearTable();
	favoritesWidget.fillTable(response.data);
	moneyManager.updateUsersList(response.data);
	favoritesWidget.setMessage(false, "пользователь успешно добавлен");
}
  else
	favoritesWidget.setMessage(true, response.data);
});

favoritesWidget.removeUserCallback = data =>
ApiConnector.removeUserFromFavorites(data, response => {
  if (response.success) {
	favoritesWidget.clearTable();
	favoritesWidget.fillTable(response.data);
	moneyManager.updateUsersList(response.data);
	favoritesWidget.setMessage(false, "пользователь успешно удален");
  }
  else
	favoritesWidget.setMessage(true, response.data);
});



	

	