const boardSize = window.innerHeight > 850 ? 640 : 448; //640 (divides evenly by 8) is 75% of 850 so if the screen is smaller use a smaller board
const numRowsAndCols = 8;
const svgns = "http://www.w3.org/2000/svg";
console.log(window.innerHeight);
// console.log(window.innerWidth);
// import { parseFen } from 'fentastic';
// console.log(parseFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'));


generateBoard()

function generateBoard() {
    
    let board = buildBoard();
    
    // let boardContainer = buildNewElement("div", boardContainerAttrArray);
    let boardContainer = document.getElementById('board-container');
    // console.log(boardContainer); 
    boardContainer.append(board);

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
            let newSqaure = generateSquare(xPos, yPos, isLightSquare, "square-" + (x+1) + "" + (y+1));
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
    console.log(newElement);
    return newElement;
}
function buildAttributeObject(attributeName, attributeValue) {
    let attributeObject = {};
    attributeObject.name = attributeName;
    attributeObject.value = attributeValue;
    return attributeObject;
}