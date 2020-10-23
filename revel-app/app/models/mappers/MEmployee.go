package mappers

import (
	"database/sql"
	"fmt"
	"revel-app/app/helpers"
	"revel-app/app/models/entities"

	"github.com/revel/revel"
)

//EmployeeSQL структура для конвертации в Employee
type EmployeeSQL struct {
	ID         int64   `json:"ID"`
	Firstname  string  `json:"firstname"`
	Lastname   string  `json:"lastname"`
	Patronymic *string `json:"patronymic"`
	Position   string  `json:"position"`
	Email      string  `json:"email"`
	Phone      string  `json:"phone"`
	IDUser     *int64  `json:"id_user"`
}

//ToEmployee метод конвентирует EmployeeSQL в Employee
func (e EmployeeSQL) ToEmployee() entities.Employee {
	var (
		patronymic string
		idUser     int64
	)

	if e.Patronymic == nil {
		patronymic = ""
	} else {
		patronymic = *e.Patronymic
	}

	if e.IDUser == nil {
		idUser = 0
	} else {
		idUser = *e.IDUser
	}

	return entities.Employee{
		ID:         e.ID,
		Firstname:  e.Firstname,
		Lastname:   e.Lastname,
		Patronymic: patronymic,
		Position:   e.Position,
		Email:      e.Email,
		Phone:      e.Phone,
		IDUser:     idUser}
}

//ToEmployeeSQL метод конвентирует Employee в EmployeeSQL
func ToEmployeeSQL(e entities.Employee) EmployeeSQL {
	var patronymic *string = &e.Patronymic
	var idUser *int64
	if e.IDUser == 0 {
		idUser = nil
	}
	return EmployeeSQL{
		ID:         e.ID,
		Firstname:  e.Firstname,
		Lastname:   e.Lastname,
		Patronymic: patronymic,
		Position:   e.Position,
		Email:      e.Email,
		Phone:      e.Phone,
		IDUser:     idUser}
}

//MEmployee маппер сотрудников
type MEmployee struct {
	db *sql.DB
}

//SelectAll получение всех сотрудников
func (m *MEmployee) SelectAll() (es []*entities.Employee, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MEmployee.SelectAll : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MEmployee.SelectAll : helpers.GetConnector, %s\n", err)
		return nil, err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MEmployee.SelectAll : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MEmployee.SelectAll : connector.GetDBConnection, %s\n", err)
		return nil, err
	}

	defer db.Close()

	query := `SELECT id, "Firstname", "Lastname", "Patronymic", "Position", "Email", "Phone", id_user
	FROM public."Employee";`

	rows, err := db.Query(query)
	if err != nil {
		fmt.Println("MEmployee.SelectAll : db.Query error : ", err)
		revel.AppLog.Errorf("MEmployee.SelectAll : db.Query, %s\n", err)
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		p := EmployeeSQL{}
		err := rows.Scan(&p.ID, &p.Firstname, &p.Lastname, &p.Patronymic, &p.Position, &p.Email, &p.Phone, &p.IDUser)
		if err != nil {
			fmt.Println("MEmployee.SelectAll : rows.Scan error : ", err)
			revel.AppLog.Errorf("MEmployee.SelectAll : rows.Scan, %s\n", err)
			continue
		}

		employee := p.ToEmployee()

		es = append(es, &employee)
	}

	return es, nil
}

//SelectByEventID получение сотрудников, связанных с мероприятием
func (m *MEmployee) SelectByEventID(IDEvent int64) (es []*entities.Employee, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MEmployee.SelectByEventID : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MEmployee.SelectByEventID : helpers.GetConnector, %s\n", err)
		return nil, err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MEmployee.SelectByEventID : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MEmployee.SelectByEventID : connector.GetDBConnection, %s\n", err)
		return nil, err
	}

	defer db.Close()

	query := `SELECT e.id, "Firstname", "Lastname", "Patronymic", "Position", "Email", "Phone", id_user
	FROM public."Employee" as e
	JOIN public."EmployeeEvent" as ee ON e.id = ee.id_employee
	WHERE ee.id_event = $1`

	rows, err := db.Query(query, IDEvent)
	if err != nil {
		fmt.Println("MEmployee.SelectByEventID : db.Query error : ", err)
		revel.AppLog.Errorf("MEmployee.SelectByEventID : db.Query, %s\n", err)
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		fmt.Println("SelectEmployeeByEventID: ", rows)
		p := EmployeeSQL{}
		err := rows.Scan(&p.ID, &p.Firstname, &p.Lastname, &p.Patronymic, &p.Position, &p.Email, &p.Phone, &p.IDUser)
		if err != nil {
			fmt.Println("MEmployee.SelectByEventID : rows.Scan error : ", err)
			revel.AppLog.Errorf("MEmployee.SelectByEventID : rows.Scan, %s\n", err)
		}

		employee := p.ToEmployee()

		es = append(es, &employee)
	}

	return es, nil
}

