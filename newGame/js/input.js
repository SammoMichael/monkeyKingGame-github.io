
(function() {

    var pressedKeys = {};

    function setKey(event, status) {
        console.log(event);
        console.log(status);
        // if window.touch = true
        // console.log(PointerEvent.MovementX);
        // console.log(PointerEvent.MovementX);
        // console.log(PointerEvent.type);
        // console.log(event.type);
        // console.log(event.MovementX);
        var code = event.keyCode;
        // var pointerX = event.layerX;
        // var pointerY = event.layerY;
        // var playerX = window.player.sprite.pos[0];
        // var playerY = window.player.sprite.pos[1];
        var key;
        // console.log(window.player.sprite.pos);
        // console.log(event.layerX);
        // console.log(event.layerY);
        
        if (event.type === "pointerdown") {
            
        if (event.path[0].id === "circle") {
            key = 'SPACE';
            status = true;
            console.log('SPACE');
            console.log(event.path);
            console.log(event.path.id);
            console.log(key);

        }
        if (event.path[0].id === "circle2") {
            key = 'UP';
            status = true;
            console.log('UP');
            console.log(key);

            console.log(event.path);
        }
        if (event.path[0].id === "circle3") {
            status = true;
            key = 'RIGHT';
            console.log('RIGHT');
            console.log(key);

            // console.log('event');
        }
        if (event.path[0].id === "circle4") {
            status = true;
            key = 'LEFT';
            console.log('LEFT');
            // console.log('event');
        }
        if (event.path[0].id === "circle5") {
            status = true;
            key = 'DOWN';
            console.log('DOWN');
            // console.log('event');
        }
    }

        // if (pointerX > playerX) {
        //     key = 'RIGHT';
        //     console.log('RIGHT');
        // } 
        // if (pointerX < playerX) {
        //     key = 'LEFT';
        //     console.log('LEFT');
        // }
        // if (pointerY > playerY) {
        //     key = 'UP';
        //     console.log('UP');
        // } else if (pointerY < playerY) {
        //     key = 'DOWN';
        //     console.log('DOWN');
        // } 
        // console.log(pressedKeys);
        
        // if (event.PointerEvent.type === "pointerdown") {
        //     key = 'SPACE';
        // }
        switch (code) {
        case 32:
            key = 'SPACE'; break;
        case 37:
            key = 'LEFT'; break;
        case 38:
            key = 'UP'; break;
        case 39:
            key = 'RIGHT'; break;
        case 40:
            key = 'DOWN'; break;
        default:
            // Convert ASCII codes to letters
            key = String.fromCharCode(code);
        }
        // const fire = document.getElementById("joystick");

        //  fire.addEventListener('touchstart', (e) => { 
        //     console.log(e);
        //     key = 'SPACE'; 
        // });
        // fire.addEventListener('pointerdown', (e) => { 
        //     console.log(e);
        //     key = 'SPACE'; 
        // });
        pressedKeys[key] = status;
        console.log(pressedKeys[key]);
        console.log(key);
    }

    document.addEventListener('pointerdown', (e) => {
        setKey(e, true);
    });
    document.addEventListener('pointerup', (e) => {
        pressedKeys = {};
    });
    document.addEventListener('touchstart', (e) => {
        setKey(e, true);
    });
    document.addEventListener('touchend', (e) => {
        pressedKeys = {};
    });

    // document.addEventListener('pointermove', (e) => {
    //     setKey(e, true);
    // });


    document.addEventListener('keyup', function(e) {
        setKey(e, false);
    });

    window.addEventListener('blur', function() {
        pressedKeys = {};
    });

    window.input = {
        isDown: function (key) {
            return pressedKeys[key.toUpperCase()];
        }
    };
})();
