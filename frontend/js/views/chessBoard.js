const boardSize = window.innerHeight > 850 ? 640 : 488; //640 (divides evenly by 8) is 75% of 850 so if the screen is smaller use a smaller board
const numRowsAndCols = 8;
const svgns = "http://www.w3.org/2000/svg";


//eventually this will come from the backend
const startingPositionFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
// console.log(window.innerHeight);
// console.log(window.innerWidth);


generateBoard()
generatePosition(startingPositionFen);
// generatePosition('rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2');


let selectedPiece = null;
let previousMoveLocations = [];
let currentLegalMoves = ['12-13', '12-14', '22-23', '22-24', '32-33', '32-34', '42-43', '42-44', '52-53', '52-54', '62-63', '62-64', '72-73', '72-74', '82-83', '82-84'];
let validMovesForSelectedPiece = [];

function generateBoard() {
    
    let board = buildBoard();
    
    // let boardContainer = buildNewElement("div", boardContainerAttrArray);
    let boardContainer = document.getElementById('board-container');

    // console.log(boardContainer); 
    boardContainer.append(board);

}


function parseFenPiecePositions(fen) {
    let pieces = [];
    let locationX = 1;
    let locationY = 8;
    for (char of fen) {
        if (char == " ") {
            break;
        }
        if (char == "/") {
            locationX = 1;
            locationY = locationY - 1;
            continue;
        }
        if (!isNaN(char)) {
            blankSpaceCounter = parseInt(char);
            // locationX += blankSpaceCounter;
            for (var i = 0; i < blankSpaceCounter; i++) {
                pieces.push(buildEmptySquare(locationX + "" + locationY));
                locationX++;
            }
            continue;
        }
        else if (isLowerCase(char)) {
            // console.log("black piece");
            pieces.push(buildPieceDiv(char.toLowerCase(), "b", locationX + "" + locationY))
            
        }
        else {
            // console.log("white piece");
            pieces.push(buildPieceDiv(char.toLowerCase(), "w", locationX + "" + locationY))
        }
        locationX += 1;
    }
    return pieces;
}

function generatePosition(fen) {
    removeOldPieces();
    // console.log("position")
    let boardContainer = document.getElementById("board-container");
    let pieces = parseFenPiecePositions(fen);
    // console.log(pieces);
    for (piece of pieces) {
        boardContainer.appendChild(piece);
    }
    
}

function removeOldPieces() {
    let boardContainer = document.getElementById("board-container");
    children = boardContainer.getElementsByClassName("piece");
    // console.log(children);
    while (children[0]) {
        boardContainer.removeChild(children[0]);
    }
}


function handleClickOnSquare(square) {
    
    if (selectedPiece != null) {
        // console.log(square.classList[2].slice(7));
        for (validMove of validMovesForSelectedPiece) {
            if (validMove.includes(square.classList[2].slice(7))) {
                handleClickOnValidMove(square);
                return;
            }
        }
        selectedPiece.classList.remove("hover-square");
        selectedPiece = null;
        return;
      
    }
    else {
        handleClickOnPiece(square);
    }
    console.log(selectedPiece);
}


/*
the class list for a square should look as follows:
(piece|blank) (<pieceName>|empty) square-<squareLocation> (hover-square| )
*/
function handleClickOnValidMove(square) {
    if (selectedPiece == null) { //TODO if piece cant move there removeHoverSquare also
        removeHoverSquare(false);
        return;
    }
    removeHoverSquare(true);
    let selectedPieceClassList = selectedPiece.classList;
    //update the empty square with the info from selectedPiece
    square.classList.replace(square.classList[0], "piece"); //make sure the first class is piece
    square.classList.replace(square.classList[1], selectedPieceClassList[1]); //replace the second class with the selected piece's pieceName
    square.classList.add("hover-square");
    
    //update selectedPiece to be empty
    selectedPieceClassList.replace(selectedPieceClassList[1], "empty");
    selectedPieceClassList.replace("piece", "blank");
    selectedPieceClassList.add("hover-square");
    // console.log(selectedPiece.classList);

    previousMoveLocations.push(square);
    previousMoveLocations.push(selectedPiece);
    selectedPiece = null;
    removeHoverSquare(false);
}

function handleClickOnPiece(square) {
    if (!square.classList.contains("piece")) {
        return;
    }
    if (selectedPiece != null) {
        if (square === selectedPiece) {
            selectedPiece.classList.remove("hover-square");
            selectedPiece = null;
            return;
        }
        // check if the 1st character of the 2nd class is the same for both pieces in which case they are the same color
        if (selectedPiece.classList[1][0] === square.classList[1][0]) {
            // remove previous hover squares
            removeHoverSquare(false);
            //add new hover square 
            selectedPiece = square;
            square.classList.add("hover-square");
            return;
        }
        else {
            handleClickOnValidMove(square);
            return;
        }
    }
    // remove previous hover square
    removeHoverSquare(false);
    //add new hover square
    selectedPiece = square;
    getValidMovesForSelectedPiece();
    square.classList.add("hover-square");
}

