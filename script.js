window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const collisionCanvas = document.getElementById('collisionCanvas');
    const collisionCtx = collisionCanvas.getContext('2d');
    collisionCanvas.width = window.innerWidth;
    collisionCanvas.height = window.innerHeight;

    

    let score = 0;
    let lives = 3;
    let gameOver = false;
    ctx.font = '16px Bahnschrift';
   
    
    class background{
        constructor(ctx, width, height){
            this.image = Background;
            this.width = window.innerWidth;
            this.height = window.innerHeight;
        }
        draw(){
            ctx.drawImage(Background, 0, 0, this.width, this.height);
        }
    }

    class Enemy {
        constructor(){
            // console.log(this.game);
            this.x = -100;
            this.y = Math.random() * canvas.height - this.height;
            this.spriteWidth = 0;
            this.spriteHeight = 0;
            this.width = 100;
            this.height = 100;
            this.directionX = Math.random() * 3 + 3;
            this.markedForDeletion = false;
            this.randomColors = [Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)];
            this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')';
        }
        update(){
            this.x += this.directionX;
            // Enemies that passing through the right side is deleted
            if(this.x > canvas.width + this.width){
                this.markedForDeletion = true;
                lives--;
            }
        }
        draw(){
            ctx.fillRect(this.x, this.y, this.width, this.height);
            collisionCtx.fillStyle = this.color;
            collisionCtx.fillRect(this.x, this.y, this.width, this.height);
        }

    }
    
    let lastTime = 0;
    let timeToNextDrone1 = 0;
    let drone1Interval = 1400;

    let drones1 = [];
    class drone1 extends Enemy{
        constructor(){
            super();
            this.spriteWidth = 48;
            this.spriteHeight = 48; 
            this.sizeModifier = Math.random() * 1.5 + 1.5;
            this.width = this.spriteWidth * this.sizeModifier;
            this.height = this.spriteHeight * this.sizeModifier;
            this.x = -100;
            this.y = Math.random() * (canvas.height - this.height);
            this.directionX = Math.random() * 3 + 6;
            this.markedForDeletion = false;
            this.image = Drones1;
            this.frameX = 0;
            this.frameY = 3;
            this.animationInterval = 100;
            this.animateTime = 0;
            // console.log(this.image);
        }
        update(deltaTime){
            super.update(deltaTime);
            this.animateTime += deltaTime;
            if(this.animateTime > this.animationInterval){
                if(this.frameX > 2) this.frameX = 0;
                else this.frameX++;
                this.animateTime = 0;
            };
        }
        draw(){ 
            super.draw();
            ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight,
                this.x, this.y, this.width, this.height);
        }
    }

    let timeToNextDrone2 = 0;
    let drone2Interval = 2200;

    let drones2 = [];
    class drone2 extends Enemy{
        constructor(){
            super();
            this.spriteWidth = 96;
            this.spriteHeight = 96; 
            this.sizeModifier = Math.random() * 1.2 + .8;
            this.width = this.spriteWidth * this.sizeModifier;
            this.height = this.spriteHeight * this.sizeModifier;
            this.x = -100;
            this.y = Math.random() * (canvas.height - this.height);
            this.directionX = Math.random() * 3 + 2;
            this.directionY = Math.random() * 3 + 2.5;
            this.markedForDeletion = false;
            this.image = Drones2;
            this.animateTime = 0;
            this.animationInterval = 100;
            this.frameX = 0;
            this.frameY = 3;
        }
        update(deltaTime){
            super.update(deltaTime);
            if (this.y < 0 || this.y > canvas.height - this.height){
                this.directionY = this.directionY * -1;
            }
            this.y += this.directionY;
            this.animateTime += deltaTime;
            if(this.animateTime > this.animationInterval){
                if(this.frameX > 2) this.frameX = 0;
                else this.frameX++;
                this.animateTime = 0;
            };
        }
        draw(){ 
            super.draw();
            ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
    }

    let timeToNextDrone3 = 0;
    let drone3Interval = 1800;

    let drones3 = [];
    class drone3 extends Enemy{
        constructor(){
            super();
            this.spriteWidth = 48;
            this.spriteHeight = 48; 
            this.sizeModifier = Math.random() * 1.2 + 1.2;
            this.width = this.spriteWidth * this.sizeModifier;
            this.height = this.spriteHeight * this.sizeModifier;
            this.x = -100;
            this.y = Math.random() * ((canvas.height - 200) - (this.height + 200));
            this.directionX = Math.random() * 1.4 + 2;
            this.directionY = Math.random() * 3 + 2.5;
            this.markedForDeletion = false;
            this.image = Drones3;
            this.animateTime = 0;
            this.animationInterval = 100;
            this.frameX = 0;
            this.frameY = 5;
            this.angle = 0;
            this.va = Math.random() * .3;
        }
        update(deltaTime){
            super.update(deltaTime);
            this.angle += this.va;
            this.y += Math.sin(this.angle);
            this.animateTime += deltaTime;
            if(this.animateTime > this.animationInterval){
                if(this.frameX > 2) this.frameX = 0;
                else this.frameX++;
                this.animateTime = 0;
            };
        }
        draw(){ 
            super.draw();
            ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
    }

    let timeToNextSpaceship = 0;
    let SpaceshipInterval = 5000;

    let spaceships = [];
    class Spaceship extends Enemy{
        constructor(){
            super();
            this.spriteWidth = 192;
            this.spriteHeight = 192; 
            this.sizeModifier = Math.random() * 1 + .5;
            this.width = this.spriteWidth * this.sizeModifier;
            this.height = this.spriteHeight * this.sizeModifier;
            this.x = -100;
            this.y = Math.random() * (canvas.height - this.height);
            this.directionX = Math.random() * 4 + 15;
            this.directionY = Math.random() * 4 + 2.5;
            this.markedForDeletion = false;
            this.image = Spaceships;
            this.animateTime = 0;
            this.animationInterval = 300;
            this.frameX = 1;
            this.frameY = 7;
        }
        update(deltaTime){
            super.update(deltaTime);
            if (this.y < 0 || this.y > canvas.height - this.height){
                this.directionY = this.directionY * -1;
            }
            this.y += this.directionY;
            this.animateTime += deltaTime;
            if(this.animateTime > this.animationInterval){
                if(this.directionY > 0) this.frameY = 6;
                if(this.directionY < 0) this.frameY = 7;
                this.animateTime = 0;
            };
        }
        draw(){ 
            super.draw();
            ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
    }

    let timeToNextBigSpaceship = 0;
    let BigSpaceshipInterval = 7500;

    let bigSpaceships = [];
    class BigSpaceship extends Enemy{
        constructor(){
            super();
            this.spriteWidth = 192;
            this.spriteHeight = 192; 
            this.sizeModifier = Math.random() * 1.5 + .5;
            this.width = this.spriteWidth * this.sizeModifier;
            this.height = this.spriteHeight * this.sizeModifier;
            this.x = -100;
            this.y = Math.random() * (canvas.height - this.height);
            this.directionX = Math.random() + .5;
            this.markedForDeletion = false;
            this.image = BigSpaceships;
            this.frameX = 0;
            this.frameY = 2;
            this.animationInterval = 100;
            this.animateTime = 0;
            this.hp = 2;
            // console.log(this.image);
        }
        update(deltaTime){
            super.update(deltaTime);
            this.animateTime += deltaTime;
            if(this.animateTime > this.animationInterval){
                if(this.frameX > 2) this.frameX = 0;
                else this.frameX++;
                this.animateTime = 0;
            };
        }
        draw(){ 
            super.draw();
            ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight,
                this.x, this.y, this.width, this.height);
        }
    }

    function drawScore(){
        ctx.fillStyle = 'White';
        ctx.fillText('Score: ' + score, 51,76)
        ctx.fillStyle = 'Black';
        ctx.fillText('Score: ' + score, 50,75)
        ctx.fillStyle = 'White';
        ctx.fillText('Lives: ' + lives, 51,96)
        ctx.fillStyle = 'Black';
        ctx.fillText('Lives: ' + lives, 50,95)
    }
    function drawGameOver(){
        ctx.textAlign = 'center';
        ctx.fillStyle = "white";
        ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2);
        ctx.fillStyle = "black";
        ctx.fillText("GAME OVER", canvas.width/2 + 2, canvas.height/2 + 2);
    }


    this.window.addEventListener('click', function(e){
        //console.log(e.x, e.y);
        const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1);
        // console.log(detectPixelColor)
        const pixelColor = detectPixelColor.data;
        drones1.forEach(object => {
            if(object.randomColors[0] === pixelColor[0] && object.randomColors[1] === pixelColor[1] && object.randomColors[2] === pixelColor[2]){
                object.markedForDeletion = true;
                score += 50;
            }
        })
        drones2.forEach(object => {
            if(object.randomColors[0] === pixelColor[0] && object.randomColors[1] === pixelColor[1] && object.randomColors[2] === pixelColor[2]){
                object.markedForDeletion = true;
                score += 25;
            }
        })
        drones3.forEach(object => {
            if(object.randomColors[0] === pixelColor[0] && object.randomColors[1] === pixelColor[1] && object.randomColors[2] === pixelColor[2]){
                object.markedForDeletion = true;
                score += 25;
            }
        })
        spaceships.forEach(object => {
            if(object.randomColors[0] === pixelColor[0] && object.randomColors[1] === pixelColor[1] && object.randomColors[2] === pixelColor[2]){
                object.markedForDeletion = true;
                score += 500;
            }
        })
        bigSpaceships.forEach(object => {
            if(object.randomColors[0] === pixelColor[0] && object.randomColors[1] === pixelColor[1] && object.randomColors[2] === pixelColor[2]){
                object.hp--;
                if(object.hp === 0){
                object.markedForDeletion = true;
                score += 1500;
                }
            }
        })
    })

    const bg = new background(canvas, canvas.width, canvas.height);

    function animate(timestamp){
        if(lives === 0) gameOver = true;
        ctx.clearRect(0,0, canvas.width, canvas.height);
        collisionCtx.clearRect(0,0, canvas.width, canvas.height);
        let deltaTime = timestamp - lastTime;
        lastTime = timestamp
        //console.log(timestamp);
        timeToNextDrone1 += deltaTime;
        timeToNextDrone2 += deltaTime;
        timeToNextDrone3 += deltaTime;
        timeToNextSpaceship += deltaTime;
        timeToNextBigSpaceship += deltaTime;
        //console.log(deltatime);
        if(timeToNextDrone1 > drone1Interval){
            drones1.push(new drone1());
            timeToNextDrone1 = 0;
            drones1.sort(function(a,b){
                return a.width - b.width;
            });
            };
        if(timeToNextDrone2 > drone2Interval){
            drones2.push(new drone2());
            timeToNextDrone2 = 0;
            drones2.sort(function(a,b){
                return a.width - b.width;
            });
            };
        if(timeToNextDrone3 > drone3Interval){
            drones3.push(new drone3());
            timeToNextDrone3 = 0;
            drones2.sort(function(a,b){
                return a.width - b.width;
            });
            };
        if(timeToNextSpaceship > SpaceshipInterval){
            spaceships.push(new Spaceship());
            timeToNextSpaceship = 0;
            spaceships.sort(function(a,b){
                return a.width - b.width;
            });
            };
        if(timeToNextBigSpaceship > BigSpaceshipInterval){
            bigSpaceships.push(new BigSpaceship());
            timeToNextBigSpaceship = 0;
            bigSpaceships.sort(function(a,b){
                return a.width - b.width;
            });
            }; 
        bg.draw();
        drawScore();
        [...drones1,...drones2,...drones3,...spaceships,...bigSpaceships].forEach(object => object.update(deltaTime));
        [...drones1,...drones2,...drones3,...spaceships,...bigSpaceships].forEach(object => object.draw());
        drones1 = drones1.filter(object => !object.markedForDeletion);
        drones2 = drones2.filter(object => !object.markedForDeletion);
        drones3 = drones3.filter(object => !object.markedForDeletion);
        spaceships = spaceships.filter(object => !object.markedForDeletion);
        bigSpaceships = bigSpaceships.filter(object => !object.markedForDeletion);
        // console.log(drones1)
        if(!gameOver)requestAnimationFrame(animate);
        else drawGameOver();
    }
    animate(0);
});


/* 
Spaceships:
https://craftpix.net/freebies/free-spaceship-pixel-art-sprite-sheets/

City Background:
https://craftpix.net/freebies/free-city-backgrounds-pixel-art/

Drones:
https://craftpix.net/freebies/free-drones-pack-pixel-art/


Crosshair:
https://mikiz.itch.io/crosshair-pack

Inspiration:
https://codepen.io/franksLaboratory/pen/ZEKodqd?editors=0010
*/