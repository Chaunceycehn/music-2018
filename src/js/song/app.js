{
    let view = {}
    let model = {
        data:{
            song: {
              id: '',
              name: '',
              singer: '',
              url: ''
            },
            status: 'paused'
          },
        // setId(id) {
        //     this.data.id = id
        // },
        get(id){
            var query = new AV.Query('Song')
            return query.get(id).then((song)=>{
              Object.assign(this.data.song, {id: song.id, ...song.attributes})
              return song
            })
          }
    
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            let id = this.getSongId()
            // this.model.setId(id)
            this.model.get(id).then(()=>{
                console.log("4685464564");

                console.log(this.model.data);
                
                this.view.render(this.model.data)
              })
        },
        getSongId() {
            let search = window.location.search
            if (search.indexOf('?') === 0) {
                search = search.substring(1)
            }
            let array = search.split('&').filter((v => v))
            let id = ''

            for (let i = 0; i < array.length; i++) {
                let kv = array[i].split('=')
                let key = kv[0]
                let value = kv[1]
                if (key === 'id') {
                    id = value
                    break
                }

            }
            return id
        }
    }
    controller.init(view, model)

}




