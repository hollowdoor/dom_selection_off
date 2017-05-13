//https://evanhahn.com/how-to-disable-copy-paste-on-your-website/
const prop = (function(){

    const prefix = [
        'Moz',
        'Khtml',
        'Webkit',
        'webkit',
        'ms',
        'O',
        'o'
    ];

    if(typeof document.body.style['userSelect'] !== 'undefined'){
        return 'userSelect';
    }

    for(let i=0; i<prefix.length; i++){
        let prop = prefix[i] + 'UserSelect';
        if(typeof document.body.style[prop] !== 'undefined'){
            return prop;
        }
    }

    return null;
}());

let SelectionOff;

if(prop){
    SelectionOff = class {
        constructor(element, def = 'auto'){
            this._element = element;
            this._default = def;
            if(element.style[prop].length){
                this._default = element.style[prop];
            }

            this.off();
        }
        off(){
            this._element.style[prop] = "none";
        }
        on(){
            this._element.style[prop] = this._default;
        }
        destroy(){
            this.on();
            this._element = null;
        }
    };
}else{
    SelectionOff = class {
        constructor(element){
            this._element = element;
            this.off();
        }
        off(){
            const makeUnselectable = function(node) {
                if (node.nodeType == 1) {
                    node.setAttribute("unselectable", "on");
                }
                let child = node.firstChild;
                while (child) {
                    makeUnselectable(child);
                    child = child.nextSibling;
                }
            };

            makeUnselectable(this._element);
        }
        on(){
            const makeSelectable = function(node) {
                if (node.nodeType == 1) {
                    node.setAttribute("unselectable", "");
                }
                let child = node.firstChild;
                while (child) {
                    makeSelectable(child);
                    child = child.nextSibling;
                }
            };

            makeSelectable(this._element);
        }
        destroy(){
            this.on();
            this._element = null;
        }
    };
}

export default function selectionOff(element){
    return new SelectionOff(element);
}
