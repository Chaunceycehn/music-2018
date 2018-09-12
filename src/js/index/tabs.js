{
    let view = {
        el:'#tabs',
        // init(){
        //     this.$el = $(this.el)
        // }
    }
    let model = {}
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.bindEvents()
        },
        bindEvents(){
            this.view.$el.on('click','.tabs-nav > li',(e)=>{
                let $li = e.currentTarget
                $li.addClass('active')
                    .sibings().removeClass('active')
            })
        }
    }
    controller.init(view.model)
}
