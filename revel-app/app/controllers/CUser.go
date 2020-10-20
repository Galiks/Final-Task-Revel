package controllers

import (
	"revel-app/app/models/providers"

	"github.com/revel/revel"
)

//CUser контроллер для пользователй
type CUser struct {
	*revel.Controller
	userProvider *providers.PUser
}

// //Before интерцептор BEFOR контроллера CUser
// func (controller *CUser) Before() (result revel.Result, rc CUser) {
// 	return nil, *controller
// }

// //After интерцептор AFTER контроллера CUser
// func (controller *CUser) After() (result revel.Result, rc CUser) {
// 	return nil, *controller
// }

//GetUsers метод получения всех пользователей
func (controller *CUser) GetUsers() revel.Result {
	//var Users []*entities.User = controller.UserProvider.GetUsers()

	return nil
}

//GetUserByID метод получения пользователя по ID
func (controller *CUser) GetUserByID() revel.Result {

	return nil
}

//CreateUser метод создания пользователя
func (controller *CUser) CreateUser() revel.Result {
	return nil
}

//UpdateUser метод изменения пользователя
func (controller *CUser) UpdateUser() revel.Result {
	return nil
}

//DeleteUser метод удаления пользователя
func (controller *CUser) DeleteUser() revel.Result {
	return nil
}
