import express from 'express';
import corsConfig from './src/core/config/cors.js';
import connectDB from './src/core/database/connection.js';
import globalExceptionHandler from './src/utils/globalException.js';
import logger from './src/core/config/logger.js';
import "dotenv/config"
import path from "path";
import responseInterceptor from './src/utils/responseInterceptor.js';

import { userRouter,
     clientRouter, 
    adviseRouter, 
    caseRouter , 
    hearingRouter , 
    contactRouter, 
    evidenceRouter,
    noteRouter,
    expenseRouter} from './src/routes/routes.js';

const app = express();
const PORT = (() => {
    const env = process.env.ENV;
    return env === 'development' ? 7200 : 4545;
})();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(corsConfig);

app.use((req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.originalUrl}`);
    next();
});

connectDB()
    .then(() => {
        logger.info('Database connected successfully');
    })
    .catch((err) => {
        logger.error(`Database connection failed: ${err.message}`);
    });

app.use(responseInterceptor);

app.use('/api/v1/user', userRouter)
app.use('/api/v1/client', clientRouter)
app.use('/api/v1/advise', adviseRouter)
app.use('/api/v1/case', caseRouter)
app.use('/api/v1/hearing', hearingRouter)
app.use('/api/v1/contact', contactRouter)
app.use('/api/v1/evidence', evidenceRouter)
app.use('/api/v1/expense', expenseRouter)
app.use('/api/v1/note', noteRouter)

app.use(globalExceptionHandler);

app.listen(PORT, () => {
    logger.info(`Server is running at port ${PORT}`);
});
