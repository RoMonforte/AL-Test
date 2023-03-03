const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const routerApi = require('./routes');

const {logErrors, errorHandler, boomErrorHandler} = require ('./middlewares/error.handler');


app.use(express.json());
// app.use(cors(options));

require('./utils/auth');

app.get('/', (req,res) => {
    res.send('Test for Agave Lab');
})

app.listen(port, () => {
    console.log('Im running in port number ' + port);
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);