import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

export default (app) => {
    const { NODE_ENV } = process.env;
    app
        .use(bodyParser.json())
        .use(cors())
        .use(helmet());
        if(NODE_ENV == 'development') {
            app.use(morgan('dev'));
        }
}