
let game = document.querySelector('.game');
let field = document.querySelector('.field');
let btnDiv = document.querySelector('.btn');

let button = btnDiv.querySelector('button');
let span = btnDiv.querySelector('span');

let legendDiv = document.querySelector('.legend');
let legendContent = legendDiv.querySelector('.content');
let closeButton = legendDiv.querySelector('#close');

let isShowLegend = btnDiv.querySelector('input');
let isShow = isShowLegend.checked;

function buildField(fieldNode) {

    for (let j = 0; j < 8; j++) {
        let str = elt('div', 'str');

        for (let i = 0; i < 9; i++) {
            let div = elt('div', 'node');
            str.appendChild(div);
        }
        fieldNode.appendChild(str);
    }

}

function elt(el, className) {
    let e = document.createElement(el);

    if (className) {
        e.className = className;
    }

    return e;
}

buildField(field);

function getField(field) {
    let arrays = [];

    let nodes = field.querySelectorAll('.str');
    nodes = Array.from(nodes);

    console.log(nodes);

    arrays = nodes.map(str => {
//        let strA = Array.from(str);
 //       return strA.map(node => {
  //          return
 //           return strA;
 //       })
/*
        return str.map(node => {
            let nodeA = node.querySelectorAll('div');
            nodeA = Array.from(nodeA);

            return nodeA;
        })
*/
        let nodeA = str.querySelectorAll('div');
        nodeA = Array.from(nodeA);
        return nodeA;
/*
        return nodeA.map(node => {
            return node;
        })*/

    })

    return arrays;
}

///console.log(getField(field));

function applyNum(arrays) {
/*
    for (let i = arrays.length - 1; i >= 0; i--) {
        for (let j = arrays[i].length - 1; j >= 0; j--) {
            arrays[i][j].textContent = i * j;
        }
    }
*/

    let count = arrays.length * arrays[0].length;
    console.log(count);
/*
    arrays.forEach((array, index) => {          // fine
        if (index % 2) {
            array = array.reverse();
        }
        array.forEach(el => {
            el.textContent = count--;
        });
    });
*/
    for (let i = 0; i < arrays.length; i++) {
        if (i % 2) {
            for (let j = arrays[i].length - 1; j >= 0; j--) {
                arrays[i][j].textContent = count--;
            }
        } else {
            for (let j = 0; j < arrays[i].length; j++) {
                arrays[i][j].textContent = count--;
            }
        }
    }
}

///applyNum(getField(field));

let arrays = getField(field);
let nodeNow = null;

console.log(arrays);

applyNum(arrays);

function getNum() {
    return Math.floor(Math.random() * 6) + 1;
/*
    let num = Math.floor(Math.random() * 6) + 1;
    span.textContent = num;
*/
}
/*
let a = [];

for (let i = 0; i < 1000; i++) {
    let n = getNum();
    a.push(n);
}

a.sort();

let b = [];

a.forEach(el => {
    if (!b.includes(el)) {
        b.push(el);
    }
});

console.log(b);
*/

button.addEventListener('click', event => {
 //   let num = getNum();
//    numberNow = num;
//    span.textContent = num;
    numberNow = getNum();
/*    setTimeout(() => {
        span.textContent = numberNow;
    }, 500);*/
    span.textContent = numberNow;
    console.log(numberNow);

    if (nodeNow) {
        nextNode(arrays, nodeNow, numberNow);
    }
    console.log(nodeNow, numberNow);
})

let state = false;
let numberNow = null;

const startNum = 6;

function startGame() {
    if (!state) {
        alert(`Должно выпасть число ${startNum}`);
        if (!numberNow || numberNow != startNum) {
            while (numberNow != startNum) {
//                setTimeout(button.click(), 500);
                button.click();
/*                setTimeout(() => {
                    button.click();
                }, 500);*/

            }
        }
        state = true;
    }

    nextNode(arrays, nodeNow, numberNow);
//    console.log(nodeNow, numberNow);
}

function nextNode(arraysOfNodes, currentNode, num) {
    let next = 0;

    if (!currentNode) {
        next = 1;
    } else {
        currentNode.style.background = '';
        next = Number(currentNode.textContent) + num;
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
    showLegend(legendDiv, legendContent, nodeNow);
}

function getNodeByNum(arraysOfNodes, num) {
    let i = 0, j = 0;

    arraysOfNodes.forEach((array, index2) => {
        array.forEach((el, index) => {
            if (el.textContent == num) {
                i = index2;
                j = index;
            }
        })
    })

///    return {i, j};
    return {x: j, y: i};
}

startGame();

function showLegend(legendDiv, nodeLegend, nodeNow) {
    if (isShow) {
        nodeLegend.textContent = `Это информация для номера ${nodeNow.textContent}`;
///    nodeLegend.style.display = 'block';
        legendDiv.style.display = 'block';
    }
}

closeButton.addEventListener('click', event => {
    legendDiv.style.display = 'none';
})

isShowLegend.addEventListener('change', event => {
    console.log(event);

    isShow = event.target.checked;
    console.log(isShow);
})