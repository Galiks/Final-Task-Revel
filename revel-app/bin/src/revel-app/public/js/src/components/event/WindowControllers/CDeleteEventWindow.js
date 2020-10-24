

export class CDeleteEventWindow{
    constructor(){
        
    }

    init(event, eventModel, refreshDatatable){
        this.eventModel = eventModel
        this.refreshDatatable = refreshDatatable

        this.deleteWindow = $$("deleteWindow")
        this.deleteWindowButton = $$("deleteWindowButton")
        this.deleteForm = $$("deleteForm")
        this.mainTab = $$("main")

        this.attachEventOnDeleteWindow(event)
    }

    /**
     * Метод для привязки событий к окну удаления мероприятия
     * @param {Event} event объект класса Event
     */
    attachEventOnDeleteWindow(event){

        this.deleteWindow.attachEvent("onHide", ()=> {
            this.deleteWindow.close()
            this.mainTab.enable()
        })

        $$("deleteWindowClose").attachEvent("onItemClick", () =>{
            this.deleteWindow.close()
            this.mainTab.enable()  
        })

        $$("deleteWindowButtonNo").attachEvent("onItemClick", () =>{
            this.deleteWindow.close()
            this.mainTab.enable()
        })

        $$("deleteWindowButtonYes").attachEvent("onItemClick", () =>{
            this.eventModel.deleteEvent(event.ID).then(()=>{
                this.deleteWindow.close()
                this.mainTab.enable()
                this.refreshDatatable("events")
            })
        })

        this.deleteWindow.show()
        this.mainTab.disable()
    }
}