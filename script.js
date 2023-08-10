let size = 16;
// let buttons = document.querySelectorAll('.buttons button');
window.addEventListener('load', ()=> {
    createGrid();
    document.querySelector('#size').addEventListener('change', (e)=>{
        size = e.target.value;
        createGrid();
    })

    const pencil_btn = document.querySelector('.pencil');
    const eraser_btn = document.querySelector('.eraser');
    // const random_btn = document.querySelector('.random');
    pencil_btn.addEventListener('click', ()=>changeMode('pencil'))
    eraser_btn.addEventListener('click', ()=>changeMode('eraser'))
    // random_btn.addEventListener('click', ()=>changeMode('random'))
})



let current_mode = 'pencil';
function changeMode(mode){
    if(mode !== current_mode){
        document.getElementsByName(current_mode)[0].classList.remove('active')
        current_mode = mode;
        document.getElementsByName(mode)[0].classList.add('active')
    }
    console.log(current_mode)
}

// let btn_selected = false;
// document.addEventListener('click', (e)=>{
//     if(e.target.matches('.btn_group input')) {
        
//     }
// })
let mouseDown;
function createGrid() {
    const grid_div = document.querySelectorAll('.sketchpad div');
    grid_div.forEach(item => item.remove());
    let sketchpad = document.querySelector('.sketchpad')
    sketchpad.style.gridTemplateRows = `repeat(${size},1fr)`;
    sketchpad.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    for(let i = 0; i<size*size; i++){
        let div = document.createElement('div');
        // div.style.width = `${sketchpad.clientWidth / size}px`;
        // div.style.height = `${sketchpad.clientWidth /size}px`;
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

let color;
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




// document.querySelectorAll('.buttons button').forEach(elem => {
//     elem.addEventListener('click', ()=> {elem.classList.add('1')})
// });