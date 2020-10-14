package helpers

import (
	"database/sql"
	"errors"

	_ "github.com/lib/pq"
	"github.com/revel/revel"
)

//ErrFailedConnection ошибка при неудачном подключении к БД
var (
	ErrFailedConnection = errors.New("Не удалось связаться с базой данных")
)

//IDBConnector интерфейс для работ с базой данных
type IDBConnector interface {
	GetDBConnection() (*sql.DB, error)
}

//Поле для Singlton
var connector *dbConnector

//GetConnector метод для реализации Singleton
func GetConnector() (IDBConnector, error) {
	if connector == nil {
		connector = new(dbConnector)
	}

	return connector, nil
}

type dbConnector struct {
	*sql.DB
}

func (connector *dbConnector) GetDBConnection() (db *sql.DB, err error) {

	// name, ok := revel.Config.String("db.dbname")
	// if !ok {
	// 	err = ErrFailedConnection
	// 	revel.AppLog.Errorf("Не удалось получить имя БД")
	// 	return
	// }
	// user, ok := revel.Config.String("db.user")
	// if !ok {
	// 	err = ErrFailedConnection
	// 	revel.AppLog.Errorf("Не удалось получить пользователя БД")
	// 	return
	// }
	// password, ok := revel.Config.String("db.password")
	// if !ok {
	// 	err = ErrFailedConnection
	// 	revel.AppLog.Errorf("Не удалось получить пароль БД")
	// 	return
	// }

	//connStr := fmt.Sprintf("postgres://%s:%s@%s/%s?sslmode=verify-full", user, password, address, name)
	connStr := "user=postgres password=admin dbname=AssessmentManagement sslmode=disable"
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		revel.AppLog.Errorf("Не удалось подключиться к БД")
	}

	return db, nil
}
