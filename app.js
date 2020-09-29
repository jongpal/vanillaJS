let inCanvas = document.getElementById("draw");
let ctx = inCanvas.getContext('2d');
const INIT_COLOR = 'black';
ctx.fillStyle='white';

let f = new FontFace('test', 'url(x)');
let pickFont = 'sans-serif';

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
    if(isTexting === true){ //for text mode
        var input = prompt("input text");// write text in prompt
        if(input === null)
        {
            
        }
        else{
            ctx.fillStyle = 'black';  
            ctx.font = `${pixel}px ${pickFont}`; //give text size
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
        
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        //ctx.fill();
    }

}


function handleMouseUp(e){
    isDrawing = false;
   
    if(isCircle === true){
        //set radius to draw circle
        const radius = Math.sqrt((x-e.offsetX)*(x-e.offsetX)+(y-e.offsetY)*(y-e.offsetY));
        
        //draw circle
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
    ctx.lineWidth = val;
}




const colorSelect = document.getElementsByClassName('canvas_colors');
console.log(colorSelect);
const arrayColors = Array.from(colorSelect);
console.log(arrayColors);
arrayColors.forEach(color => color.addEventListener("click", handleColorClick));

//to give colors
function handleColorClick(e)
{
    ctx.lineWidth = range.value;
    
    ctx.strokeStyle = e.target.style.backgroundColor;
    console.log(ctx.strokeStyle);
}



//give white color to erase
const erase = document.getElementById("erase");
//erase.setAttribute("style","background-color");
erase.addEventListener("click", handleErase);
function handleErase(e){
   
    ctx.strokeStyle='white';
    ctx.lineWidth = 25;
}

const reset = document.getElementById("reset");
reset.addEventListener("click", handleReset);


function handleReset(){ //make canvas white to reset
    ctx.rect(0, 0 , 800, 600);
    ctx.fillStyle='white';
    ctx.fill();
}

//to save a drawing
const save = document.getElementById('save');
save.addEventListener("click", handleSave);


function handleSave()
{
    
    const a = document.createElement('a');
    const dataUrl = inCanvas.toDataURL("image/jpeg", 1.0);//max quality :1.0
    a.href = dataUrl;
    a.download = 'mama,theregoesthatman';
    a.click(); //click effect
   
}


function handleContext(e){
    e.preventDefault(); //not showing the contextmenu 
   //console.log(e);
}


//text mode
const text = document.getElementById('text');
text.addEventListener('click', handleTextToggle);

let isTexting = false;  //first, set it to 'draw' mode

//if click occurs,
function handleTextToggle(){ //to toggle between text and draw

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

//fontstyle
const forFont = document.querySelector(".forFont");
const fontStyle = document.getElementById("fontStyle");
const fonts = forFont.querySelector("#fonts");
fontStyle.addEventListener("mouseover", handleFont);
fontStyle.addEventListener("mouseleave", handleLeave);
fonts.addEventListener("mouseover", handleFont);

//const sansSerif = fonts.querySelector("#sans-serif");
fonts.addEventListener("click", handleSans);

function handleSans(e){ 
    pickFont = e.target.innerText; //set fontStyle
}

function handleFont(){
    fonts.classList.remove("font-hide");
}
function handleLeave(){
    fonts.classList.add("font-hide");
}