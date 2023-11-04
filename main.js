titleWords = ["Cat", "Catch", "Ca$h"];
word1 = titleWords[rndi(titleWords.length)]
word2 = titleWords[rndi(titleWords.length)]
word3 = titleWords[rndi(titleWords.length)]

title = (`${word1} ${word2} ${word3}`);

description = `
[Tap/Hold]
  Steal!
`;

// Define pixel arts of characters
// Each letter represents a pixel color
// l - Black    L - Light Black
// r - Red      R - Light Red
// g - Green    G - Light Green
// b - Blue     B - Light Blue
// y - Yellow   Y - Light Yellow
// p - Purple   P - Light Purple
// c - Cyan     C - Light Cyan

characters = [
`
 y  y
 yyyy
yygygy
 yyyy
 yyyy
 y  y
`,

`
rr  rr
rrrrrr
rrpprr
rrrrrr
  rr
  rr
`,

`
y  y
yyyyyy
 y  y
yyyyyy
 y  y
`
];

const G = {
        WIDTH: 200,
        HEIGHT: 50,

        STAR_SPEED_MIN: 0.5,
        STAR_SPEED_MAX: 1.0,

        PLAYER_FIRE_RATE: 4,
        PLAYER_GUN_OFFSET: 3,

        FBULLET_SPEED: 5,

        ENEMY_MIN_BASE_SPEED: 1.0,
        ENEMY_MAX_BASE_SPEED: 2.0,
        ENEMY_FIRE_RATE: 45,

        EBULLET_SPEED: 2.0,
        EBULLET_ROTATION_SPEED: 0.1
};

options = {
        viewSize: {x: G.WIDTH, y: G.HEIGHT},
        theme: "dark",  // "simple" and "dark" are the LEAST resource-intensive (aka safe)
        seed: 69,
        isPlayingBgm: true,
        isReplayEnabled: true,

        isCapturing: true,
        isCapturingGameCanvasOnly: true,
        captureCanvasScale: 2
};

/**
 * @typedef {{
 * pos: Vector,
 * speed: number
 * }} Star
 */

/**
 * @type { Star [] }
 */
 let stars;

/**
 * @typedef {{
 * pos: Vector,
 * firingCooldown: number,
 * isFiringLeft: boolean
 * }} Player
 */

/**
 * @type { Player }
 */
let player;

/**
 * @typedef {{
 * pos: Vector
 * }} FBullet
 */

/**
 * @type { FBullet [] }
 */
let fBullets;

/**
 * @typedef {{
 * pos: Vector
 * firingCooldown: number
 * }} Enemy
 */

/**
 * @typedef {{
 * pos: Vector,
 * angle: number,
 * rotation: number
 * }} EBullet
 */

/**
 * @type { Enemy [] }
 */
let enemies

/**
 * @type { number }
 */
let currentEnemySpeed;

/**
 * @type { EBullet [] }
 */
let eBullets;

/**
 * @type { number }
 */
let waveCount;



