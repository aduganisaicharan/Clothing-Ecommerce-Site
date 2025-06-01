import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import {fileURLToPath} from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'indexx.html'));
});

app.post('/submit', (req, res)=>{
    const num1 = req.body.num1;
    const num2 = req.body.num2;
    let result;
    const operator = req.body.operator;
    switch(operator){
        case '+':
            result = parseInt(num1) + parseInt(num2);   
            break;
        case '-':   
            result = parseInt(num1) - parseInt(num2);
            break;
        case '*':
            result = parseInt(num1) * parseInt(num2);
            break;
        case '/':
            if(num2 !== 0){
                result = parseInt(num1) / parseInt(num2);
            }
            else{
                result = 'Error: Division by zero';
            }
            break;
        default:
            result = 'Error: Invalid operator';
    }
    res.send(`result: ${result}`);
});

app.listen(3000, ()=>{
    console.log('Server is running on http://localhost:3000');
})
