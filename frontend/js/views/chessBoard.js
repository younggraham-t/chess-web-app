const boardSize = window.innerHeight > 850 ? 640 : 448; //640 (divides evenly by 8) is 75% of 850 so if the screen is smaller use a smaller board
const numRowsAndCols = 8;
const svgns = "http://www.w3.org/2000/svg";

const startingPositionFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
// console.log(window.innerHeight);
// console.log(window.innerWidth);
// import { parseFen } from 'fentastic';
// console.log(parseFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'));


generateBoard()
// generatePosition(startingPositionFen);
generatePosition('rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2');

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
            locationX += blankSpaceCounter;
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
    console.log("position")
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

function buildPieceDiv(pieceType, pieceColor, pieceLocation) {
    
    let className = "piece ";
    className += pieceColor;
    className += pieceType;
    className += " square-";
    className += pieceLocation;
    let divAttrArr = [buildAttributeObject("class", className)];
    let newDiv = buildNewElement("div", divAttrArr);
    newDiv.addEventListener("click", function() {
        setHoverSquare(newDiv);
    });
    return newDiv; 
}

function setHoverSquare(square) {
    // remove previous hover squares
    hoverSquares = document.querySelectorAll(".hover-square");
    if (hoverSquares.length > 0) {
        // console.log(hoverSquares);
        for (hoverSquare of hoverSquares) {
            // console.log(hoverSquare);
            hoverSquare.classList.remove("hover-square");
        }
    }
    //add new hover square
    square.classList.add("hover-square");
}

function isLowerCase(char) {
    return char == char.toLowerCase();
}


function buildBoard() {
    //create the attribute objects for board
    let boardAttrArray = [buildAttributeObject("class", "board")];
    // generate the board element
    let board = buildNewSVGElement("svg", boardAttrArray);
    board.setAttribute("preserveAspectRatio", "xMinYMin meet")
    board.setAttribute("viewBox", "0 0 " + boardSize + " " + boardSize)
    // let board = buildNewElement("div", boardAttrArray);
    // buildNewSVGElement("image", [buildAttributeObject("xlink:href", "../assets/images/WK.png"), buildAttributeObject("x", "0"), buildAttributeObject("y", "0"), buildAttributeObject("width", "100"), buildAttributeObject("height", "100")]);
    
    //generate and add the squares
    let isLightSquare = true;
    for (x=0; x<numRowsAndCols; x++) {
        for (y=0; y<numRowsAndCols; y++) {
            xPos = x * boardSize/numRowsAndCols;
            yPos = y * boardSize/numRowsAndCols;
            let newSqaure = generateSquare(xPos, yPos, isLightSquare);
            // newSqaure.style.backgroundImage = "url(data:image/svg+xml;utf8," + svgCode + ")";
   
            board.appendChild(newSqaure);
            isLightSquare = !isLightSquare
        }
        isLightSquare = !isLightSquare
    }
    return board;
}
function generateSquare(x, y, isLight, locationId) {
    let xAttr = buildAttributeObject("x", x);
    let yAttr = buildAttributeObject("y", y);
    let classAttr = buildAttributeObject("class", isLight ? "light-square" : "dark-square");
    // let classAttr = buildAttributeObject("class", isLight ? "piece br " + locationId : "piece wr " + locationId);
    let heightAttr = buildAttributeObject("height", boardSize/numRowsAndCols);
    let widthAttr = buildAttributeObject("width", boardSize/numRowsAndCols);
    let idAttr = buildAttributeObject("id", locationId) 
    
    let attrArray = [xAttr, yAttr, classAttr, heightAttr, widthAttr, idAttr];
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