Ball.count = 0;
Ball.allBall = {};

function Ball(x, y, r){

		this.ball_X = x;
		this.ball_Y = y;
		this.r = r;
		this.ball_speed = 3;

		this.changeX = 0;

		this.reverseX = false;
		this.reverseY = false;
		this.destroy = false;
		//
		this.fillColor = 'rgba('+ GL.rand(0,255) +','+ GL.rand(0,255) +','+ GL.rand(0,255) +','+ GL.rand(0,255) +')';
		//
		this.ballCount = parseInt(Ball.count++);
		this.ballId = 'ball_' + this.ballCount.toString();
		//----
		Ball.allBall[this.ballId] = this;

}

Ball.prototype.draw = function(){

		var b = this;
 
		if(b.ball_speed >10){
			b.ball_speed = 10;
		}



		if( (b.ball_Y - b.r ) <= (GL.enemyStartY + GL.W ) && (b.ball_X + b.r) >= (GL.enemyStartX) && (b.ball_X - b.r ) <= (GL.enemyStartX + GL.H) )
		{

			var dev = ( (b.ball_X-b.r) - GL.enemyStartX );

				if(b.reverseX && b.changeX != 0 ){

					b.ball_X = b.ball_X + b.changeX;

				}else if(!b.reverseX && b.changeX != 0 ){

					b.ball_X = b.ball_X - b.changeX  ;

				}else{

					if(dev < 20){
								b.changeX = 2;
								b.reverseX = false;
								b.ball_X = b.ball_X - b.changeX  ;
					}

					if(dev > 80){
								b.reverseX = true;
								b.changeX = 2;
								b.ball_X = b.ball_X + b.changeX  ;
					}

				}


				b.ball_speed = b.ball_speed +1;
				b.ball_Y += (0 + b.ball_speed );
				b.reverseY =  false;
				GL.hitSound.play();



		}else  if( (b.ball_Y + b.r  >= GL.userStartY)  && (b.ball_X + b.r ) >= (GL.userStartX) && (b.ball_X - b.r ) <= (GL.userStartX + GL.H) ){

				var dev = parseInt( (b.ball_X-b.r) - GL.userStartX );


				if(b.reverseX && b.changeX != 0 ){

					b.ball_X = b.ball_X + b.changeX  ;


				}else if(!b.reverseX && b.changeX != 0 ){

					b.ball_X = b.ball_X - b.changeX  ;

				}else{


					if(dev < 20){
						b.changeX = 2;
						b.reverseX = false;
						b.ball_X = b.ball_X - b.changeX  ;
					}

					if(dev > 80){
						b.reverseX = true;
						b.changeX = 2;
						b.ball_X = b.ball_X + b.changeX  ;
					}

				}
				
				b.ball_speed = b.ball_speed + 1;
				b.ball_Y = b.ball_Y - b.ball_speed ;
				b.reverseY =  true;
				GL.hitSound.play();


		}else{

			if( b.ball_Y - b.r < GL.enemyStartY  )
			{

				Ball.count --;
				GL.pointUser ++;
				b.destroy = true;

				GL.errorSound.play();
				GL.ballOut = true;

				delete Ball.allBall[b.ballId];


			}else if(b.ball_Y - b.r > GL.userStartY){


				Ball.count --;
				GL.pointEnemy ++;
				b.destroy = true;

				GL.errorSound.play();
				GL.ballOut = true;

				delete Ball.allBall[b.ballId];

			}else{

				if(b.reverseY){

					if( b.ball_X - b.r <= 0 ){

						b.reverseX = true;

						b.ball_X = b.ball_X + b.changeX;

						// GL.hitSound.play();


					}else if( b.ball_X + b.r >= GL.cW ){

						b.reverseX = false;

						b.ball_X = b.ball_X - (b.changeX);


					}else{

						if(b.reverseX){

							b.ball_X = b.ball_X + b.changeX;

						}else{

							b.ball_X = b.ball_X - b.changeX;

						}
						

					}

					b.ball_Y = b.ball_Y - b.ball_speed;

				}else{


					if( b.ball_X - b.r <= 0 ){

						b.reverseX = true;

						b.ball_X = b.ball_X + b.changeX;

						// GL.hitSound.play();


					}else if( b.ball_X + b.r >= GL.cW ){

						b.reverseX = false;

						b.ball_X = b.ball_X - (b.changeX);


					}else{

						if(b.reverseX){

							b.ball_X = b.ball_X + b.changeX;

						}else{

							b.ball_X = b.ball_X - b.changeX;

						}
					}

					b.ball_Y = b.ball_Y + b.ball_speed;

				}

			}



		}


			if(!b.destroy){
				Game.ctx.beginPath();
				Game.ctx.fillStyle =  b.fillColor;
				Game.ctx.arc(b.ball_X, b.ball_Y, b.r, 0, 2*Math.PI);
				Game.ctx.closePath();
				Game.ctx.fill();			
			}

}