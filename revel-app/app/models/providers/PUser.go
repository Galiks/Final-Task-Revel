package providers

import (
	"revel-app/app/models/entities"
	"revel-app/app/models/mappers"
)

//PUser провайдер контроллера пользователей
type PUser struct {
	userMapper *mappers.MUser
}

//GetUsers метод получения всех пользователей
func (p *PUser) GetUsers() (us []*entities.User, err error) {
	return p.userMapper.SelectAll()
}

//GetUserByID метод получения пользователя по ID
func (p *PUser) GetUserByID(ID int64) (u *entities.User, err error) {
	return p.userMapper.SelectByID(ID)
}

//CreateUser метод создания пользователя
func (p *PUser) CreateUser(user entities.User) (u *entities.User, err error) {
	return p.userMapper.Insert(user)
}

//UpdateUser метод изменения пользователя
func (p *PUser) UpdateUser(user entities.User) (u *entities.User, err error) {
	return p.userMapper.Update(user)
}

//DeleteUser метод удаления пользователя
func (p *PUser) DeleteUser(ID int64) (err error) {
	return p.userMapper.Delete(ID)
}
