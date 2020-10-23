package controllers

import (
	"encoding/json"
	"fmt"
	"revel-app/app/models/entities"
	"revel-app/app/models/providers"
	"strconv"

	"github.com/revel/revel"
)

//CCandidate контроллер для кандидатов
type CCandidate struct {
	*revel.Controller
	candidateProvider *providers.PCandidate
}

//Before интерцептор BEFOR контроллера CCandidate для проверки авторизации
func (controller *CCandidate) Before() revel.Result {
	// userController := CUser{}

	// isCheck := userController.Check()

	// fmt.Println("CCandidate.Before isCheck: ", isCheck)

	return nil
}

//After интерцептор AFTER контроллера CCandidate
// func (controller *CCandidate) After() revel.Result {
// 	return nil, *controller
// }

//Finally интерцептор FINALLY контроллера CCandidate для закрытия соединения с БД
func (controller *CCandidate) Finally() revel.Result {
	return nil
}

//GetCandidates метод получения всех кандидатов
func (controller *CCandidate) GetCandidates() revel.Result {
	controller.candidateProvider = &providers.PCandidate{}
	candidates, err := controller.candidateProvider.GetCandidates()
	if err != nil {
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(candidates)
}

//GetCandidateByID метод получения кандидатов по ID
func (controller *CCandidate) GetCandidateByID() revel.Result {
	id, err := strconv.ParseInt(controller.Params.Get("id"), 10, 64)
	if err != nil {
		fmt.Println("CCandidate.GetCandidateByID : strconv.ParseInt error : ", err)
		revel.AppLog.Errorf("CCandidate.GetCandidateByID : strconv.ParseInt, %s\n", err)
		return controller.RenderJSON(err)
	}
	controller.candidateProvider = &providers.PCandidate{}
	candidate, err := controller.candidateProvider.GetCandidateByID(id)
	if err != nil {
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(candidate)
}

//GetCandidatesByEvent метод получения кандидатов по ID мероприятия
func (controller *CCandidate) GetCandidatesByEvent() revel.Result {
	id, err := strconv.ParseInt(controller.Params.Get("id"), 10, 64)
	if err != nil {
		fmt.Println("CCandidate.GetCandidatesByEvent : strconv.ParseInt error : ", err)
		revel.AppLog.Errorf("CCandidate.GetCandidatesByEvent : strconv.ParseInt, %s\n", err)
		return controller.RenderJSON(err)
	}
	controller.candidateProvider = &providers.PCandidate{}
	candidates, err := controller.candidateProvider.GetCandidatesByEventID(id)
	if err != nil {
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(candidates)
}

//GetFreeCandidates метод получения кандидатов, не назначенных на мероприятия
func (controller *CCandidate) GetFreeCandidates() revel.Result {
	controller.candidateProvider = &providers.PCandidate{}
	candidates, err := controller.candidateProvider.GetFreeCandidates()
	if err != nil {
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(candidates)
}

//CreateCandidate метод создания кандидатов
func (controller *CCandidate) CreateCandidate() revel.Result {
	candidate := &entities.Candidate{}
	err := json.Unmarshal(controller.Params.JSON, candidate)
	if err != nil {
		fmt.Println("CCandidate.CreateCandidate : json.Unmarshal error : ", err)
		revel.AppLog.Errorf("CCandidate.CreateCandidate : json.Unmarshal, %s\n", err)
		return controller.RenderJSON(err)
	}
	controller.candidateProvider = &providers.PCandidate{}
	result, err := controller.candidateProvider.CreateCandidate(candidate)
	if err != nil {
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(result)
}

//UpdateCandidate метод изменения кандидатов
func (controller *CCandidate) UpdateCandidate() revel.Result {
	candidate := &entities.Candidate{}
	err := json.Unmarshal(controller.Params.JSON, candidate)
	if err != nil {
		fmt.Println("CCandidate.UpdateCandidate : json.Unmarshal error : ", err)
		revel.AppLog.Errorf("CCandidate.UpdateCandidate : json.Unmarshal, %s\n", err)
		return controller.RenderJSON(err)
	}
	controller.candidateProvider = &providers.PCandidate{}
	result, err := controller.candidateProvider.UpdateCandidate(candidate)
	if err != nil {
		fmt.Println(err)
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(result)
}

//DeleteCandidate метод удаления кандидатов
func (controller *CCandidate) DeleteCandidate() revel.Result {
	id, err := strconv.ParseInt(controller.Params.Get("id"), 10, 64)
	if err != nil {
		fmt.Println("CCandidate.DeleteCandidate : strconv.ParseInt error : ", err)
		revel.AppLog.Errorf("CCandidate.DeleteCandidate : strconv.ParseInt, %s\n", err)
		return controller.RenderJSON(err)
	}
	fmt.Println(id)
	controller.candidateProvider = &providers.PCandidate{}
	err = controller.candidateProvider.DeleteCandidate(id)
	if err != nil {
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(nil)
}
