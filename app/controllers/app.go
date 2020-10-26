package controllers

import (
	"github.com/revel/revel"
)

//App главный контроллер
type App struct {
	*revel.Controller
}

//Index загрузка главного экрана
func (c App) Index() revel.Result {
	return c.Render()
}
