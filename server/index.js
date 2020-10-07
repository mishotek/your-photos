// Setting up environment variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;
const BASE_PATH =  path.resolve(__dirname, '..');

app.use('/', express.static(`${BASE_PATH}/public`));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