function getValidMovesForSelectedPiece() {
    for (move of currentLegalMoves) {
        // console.log(move);
        // console.log(selectedPiece.classList[2])
        if (selectedPiece.classList[2] == "square-" + move.slice(0,2)) {
            validMovesForSelectedPiece.push(move);
        }
    }
    // console.log(validMovesForSelectedPiece);
}

function removeHoverSquare(removeLastMove) {
    hoverSquares = document.querySelectorAll(".hover-square");
    if (hoverSquares.length > 0) {
        for (hoverSquare of hoverSquares) {
            //remove all hover-squares
            if (removeLastMove) {
                hoverSquare.classList.remove("hover-square");
                previousMoveLocations = [];
            }
            //only remove the hover square that highlights the currently selected piece
            else {
                if (selectedPiece === hoverSquare) {
                    hoverSquare.classList.remove("hover-square");
                }
            }
        }
    }
}
function isLowerCase(char) {
    return char == char.toLowerCase();
}

function buildEmptySquare(pieceLocation) {

    className = "blank empty square-";
    className += pieceLocation;
    let divAttrArr = [buildAttributeObject("class", className)];
    let newDiv = buildNewElement("div", divAttrArr);
    newDiv.addEventListener("click", function() {
        handleClickOnSquare(newDiv);
    });
    return newDiv; 
}
function buildPieceDiv(pieceType, pieceColor, pieceLocation) {
    
    let className = "piece ";
    className += pieceColor;
    className += pieceType;
    className += " square-";
    className += pieceLocation;
    let divAttrArr = [buildAttributeObject("class", className)];
    let newDiv = buildNewElement("div", divAttrArr);
    newDiv.addEventListener("click", function() {
        handleClickOnSquare(newDiv);
    });
    return newDiv; 
}

function buildBoard() {
    //create the attribute objects for board
    let boardAttrArray = [buildAttributeObject("class", "board")];
    // generate the board element
    let board = buildNewSVGElement("svg", boardAttrArray);
    board.setAttribute("preserveAspectRatio", "xMinYMax meet")
    // board.setAttribute("viewBox", "0 0 " + boardSize + " " + boardSize)
    // let board = buildNewElement("div", boardAttrArray);
    // buildNewSVGElement("image", [buildAttributeObject("xlink:href", "../assets/images/WK.png"), buildAttributeObject("x", "0"), buildAttributeObject("y", "0"), buildAttributeObject("width", "100"), buildAttributeObject("height", "100")]);
    
    //generate and add the squares
    let locationX = 1;
    let locationY = 8
    let isLightSquare = true;
    for (x=0; x<numRowsAndCols; x++) {
        for (y=0; y<numRowsAndCols; y++) {
            yPos = x * 12.5;
            xPos = y * 12.5;
            let newSqaure = generateSquare(xPos, yPos, isLightSquare, locationX + "" + locationY);
            // newSqaure.style.backgroundImage = "url(data:image/svg+xml;utf8," + svgCode + ")";
   
            board.appendChild(newSqaure);
            isLightSquare = !isLightSquare
            locationX++;
        }
        isLightSquare = !isLightSquare
        locationY--;
        locationX = 1;
    }
    return board;
}
function generateSquare(x, y, isLight, locationId) {
    let xAttr = buildAttributeObject("x", x + "%");
    let yAttr = buildAttributeObject("y", y + "%");
    let classAttr = buildAttributeObject("class", isLight ? "light square-": "dark square-" );
    // let classAttr = buildAttributeObject("class", isLight ? "piece br " + locationId : "piece wr " + locationId);
    let heightAttr = buildAttributeObject("height", "12.5%");
    let widthAttr = buildAttributeObject("width", "12.5%");
    // let idAttr = buildAttributeObject("id", locationId) 
    
    let attrArray = [xAttr, yAttr, classAttr, heightAttr, widthAttr];
    // let attrArray = [xAttr, yAttr, classAttr, idAttr];
    let newSqaure = buildNewSVGElement("rect", attrArray);
    // let newSqaure = buildNewElement("div", attrArray);
     
    // newSqaure.setAttribute("viewBox", "0 0 " + boardSize/numRowsAndCols + " " + boardSize/numRowsAndCols) 
    // newSqaure.setAttribute("preserveAspectRatio", "xMidYMid meet")
    

    // console.log(newSqaure);
    return newSqaure;
}

function setAttribute(element, attributeName, attributeValue) {
    element.setAttribute(attributeName, attributeValue);
}
function buildNewElement(tagName, attributeArray) {
    let newElement = document.createElement(tagName);
    for (attribute of attributeArray) {
        setAttribute(newElement, attribute.name, attribute.value);
    }
    return newElement;
}
function buildNewSVGElement(tagName, attributeArray) {
    let newElement = document.createElementNS(svgns, tagName);
    for (attribute of attributeArray) {
        setAttribute(newElement, attribute.name, attribute.value);
    }
    // console.log(newElement);
    return newElement;
}
function buildAttributeObject(attributeName, attributeValue) {
    let attributeObject = {};
    attributeObject.name = attributeName;
    attributeObject.value = attributeValue;
    return attributeObject;
}