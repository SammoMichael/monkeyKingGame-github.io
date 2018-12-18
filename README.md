# The Monkey King Game

Can you help the Monkey King save the Flower Fruit Cave from an army of evil monkeys?

## [Hurry Up!](https://monkey-king-game.firebaseapp.com)  
![mascot](newGame/img/Webp.net-gifmaker.gif)

![Screenshot](
       newGame/img/monkeyscreen3.png
      )


### How to play

1. Use trackpad, arrow keys, or w,a,s,d keys to manouever
2. The Monkey King will shoot his famous golden-banded pole in both directions automatically
3. Collect Peaches for powerups and a special spin attack!
4. Stay away from the giant blue birds!

### Technologies

1. Vanilla JavaScript
2. HTML5 Canvas sprite animation

# Features
-------------
### Conditional Rendering for Special Spin Attack

Consuming peaches enable a special spin attack for a limited duration. In order to render this I used several sprites layered over each other. After consuming a peach it would then activate rendering of a fireball and staff sprite. By saving the contexting, rotating, then restoring I was able to create a spin effect on just one element without rotating the entire canvas.
```javaScript


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
            renderEntity(player2);
            renderEntity(player);
            fire.pos = player2.pos;
            renderEntity(fire);
            ctx.restore();
            
 ```

### Boss AI

AI for the boss was finetuned to make sure it was challenging but not too overwhelming. Constantly chasing the player and shooting fireballs after you while a barrage of other smaller homing enemies make this game difficult while remaining well balanced.

```javaScript
for (var i=0; i<bosses.length; i++) {
        if (player) {
        if (player.pos[0] < bosses[i].pos[0]) {
            bosses[i].pos[0] -= bossesSpeed * dt;
            bosses[i].pos[1] -= bossesSpeed * dt;
        } else {
            bosses[i].pos[0] += bossesSpeed * dt;
        }
        if (player.pos[1] < bosses[i].pos[1]) {
            bosses[i].pos[1] -= bossesSpeed * dt;
        } else {
            bosses[i].pos[1] += bossesSpeed * dt;
        }
    } else {
        bosses[i].pos[0] -= bossesSpeed * dt;
    }
        const rate = 25;
        if ((Math.floor(Math.random() * rate) % rate) === 1) {
        if (player.pos[0] < bosses[i].pos[0]) {
            fireballs.push({
                pos: [bosses[i].pos[0], bosses[i].pos[1]],
                       dir: 'back',
            sprite: new Sprite('img/fire1.png', [0, 0], [45, 65], 4, [0, 1, 2, 3, 4]) });
            bosses[i].pos[1] -= bossesSpeed * dt;
            bosses[i].pos[0] -= bossesSpeed * dt;
        } else {
            fireballs.push({
                pos: [bosses[i].pos[0], bosses[i].pos[1]],
                dir: 'forward',
                sprite: new Sprite('img/fire1.png', [0, 0], [45, 65], 4, [0, 1, 2, 3, 4])
            });
        }
        if (player.pos[1] > bosses[i].pos[1]) {
            fireballs.push({
                pos: [bosses[i].pos[0], bosses[i].pos[1]],
                dir: 'down',
                sprite: new Sprite('img/fire1.png', [0, 0], [45, 65], 4, [0, 1, 2, 3, 4])
            });
        } else {
            fireballs.push({
                pos: [bosses[i].pos[0], bosses[i].pos[1]],
                dir: 'up',
                sprite: new Sprite('img/fire1.png', [0, 0], [45, 65], 4, [0, 1, 2, 3, 4])
            });
        } 
    } 
        bosses[i].sprite.update(dt);
    }
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
