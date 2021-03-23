const algortham = document.getElementById("algoritham")
const items = document.getElementById("Num")
const drawB = document.getElementById("draw")
const clearB = document.getElementById("clear")
const shuffleB = document.getElementById("shuffle")
const runB = document.getElementById("run")
const canvas = document.getElementById("canvas")
let GlobalArr = [];
let loop;
clearB.addEventListener("click", clear)
drawB.addEventListener("click", () => {
    setHeightArray(items.value)
    GlobalArr.sort((a,b) => a < b)
    draw(GlobalArr);
})
shuffleB.addEventListener("click", () => {
    setHeightArray(items.value)
    shuffle(GlobalArr);
    draw(GlobalArr);
})
runB.addEventListener("click", () =>{
    const alg = algortham.value;
    run(alg)
})


function setHeightArray(n){
    const height = canvas.clientHeight;
    const step = height / n;
    let current = step
    let arr = [step];
    while(height > current){
        current = current+step;
        arr.unshift(current)
    }
    GlobalArr = arr
    return arr
}

function draw(a){
    clear()
    const n = items.value;
    const width = getWidth(n)
    for (let index = 0; index < a.length; index++) {
        addBlock(a[index], width);
        
    }
}
function shuffle(a){
    var currentIndex = a.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = a[currentIndex];
      a[currentIndex] = a[randomIndex];
      a[randomIndex] = temporaryValue;
    }
    GlobalArr = a
    return a;
}

function clear(){
    while(canvas.firstElementChild){
        canvas.removeChild(canvas.firstElementChild)
    }
}

function getWidth(n){
    const width = canvas.clientWidth;
    return width/n;
}

function addBlock(height, width){
    const num = canvas.childElementCount;
    let b = document.createElement("div");
    b.classList.add("block");
    b.classList.add(num)
    b.style.height = height;
    b.style.width = width;
    canvas.appendChild(b)
}

function run(al){
    if(al == "QuickSort"){

    }else if( al == "BubbleSort"){
        BubbleSort();
    }else if( al == "MergeSort"){
        
    }else if( al == "InsertionSort"){
        
    }else if( al == "SelectionSort"){
        
    }else if( al == "HeapSort"){
        
    }else{
        alert("Please Select an Algoritham")
    }
}


function BubbleSort(){
    let count = 0;
    loop = setInterval(() => {
        BubbleSortHelper(GlobalArr)
        count = count + 1;
        console.log("Ran..")
        check(GlobalArr, loop)
    }, 500)
}

function BubbleSortHelper(arr){
    let node = arr[0];
    for(let index = 1; index < arr.length; index++){
        if(arr[index-1] > arr[index]){
            let holder = arr[index]
            arr[index] = arr[index-1]
            arr[index-1] = holder
        }else{
            node = arr[index]
        }
        draw(arr)
    }
}

function check(arr, val){
    const arrc = [...arr]
    arrc.sort((a,b) => a > b)
    if(arr.length != 0 && equalArr(arrc, arr)){
        clearInterval(val)
        finish()
    }
}

function equalArr(a1, a2){
    if(a1.length != a2.length){return false}
    for(let index = 0; index < a1.length; index++){
        if(a1[index] != a2[index]){
            return false;
        }
    }
    return true;
}

// function select()
function finish(){
    for (let index = 0; index < canvas.childElementCount; index++) {
        const element = canvas.getElementsByClassName(index)[0]
        element.classList.remove("block")
        element.classList.add("selected")
        
    }
}
