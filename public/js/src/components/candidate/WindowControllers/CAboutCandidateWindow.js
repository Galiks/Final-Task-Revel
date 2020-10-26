export class CAboutCandidateWindow{
    constructor(){

    }

    init(){

        this.window = $$("aboutWindow")
        this.main = $$("main")

        this.attachCandidateOnAboutWindow()
    }

    attachCandidateOnAboutWindow(){
        $$("aboutWindowClose").attachEvent("onItemClick", ()=>{
            this.window.close()
            this.main.enable()  
        });

        this.window.attachEvent("onHide", ()=> {
            this.window.close()
            this.main.enable()
        })
        
        this.window.show()
        this.main.disable()
    }
}