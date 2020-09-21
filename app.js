const inCanvas = document.getElementById("draw");
const ctx = inCanvas.getContext('2d');
ctx.strokeStyle = 'black';
ctx.lineWidth = '1';
inCanvas.addEventListener("mousemove", handleMouseMove);
inCanvas.addEventListener("mousedown", handleMouseDown);
inCanvas.addEventListener("mouseup", handleMouseUp);

let isDrawing = false;

function handleMouseDown(e){    
    isDrawing = true;
    x = e.offsetX;
    y = e.offsetY;
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function handleMouseMove(e){
    if(isDrawing){
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
}

function handleMouseUp(){
    isDrawing = false;
}

const colorSelect = document.querySelector(".canvas_colors");
colorSelect.addEventListener("click", handleColor);

function handleColor(e){
    const newColor = e.target.id;
    console.log(newColor);
    ctx.strokeStyle = newColor;
}

const range = document.getElementById("range");
range.addEventListener("click", handleRange);

function handleRange(){
    const val = range.value;
    ctx.lineWidth = val;
}