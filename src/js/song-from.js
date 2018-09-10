{
    let view = {
        el : '.page > main',
        init(){
            this.$el = $(this.el)
        },
        template : `
            <form>
                <div class="row">
                    <label>歌名</label>
                    <input name="name" type="text" class="text" value="__name__">
                </div>
                <div class="row">
                    <label>歌手</label>
                    <input name="singer" type="text" class="text" value="__singer__">
                </div>
                <div class="row">
                    <label>外链</label>
                    <input name="url" type="text" class="text" value="__url__">
                </div>
                <div class="row actions">
                    <button  type="submit">保存</button>
                </div>
            </form>
        `,
        render(data = {}){
            let placeholders = ['name','url','singer','id']
            let html = this.template
            placeholders.map((string)=>{
                html = html.replace(`__${string}__`, data[string] || '')
            })
            $(this.el).html(html)
            if(data.id){
                $(this.el).prepend('<h1>编辑歌曲</h1>')
            }
            else{
                $(this.el).prepend('<h1>新建歌曲</h1>')

            }
        },
        reset(){
            this.render({})
        }
    }

    let model={
        data:{
            name:'',singer:'',url:'',id:'',
        },
        create(data){
            var Song = AV.Object.extend('Song');
            var song = new Song();
            song.set('name',data.name);
            song.set('singer',data.singer);
            song.set('lyrics', data.lyrics)
            song.set('url',data.url);
            song.set('cover',data.cover);
            return song.save().then((newSong) =>{
              let {id, attributes} = newSong
              Object.assign(this.data, { id, ...attributes })
            }, (error) =>{
              console.error(error);
            });  
        }
    }
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            this.bindevents()
            window.eventHub.on('upload',(data)=>{
                this.view.render(data)
            })
            window.eventHub.on('select',(data)=>{
                this.model.data=data
                this.view.render(this.model.data)
            })
        },
        bindevents(){
            console.log("--------1------");


            $(this.view.el).on('submit','form',(e)=>{
                console.log("--------2------");

                e.preventDefault()
                let needs = 'name singer url'.split(' ')
                let data = {}
                needs.map((string)=>{
                    data[string] = $(this.view.el).find(`[name="${string}"]`).val()
                })
                this.model.create(data)
                    .then(()=>{
                        this.view.reset()
                        let string = JSON.stringify(this.model.data)
                        let object = JSON.parse(string)
                        window.eventHub.emit('create',object)
                    })
            })
        }
    }
    controller.init(view,model)

}