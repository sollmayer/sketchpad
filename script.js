
window.addEventListener('load', ()=> {
    createGrid();
})
let grid_div;
let mouseDown;
function createGrid() {
    let size = parseInt(document.querySelector('#size').value);
    let sketchpad = document.querySelector('.sketchpad')
    for(let i = 0; i<size*size; i++){
        let div = document.createElement('div');
        div.style.width = `${sketchpad.clientWidth / size}px`;
        div.style.height = `${sketchpad.clientWidth /size}px`;
        div.style.backgroundColor = 'rgb(0 0 0 / 0%)';
        sketchpad.appendChild(div);
    }
    grid_div = document.querySelectorAll('.sketchpad div');
    grid_div.forEach(div => {
        div.addEventListener('mousedown', changeColor);
        div.addEventListener('mouseover', changeColor);
        div.addEventListener('dragstart', (e)=>{e.preventDefault()})
        div.addEventListener('drop', (e)=>{e.preventDefault()})
    })
    document.body.addEventListener('mousedown', () => mouseDown = true);
    document.body.addEventListener('mouseup', () => mouseDown = false);
}

function changeColor(e){
    if(e.type === 'mouseover' && mouseDown || e.type === 'mousedown'){
        e.target.style.backgroundColor = "black";
    }
}
