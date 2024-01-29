
// domain/.netlify/functions/hello
//  http://localhost:8888/.netlify/functions/hello
// yukardaki url e baglanırsan body deki mesajı görebilirsin 

const items = [
    {id:1,name:"bugra",message:"hello world"},
    {id:2,name:"murat",message:"hello earth"},
    {id:3,name:"beyza",message:"naber millet"}
]


exports.handler = async function(event,context){
    return {
        statusCode:200,
        body: JSON.stringify(items),
    }
}