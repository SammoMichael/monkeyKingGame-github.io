document.getElementById('game-start').style.display = 'block';
// document.getElementById('game-start-overlay').style.display = 'block';
// let music = document.getElementById('ambush').play();
document.getElementById('start').addEventListener('click', function () {
    // window.music = document.getElementById('ambush');
    document.getElementById('game-start').style.display = 'none';
    let requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = 1500;
    canvas.height = 700;
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

    let lastTime;
    function main() {
        let now = Date.now();
        let dt = (now - lastTime) / 1000.0;

        update(dt);
        render();

        lastTime = now;
        requestAnimFrame(main);
    };

    function init() {
        document.getElementById('play-again').addEventListener('click', function () {
            reset();
        });
        reset();
        lastTime = Date.now();
        main();
    }

    resources.load([
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

    let player = {
        pos: [0, 0],
        sprite: new Sprite('img/monkey_king_stands.png', [2, 0], [55, 65], 4, [0, 1, 2, 3])
    };
    let player2 = {
        pos: [0, 0],
        sprite: new Sprite('img/monkey_king_staff.png', [0, 0], [45, 145], 4, [35])
    };

    let monkey = true;
    let bosses = [];
    let bullets = [];
    let enemies = [];
    let explosions = [];
    let peaches = [];
    let lastFire = Date.now();
    let gameTime = 0;
    let isGameOver;
    let fireballs = [];
    // let terrainPattern;
    let score = 0;
    let scoreEl = document.getElementById('score');
    let healthEL = document.getElementById('health')
    let health = 100;
    healthEL.innerHTML = health;
    let playerSpeed = 500;
    let player2Speed = 1000;
    let bulletSpeed = 1000;
    let fireballSpeed = 1000;
    let bossesSpeed = 300;
    let enemySpeed = 200;
    let peachesSpeed = 100;

    function update(dt) {
        if (window.transformTime - Date.now() <= -1000) {
            monkey = true
        }
        gameTime += dt;
        handleInput(dt);
        updateEntities(dt);

        if (Math.random() < 1 - Math.pow(.999, gameTime) && score < 10000) {
            enemies.push({
                pos: [canvas.width,
                Math.random() * (canvas.height - 39)],
                sprite: new Sprite('img/monkeykingangry.png', [0, 0], [60, 60],
                    6, [0, 1, 2, 3])
            });
        }

        if (bosses.length < 1 && score >= 10000) {
            bosses.push({
                pos: [canvas.width,
                Math.random() * (canvas.height - 39)],
                sprite: new Sprite('img/bluebird.png', [0, 0], [180, 180],
                    6, [0, 1, 2])
            });
        }

        if ((enemies.length > 10 || bosses.length === 1) && peaches.length <= 1) {
            peaches.push({
                pos: [canvas.width,
                Math.random() * (canvas.height - 25)],
                sprite: new Sprite('img/peach.png', [0, 0], [300, 300],
                    6, [0])
            });
        }

        checkCollisions();
        if (!isGameOver) {
            scoreEl.innerHTML = score;
        }
    };

    function handleInput(dt) {
        if (input.isDown('DOWN') || input.isDown('s')) {
            player.pos[1] += playerSpeed * dt;
            player2.pos[1] += playerSpeed * dt;
        }

        if (input.isDown('UP') || input.isDown('w')) {
            player.pos[1] -= playerSpeed * dt;
            player2.pos[1] -= playerSpeed * dt;
        }

        if (input.isDown('LEFT') || input.isDown('a')) {
            player.pos[0] -= playerSpeed * dt;
            player2.pos[0] -= playerSpeed * dt;
        }

        if (input.isDown('RIGHT') || input.isDown('d')) {
            player.pos[0] += playerSpeed * dt;
            player2.pos[0] += playerSpeed * dt;
        }

        if (input.isDown('SPACE') &&
            !isGameOver &&
            Date.now() - lastFire > 300 && monkey === true) {
            // document.getElementById("attack").play();

            let x = player.pos[0];
            let y = player.pos[1] - 40;

            bullets.push({
                pos: [x, y],
                dir: 'forward',
                sprite: new Sprite('img/monkey_king_staff.png', [0, 0], [45, 145], 4, [35])
            });
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
        debugger
        player.sprite.update(dt);
        player2.sprite.update(dt);


        for (let i = 0; i < bullets.length; i++) {
            let bullet = bullets[i];

            switch (bullet.dir) {
                case 'up': bullet.pos[1] -= bulletSpeed * dt; break;
                case 'down': bullet.pos[1] += bulletSpeed * dt; break;
                case 'back': bullet.pos[0] -= bulletSpeed * dt; break;
                default:
                    bullet.pos[0] += bulletSpeed * dt;
            }

            if (bullet.pos[1] < 0 || bullet.pos[1] > canvas.height ||
                bullet.pos[0] > canvas.width) {
                bullets.splice(i, 1);
                i--;
            }
        }
        for (let i = 0; i < fireballs.length; i++) {
            let fireball = fireballs[i];

            switch (fireball.dir) {
                case 'up': fireball.pos[1] -= fireballSpeed * dt; break;
                case 'down': fireball.pos[1] += fireballSpeed * dt; break;
                case 'back': fireball.pos[0] -= fireballSpeed * dt; break;
                default:
                    fireball.pos[0] += fireballSpeed * dt;
            }

            if (fireball.pos[1] < 0 || fireball.pos[1] > canvas.height ||
                fireball.pos[0] > canvas.width) {
                fireballs.splice(i, 1);
                i--;
            }
        }


        for (let i = 0; i < enemies.length; i++) {
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
                }
            } else {
                enemies[i].pos[0] -= enemySpeed * dt;
            }

            enemies[i].sprite.update(dt);

            if (enemies[i].pos[0] + enemies[i].sprite.size[0] < 0) {
                enemies.splice(i, 1);
                i--;
            }
        }
        for (let i = 0; i < bosses.length; i++) {
            if (Math.floor(gameTime) % 2 === 0 && i % 2 === 0) {
                if (player.pos[0] < bosses[i].pos[0]) {
                    bosses[i].pos[0] -= bossesSpeed * dt;
                    fireballs.push({
                        pos: [bosses[i].pos[0], bosses[i].pos[1]],
                        dir: 'back',
                        sprite: new Sprite('img/fire1.png', [0, 0], [45, 65], 4, [0, 1, 2, 3, 4])
                    });
                } else {
                    bosses[i].pos[0] += bossesSpeed * dt;
                    fireballs.push({
                        pos: [bosses[i].pos[0], bosses[i].pos[1]],
                        dir: 'forward',
                        sprite: new Sprite('img/fire1.png', [0, 0], [45, 65], 4, [0, 1, 2, 3, 4])
                    });
                }
                if (player.pos[1] < bosses[i].pos[1]) {
                    bosses[i].pos[1] -= bossesSpeed * dt;
                    fireballs.push({
                        pos: [bosses[i].pos[0], bosses[i].pos[1]],
                        dir: 'down',
                        sprite: new Sprite('img/fire1.png', [0, 0], [45, 65], 4, [0, 1, 2, 3, 4])
                    });
                } else {
                    bosses[i].pos[1] += bossesSpeed * dt;
                    fireballs.push({
                        pos: [bosses[i].pos[0], bosses[i].pos[1]],
                        dir: 'up',
                        sprite: new Sprite('img/fire1.png', [0, 0], [45, 65], 4, [0, 1, 2, 3, 4])
                    });
                }
            } else {
                bosses[i].pos[0] -= bossesSpeed * dt;
            }

            bosses[i].sprite.update(dt);

            if (bosses[i].pos[0] + bosses[i].sprite.size[0] < 0) {
                bosses.splice(i, 1);
                i--;
            }
        }
        for (let i = 0; i < peaches.length; i++) {
            debugger

            peaches[i].pos[0] -= peachesSpeed * dt;

            peaches[i].sprite.update(dt);

            if (peaches[i].pos[0] + peaches[i].sprite.size[0] < 0) {
                peaches.splice(i, 1);
                i--;
            }
        }

        for (let i = 0; i < explosions.length; i++) {
            explosions[i].sprite.update(dt);

            if (explosions[i].sprite.done) {
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
        // checkBossBounds();
        debugger
        for (let i = 0; i < peaches.length; i++) {
            let pos = peaches[i].pos;
            let size = peaches[i].sprite.size;
            let pos2 = player.pos;
            let size2 = player.sprite.size;
            debugger
            if (boxCollides(pos, size, pos2, size2)) {
                debugger
                peaches.splice(i, 1);
                // if (!gameOver) {
                window.health.innerHTML -= -10;
                monkey = false;
                transformTime = Date.now();
                // }
            }
        }

        for (let i = 0; i < enemies.length; i++) {
            let pos = enemies[i].pos;
            let size = enemies[i].sprite.size;

            for (let j = 0; j < bullets.length; j++) {
                let pos2 = bullets[j].pos;
                let size2 = bullets[j].sprite.size;

                if (boxCollides(pos, size, pos2, size2)) {
                    enemies.splice(i, 1);
                    score += 100;
                    i--;
                    if (!gameOver) {
                    }

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

                    bullets.splice(j, 1);
                    break;
                }
            }

            if (boxCollides(pos, size, player.pos, player.sprite.size)) {
                // if (window.health.innerHTML <= 50) {
                //     monkey = false;
                //     window.transformTime = Date.now(); 
                // } 
                if (window.health.innerHTML <= 0) {
                    gameOver();
                } else {
                    if (monkey) {
                        window.health.innerHTML -= 10;
                    }
                    if (window.health.innerHTML <= 0) {
                        gameOver();
                    }
                }
                enemies.splice(i, 1);
                i--;

                score += 100;

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
        if (player.pos[0] < 0) {
            player.pos[0] = 0;
        }
        else if (player.pos[0] > canvas.width - player.sprite.size[0]) {
            player.pos[0] = canvas.width - player.sprite.size[0];
        }

        if (player.pos[1] < 0) {
            player.pos[1] = 0;
        }
        else if (player.pos[1] > canvas.height - player.sprite.size[1]) {
            player.pos[1] = canvas.height - player.sprite.size[1];
        }
    }
    // function checkBossBounds() {
    //     for (let i = 0; i < bosses.length; i++) {
    //         const boss = boss[i];

    //     }
    //     if(boss.pos[0] < 0) {
    //         boss.pos[0] = 0;
    //     }
    //     else if(boss.pos[0] > canvas.width - boss.sprite.size[0]) {
    //         boss.pos[0] = canvas.width - boss.sprite.size[0];
    //     }

    //     if(boss.pos[1] < 0) {
    //         boss.pos[1] = 0;
    //     }
    //     else if(boss.pos[1] > canvas.height - boss.sprite.size[1]) {
    //         boss.pos[1] = canvas.height - boss.sprite.size[1];
    //     }
    // }
    window.angle = -90
    function render() {
        debugger
        // ctx.fillStyle = terrainPattern;
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        window.angle -= 10;
        if (!isGameOver) {
            debugger
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
        for (let i = 0; i < list.length; i++) {
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
        enemies = [];
        bosses = [];
        bullets = [];
        monkey = true;
        player2.pos = [50, canvas.height / 2];
        player.pos = [50, canvas.height / 2];
    };
})