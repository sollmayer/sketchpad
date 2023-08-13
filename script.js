let size = 16;
let current_mode = 'pencil';
let color;


window.addEventListener('load', ()=> {
    createGrid();
    
    const pencil_btn = document.querySelector('.pencil');
    const eraser_btn = document.querySelector('.eraser');
    const random_btn = document.querySelector('.randomColor');
    const shading_btn = document.querySelector('.shading');
    const clear_btn = document.querySelector('.clear_btn');

    pencil_btn.addEventListener('click', ()=>changeMode('pencil'))
    eraser_btn.addEventListener('click', ()=>changeMode('eraser'))
    random_btn.addEventListener('click', ()=>changeMode('randomColor'))
    shading_btn.addEventListener('click', ()=>changeMode('shading'))
    clear_btn.addEventListener('click', createGrid);

    const size_slider = document.querySelector('input[type="range"]');
    size_slider.addEventListener('input', (e)=> {
        document.querySelector('label[for="sizeR"]').textContent = `${e.target.value}x${e.target.value}`
    })
    size_slider.addEventListener('change', (e)=>setSize(e))

})
function setSize(e){
    size = e.target.value;
    document.querySelector('input[type="range"]').value = e.target.value;
    createGrid();
}


function changeMode(mode){
    if(mode !== current_mode){
        document.getElementsByName(current_mode)[0].classList.remove('active');
        current_mode = mode;
        document.getElementsByName(mode)[0].classList.add('active');
    }
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
        div.addEventListener('mousedown', (e)=>{changeColor(e)});
        div.addEventListener('mouseover', (e)=>{changeColor(e)});
        div.addEventListener('dragstart', (e)=>{e.preventDefault()})
        div.addEventListener('drop', (e)=>{e.preventDefault()})
    })
}   


function changeColor(e){
    color = document.querySelector('input[type="color"]').value;
    if(current_mode === 'pencil'){
        if(e.type === 'mouseover' && mouseDown || e.type === 'mousedown'){
            e.target.style.backgroundColor = color;
        }
    }else if (current_mode === 'eraser'){
        color = 'white';
        if(e.type === 'mouseover' && mouseDown || e.type === 'mousedown'){
            e.target.style.backgroundColor = color;
        }
    }else if (current_mode === 'randomColor'){
        color = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
        if(e.type === 'mouseover' && mouseDown || e.type === 'mousedown'){
            e.target.style.backgroundColor = color;
        }
    }else if (current_mode === 'shading'){
        let alpha = 0.1;
        if(e.type === 'mouseover' && mouseDown || e.type === 'mousedown'){
            if(e.target.style.backgroundColor.match(/[^,]+(?=\))/)){
                let target = e.target.style.backgroundColor.match(/[^,]+(?=\))/);
                let target_alpha = Math.round(target[0]*10)/10;
                let prev_color =  e.target.style.backgroundColor;
                e.target.style.backgroundColor = color + `${Math.floor((target_alpha + 0.1) * 255).toString(16)}`;
                if(target_alpha === 0){
                    e.target.style.backgroundColor = prev_color;
                }
               
            }else{
                e.target.style.backgroundColor = color + `${Math.floor(alpha * 255).toString(16)}`;
            }
        }
    }

}