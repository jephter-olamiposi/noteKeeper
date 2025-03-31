import express,{} from 'express';
import index from './routes/index';
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/api',index);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});