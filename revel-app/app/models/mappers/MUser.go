package mappers

import (
	"database/sql"
	"revel-app/app/models/entities"
)

//MUser маппер пользователей
type MUser struct {
	db *sql.DB
}

//SelectAll получение всех пользователей
func (m *MUser) SelectAll() (us []*entities.User, err error) {
	return
}

//SelectByID получение пользователя по ID
func (m *MUser) SelectByID(ID int64) (u *entities.User, err error) {
	return
}

//Insert создание пользователя
func (m *MUser) Insert(user entities.User) (u *entities.User, err error) {
	return
}

//Update изменение пользователя
func (m *MUser) Update(user entities.User) (u *entities.User, err error) {
	return
}

//Delete удаление пользователя
func (m *MUser) Delete(ID int64) (err error) {
	return
}
