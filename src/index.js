const { app, PORT, HOST } = require("./server");


app.listen(PORT, HOST, () => {
    console.log(`GamePlan API is not running`)
})