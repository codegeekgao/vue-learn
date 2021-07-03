const Express = require('express')
const app = new Express()

app.get("/",((req, res) => {
    res.send('hello express')
}))

const server = app.listen(3000,()=> {
    const host = server.address().host
    const port = server.address().port
    console.log('http run at:%s:%d',host,port)
})

