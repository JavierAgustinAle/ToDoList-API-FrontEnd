const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());

// Routes
app.use(require('./routes/folders'));
app.use(require('./routes/tasks'));


app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});