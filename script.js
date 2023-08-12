let size = 16;
let current_mode = 'pencil';
let color;

window.addEventListener('load', ()=> {
    createGrid();
    
    const pencil_btn = document.querySelector('.pencil');
    const eraser_btn = document.querySelector('.eraser');
    const clear_btn = document.querySelector('.clear_btn');
    // const zoomIn_btn = document.querySelector('.zoomIn_btn');
    // const zoomOut_btn = document.querySelector('.zoomOut_btn');
    // const random_btn = document.querySelector('.random');
    pencil_btn.addEventListener('click', ()=>changeMode('pencil'))
    eraser_btn.addEventListener('click', ()=>changeMode('eraser'))
    // random_btn.addEventListener('click', ()=>changeMode('random'))
    clear_btn.addEventListener('click', createGrid);
    // zoomIn_btn.addEventListener('click', zoomIn);
    // zoomOut_btn.addEventListener('click', zoomOut);
    document.querySelector('input[type="range"]').addEventListener('input', (e)=> {
        document.querySelector('label[for="sizeR"]').textContent = `${e.target.value}x${e.target.value}`
    })
    document.querySelector('input[type="range"]').addEventListener('change', (e)=>setSize(e))

})
function setSize(e){
    size = e.target.value;
    document.querySelector('input[type="range"]').value = e.target.value;
    createGrid();
}
// function zoomIn(){
//     let grid = document.querySelector('.sketchpad');
//     grid.style.width = `${grid.clientWidth + 100}px`;
//     grid.style.height = `${grid.clientHeight + 100}px`;
// }
// function zoomOut(){
//     let grid = document.querySelector('.sketchpad');
//     grid.style.width = `${grid.clientWidth - 100}px`;
//     grid.style.height = `${grid.clientHeight - 100}px`;
// }



function changeMode(mode){
    if(mode !== current_mode){
        document.getElementsByName(current_mode)[0].classList.remove('active');
        current_mode = mode;
        document.getElementsByName(mode)[0].classList.add('active');
    }
    console.log(current_mode)
}

let mouseDown;
function createGrid() {
    const grid_div = document.querySelectorAll('.sketchpad div');
    grid_div.forEach(item => item.remove());
    let sketchpad = document.querySelector('.sketchpad')
    sketchpad.style.gridTemplateRows = `repeat(${size},1fr)`;
    sketchpad.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    for(let i = 0; i<size*size; i++){
        let div = document.createElement('div');
        div.style.backgroundColor = 'white';
        sketchpad.appendChild(div);
    }
    addGridListener(document.querySelectorAll('.sketchpad div'));
    document.body.addEventListener('mousedown', () => mouseDown = true);
    document.body.addEventListener('mouseup', () => mouseDown = false);
}

function addGridListener(grid_div){
    grid_div.forEach(div => {
        div.addEventListener('mousedown', changeColor);
        div.addEventListener('mouseover', changeColor);
        div.addEventListener('dragstart', (e)=>{e.preventDefault()})
        div.addEventListener('drop', (e)=>{e.preventDefault()})
    })
}   


function changeColor(e){
    color = document.querySelector('input[type="color"]').value
    if(current_mode === 'pencil'){
        if(e.type === 'mouseover' && mouseDown || e.type === 'mousedown'){
            e.target.style.backgroundColor = color;
        }
    }else if (current_mode === 'eraser'){
        color = 'white';
        if(e.type === 'mouseover' && mouseDown || e.type === 'mousedown'){
            e.target.style.backgroundColor = color;
        }
    }
}