// The game loop
function update() {
    // init ran at startup
    if (!ticks) {
        // A CrispGameLib function (Shorthand of a for loop)
        // First arg:  Number of times to run the second arg
        // Second arg: Function that returns an object
        stars = times(20, () => {
            // Random number generator function
            // rnd( min, max )
            const posX = rnd(0, G.WIDTH);
            const posY = rnd(0, G.HEIGHT);
            // An object of type Star with appropriate properties
            return {
                // Creates a Vector
                pos: vec(posX, posY),
                // More RNG
                speed: rnd(G.STAR_SPEED_MIN, G.STAR_SPEED_MAX)
            };
        });

        player = {
            pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5),
            firingCooldown: G.PLAYER_FIRE_RATE,
            isFiringLeft: true
        };

        fBullets = [];

        eBullets = [];

        enemies = [];

        waveCount = 0;
        currentEnemySpeed = 0;
    }

    if (enemies.length === 0) {
        // Built-in variable `difficulty` starts from 1
        // and is progressively increased by 1 every minute
        currentEnemySpeed = 
            rnd(G.ENEMY_MIN_BASE_SPEED, G.ENEMY_MAX_BASE_SPEED) * difficulty;
        for (let i = 0; i < 9; i++) {
            const posX = rnd(0, G.WIDTH);
            const posY = -rnd(i * G.HEIGHT * 0.1);
            enemies.push({ 
                pos: vec(posX, posY),
                firingCooldown: G.ENEMY_FIRE_RATE
            });
        }

        waveCount++;
    }

    // Update for Star (each star is updated 60 times a second)
    stars.forEach((s) => {
        // Move the star downwards
        s.pos.y += s.speed;

        // Bring the star back to the top once it's past the bottom of the screen
        s.pos.wrap(0, G.WIDTH, 0, G.HEIGHT);

        // Choose a color to draw
        color("light_black");

        // Draw the star as a square of size 1
        box(s.pos, 1);
    });

    // Updating and drawing the player
    player.pos = vec(input.pos.x, input.pos.y);
    player.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);
    
    // Cooldown for the next shot
    // Fire rate of 5 (frames) for 12 rounds per second 
    player.firingCooldown--;

    // Time to fire the next shot
    if (player.firingCooldown <= 0) {
        // Get the side from which the bullet is fired
        const offset = (player.isFiringLeft)
            ? -G.PLAYER_GUN_OFFSET
            : G.PLAYER_GUN_OFFSET;

        // Create the bullet
        fBullets.push({
            pos: vec(player.pos.x + offset, player.pos.y)
        });

        // Reset the firing cooldown
        player.firingCooldown = G.PLAYER_FIRE_RATE;

        // Switch the side of the firing gun by flipping the boolean
        player.isFiringLeft = !player.isFiringLeft;
    
        // Particles
        color("yellow")
        particle(
            // May also use a Vector instead of an (x, y) coordinate
            player.pos.x + offset,    // x coordinate
            player.pos.y,             // y coordinate
            4,                        // number of particles
            1,                        // speed of particles
            -PI/2,                    // emitting angle
            PI/4                      // emitting width
        );

    }
    // Draw sprite with original colors instead of an overlay
    color("black")
    // box(player.pos, 4);
    char("a", player.pos)

    // Updating and drawing bullets
    fBullets.forEach((fb) => {
        // Move the bullets upwards
        fb.pos.y -= G.FBULLET_SPEED;

        // Drawing fBullets for the first time,
        // allowing interaction from enemies
        color("yellow");
        box(fb.pos, 2);
    });

    // Text
    color("red");
    text(fBullets.length.toString(), 3, 10);
    text(eBullets.length.toString(), 3, 17);
    text(difficulty.toString(), G.WIDTH - 25, 10);

    // Another update loop but with remove()
    remove(enemies, (e) => {
        e.pos.y += currentEnemySpeed;
        
        // Fire bullets at 0
        e.firingCooldown--;
        if (e.firingCooldown <= 0) {
            eBullets.push({
                pos: vec(e.pos.x, e.pos.y),
                
                // Utility method
                angle: e.pos.angleTo(player.pos),
                
                // Old-fashioned trigonometry way:
                // const angle = Math.atan2(player.pos.y - e.pos.y, player.pos.x - e.pos.x);

                rotation: rnd()
            });
            e.firingCooldown = G.ENEMY_FIRE_RATE;
            play("select"); // SOUND EFFECT THAT DEFIES LABELS !!
        }

        color("black");

        // Shorthand to check for collision against another specific type
        // Also draw the sprite
        const isCollidingWithFBullets = char("b", e.pos).isColliding.rect.yellow;

        // Check whether to make a small particle explosion at the position
        if (isCollidingWithFBullets) {
            color("yellow");
            particle(e.pos);
            play("explosion") // SOUND EFFECT !!
            addScore(10 * waveCount, e.pos);
        }

        const isCollidingWithPlayer = char("b", e.pos).isColliding.char.a;
        if (isCollidingWithPlayer) {
            end();
            play("powerUp");
        }

        // Multiple conditions for removing objects
        return (isCollidingWithFBullets || e.pos.y > G.HEIGHT);
    })

    // Destroy bullets offscreen or colliding with enemies
    remove(fBullets, (fb) => {
        color("yellow");

        // Bullets are drawn a second time because of CrispGameLib quirk (idk)
        const isCollidingWithEnemies = box(fb.pos, 2).isColliding.char.b;
        return (isCollidingWithEnemies || fb.pos.y < 0);
    })

    remove(eBullets, (eb) => {
        // Old-fasioned trigonometry to find out the veolocity on each axis
        eb.pos.x += G.EBULLET_SPEED * Math.cos(eb.angle);
        eb.pos.y += G.EBULLET_SPEED * Math.sin(eb.angle);

        // The bullet also rotates around itself
        eb.rotation += G.EBULLET_ROTATION_SPEED;

        color("red");
        const isColldingWithPlayer = char("c", eb.pos, {rotation: eb.rotation}).isColliding.char.a;
        if (isColldingWithPlayer) {
            // End the game
            end();

            // "Sarcasm; also, unintended audio that sounds good in actual gameplay"
            play("powerUp");
        }

        const isCollidingWithFBullets = char("c", eb.pos, {rotation: eb.rotation}).isColliding.rect.yellow;
        if (isCollidingWithFBullets) addScore(1, eb.pos);

        // If eBullet is not on screen, remove it
        return (isCollidingWithFBullets || !eb.pos.isInRect(0, 0, G.WIDTH, G.HEIGHT));
    });
}
