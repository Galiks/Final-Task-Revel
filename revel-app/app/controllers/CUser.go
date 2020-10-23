package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"revel-app/app/helpers"
	"revel-app/app/models/entities"
	"revel-app/app/models/providers"
	"strconv"

	"github.com/google/uuid"

	"github.com/revel/revel"
)

//CUser контроллер для пользователй
type CUser struct {
	*revel.Controller
	userProvider *providers.PUser
}

//Before интерцептор BEFOR контроллера CUser
func (controller *CUser) Before() revel.Result {
	isCheck := controller.Check()

	fmt.Println("CUser.Before isCheck: ", isCheck)

	return nil
}

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
	fmt.Println("CUser.GetUserByID")
	id, _ := strconv.ParseInt(controller.Params.Get("id"), 10, 64)
	controller.userProvider = &providers.PUser{}
	users, err := controller.userProvider.GetUserByID(id)
	if err != nil {
		fmt.Println(err)
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(users)
}

//Login метод для получения пользователя после попытки авторизации
func (controller *CUser) Login() revel.Result {

	fmt.Println("Login")

	// инициализация кэша
	cache, err := helpers.GetCache()
	if err != nil {
		revel.AppLog.Errorf("CAuth.Init : helpers.GetCache, %s\n", err)
		return controller.RenderJSON(err)
	}

	var (
		rawRequest []byte // байтовое представление тела запроса
	)

	// получение тела запроса
	rawRequest, err = ioutil.ReadAll(controller.Request.GetBody())
	if err != nil {
		fmt.Println(err)
		return controller.RenderJSON(err)
	}

	user := &entities.User{}

	// преобразование тела запроса в структуру сущности
	err = json.Unmarshal(rawRequest, user)
	if err != nil {
		revel.AppLog.Errorf("CUser.Login : json.Unmarshal, %s\n", err)
		return controller.RenderJSON(err)
	}

	controller.userProvider = &providers.PUser{}
	result, err := controller.userProvider.GetUserByAuth(user)
	if err != nil {
		revel.AppLog.Errorf("При поиске пользователя произошла ошибка: ", err)
		return controller.RenderJSON(err)
	}

	if result != nil {
		// создание токена
		token := uuid.New().String()

		fmt.Println("CUser.Login : controller.userProvider.GetUserByAuth : result : ", result)

		// установка токена в cache сервера
		cache.Set(controller.Session.ID(), token, result)

		// установка токена в cookies клиента
		controller.SetCookie(&http.Cookie{Name: "auth-token", Value: token, Domain: controller.Request.Host, Path: "/"})
	} else {
		return controller.RenderJSON(false)
	}

	return controller.RenderJSON(true)
}

//Logout метод для выхода пользователя
func (controller *CUser) Logout() revel.Result {
	cache, err := helpers.GetCache()
	if err != nil {
		revel.AppLog.Errorf("CUser.Logout : helpers.GetCache, %s\n", err)
	}
	err = cache.Delete(controller.Session.ID())
	if err != nil {
		revel.AppLog.Errorf("CUser.Logout : cache.Delete, %s\n", err)
	}

	return controller.RenderJSON(nil)
}

//Check метод для проверки авторизации
func (controller *CUser) Check() revel.Result {
	// получение токена клиента для пользователя
	userToken, err := controller.Request.Cookie("auth-token")
	if err != nil {
		if err == http.ErrNoCookie {
			return controller.RenderJSON(false)
		}

		revel.AppLog.Errorf("CUser.Check : controller.Request.Cookie, %s\n", err)
		return controller.RenderJSON(err)
	}
	if userToken.GetValue() == "" {
		return controller.RenderJSON(false)
	}

	cache, err := helpers.GetCache()
	if err != nil {
		revel.AppLog.Errorf("CUser.Check : helpers.GetCache, %s\n", err)
	}

	// получение токена сервера для пользователя
	_, token, err := cache.Get(controller.Session.ID())
	if err != nil {
		revel.AppLog.Errorf("CUser.Check : cache.Get, %s\n", err)
		return controller.RenderJSON(err)
	}

	// проверка соответствия токена пользователя сервера и клиента
	if token != userToken.GetValue() {
		return controller.RenderJSON(false)
	}

	return controller.RenderJSON(true)
}

// GetCurrentUser метод получения текущего пользователя
func (controller *CUser) GetCurrentUser() revel.Result {
	fmt.Println("CUser.GetCurrentUser")
	cache, err := helpers.GetCache()
	if err != nil {
		revel.AppLog.Errorf("CUser.GetCurrentEmployee : helpers.GetCache, %s\n", err)
	}
	// получение токена сервера для пользователя
	user, _, err := cache.Get(controller.Session.ID())
	if err != nil {
		revel.AppLog.Errorf("CUser.Check : cache.Get, %s\n", err)
		return controller.RenderJSON(err)
	}

	fmt.Println(user)

	return controller.RenderJSON(user)
}

//CreateUser метод создания пользователя
func (controller *CUser) CreateUser() revel.Result {
	user := &entities.User{}
	err := json.Unmarshal(controller.Params.JSON, user)
	if err != nil {
		revel.AppLog.Errorf("CUser.CreateUser : json.Unmarshal, %s\n", err)
		fmt.Println("Umnrshal error : ", err)
		return controller.RenderJSON(err)
	}

	//user.Password = controller.getHash(user.Password)

	controller.userProvider = &providers.PUser{}
	result, err := controller.userProvider.CreateUser(user)
	if err != nil {
		revel.AppLog.Errorf("CUser.CreateUser : controller.userProvider.CreateUser, %s\n", err)
		fmt.Println("CreateUser error : ", err)
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(result)
}

//UpdateUser метод изменения пользователя
func (controller *CUser) UpdateUser() revel.Result {
	fmt.Println("CUser.UpdateUser")
	user := &entities.User{}
	err := json.Unmarshal(controller.Params.JSON, user)
	if err != nil {
		fmt.Println(err)
		return controller.RenderJSON(err)
	}

	fmt.Println("Unmarshal JSON: ", user)
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
