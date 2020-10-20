export class CUpdateCandidateWindow{
    constructor(){

    }

    init(candidate, candidateModel, refreshDatatable){

        this.candidateModel = candidateModel
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
                // this.form.clear()
                return
            }
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

    /**
     * Метод для проверки пустых строк
     * @returns true/false
     */
    isEmptyString(){
        for (let index = 0; index < arguments.length; index++) {
            const element = arguments[index];
            if (element.trim() == ''){
                return true
            }
        }
        return false
    }
}