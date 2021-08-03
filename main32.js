
let game = document.querySelector('.game');
let field = document.querySelector('.field');
let fieldGrid = document.querySelector('.fieldGrid');
let img = document.querySelector('.img');
let btnDiv = document.querySelector('.btn');

///let button = btnDiv.querySelector('button');
let button = document.querySelector('canvas');
let span = btnDiv.querySelector('span');

let legendDiv = document.querySelector('.legend');
let legendContent = legendDiv.querySelector('.content');
let closeButton = legendDiv.querySelector('#close');

let isShowLegend = btnDiv.querySelector('input');
let isShow = isShowLegend.checked;

class Element {
    constructor (node, value) {
///        node.textContent = value;
        this.node = node;
        this.value = value;
///        this.node.textContent = this.value;
        this.node.setAttribute('number', value);
    }


}

class Field {
    constructor (width, height, fieldNode) {
        this.width = width;
        this.height = height;
        this.fieldNode = fieldNode;

        this.arrays = [];
        this.arraysOfEls = [];

        this.buildField();
///        this.applyNum();
        this.applyNum2();
    }

    buildField() {
        for (let j = 0; j < this.height; j++) {
            let str = elt('div', 'str');
            let array = [];

            for (let i = 0; i < this.width; i++) {
                let div = elt('div', 'node');
                str.appendChild(div);
                array.push(div);
            }
            this.fieldNode.appendChild(str);
            this.arrays.push(array);
        }

        return this.arrays;
    }

    applyNum() {
        let count = this.width * this.height;

        for (let i = 0; i < this.height; i++) {
            if (i % 2) {
                for (let j = this.width - 1; j >= 0; j--) {
                    this.arrays[i][j].textContent = count--;
                }
            } else {
                for (let j = 0; j < this.width; j++) {
                    this.arrays[i][j].textContent = count--;
                }
            }
        }

//        console.log(this.count);
    }

    applyNum2() {
        let count = this.width * this.height;

        for (let i = 0; i < this.height; i++) {
            let array = [];
            if (i % 2) {
                for (let j = this.width - 1; j >= 0; j--) {
                    let node = new Element(this.arrays[i][j], count);
                    array.push(node);
                    count--;
                }
            } else {
                for (let j = 0; j < this.width; j++) {
                    let node = new Element(this.arrays[i][j], count);
                    array.push(node);
                    count--;
                }
            }
            this.arraysOfEls.push(array);
        }
    }

}

function elt(el, className) {
    let e = document.createElement(el);

    if (className) {
        e.className = className;
    }

    return e;
}
/*
let f = new Field(9, 8, field);
console.log(f);

console.log(f.arrays);
*/
class Nodes {
    constructor(nodeName) {
        this.nodes = document.querySelectorAll(nodeName);
    }

    getByIndex(index) {
        return this.nodes[index];
    }

    each(fn) {
        for (let node of this.nodes) {      // fine
            fn(node);
        }
    }

}
/*
let fieldNodes = new Nodes('.str');
console.log(fieldNodes);

let one = fieldNodes.getByIndex(0);
console.log(one);
*/
function getNodes(node) {
    return node.querySelectorAll('div');
}
/*
fieldNodes.each(function(node) {
    console.log(getNodes(node));
});
*/
function getValues(list) {
    let array = [];

    for (let node of list) {
        let value = node.textContent;
        array.push(value);
    }

    return array;
}

function getArrays(nodes, fn) {
    let arrays = [];

    nodes.each(function(node) {
        let array = getValues(getNodes(node));

        if (fn) {
            array = fn(array);
        }

        arrays.push(array);
    });

    return arrays;
}

///let a = getArrays(fieldNodes);
///console.log(a);

function toNum(array) {
    return array.map(el => {
        return Number(el);
    });
}

function toNum2(arrays) {
    return arrays.map(array => {
        return toNum(array);
    })
}

///let a2 = getArrays(fieldNodes, toNum);
///console.log(a2);

function sum(a, b) {
    return a + b;
}

function sumOfArray(array) {
    return array.reduce((a, b) => sum(a, b));
}
/*
let a3 = getArrays(fieldNodes, function(v) {
    return sumOfArray(toNum(v));
})

console.log(a3);
 */

let f = new Field(9, 8, fieldGrid);
console.log(f);

