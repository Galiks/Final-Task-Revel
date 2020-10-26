import { CandidateModel } from "../../../models/CandidateModel.js"

export class CCreateCandidateWindow{
    constructor(){

    }

    init(refreshDatatable){

        this.candidateModel = new CandidateModel()
        this.refreshDatatable = refreshDatatable

        this.window = $$("createWindow")
        this.main = $$("main")
        this.form = $$("createForm")

        this.attachCandidateOnCreateWindow()
    }

    attachCandidateOnCreateWindow(){
        $$("createWindowClose").attachEvent("onItemClick", () =>{
            this.window.close()
            this.main.enable()
        })

        this.window.attachEvent("onHide", ()=> {
            this.window.close()
            this.main.enable()
        })

        $$("createWindowButton").attachEvent("onItemClick", ()=>{
            if (!this.form.validate()){
                webix.message("Проверьте поля!")
                this.form.clear()
                return
            }
            let values = this.fetch()
            this.candidateModel.createCandidate(values).then(()=>{
                this.refreshDatatable()
                this.window.close()
                this.main.enable()
            })
        })

        this.window.show()
        this.main.disable()
    }


    /**
     * Метод возвращает данные с формы
     * @param {string} formName имя формы
     * @returns данные с формы
     */
    fetch(){
        return this.form.getValues()
    }

    /**
     * Метод для заполнение формы данными
     * @param {string} formName имя формы
     * @param {*} values значения
     */
    parse(values){
        this.form.setValues(values)
    }
}