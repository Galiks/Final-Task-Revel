package entities

//Candidate структура сущности кандидата
type Candidate struct {
	ID         int64  `json:"ID"`
	Firstname  string `json:"firstname"`
	Lastname   string `json:"lastname"`
	Patronymic string `json:"patronymic"`
	Email      string `json:"email"`
	Phone      string `json:"phone"`
	Status     string `json:"status"`
}