console.log(img);
console.log(img.naturalWidth);
console.log(img.width);

console.log(img.getBoundingClientRect());

function applyEvent(node, fn) {
    node.addEventListener('click', fn);
}


for (let array of f.arrays) {
///    for (let node of f.arrays) {
    for (let node of array) {
//        console.log(node);
    applyEvent(node, test);
    }
}

let legendObj = JSON.parse(legend);

function test(event, prevNode) {
    console.log(event.target);
///    alert(`Вы вырали: ${event.target.getAttribute('number')}`);

    let value = Number(event.target.getAttribute('number'));
    let story = legendObj[value];

///    alert(story);

//    if (typeof legendObj[value] == 'object') {
    if (typeof story == 'object') {
        console.log(story);
        if (story.goto) {
            console.log(story.goto);
            let nodeNext = next(f.arraysOfEls, story.goto);
            console.log(nodeNext);

            setTimeout(() => {
                nodeNext.node.style.background = 'pink';
                event.target.style.background = '';
            }, 1000);
/*
            setTimeout(() => {
                console.log(story.story);
                legendContent.innerHTML = story.story;
                showLegendDiv();
            }, 2000);
*/
            nodeNext.node.style.background = 'deeppink';
            nodeNow = nodeNext.node;
///            prevNode.style.background = '';
///            event.target.style.background = '';
        }
    } else {
        console.log('this');
    }

    setTimeout(() => {
///        console.log(story.story);
//        if (story.hasOwnProperty(story)) {
        if (story && story.story) {
            legendContent.innerHTML = story.story;
        } else {
            legendContent.innerHTML = 'some text this';
        }
        showLegendDiv();
    }, 2000);
}

console.log(legendObj);

function next(arraysOfEls, number) {
    let nodeF;

    for (let array of arraysOfEls) {
        for (let obj of array) {
            if (obj['value'] == number) {
                nodeF = obj;
                break;
            }
        }
    }

    return nodeF;
}

function show(node, state) {
    if (state) {
        node.style.display = 'block';
    } else {
        node.style.display = 'none';
    }
}

button.addEventListener('click', event => {

});

function showBtn(button) {
    show(button, true);
    console.log(field);
    show(field, false);         // apply
}

function showLegendDiv() {
    show(legendDiv, true);
}

function f2() {}

///showBtn(button);
///showBtn(btnDiv);

function normalieFieldSie() {
    if (window.innerWidth < window.innerHeight) {
        field.style.width = '95%';
        field.style.height = '';
        console.log(1);

        console.log(field.style.width + 'w', field.style.height + 'h');
    } else {
        field.style.width = '';
        field.style.height = '95%';
        console.log(2);

        console.log(field.style.width + 'w', field.style.height + 'h');
    }
}



console.log(window.innerWidth, window.innerHeight);

window.addEventListener('orientationchange', event => {
    console.log(event);
    setTimeout(() => {
        if (window.innerWidth < window.innerHeight) {
        field.style.width = '95%';
//            field.style.width = '';
            field.style.height = '';
            console.log(1);

            console.log(field.style.width + 'w', field.style.height + 'h');
        } else {
            field.style.width = '';
            field.style.height = '95%';
            console.log(2);

            console.log(field.style.width + 'w', field.style.height + 'h');
        }
    }, 300);
})

///window.addEventListener('orientationchange', normalieFieldSie);

let arrays = f.arrays;
let nodeNow = null;

console.log(arrays);

function getNum() {
    return Math.floor(Math.random() * 6) + 1;
}

button.addEventListener('click', event => {
    numberNow = getNum();
    span.textContent = numberNow;

    clearNumber(100, 100, 70, 70, 30);
    drawNumber(100, 100, 70, 70, numberNow,30);

    console.log(numberNow);

    if (nodeNow) {
//        nodeNow.click();
        setTimeout(() => {
            nextNode(arrays, nodeNow, numberNow);
            //test(nodeNow);
            nodeNow.click();
        }, 2000);
///        showLegend();
    }
    console.log(nodeNow, numberNow);
})

let state = false;
let numberNow = null;

const startNum = 6;

