{
    let APP_ID = 'GDMP6sOi40diiffcuReOjoa9-gzGzoHsz';
    let APP_KEY = 'I8c83ITqqtfEGlWn7M6vADtQ';
    
    AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    });

}




// //创建数据库
// var TestObject = AV.Object.extend('Playlist');
// //创建一条数据
// var testObject = new TestObject();
// //保存记录
// testObject.save({
//     name: 'test',
//     cover: 'test',
//     creater_id: 'test',
//     description: 'test',
//     songs: ['1', '2']
// }).then(function (object) {
//     console.log("1");
// })
// console.log(window.qiniu);
