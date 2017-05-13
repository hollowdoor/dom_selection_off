import selectionOff from '../';

let p2 = document.querySelector('#no-select');
let select = selectionOff(p2);

setTimeout(()=>{
    select.destroy();
    p2.textContent = 'Select me.';
}, 10000);
