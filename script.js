const algortham = document.getElementById("algoritham")
const items = document.getElementById("Num")
const drawB = document.getElementById("draw")
const clearB = document.getElementById("clear")
const shuffleB = document.getElementById("shuffle")
const runB = document.getElementById("run")
const canvas = document.getElementById("canvas")
let GlobalArr = [];
let loop;
let value = 600;


// Clear board, start from zero
clearB.addEventListener("click", end)

//Draws the items in order
drawB.addEventListener("click", () => {
    if(items.value < value){
        value = items.value;
    }
    setHeightArray(value)
    GlobalArr.sort((a,b) => a < b)
    draw(GlobalArr);
    value = 600;
})

//Shuffles the items by size
shuffleB.addEventListener("click", () => {
    if(items.value < value){
        value = items.value;
    }
    setHeightArray(value)
    shuffle(GlobalArr);
    draw(GlobalArr);
    value = 600;
})

//Runs the program at a given algoritham
runB.addEventListener("click", () =>{
    const alg = algortham.value;
    run(alg)
})

// Sets the global array given a number of items
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
}

//draws the blocks of the Global Array
function draw(arr){
    clear()
    const n = items.value;
    const width = getWidth(n)
    for (let index = 0; index < arr.length; index++) {
        addBlock(arr[index], width);
        
    }
}

//Shuffles the GlobalArr
function shuffle(){
    var currentIndex = GlobalArr.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = GlobalArr[currentIndex];
      GlobalArr[currentIndex] = GlobalArr[randomIndex];
      GlobalArr[randomIndex] = temporaryValue;
    }
}

//clears the canvas 
function clear(){
    console.log("Clearing...")
    while(canvas.firstElementChild){
        canvas.removeChild(canvas.firstElementChild)
    }
}

//ends the program
function end(){
    GlobalArr = []
    clear()
}

//return the width given the number of items
function getWidth(n){
    const width = canvas.clientWidth;
    return width/n;
}

//Draws a block given a height and width
function addBlock(height, width){
    const num = canvas.childElementCount;
    let b = document.createElement("div");
    b.classList.add("block");
    b.classList.add(num)
    b.style.height = height;
    b.style.width = width;
    canvas.appendChild(b)
}

//Runs the specifed Algoritham
function run(al){
    if(al == "QuickSort"){

    }else if( al == "BubbleSort"){
        BubbleSort();
    }else if( al == "MergeSort"){
        MergeSort(GlobalArr);
    }else if( al == "InsertionSort"){
        
    }else if( al == "SelectionSort"){
        
    }else if( al == "HeapSort"){
        
    }else{
        alert("Please Select an Algoritham")
    }
}

//Functions for quick sort
function QuickSort(){
    //
}
function QuickSortHelper(){
    //
}





//Functions for bubble sort
function BubbleSort(){
    loop = setInterval(() => {
        BubbleSortHelper()
        console.log("Ranning Bubble Sort..")
        check(GlobalArr, loop)
    }, 250)
}

function BubbleSortHelper(){
    let val = GlobalArr.length-1;
    for(let index = 1; index < GlobalArr.length; index++){
        if(GlobalArr[index-1] > GlobalArr[index]){
            let holder = GlobalArr[index]
            GlobalArr[index] = GlobalArr[index-1]
            GlobalArr[index-1] = holder
            val = index;
        }
    }
    draw(GlobalArr);
    select(val)
}



//Functions for quick sort
function MergeSort(arr){
    let drawArr = []
    if(arr.length == 1){
        return arr
    }
    const half = Math.ceil(arr.length/2);
    let firstHalf = arr.splice(0, half);
    let secondHalf = arr.splice(-half);
    // drawArr = [...firstHalf] + [...secondHalf]
    // draw(drawArr)
    firstHalf = MergeSort(firstHalf)
    secondHalf = MergeSort(secondHalf)


    return Merge(firstHalf,secondHalf)
}
function Merge(arr1, arr2){
    let arr3 = []
    while(arr1.length != 0 && arr2.length != 0){
        if(arr1[0] > arr2[0]){
            arr3.push(arr2[0])
            arr2.splice(0,1)
        }else{
            arr3.push(arr1[0])
            arr1.splice(0,1);
        }
        drawArr = [...arr3] + [...arr1] +[...arr2];
    }
    while(arr1.length != 0){
        arr3.push(arr1[0])
        arr1.splice(0,1);
        drawArr = [...arr3] + [...arr1] +[...arr2];
    }
    while(arr2.length != 0){
        arr3.push(arr1[0])
        arr2.splice(0,1)
        drawArr = [...arr3] + [...arr1] +[...arr2];
    }
    return arr3
}







function select(index){
    clean();
    let b = document.getElementsByClassName(index)[0];
    b.classList.remove("block")
    b.classList.add("selected")
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

function clean(){
    for(let index = 0; index < canvas.childElementCount; index++){
        const node = document.getElementsByClassName(index)[0];
        node.classList.remove("selected")
        node.classList.add("block")
    }
}

function finish(){
    for (let index = 0; index < canvas.childElementCount; index++) {
        const element = canvas.getElementsByClassName(index)[0]
        element.classList.remove("block")
        element.classList.add("selected")
        
    }
}
