// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.xRange = [-150, 600];
    this.possibleY = [60, 140, 220];
    

    this.sprite = 'images/enemy-bug.png';

    this.reset();
};

Enemy.prototype.reset = function() {
    //where will the bug start
    this.x = 1;
    this.y = this.possibleY[Math.floor(Math.random() * this.possibleY.length)];
    this.speed = Math.floor(Math.random() * (700 - 100)) + 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
     // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var maxPos = this.xRange[1];
    this.x += this.speed * dt;
    if (this.x > maxPos) {
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.xRange = [-2, 402];
    this.yRange = [-20, 380];
    this.sprite = 'images/char-pink-girl.png';
    this.reset();
};

Player.prototype.update = function() {
    this.checkCollisions();
};

Player.prototype.checkCollisions = function() {
    if (this.y == -20) {
        //i'm at the end of the line
        this.reset();
    } else if (this.y >= 60 && this.y <= 220) {
        var self = this;
        // did a bug hit me?
        allEnemies.forEach(function(enemy) {
            // bug is coming for me on same row
            if (enemy.y == self.y) {
                // the bug hath hit me
                if (enemy.x >= player.x - 30 && enemy.x <= player.x + 30) {
                    self.reset();
                }
            }
        });
    }
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        this.x -= (this.x - 101 < this.xRange[0]) ? 0 : 101;
    } else if (key === 'right') {
        this.x += (this.x + 101 > this.xRange[1]) ? 0 : 101;
    } else if (key === 'up') {
        this.y -= (this.y - 80 < this.yRange[0]) ? 0 : 80;
    } else if (key === 'down') {
        this.y += (this.y + 80 > this.yRange[1]) ? 0 : 80;
    }
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var clint = new Enemy();
var casten = new Enemy();
var cade = new Enemy();
var allEnemies = [clint, casten, cade];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
