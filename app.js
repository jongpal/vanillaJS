let inCanvas = document.getElementById("draw");
let ctx = inCanvas.getContext('2d');
const INIT_COLOR = 'black';
ctx.fillStyle='white';
const CANVAS_WIDTH = '800';
const CANVAS_HEIGHT = '600';
ctx.rect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
ctx.fill();
ctx.strokeStyle = INIT_COLOR;
ctx.lineWidth = '1';
inCanvas.addEventListener("mousemove", handleMouseMove);
inCanvas.addEventListener("mousedown", handleMouseDown);
inCanvas.addEventListener("mouseup", handleMouseUp);
inCanvas.addEventListener("contextmenu", handleContext);

let isDrawing = false;
let x = 0;
let y = 0;

let pixel = 10;

function handleMouseDown(e){    
    
    x = e.offsetX;
    y = e.offsetY;
    if(isCircle === true){
        ctx.beginPath();
    }
    if(isTexting === true){
        var input = prompt("input text");
        if(input === null)
        {

        }
        else{
            ctx.fillStyle = 'black';  
            ctx.font = `${pixel}px serif`;
            ctx.fillText(input, x, y);
        }

       
    }
    else if(isCircle === false && isDrawing === false){
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
   
}

function handleMouseMove(e){
    if(isDrawing){
        //console.log(e.offsetX, e.offsetY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        //ctx.fill();
    }
}

function handleMouseUp(e){
    isDrawing = false;
    console.log(isDrawing);
    if(isCircle === true){
        const radius = Math.sqrt((x-e.offsetX)*(x-e.offsetX)+(y-e.offsetY)*(y-e.offsetY));
        console.log(radius);
        ctx.arc(x, y, radius, 0, 2*Math.PI);
        ctx.stroke();
    }
}

/*const colorSelect = document.querySelector(".canvas_colors");
console.log(colorSelect); 
colorSelect.addEventListener("click", handleColor);

function handleColor(e){
    const newColor = e.target.id;
    console.log(newColor);
    ctx.strokeStyle = newColor;
}
*/
const range = document.getElementById("range");
const fontsize = document.querySelector(".fontsize");
range.addEventListener("input", handleRange);

function handleRange(){
    const val = range.value;
    fontsize.innerText=`${val}, ${val*20}px`;
    pixel = range.value*20; //for    pixel
    console.log(val);
    ctx.lineWidth = val;
}




const colorSelect = document.getElementsByClassName('canvas_colors');
console.log(colorSelect);
const arrayColors = Array.from(colorSelect);
console.log(arrayColors);
arrayColors.forEach(color => color.addEventListener("click", handleColorClick));

function handleColorClick(e)
{
    
    ctx.lineWidth = range.value;
    ctx.strokeStyle = e.target.style.backgroundColor;
}




const erase = document.getElementById("erase");
//erase.setAttribute("style","background-color");
erase.addEventListener("click", handleErase);
function handleErase(e){
   
    ctx.strokeStyle='white';
    ctx.lineWidth = 25;
}

const reset = document.getElementById("reset");
reset.addEventListener("click", handleReset);


function handleReset(){
    ctx.rect(0, 0 , 800, 600);
    ctx.fillStyle='white';
    ctx.fill();
}


const save = document.getElementById('save');
save.addEventListener("click", handleSave);


function handleSave()
{
    
    const a = document.createElement('a');
    const dataUrl = inCanvas.toDataURL("image/jpeg",1.0);
    a.href = dataUrl;
    a.download = 'mama,theregoesthatman';
    a.click();
    

}


function handleContext(e){
    e.preventDefault(); //not showing the contextmenu 
    console.log(e);
}


//text mode
const text = document.getElementById('text');
text.addEventListener('click', handleTextToggle);

let isTexting = false;

function handleTextToggle(){
console.log(isTexting);
if(isTexting === false){
text.innerText = 'draw';
isTexting = true;

inCanvas.removeEventListener("mousemove", handleMouseMove);
inCanvas.removeEventListener("mouseup", handleMouseUp);//to prevent further drawing

}
else{
text.innerText = 'text';
isTexting = false;

isDrawing = false; //to initialize mouseup state
inCanvas.addEventListener("mousemove", handleMouseMove);
inCanvas.addEventListener("mouseup", handleMouseUp);

}



}



const circle = document.getElementById('circle');
circle.addEventListener("click", handleCircle);

let isCircle = false;
function handleCircle(){
    if(isCircle === false)
      {  isCircle =true;
        inCanvas.removeEventListener('mousemove', handleMouseMove);
      }
    else
    {
        isCircle = false;
        inCanvas.addEventListener('mousemove', handleMouseMove);

    }
        

}