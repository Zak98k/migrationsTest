import express from 'express';
//import router from './server/router/index';
import cors from 'cors';
import errorHandler from './server/utils/errorHandler'

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());

app.use(express.json());
app.use('/api', router);
app.use((req, res)=> {
    res.status(404).send('Sorry cant find that request!From server/index.js');
});

//app.use(errorHandler);

app.listen(PORT);