function startGame() {
    if (!state) {
///        alert(`Должно выпасть число ${startNum}`);
            showBtn(btnDiv);


        if (!numberNow || numberNow != startNum) {
            while (numberNow != startNum) {
                button.click();
            }
        }
        state = true;
    }


    nextNode(arrays, nodeNow, numberNow);
//    console.log(nodeNow, numberNow);
}

function nextNode(arraysOfNodes, currentNode, num) {
///    show(btnDiv, false);

    let next = 0;

    if (!currentNode) {
        next = 1;
    } else {
        show(btnDiv, false);
        show(field, true);
        currentNode.style.background = '';
///        next = Number(currentNode.textContent) + num;
        next = Number(currentNode.getAttribute('number')) + num;
        console.log('this');
    }

    console.log(next, 'next');

    let pos = getNodeByNum(arraysOfNodes, next);
    console.log(pos);

    currentNode = arraysOfNodes[pos.y][pos.x];
    nodeNow = currentNode;

///    arraysOfNodes[pos.y][pos.x].style.background = 'pink';
    currentNode.style.background = 'pink';

    console.log(currentNode);

///    showLegend(legendDiv, nodeNow);
/*
    setTimeout(() => {
        showLegend(legendDiv, legendContent, nodeNow);
    }, 2000);
 */
}

function getNodeByNum(arraysOfNodes, num) {
    let i = 0, j = 0;

    for (let array of arraysOfNodes) {
        for (let el of array) {
            if (el.getAttribute('number') == num) {
                i = arraysOfNodes.indexOf(array);
                j = array.indexOf(el);
                break;
            }
        }
    }

    return {x: j, y: i};
}

///startGame();

function showLegend(legendDiv, nodeLegend, nodeNow) {
    if (isShow) {
        nodeLegend.textContent = `Это информация для номера ${nodeNow.textContent}`;
///    nodeLegend.style.display = 'block';
        legendDiv.style.display = 'block';
    }
}

closeButton.addEventListener('click', event => {
    legendDiv.style.display = 'none';
    clearNumber(100, 100, 70, 70, 30);
    show(field, false);
    show(btnDiv, true);
})

isShowLegend.addEventListener('change', event => {
    console.log(event);

    isShow = event.target.checked;
    console.log(isShow);
})
/*
window.addEventListener('deviceorientation', event => {
    console.log(event);
})
 */

normalieFieldSie();
//showLegend();


let canvas = document.querySelector('canvas');

canvas = canvas.getContext('2d');
canvas.canvas.width = 300;
canvas.canvas.height = 300;

function drawCube(width, height, x, y) {
    canvas.strokeStyle = 'green';
    canvas.lineWidth = '2';

    canvas.beginPath();
    canvas.moveTo(x, y);
    canvas.lineTo(x, y + height);
    canvas.lineTo(x + width, y + height);
    canvas.lineTo(x + width, y);
    canvas.lineTo(x, y);

    let topLine = {x, y};
    topLine.x = x + Math.floor(width / 3);
    topLine.y = y - Math.floor(height / 3);

    canvas.moveTo(x, y);
    canvas.lineTo(topLine.x , topLine.y);
    canvas.lineTo(topLine.x + width, topLine.y);
    canvas.lineTo(x + width, y);

    let rightLine = {x, y};
    rightLine.x = topLine.x + width;
    rightLine.y = topLine.y;

    canvas.moveTo(rightLine.x, rightLine.y);
    canvas.lineTo(rightLine.x, rightLine.y + height);
    canvas.lineTo(x + width, y + height);

    canvas.stroke();
}

///drawCube(100, 100, 70, 70);

function drawNumber(width, height, x, y, num, size) {
    canvas.strokeStyle = 'green';
    canvas.lineWidth = '2';
    canvas.font = `${size}px serif`;

    canvas.beginPath();
    canvas.strokeText(num, x + (width - size / 2) / 2 , y + (height + size / 2) / 2);
}

function clearNumber(width, height, x, y, size) {
    canvas.clearRect(x + 10, y + 10, width - 15, height - 15)
}

function showNum(width, height, x, y, num, size) {
    clearNumber(width, height, x, y, size);
///    drawNumber(100, 100, 70, 70, 1, 30);
    drawNumber(width, height, x, y, num, size);
}

function clearCtx(width, height, x, y) {
    canvas.clearRect(x, y, width, height);
}

drawCube(100, 100, 70, 70);


startGame();