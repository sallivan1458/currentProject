const express = require('express');
const PORT = process.env.PORT || 3010;

const app = express();
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})
app.get('/', (req, res) => {
    res.json({
            message: "hello from server"
        }
    )
})