//SelectByID получение сотрудников по ID
func (m *MEmployee) SelectByID(ID int64) (e *entities.Employee, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MEmployee.SelectByID : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MEmployee.SelectByID : helpers.GetConnector, %s\n", err)
		return nil, err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MEmployee.SelectByID : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MEmployee.SelectByID : connector.GetDBConnection, %s\n", err)
		return nil, err
	}

	defer db.Close()

	query := `SELECT id, "Firstname", "Lastname", "Patronymic", "Position", "Email", "Phone", id_user
	FROM public."Employee"
	WHERE id = $1;`

	row, err := db.Query(query, ID)
	if err != nil {
		fmt.Println("MEmployee.SelectByID : db.Query error : ", err)
		revel.AppLog.Errorf("MEmployee.SelectByID : db.Query, %s\n", err)
		return nil, err
	}

	defer row.Close()

	p := EmployeeSQL{}
	row.Next()
	err = row.Scan(&p.ID, &p.Firstname, &p.Lastname, &p.Patronymic, &p.Position, &p.Email, &p.Phone, &p.IDUser)
	employee := p.ToEmployee()
	return &employee, nil
}

//Insert добавление сотрудников
func (m *MEmployee) Insert(employee *entities.Employee) (e *entities.Employee, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MEmployee.Insert : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MEmployee.Insert : helpers.GetConnector, %s\n", err)
		return nil, err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MEmployee.Insert : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MEmployee.Insert : connector.GetDBConnection, %s\n", err)
		return nil, err
	}

	defer db.Close()

	var id int64

	query := `INSERT INTO public."Employee"(
		"Firstname", "Lastname", "Patronymic", "Position", "Email", "Phone")
		VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;`

	err = db.QueryRow(query, employee.Firstname,
		employee.Lastname,
		employee.Patronymic,
		employee.Position,
		employee.Email,
		employee.Phone).Scan(&id)
	if err != nil {
		fmt.Println("MEmployee.Insert : db.QueryRow error : ", err)
		revel.AppLog.Errorf("MEmployee.Insert : db.QueryRow, %s\n", err)
		return nil, err
	}

	e, err = m.SelectByID(id)
	if err != nil {
		fmt.Println("MEmployee.Insert : m.SelectByID error : ", err)
		revel.AppLog.Errorf("MEmployee.Insert : m.SelectByID, %s\n", err)
		return nil, err
	}

	return e, nil
}

//Update изменение сотрудника
func (m *MEmployee) Update(employee *entities.Employee) (e *entities.Employee, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MEmployee.Update : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MEmployee.Update : helpers.GetConnector, %s\n", err)
		return nil, err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MEmployee.Update : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MEmployee.Update : connector.GetDBConnection, %s\n", err)
		return nil, err
	}

	defer db.Close()

	fmt.Println("UPDATING EMPLOYEE: ", employee)
	var employeeSQL EmployeeSQL = ToEmployeeSQL(*employee)

	query := `UPDATE public."Employee"
	SET "Firstname"=$1, "Lastname"=$2, "Patronymic"=$3, "Position"=$4, "Email"=$5, "Phone"=$6, id_user=$7
	WHERE id = $8;`

	_, err = db.Exec(query,
		employeeSQL.Firstname,
		employeeSQL.Lastname,
		employeeSQL.Patronymic,
		employeeSQL.Position,
		employeeSQL.Email,
		employeeSQL.Phone,
		employeeSQL.IDUser,
		employeeSQL.ID)
	if err != nil {
		fmt.Println("MEmployee.Update : db.Exec error : ", err)
		revel.AppLog.Errorf("MEmployee.Update : db.Exec, %s\n", err)
		return nil, err
	}

	e, err = m.SelectByID(employee.ID)
	if err != nil {
		fmt.Println("MEmployee.Update : m.SelectByID error : ", err)
		revel.AppLog.Errorf("MEmployee.Update : m.SelectByID, %s\n", err)
		return nil, err
	}
	return e, nil
}

//Delete удаление сотрудника
func (m *MEmployee) Delete(ID int64) (err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MEmployee.Delete : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MEmployee.Delete : helpers.GetConnector, %s\n", err)
		return err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MEmployee.Delete : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MEmployee.Delete : connector.GetDBConnection, %s\n", err)
		return err
	}

	defer db.Close()

	fmt.Println("ID FOR DELETE EMPLOYEE: ", ID)

	query := `DELETE FROM public."EmployeeEvent"
	WHERE "id_employee" = $1;`

	_, err = db.Exec(query, ID)
	if err != nil {
		fmt.Println("MEmployee.Delete : db.Exec (employeeEvent) error : ", err)
		revel.AppLog.Errorf("MEmployee.Delete : db.Exec (employeeEvent), %s\n", err)
		return err
	}

	query = `DELETE FROM public."Employee"
	WHERE id = $1;`

	_, err = db.Exec(query, ID)
	if err != nil {
		fmt.Println("MEmployee.Delete : db.Exec (employee) error : ", err)
		revel.AppLog.Errorf("MEmployee.Delete : db.Exec (employee), %s\n", err)
		return err
	}

	return nil
}
