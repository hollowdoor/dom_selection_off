dom-selection-off
=================

Prevent, or allow user selection during mouse, or touch input on DOM elements.

Install
-------

`npm install --save dom-selection-off`

Example
-------

```html
<p style="border:1px solid black">Select me.</p>
<p style="border:1px solid black" id="no-select">You can't select me.</p>
<p style="border:1px solid black">Select me.</p>
```

```javascript
import selectionOff from 'dom-selection-off';

let p = document.querySelector('#no-select');
//The selection is semi-permanently shut off for p.
let select = selectionOff(p);

setTimeout(()=>{
    //selectionOff(element) also gives you a destroy method.
    //Call select.destroy() to remove
    //any event listeners set by selectionOff(element).
    select.destroy();
    p.textContent = 'Select me.';
}, 10000);

```

About
-----

`dom-selection-off` allows fine grained control of user drag selection. Simply turn selection on/off using the `select.on()`, and `select.off()` methods. Clean up using the `select.destroy()` method.
