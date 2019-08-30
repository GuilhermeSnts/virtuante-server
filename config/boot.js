const port = 3000

module.exports = app => {
    app.listen(port, () => { //escuta na porta definida
        console.log(`API executando na porta: ${port}`)//Mortra a porta que está executando no terminal
    })
}