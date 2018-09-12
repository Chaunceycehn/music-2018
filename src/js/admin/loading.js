{
    let view = {
        el:`#siteloading`,
        show(){
            $(this.el).addClass('active')
        },
        hide(){
            $(this.el).removeClass('active')
        },
    }
    let controller ={
        init(view){
            this.view = view
            this.bindEventHub()
        },
        bindEventHub(){
            window.eventHub.on('beforeupload',()=>{
                this.view.show()
            })
            window.eventHub.on('afterupload',()=>{
                this.view.hide()
            })
        }

    }
    controller.init(view)
}
