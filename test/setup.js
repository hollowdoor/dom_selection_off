export default function setup(quantity=10){
    let elements = [];
    for(let i=0; i<quantity; i++){
        //let div = document.createElement('div');
        //addVisualFeedback(div, i);
        //elements.push(div);
        let p = document.createElement('p');
        addVisualFeedback(p, i);
        elements.push(p);
        //div.appendChild(p);
        //document.body.appendChild(div);


        p.innerHTML = ' box ' + i;
        p.style.margin = '0px';
        document.body.appendChild(p);
    }
    return elements;
}

function addVisualFeedback(el, i){
    el.style.padding = '2px';
    el.style.border = '1px solid black';
    el.style.top = (30 * i) + 'px';
    el.style.backgroundColor = 'white';
}
