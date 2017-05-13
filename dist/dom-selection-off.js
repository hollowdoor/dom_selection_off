var freeLine = (function () {
'use strict';

//https://evanhahn.com/how-to-disable-copy-paste-on-your-website/
var prop = (function(){

    var prefix = [
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

    for(var i=0; i<prefix.length; i++){
        var prop = prefix[i] + 'UserSelect';
        if(typeof document.body.style[prop] !== 'undefined'){
            return prop;
        }
    }

    return null;
}());

var SelectionOff;

if(prop){
    SelectionOff = (function () {
        function SelectionOff(element, def){
        if ( def === void 0 ) def = 'auto';

            this._element = element;
            this._default = def;
            if(element.style[prop].length){
                this._default = element.style[prop];
            }

            this.off();
        }
        SelectionOff.prototype.off = function off (){
            this._element.style[prop] = "none";
        };
        SelectionOff.prototype.on = function on (){
            this._element.style[prop] = this._default;
        };
        SelectionOff.prototype.destroy = function destroy (){
            this.on();
            this._element = null;
        };

        return SelectionOff;
    }());
}else{
    SelectionOff = (function () {
        function SelectionOff(element){
            this._element = element;
            this.off();
        }
        SelectionOff.prototype.off = function off (){
            var makeUnselectable = function(node) {
                if (node.nodeType == 1) {
                    node.setAttribute("unselectable", "on");
                }
                var child = node.firstChild;
                while (child) {
                    makeUnselectable(child);
                    child = child.nextSibling;
                }
            };

            makeUnselectable(this._element);
        };
        SelectionOff.prototype.on = function on (){
            var makeSelectable = function(node) {
                if (node.nodeType == 1) {
                    node.setAttribute("unselectable", "");
                }
                var child = node.firstChild;
                while (child) {
                    makeSelectable(child);
                    child = child.nextSibling;
                }
            };

            makeSelectable(this._element);
        };
        SelectionOff.prototype.destroy = function destroy (){
            this.on();
            this._element = null;
        };

        return SelectionOff;
    }());
}

function selectionOff(element){
    return new SelectionOff(element);
}

return selectionOff;

}());
//# sourceMappingURL=dom-selection-off.js.map
