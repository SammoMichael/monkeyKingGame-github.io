
(function() {
    var pressedKeys = {};

    // Function to handle keyboard events
    function handleKeyEvent(event, status) {
        var code = event.keyCode;
        var key;

        switch (code) {
            case 32: key = 'SPACE'; break;
            case 37: key = 'LEFT'; break;
            case 38: key = 'UP'; break;
            case 39: key = 'RIGHT'; break;
            case 40: key = 'DOWN'; break;
            default: key = String.fromCharCode(code); // Convert ASCII codes to letters
        }
        pressedKeys[key] = status;
    }

    // Function to handle touch control events
    function handleControlTouchEvent(elementId, status) {
        var key;
        switch (elementId) {
            case 'circle': key = 'SPACE'; break;
            case 'circle2': key = 'UP'; break;
            case 'circle3': key = 'DOWN'; break; // Corrected mapping
            case 'circle4': key = 'LEFT'; break;
            case 'circle5': key = 'RIGHT'; break; // Corrected mapping
            default: return; // Not a control element
        }
        pressedKeys[key] = status;
        // console.log(`Touch Control: ${elementId}, Key: ${key}, Status: ${status}`);
    }

    // Setup keyboard listeners
    document.addEventListener('keydown', function(e) {
        handleKeyEvent(e, true);
    });
    document.addEventListener('keyup', function(e) {
        handleKeyEvent(e, false);
    });

    // Setup touch listeners if window.touch is true (set in app.js)
    // We need to wait for the DOM to be ready to get elements,
    // or ensure input.js is loaded after the elements are defined.
    // For simplicity, assuming elements are available when this script runs or check window.touch later.

    // Delay setup of touch listeners until DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function () {
        if (window.touch) { // window.touch is set in app.js
            const controlIds = ['circle', 'circle2', 'circle3', 'circle4', 'circle5'];
            controlIds.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    element.addEventListener('touchstart', function(e) {
                        e.preventDefault();
                        handleControlTouchEvent(e.currentTarget.id, true);
                    }, { passive: false });

                    element.addEventListener('touchend', function(e) {
                        e.preventDefault();
                        handleControlTouchEvent(e.currentTarget.id, false);
                    }, { passive: false });

                    // Optional: Add pointer event listeners for touch for broader compatibility if needed
                    // but be careful about double handling if both touch and pointer events fire.
                    // For now, sticking to touchstart/touchend for clarity on touch devices.
                }
            });
        }
    });


    window.addEventListener('blur', function() {
        pressedKeys = {}; // Reset all keys on blur
    });

    window.input = {
        isDown: function(key) {
            // Ensure key is uppercase as game logic might use uppercase (e.g. input.isDown('UP'))
            // and our pressedKeys stores uppercase from keyboard, and now from touch too.
            return pressedKeys[key.toUpperCase()];
        }
    };
})();
