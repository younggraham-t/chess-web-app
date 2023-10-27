const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const boardController = require('../controllers/boardController.js');
const app = express();
const port = 9039;

app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});

app.get("/validMoveList", boardController.getValidMoves);
app.post("/playerMove", boardController.handlePlayerMove);