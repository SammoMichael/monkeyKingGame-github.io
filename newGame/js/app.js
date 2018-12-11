if ("ontouchstart" in document.documentElement) {
    console.log("your device is a touch screen device.");
    window.touch = true;
}
else {
    window.touch = false;
    console.log("your device is NOT a touch device");
}
document.getElementById('game-start').style.display = 'block';
// var hBar = $('.health-bar')
// var bar = hBar.find('.bar')
// document.getElementById('game-start-overlay').style.display = 'block';
// var music = document.getElementById('ambush').play();
document.getElementById('start').addEventListener('click', () => {
    // window.music = document.getElementById('ambush');
    document.getElementById('game-start').style.display = 'none';
var requestAnimFrame = (function (){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();
   fire = document.getElementById("circle");
    var left = document.getElementById("circle2");
    var right = document.getElementById("circle3");
    var up = document.getElementById("circle4");
var down = document.getElementById("circle5");
var bar = document.getElementById('bar').style.width;
var barValue = document.getElementById('bar').style.width.slice(0, -1);
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1400;
canvas.height = 800;
document.body.appendChild(canvas);
    const video = () => {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var video = document.getElementById('video');

    video.addEventListener('play', function () {
        var $this = this; //cache
        (function loop() {
            if (!$this.paused && !$this.ended) {
                ctx.drawImage($this, 0, 0);
                setTimeout(loop, 1000 / 30); // drawing at 30fps
            }
        })();
    }, 0);
}

var lastTime;
function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    update(dt);
    render();

    lastTime = now;
    requestAnimFrame(main);
};

function init() {
    document.getElementById('play-again').addEventListener('click', function() {
        reset();
    });
    reset();
    lastTime = Date.now();
    main();
}

resources.load([
    'img/explode.png',
    'img/bluebird2.png',
    'img/bluebird.png',
    'img/fire1.png',
    'img/peach.png',
    'img/monkey_king_cry.png',
    'img/monkeykingangry.png',
    'img/monkey_king_sleep.png',
    'img/monkey_king_staff.png',
    'img/sprites.png',
    'img/peach.png',
    'img/monkey_king_stands.png',
]);
resources.onReady(init);

var player = {
    pos: [0, 0],
    sprite: new Sprite('img/monkey_king_stands.png', [2, 0], [55, 65], 4, [0, 1, 2, 3])
};
var player2 = {
    pos: [0, 0],
    sprite: new Sprite('img/monkey_king_staff.png', [0, 0], [45, 145], 4, [35])
};
    // bar.css('width', '100%');
window.player = player;
window.player2 = player;
var monkey = true;
var bosses = [];
var bullets = [];
var enemies = [];
var explosions = [];
var peaches = [];
var lastFire = Date.now();
var gameTime = 0;
var isGameOver;
var fireballs = [];
// var terrainPattern;
var score = 0;
var scoreEl = document.getElementById('score');
var healthEL = document.getElementById('health');
var health = 100;
healthEL.innerHTML = health;
var playerSpeed = 500;
var player2Speed = 1000;
var bulletSpeed = 1000;
var fireballSpeed = 1000;
var bossesSpeed = 300;
var enemySpeed = 200;
var peachesSpeed = 100;
    window.bar.style.width = (window.health.innerHTML + "%");

function update(dt) {
    // window.bar.style.width = (window.health.innerHTML + "%") || "100%";

    if (window.transformTime - Date.now() <= -1000) {
        monkey = true
    }
    gameTime += dt;
    handleInput(dt);
    updateEntities(dt);
    
    if (Math.random() < 1 - Math.pow(.999, gameTime) && score < 50000) {
        enemies.push({
            pos: [canvas.width,
                  Math.random() * (canvas.height - 39)],
            sprite: new Sprite('img/monkeykingangry.png', [0, 0], [60, 60], 
                               6, [0, 1, 2, 3])
        });
    }

    if (bosses.length < 1 && score >= 50000) {
        bosses.push({
            pos: [canvas.width,
                  Math.random() * (canvas.height - 39)],
                        sprite: new Sprite('img/bluebird.png', [0, 0], [180, 180], 
                            20, [0, 1])
        });
    }
    
    if((enemies.length > 10 || bosses.length === 1) && peaches.length <= 1) {
        peaches.push({
            pos: [canvas.height,
                Math.random() * (canvas.width - 25)],
            sprite: new Sprite('img/peach.png', [0, 0], [300, 300],
                6, [0])
            });
    }

    checkCollisions();
    if (!isGameOver) {
    scoreEl.innerHTML = score;
    }
}

function handleInput(dt) {

    // up.addEventListener('pointerdown', (e) => {
    //     debugger
    //     e.preventDefault;
    //     console.log('up');
    //     player.pos[1] -= .1 ;
    //     player2.pos[1] -= .1 ;
    // });
    // down.addEventListener('pointerdown', (e) => {
    //     e.preventDefault;
    //     console.log('down');

    //     // console.log(e);
    //     player.pos[1] += playerSpeed * dt;
    //     player2.pos[1] += playerSpeed * dt;
    // });
    // left.addEventListener('pointerdown', (e) => {
    //     e.preventDefault;

    //     // console.log(e);
    //     player.pos[0] -= playerSpeed * dt;
    //     player2.pos[0] -= playerSpeed * dt;
    // });
    // right.addEventListener('pointerdown', (e) => {
    //     e.preventDefault;

    //     // console.log(e);
    //     player.pos[1] += playerSpeed * dt;
    //     player2.pos[1] += playerSpeed * dt;
    // });

    // fire.addEventListener('pointerdown', (e) => {
    //     e.preventDefault;

    //     console.log(e);
    //     var x = player.pos[0];
    //     var y = player.pos[1] - 40;

    //     bullets.push({
    //         pos: [x, y],
    //         dir: 'forward',
    //         sprite: new Sprite('img/monkey_king_staff.png', [0, 0], [45, 145], 4, [35])
    //     });
        // fireballs.push({ pos: [x, y],
        //                dir: 'forward',
        //     sprite: new Sprite('img/fire1.png', [0, 0], [45, 65], 4, [0]) });
        // bullets.push({ pos: [x, y],
        //                dir: 'up',
        //                sprite: new Sprite('img/sprites.png', [0, 50], [9, 5]) });
        // bullets.push({ pos: [x, y],
        //                dir: 'down',
        //                sprite: new Sprite('img/sprites.png', [0, 60], [9, 5]) });

        // lastFire = Date.now();
        // document.getElementById("attack").play();
        // document.getElementById("attack").play();
    // });
    debugger
    if(input.isDown('DOWN') || input.isDown('s')) {
        player.pos[1] += playerSpeed * dt;
        player2.pos[1] += playerSpeed * dt;
    }

    if(input.isDown('UP') || input.isDown('w')) {
        player.pos[1] -= playerSpeed * dt;
        player2.pos[1] -= playerSpeed * dt;
    }

    if(input.isDown('LEFT') || input.isDown('a')) {
        player.pos[0] -= playerSpeed * dt;
        player2.pos[0] -= playerSpeed * dt;
    }

    if(input.isDown('RIGHT') || input.isDown('d')) {
        player.pos[0] += playerSpeed * dt;
        player2.pos[0] += playerSpeed * dt;
    }

    if(input.isDown('SPACE') &&
       !isGameOver &&
       Date.now() - lastFire > 300 && monkey === true) {
        // document.getElementById("attack").play();

        var x = player.pos[0]; 
        var y = player.pos[1] -40;

        bullets.push({ pos: [x, y],
                       dir: 'forward',
            sprite: new Sprite('img/monkey_king_staff.png', [0, 0], [45, 145], 4, [35]) });
        // fireballs.push({ pos: [x, y],
        //                dir: 'forward',
        //     sprite: new Sprite('img/fire1.png', [0, 0], [45, 65], 4, [0]) });
        // bullets.push({ pos: [x, y],
        //                dir: 'up',
        //                sprite: new Sprite('img/sprites.png', [0, 50], [9, 5]) });
        // bullets.push({ pos: [x, y],
        //                dir: 'down',
        //                sprite: new Sprite('img/sprites.png', [0, 60], [9, 5]) });

        lastFire = Date.now();
        // document.getElementById("attack").play();
        // document.getElementById("attack").play();

    }
}

function updateEntities(dt) {
    // debugger
    // console.log(bar.style.width) || "";
    // window.bar.style.width = (window.health.innerHTML + "%") || "100%";
    // console.log(bar
    // bar = (barValue - 50 )
    player.sprite.update(dt);
    player2.sprite.update(dt);


    for(var i=0; i<bullets.length; i++) {
        var bullet = bullets[i];

        switch(bullet.dir) {
        case 'up': bullet.pos[1] -= bulletSpeed * dt; break;
        case 'down': bullet.pos[1] += bulletSpeed * dt; break;
        case 'back': bullet.pos[0] -= bulletSpeed * dt; break;
        default:
            bullet.pos[0] += bulletSpeed * dt;
        }

        if(bullet.pos[1] < 0 || bullet.pos[1] > canvas.height ||
           bullet.pos[0] > canvas.width) {
            bullets.splice(i, 1);
            i--;
        }
    }
    for(var i=0; i<fireballs.length; i++) {
        var fireball = fireballs[i];

        switch(fireball.dir) {
        case 'up': fireball.pos[1] -= fireballSpeed * dt; break;
        case 'down': fireball.pos[1] += fireballSpeed * dt; break;
        case 'back': fireball.pos[0] -= fireballSpeed * dt; break;
        case 'down': fireball.pos[0] += fireballSpeed * dt; break;
        default:
            fireball.pos[0] += fireballSpeed * dt;
        }

        if(fireball.pos[1] < 0 || fireball.pos[1] > canvas.height ||
           fireball.pos[0] > canvas.width) {
            fireballs.splice(i, 1);
            i--;
        }
    }

    
    for(var i=0; i<enemies.length; i++) {
        if (Math.floor(gameTime) % 2 === 0 && i % 2 === 0) {
        if (player.pos[0] < enemies[i].pos[0]) {
            enemies[i].pos[0] -= enemySpeed * dt;
        } else {
            enemies[i].pos[0] += enemySpeed * dt;
        }
        if (player.pos[1] < enemies[i].pos[1]) {
            enemies[i].pos[1] -= enemySpeed * dt;

        } else {
            enemies[i].pos[1] += enemySpeed * dt;
        } } else {
            enemies[i].pos[0] -= enemySpeed * dt;
        } 

        enemies[i].sprite.update(dt);

        if(enemies[i].pos[0] + enemies[i].sprite.size[0] < 0) {
            enemies.splice(i, 1);
            i--;
        }
    }

    for(var i=0; i<bosses.length; i++) {
        if (Math.floor(gameTime) % 2 === 0 ) {
        if (player.pos[0] < bosses[i].pos[0]) {
            bosses[i].pos[0] -= bossesSpeed * dt;
            bosses[i].pos[1] += bossesSpeed * dt;
            fireballs.push({
                pos: [bosses[i].pos[0], bosses[i].pos[1]],
                       dir: 'back',
            sprite: new Sprite('img/fire1.png', [0, 0], [45, 65], 4, [0, 1, 2 ,3, 4]) });
        } else {
            bosses[i].pos[0] += bossesSpeed * dt;
            bosses[i].pos[1] -= bossesSpeed * dt;
            fireballs.push({
                pos: [bosses[i].pos[0], bosses[i].pos[1]],
                dir: 'forward',
                sprite: new Sprite('img/fire1.png', [0, 0], [45, 65], 4, [0, 1, 2, 3, 4])
            });
        }
        if (player.pos[1] > bosses[i].pos[1]) {
            bosses[i].pos[1] -= bossesSpeed * dt;
            bosses[i].pos[0] += bossesSpeed * dt;
            fireballs.push({
                pos: [bosses[i].pos[0], bosses[i].pos[1]],
                dir: 'down',
                sprite: new Sprite('img/fire1.png', [0, 0], [45, 65], 4, [0, 1, 2, 3, 4])
            });
        } else {
            bosses[i].pos[1] -= bossesSpeed * dt;
            bosses[i].pos[0] -= bossesSpeed * dt;
            fireballs.push({
                pos: [bosses[i].pos[0], bosses[i].pos[1]],
                dir: 'up',
                sprite: new Sprite('img/fire1.png', [0, 0], [45, 65], 4, [0, 1, 2, 3, 4])
            });
        } 
    }
            // bosses[i].pos[0] -= bossesSpeed * dt;
        // } 
        bosses[i].sprite.update(dt);
    }

    for(var i=0; i<peaches.length; i++) {

            peaches[i].pos[0] -= peachesSpeed * dt;

        peaches[i].sprite.update(dt);

        if(peaches[i].pos[0] + peaches[i].sprite.size[0] < 0) {
            peaches.splice(i, 1);
            window.bar.style.width = ((window.health.innerHTML *.14) + "%");

            i--;
        }
    }

    for(var i=0; i<explosions.length; i++) {
        explosions[i].sprite.update(dt);

        if(explosions[i].sprite.done) {
            explosions.splice(i, 1);
            i--;
        }
    }
}

function collides(x, y, r, b, x2, y2, r2, b2) {
    return !(r <= x2 || x > r2 ||
             b <= y2 || y > b2);
}

function boxCollides(pos, size, pos2, size2) {
    return collides(pos[0], pos[1],
                    pos[0] + size[0], pos[1] + size[1],
                    pos2[0], pos2[1],
                    pos2[0] + size2[0], pos2[1] + size2[1]);
}

function checkCollisions() {
    checkPlayerBounds();
    if(bosses.length) {
        // debugger
        checkBossBounds();
    }
    for(var i=0; i<peaches.length; i++) {
        var pos = peaches[i].pos;
        var size = peaches[i].sprite.size;
        var pos2 = player.pos;
        var size2 = player.sprite.size;
        if(boxCollides(pos, size, pos2, size2)) {
            peaches.splice(i, 1);
            // if (!gameOver) {
                window.health.innerHTML -= -10;
            window.bar.style.width = ((window.health.innerHTML * .14) + "%");
                monkey = false;
                transformTime = Date.now();
                
            // }
        }
    }
    for(var i=0; i<fireballs.length; i++) {
        // debugger
        var pos = fireballs[i].pos;
        var size = fireballs[i].sprite.size;
        var pos2 = player.pos;
        var size2 = player.sprite.size;
        if(boxCollides(pos, size, pos2, size2)) {
        //   var burnTime 
            // if (!gameOver) {
            // (window.bar.style.width= window. -= fireballs.length/10000)
             (window.health.innerHTML -= fireballs.length / 10000)
            // window.bar.style.width = (window.health.innerHTML + "%");
            console.log(window.bar.style.width);
            window.bar.style.width = ((window.health.innerHTML * .14) + "%");

                // player.health -= 1
            explosions.push({
                pos: pos2,
                sprite: new Sprite('img/explode.png',
                    [0, 0],
                    [100, 100],
                    16,
                    [0, 1, 2],
                    null,
                    true)
            })
                if (window.health.innerHTML <= 0) {
                    gameOver();

                }
            // }
        }
        window.bar.style.width = ((window.health.innerHTML * .14) + "%");

    }
    // window.health.innerHTML = Number(window.health.innerHTML).toFixed(0)
    // for(var i=0; i<bosses.length; i++) {
    //     debugger
    //     var pos = bosses[i].pos;
    //     var size = bosses[i].sprite.size;
    //     var pos2 = player.pos;
    //     var size2 = player.sprite.size;
    //     if(boxCollides(pos, size, pos2, size2)) {
    //         // if (!gameOver) {
    //             window.health.innerHTML -= 1;
    //             // player.health -= 1
    //         // }
    //     }
    // }
    
   
        
        for(var i=0; i<enemies.length; i++) {
            var pos = enemies[i].pos;
            var size = enemies[i].sprite.size;

        for(var j=0; j<bullets.length; j++) {
            var pos2 = bullets[j].pos;
            var size2 = bullets[j].sprite.size;
            
            if(bosses.length) {
                for (var k = 0; k < bosses.length; k++) {
                    var pos = bosses[k].pos;
                    var size = bosses[k].sprite.size;
                
                if(boxCollides(bosses[k].pos, bosses[k].sprite.size, pos2, size2)) {
                    bosses[k].sprite.url = 'img/bluebird2.png'
                    setTimeout(function () { bosses[k].sprite.url = 'img/bluebird.png'}, 1000);
                    score += 100;
                    bosses[k].sprite.health -= 1;
                    if(bosses[k].sprite.health <= 0) {
                        explosions.push({
                            pos: bosses[k].pos,
                            sprite: new Sprite('img/explode.png',
                                       [0, 0],
                                       [100, 100],
                                       16,
                                       [0, 1, 2],
                                       null,
                                       true)
                        })
                        bosses.splice(k, 1)
                        bullets.slice(j, 1);
                        // debugger
                    } 
                }
                
                // if(boxCollides(bosses[k].pos, bosses[k].sprite.size, player2.pos, player2.sprite.size)) {
                //     score += 100;
                //     bosses[k].sprite.health -= 1;
                //     if(bosses[k].sprite.health <= 0) {
                //         bosses.splice(k, 1)
                //     } 
                // }
                // if(boxCollides(bosses[k].pos, bosses[k].sprite.size, player.pos, player.sprite.size)) {
                //     if (window.health.innerHTML <= 0) {
                //         gameOver();
                //     } else {
                //         if (monkey) {
                //             window.health.innerHTML -= 10;
                //         }
                //         if (window.health.innerHTML <= 0) {
                //             gameOver();
                //         } 
                //     } 
                // }


            }
        }
            if(boxCollides(pos, size, pos2, size2)) {
                enemies.splice(i, 1);
                score += 100;
                i--;
                if (!gameOver) {
                }

                explosions.push({
                    // pos: pos,
                    // sprite: new Sprite('img/explode.png',
                    //                    [0, 0],
                    //                    [100, 100],
                    //                    16,
                    //                    [0, 1, 2],
                    //                    null,
                    //                    true)
                    pos: pos,
                    sprite: new Sprite('img/monkey_king_cry.png',
                                       [3, 11],
                                       [65, 115],
                                       16,
                                       [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                                       null,
                                       true)
                });

                bullets.splice(j, 1);
                break;
            }
        }
        // debugger
            // var barWidth = (window.health.innerHTML / 100) * 100;
            // bar.css('width', barWidth + "%");
        if(boxCollides(pos, size, player.pos, player.sprite.size)) {
           
            if (window.health.innerHTML <= 0) {
                gameOver();
            } else {
            if (monkey) {
                window.health.innerHTML -= 10;
                window.bar.style.width = ((window.health.innerHTML * .14) + "%");

            }
            if (window.health.innerHTML <= 0) {gameOver();
                window.bar.style.width = ((window.health.innerHTML * .14) + "%");

            } 
        }
            enemies.splice(i, 1);
            i--;

            score += 100;

        // if(boxCollides(Bosses[0].pos, Bosses[0].size, player.pos, player.sprite.size)) {

        //     if (window.health.innerHTML <= 0) {
        //         gameOver();
        //     } else {
        //         if (monkey) {
        //             window.health.innerHTML -= 20;
        //         }
        //         if (window.health.innerHTML <= 0) {
        //             gameOver();
        //         }
        //     }
            explosions.push({
                pos: pos,
                sprite: new Sprite('img/monkey_king_cry.png',
                    [3, 11],
                    [65, 115],
                    16,
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                    null,
                    true)
            });

            break;
        }
    }
}

function checkPlayerBounds() {
    if(player.pos[0] < 0) {
        player.pos[0] = 0;
    }
    else if(player.pos[0] > canvas.width - player.sprite.size[0]) {
        player.pos[0] = canvas.width - player.sprite.size[0];
    }

    if(player.pos[1] < 0) {
        player.pos[1] = 0;
    }
    else if(player.pos[1] > canvas.height - player.sprite.size[1]) {
        player.pos[1] = canvas.height - player.sprite.size[1];
    }
}
function checkBossBounds() {
    debugger;
    for (var i = 0; i < bosses.length; i++) {
        var boss = bosses[i];
    }
    if(boss.pos[0] < 0) {
        boss.pos[0] = 0;
    }
    else if(boss.pos[0] > canvas.width - boss.sprite.size[0]) {
        boss.pos[0] = canvas.width - boss.sprite.size[0];
    }

    if(boss.pos[1] < 0) {
        boss.pos[1] = 0;
    }
    else if(boss.pos[1] > canvas.height - boss.sprite.size[1]) {
        boss.pos[1] = canvas.height - boss.sprite.size[1];
    }
}
window.angle = -90
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    window.angle -= 10; 
    if(!isGameOver) {
        if (monkey) {
            renderEntity(player);
        } else {
            player2.pos = player.pos;
            window.angle -= 10;
            ctx.save();
            ctx.translate(player2.pos[0], player.pos[1]);
            ctx.rotate(window.angle + Math.PI / 2.0);
            ctx.translate(-1 * [player2.pos[0]], -1 * player2.pos[1]);
            renderEntity(player2)
            ctx.restore();
        }
    }
    renderEntities(fireballs);
    renderEntities(peaches);
    renderEntities(bullets);
    renderEntities(enemies);
    renderEntities(explosions);
    renderEntities(bosses);
};

function renderEntities(list) {
    for(var i=0; i<list.length; i++) {
        renderEntity(list[i]);
    }    
}

function renderEntity(entity) {
    ctx.save();
    ctx.translate(entity.pos[0], entity.pos[1]);
    entity.sprite.render(ctx);
    ctx.restore();
}

function gameOver() {
    window.bar.style.width = ((0) + "%");

    document.getElementById('game-over').style.display = 'block';
    document.getElementById('game-over-overlay').style.display = 'block';
    isGameOver = true;
}

function reset() {
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('game-over-overlay').style.display = 'none';
    isGameOver = false;
    gameTime = 0;
    score = 0;
    window.health.innerHTML = 100;
    window.bar.style.width = (100 + "%");
    enemies = [];
    bosses = [];
    bullets = [];
    monkey = true;
    player2.pos = [50, canvas.height / 2];
    player.pos = [50, canvas.height / 2];
};
    })