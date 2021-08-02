
let game = document.querySelector('.game');
let field = document.querySelector('.field');
let fieldGrid = document.querySelector('.fieldGrid');
let img = document.querySelector('.img');
let btnDiv = document.querySelector('.btn');

let button = btnDiv.querySelector('button');
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

function test(event) {
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
                nodeNext.node.style.background = '';
            }, 1000);

            nodeNext.node.style.background = 'deeppink';
        }
    } else {
        console.log('this');
    }
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
}

function showLegend() {
    show(legendDiv, true);
}

///showBtn(button);
///showBtn(btnDiv);


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

console.log(window.innerWidth, window.innerHeight);

window.addEventListener('orientationchange', event => {
    console.log(event);
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

    img.style.objectFit = 'contain';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectPosition = 'center';

    game.style.width = '100%';
    game.style.height = '100%';
})
