package entities

//Employee структура сущности сотрудника
type Employee struct {
	ID         int64  `json:"ID"`
	Firstname  string `json:"first name"`
	Lastname   string `json:"last name"`
	Patronymic string `json:"patronymic"`
	Position   string `json:"position"`
	Email      string `json:"email"`
	Phone      string `json:"phone"`
	IDUser     int64  `json:"ID user"`
}
