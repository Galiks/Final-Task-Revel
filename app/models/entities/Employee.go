package entities

//Employee структура сущности сотрудника
type Employee struct {
	ID         int64  `json:"ID,string"`
	Firstname  string `json:"firstname"`
	Lastname   string `json:"lastname"`
	Patronymic string `json:"patronymic"`
	Position   string `json:"position"`
	Email      string `json:"email"`
	Phone      string `json:"phone"`
	IDUser     int64  `json:"id_user"`
}
