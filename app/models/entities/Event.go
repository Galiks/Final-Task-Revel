package entities

import (
	"time"
)

//Event структура сущности мероприятия
type Event struct {
	ID        int64     `json:"ID"`
	Theme     string    `json:"theme"`
	Beginning time.Time `json:"beginning"`
	Status    string    `json:"status"`
}
