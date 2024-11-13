const express = require('express');
const logger = require('morgan');
const cors = require('cors');


require('./config/db.config')

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Ayming CAES CAlcs API');
    }
);

const fileRoutes = require('./routes/file.routes');
app.use('/file', fileRoutes);
const tableRoutes = require('./routes/table.routes');
app.use('/table', tableRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    }
);