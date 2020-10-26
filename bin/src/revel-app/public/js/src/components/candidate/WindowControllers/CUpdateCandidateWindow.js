import { CandidateModel } from "../../../models/CandidateModel.js"

export class CUpdateCandidateWindow{
    constructor(){

    }

    init(candidate, refreshDatatable){

        this.candidateModel = new CandidateModel()
        this.refreshDatatable = refreshDatatable

        this.window = $$("updateWindow")
        this.main = $$("main")
        this.form = $$("updateForm")

        this.attachCandidateOnUpdateWindow(candidate)
    }

    attachCandidateOnUpdateWindow(candidate){
        $$("updateWindowClose").attachEvent("onItemClick", () =>{
            this.window.close()
            this.main.enable()
        });

        this.window.attachEvent("onHide", ()=> {
            this.window.close()
            this.main.enable()
        })

        this.parse(candidate)

        $$("updateWindowButton").attachEvent("onItemClick", ()=>{
            if (!this.form.validate()){
                webix.message("Проверьте поля!")
                return
            }
            let values = this.fetch()
            this.candidateModel.updateCandidate(values).then(()=>{
                this.window.close()
                this.main.enable()    
                this.refreshDatatable()
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