package controllers

import (
	"crypto/sha256"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"revel-app/app/models/entities"
	"revel-app/app/models/providers"
	"strconv"

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
	controller.userProvider = &providers.PUser{}
	users, err := controller.userProvider.GetUsers()
	if err != nil {
		fmt.Println(err)
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(users)
}

//GetUserByID метод получения пользователя по ID
func (controller *CUser) GetUserByID() revel.Result {
	id, _ := strconv.ParseInt(controller.Params.Get("id"), 10, 64)
	controller.userProvider = &providers.PUser{}
	users, err := controller.userProvider.GetUserByID(id)
	if err != nil {
		fmt.Println(err)
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(users)
}

//GetUserByAuth метод для получения пользователя после попытки авторизации
func (controller *CUser) GetUserByAuth() revel.Result {

	fmt.Println("Get user by auth")

	var (
		rawRequest []byte // байтовое представление тела запроса
	)

	// получение тела запроса
	rawRequest, err := ioutil.ReadAll(controller.Request.GetBody())
	if err != nil {
		fmt.Println(err)
		return controller.RenderJSON(err)
	}

	user := &entities.User{}

	// преобразование тела запроса в структуру сущности
	err = json.Unmarshal(rawRequest, user)
	if err != nil {
		revel.AppLog.Errorf("GetUserByAuth : json.Unmarshal, %s\n", err)
		return controller.RenderJSON(err)
	}

	controller.userProvider = &providers.PUser{}
	result, err := controller.userProvider.GetUserByAuth(user)
	if err != nil {
		revel.AppLog.Errorf("При поиске пользователя произошла ошибка: ", err)
		return controller.RenderJSON(err)
	}

	return controller.RenderJSON(result)
}

//CreateUser метод создания пользователя
func (controller *CUser) CreateUser() revel.Result {
	user := &entities.User{}
	err := json.Unmarshal(controller.Params.JSON, user)
	if err != nil {
		fmt.Println(err)
		return controller.RenderJSON(err)
	}

	user.Password = controller.getHash(user.Password)

	controller.userProvider = &providers.PUser{}
	result, err := controller.userProvider.CreateUser(user)
	if err != nil {
		fmt.Println(err)
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(result)
}

//UpdateUser метод изменения пользователя
func (controller *CUser) UpdateUser() revel.Result {
	user := &entities.User{}
	err := json.Unmarshal(controller.Params.JSON, user)
	if err != nil {
		fmt.Println(err)
		return controller.RenderJSON(err)
	}
	controller.userProvider = &providers.PUser{}
	result, err := controller.userProvider.UpdateUser(user)
	if err != nil {
		fmt.Println(err)
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(result)
}

//DeleteUser метод удаления пользователя
func (controller *CUser) DeleteUser() revel.Result {
	id, _ := strconv.ParseInt(controller.Params.Get("id"), 10, 64)
	controller.userProvider = &providers.PUser{}
	err := controller.userProvider.DeleteUser(id)
	if err != nil {
		fmt.Println(err)
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(nil)
}

func (controller *CUser) getHash(text string) string {
	first := sha256.New()
	first.Write([]byte(text))

	return string(first.Sum(nil))
}
