const boardSize = window.innerHeight > 850 ? 640 : 448; //640 (divides evenly by 8) is 75% of 850 so if the screen is smaller use a smaller board
const numRowsAndCols = 8;
const svgns = "http://www.w3.org/2000/svg";
console.log(window.innerHeight);
// console.log(window.innerWidth);
generateBoard()

function generateBoard() {
    //create the attribute objects for board
    let boardClassAttr = buildAttributeObject("class", "board");
    // let boardWidthAttr = buildAttributeObject("width", boardSize);
    // let boardHeightAttr = buildAttributeObject("height", boardSize);
    // let preserveAspectRatio = ("preserveAspectRatio", "xMinYMin meet")
    // let viewBox = ("viewBox", "0 0 " + boardSize + " " + boardSize) 
    // let boardAttrArray = [boardClassAttr, boardHeightAttr, boardWidthAttr];
    // let boardAttrArray = [boardClassAttr, preserveAspectRatio, viewBox];
    let boardAttrArray = [boardClassAttr];

    // generate the board
    let board = buildNewSVGElement("svg", boardAttrArray);
    board.setAttribute("preserveAspectRatio", "xMinYMin meet")
    board.setAttribute("viewBox", "0 0 " + boardSize + " " + boardSize)
    // buildNewSVGElement("image", [buildAttributeObject("xlink:href", "../assets/images/WK.png"), buildAttributeObject("x", "0"), buildAttributeObject("y", "0"), buildAttributeObject("width", "100"), buildAttributeObject("height", "100")]);
    
    //generate and add the squares
    let isLightSquare = true;
    for (x=0; x<numRowsAndCols; x++) {
        for (y=0; y<numRowsAndCols; y++) {
            xPos = x * boardSize/numRowsAndCols;
            yPos = y * boardSize/numRowsAndCols;
            let newSqaure = generateSquare(xPos, yPos, isLightSquare, (x+1) + "" + (y+1));
            // newSqaure.style.backgroundImage = "url(data:image/svg+xml;utf8," + svgCode + ")";
   
            board.appendChild(newSqaure);
            isLightSquare = !isLightSquare
        }
        isLightSquare = !isLightSquare
    }
    
    // console.log(board);
    let boardContainerClassAttr = buildAttributeObject("class", "board-container");
    // let boardContainerWidthAttr = buildAttributeObject("width", boardSize);
    // let boardContainerHeightAttr = buildAttributeObject("height", boardSize);
    // let boardContainerAttrArray = [boardContainerClassAttr, boardContainerHeightAttr, boardContainerWidthAttr];
    let boardContainerAttrArray = [boardContainerClassAttr];


    let boardContainer = buildNewElement("div", boardContainerAttrArray);
    boardContainer.append(board);

    let centerPanel = document.getElementsByClassName("center-panel")[0];
    centerPanel.append(boardContainer);
}

function generateSquare(x, y, isLight, locationId) {
    let xAttr = buildAttributeObject("x", x);
    let yAttr = buildAttributeObject("y", y);
    let classAttr = buildAttributeObject("class", isLight ? "light-square" : "dark-square");
    let heightAttr = buildAttributeObject("height", boardSize/numRowsAndCols);
    let widthAttr = buildAttributeObject("width", boardSize/numRowsAndCols);
    let idAttr = buildAttributeObject("id", locationId) 
    
    let attrArray = [xAttr, yAttr, classAttr, heightAttr, widthAttr, idAttr];
    // let attrArray = [xAttr, yAttr, classAttr, idAttr];
    let newSqaure = buildNewSVGElement("rect", attrArray);
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