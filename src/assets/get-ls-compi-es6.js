/**
 * PLEASE READ BEFORE CONTINUING
 *
 * THIS FILE IS NOT DIRECTLY USED BY get-ls-compi.html
 * TO GET THE CHANGES DONE IN THIS FILE THERE,
 * MANUALLY TRANSPILE THIS FILE TO ES5 AND INSERT IT
 * INLINE IN THE HTML
 */

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/* Listen for events */
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

// Listen to message from child window
eventer(messageEvent,function(e) {
    console.log(e.data);
    if (e.data.type == 1) {
        for (const field in e.data.data) {
            localStorage.setItem(field, e.data.data[field]);
        }

        var url = 'https://comp.moodi.org';
        const sub = getParameterByName('sub');
        if (sub != null) { url += sub; }
        window.location.href = url;
    }
}, false);

// All valid keys
var keys = ['google_id', 'is_authenticated'];

// Clear preexisting keys
for (const key of keys) {
    localStorage.removeItem(key);
}

// Get our keys
window.parent.postMessage({
    type: 4,
    data: keys,
    target: 'compi-iframe'
}, '*')
