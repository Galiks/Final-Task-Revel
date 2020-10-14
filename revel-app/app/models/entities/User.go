package entities

import "time"

//User структура сущности пользователя
type User struct {
	ID           int64     `json:"ID"`
	Login        string    `json:"login"`
	Password     string    `json:"password"`
	UserPhoto    []byte    `json:"photo"`
	LastVisisted time.Time `json:"last visited"`
}
