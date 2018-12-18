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

Explain how to run the automated tests for this system

### Break down into end to end tests

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

### And coding style tests

Explain what these tests test and why

```
Give an example
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
