
window.onload = function(){

	Game.init();

};

GL = {

	W : 20,
	H : 100,
	cW : 0,
	cH : 0,
	pos : 0,
	posY : 0,
	revers : false,

	hitSound :  0,
	errorSound : 0,

	gametype : 0,
	start : false,
	end : false,
	pause : false,
	screenbox : '',

	activeBall : 0,
	maxBall : 10,
	
	balls : [],
	pointUser : 0,
	pointEnemy : 0,

	ballOut : false,
	ballOutTime : 0,

	fps: 60,
	lastTime : 0,

	userStartX : 0,
	userStartY :  0,
	userLineX : 0,
	userLineY : 0,

	enemyStartX :  0,
	enemyStartY :  0,
	enemyLineX : 0,
	enemyLineY : 0,

	scoreInfoX : 0,
	scoreInfoY : 0,

	rand : function(min, max){
		return Math.floor(Math.random()* (max-min+1) + min);
	}

};


var Game = {


	init : function(){



		var startElementOne = document.querySelector('#start-one-player');
		var startElementTwo = document.querySelector('#start-two-player');

		Game.screenbox = document.getElementById('screen');

		GL.hitSound = document.getElementById('audioPlayer');
		GL.errorSound = document.getElementById('audioPlayerError');
		GL.bg = document.getElementById('audioPlayerBG'); 


		startElementOne.addEventListener('click', function(){

			GL.gametype = this.getAttribute('data-gametype');

		}, false);

		startElementTwo.addEventListener('click', function(){

			GL.gametype = this.getAttribute('data-gametype');

		}, false);

		// -----------------------------------------------------------

		var buttonPlay = document.querySelectorAll('.buttonPlay');

		for(var i =0;i<buttonPlay.length; i++){

			buttonPlay[i].addEventListener('click', Game.start, false);

		}

			


		// ----------------------------------------------------------

		// var attrTest = startElement.hasAttribute('data-gametype');

		// console.log('t ' + attrTest);

		// for(var i=0; i<startElement.length; i++){

		

			// GL.gametype = startElement[i].getAttribute('data-gametype');

			// console.log(GL.gametype + ' -- ' + startElement[i] );

		// }

		// window.addEventListener("offline", function(e) { console.log("offline"); });
		// window.addEventListener("online", function(e) { console.log("online"); });

		

		// var audioPlayer = document.createElement('audio');

		// document.body.appendChild(audioPlayer);

		// audioPlayer.src = "sound/18784.mp3";
		// audioPlayer.setAttribute('id', 'audio');
		// audioPlayer.style.display = 'none';

		// Game.hitSound = document.querySelector('#audioPlayer');


	},


	start : function(){

		GL.start =  true;

		var startDiv = document.getElementById('startDiv');
			startDiv.style.display= 'none';

		Game.canvas = document.createElement('canvas');
		Game.ctx = Game.canvas.getContext('2d');

		Game.perspective();

		document.body.appendChild(Game.canvas);


		if(GL.start){

			Game.addBall();

			window.addEventListener('resize', Game.perspective, false);	
			window.addEventListener('keypress', Game.nav, false);
			window.addEventListener('keypress', Game.navEnemy, false);
			// window.addEventListener('click', Game.addBall, false);

			window.addEventListener('scroll', function(e){
				e.preventDefault();
			}, false);

			window.addEventListener('toustart',  Game.navTouchUser, false);
			window.addEventListener('touchmove', Game.navTouchUser, false);


			Game.loop();

		}


	},
	perspective : function(){

		// Game.canvas.width = window.innerWidth;
		// Game.canvas.height = window.innerHeight;

		Game.canvas.width = 500;
		Game.canvas.height = window.innerHeight - 4;

		GL.cW = Game.canvas.width;
		GL.cH = Game.canvas.height;

		// if(Game.canvas.width < Game.canvas.height){

			GL.revers = true;

			GL.userStartX = (GL.cW/2 - (GL.H/2) );
			GL.userStartY = (GL.cH - (GL.W*2) );

			GL.enemyStartX = (GL.cW/2 - (GL.H/2) );
			GL.enemyStartY = GL.W;

			GL.userLineX = 0;
			GL.userLineY = GL.cH - GL.H;

			GL.enemyLineX = 0;
			GL.enemyLineY = GL.H;

			GL.scoreInfoX = (( GL.cW/2 ) -50);
			GL.scoreInfoY = ((GL.cH/2) -100);
			
			GL.ballInfoX = ((GL.cW/2) -100);
			GL.ballInfoY = ((GL.cH/2)-50); 


		// // }else{


		// 	GL.revers = false;

		// 	GL.userStartX = GL.W;
		// 	GL.userStartY= (GL.cH/2) - (GL.H/2)

		// 	GL.enemyStartX = GL.cW-(GL.W*2);
		// 	GL.enemyStartY = (GL.cH/2)-(GL.H/2);


		// 	GL.userLineX = GL.H;;
		// 	GL.userLineY = 0;

		// 	GL.enemyLineX = GL.cW - GL.H;
		// 	GL.enemyLineY = 0;

		// 	GL.scoreInfoX = ((GL.cW/2)-50);
		// 	GL.scoreInfoY = (GL.W*2);

		// 	GL.ballInfoX = ((GL.cW/2)-100);
		// 	GL.ballInfoY = (GL.W*4);


		// // }



	},

	aiEnemy : function(){

		//GL.enemyStartX  GL.enemyStartY

		for(var i=0, l=GL.balls.length; i< l; i++){

			if(GL.revers){

				GL.enemyStartX = GL.balls[i].ball_X - (GL.H/2);
				
				// GL.enemyStartX -= 7;


			}else{

				var posBallX = GL.balls[i].ball_X;
				var posBallY = GL.balls[i].ball_Y;

				// if(GL.enemyStartY <= 0){

				// 	GL.enemyStartY = 0;

				// }else

				// if(GL.enemyStartY+GL.H >= GL.cH){
					
				// 	GL.enemyStartY = GL.cH - GL.H;

				console.log()


				if(posBallX > GL.cW/2){

					var posEnemy = ( GL.cW - posBallX );

					console.log( posEnemy +' - '+ GL.enemyStartY  );

					var posN = (posEnemy - GL.enemyStartY);

				// }else{

					// GL.enemyStartY = (GL.enemyStartY - (GL.H/2) ) * 0.6 + (posBallY/2);

					if(posBallY<=0){
						
						GL.enemyStartY = 0;

					}else if(posBallY>=GL.cH){
						
						GL.enemyStartY = GL.cH - GL.H;

					}else{

						if(posBallY - GL.H/2 < 0 ){

							GL.enemyStartY = 0;

						}else if(posBallY+GL.H>=GL.cH){

							// var ro = GL.rand(0, 10);

							// GL.enemyStartY

							GL.enemyStartY += (posBallY - GL.H/2 );

						}else{

							// var ro = GL.rand(0, 10);
						 
							GL.enemyStartY = (posBallY - GL.H/2 );

						}

					}

				}

			}

		}

	},

	layout : function(e){

			Game.ctx.clearRect(0, 0, GL.cW, GL.cH);

			Game.ctx.fillStyle = 'white';

			// if(GL.revers){

			// 	Game.ctx.save();

			// 	console.log('tylko jak szerokość jest mniejsza niż wysokość')

			

					if(GL.end){

							if(GL.revers){
								Game.ctx.fillText(GL.pointUser + ' : '+ GL.pointEnemy , GL.scoreInfoX , GL.scoreInfoY );
								// Game.ctx.fillText('Aktualna piłka - '+ GL.activeBall , GL.ballInfoX  , GL.ballInfoY );
							}else{

								Game.ctx.fillText(GL.pointUser + ' : '+ GL.pointEnemy , GL.scoreInfoX , GL.scoreInfoY  );
								// Game.ctx.fillText('Aktualna piłka - '+ GL.activeBall , GL.ballInfoX , GL.ballInfoY );
							}

					}else{



						if(GL.ballOut){

							if(GL.ballOutTime<60){

								Game.ctx.fillStyle = 'red';
								GL.ballOutTime++;

							}else{

								GL.ballOut = false;
								GL.ballOutTime = 0;

								Game.addBall();


							}

						}


						
						Game.ctx.beginPath();		
						Game.ctx.font = "30px Arial";

						if(GL.pause){
							Game.ctx.save();
						}

						if(GL.gametype == 2){
							Game.aiEnemy();
						}

						

							if(GL.revers){

								Game.ctx.fillRect(GL.userStartX,  GL.userStartY,  GL.H, GL.W);
								Game.ctx.fillRect(GL.enemyStartX, GL.enemyStartY, GL.H, GL.W);
								//
								Game.ctx.fillText(GL.pointUser + ' : '+ GL.pointEnemy , GL.scoreInfoX , GL.scoreInfoY );
								Game.ctx.fillText('Aktualna piłka - '+ GL.activeBall , GL.ballInfoX  , GL.ballInfoY );

							}else{

								Game.ctx.fillRect(GL.userStartX,  GL.userStartY,  GL.W, GL.H);
								Game.ctx.fillRect(GL.enemyStartX, GL.enemyStartY, GL.W, GL.H);
								//
								Game.ctx.fillText(GL.pointUser + ' : '+ GL.pointEnemy , GL.scoreInfoX , GL.scoreInfoY  );
								Game.ctx.fillText('Aktualna piłka - '+ GL.activeBall , GL.ballInfoX , GL.ballInfoY );

							}

						Game.ctx.closePath();
						Game.ctx.fill();

							// user line
							Game.ctx.beginPath();
							if(GL.revers){
								Game.ctx.fillRect(GL.userLineX , GL.userLineY, GL.cW, 2);
							}else{
								Game.ctx.fillRect(GL.userLineX , GL.userLineY, 2, GL.cH);
							}
							Game.ctx.closePath();
							Game.ctx.fill();

							//enemy  line
							Game.ctx.beginPath();	
							if(GL.revers){
								Game.ctx.fillRect(GL.enemyLineX , GL.enemyLineY, GL.cW, 2);
							}else{
								Game.ctx.fillRect(GL.enemyLineX , GL.enemyLineY, 2, GL.cH);
							}
							Game.ctx.closePath();
							Game.ctx.fill();



						// GL.activeBall.lenght = 0;


						if(!GL.pause){

							for(var i=0, l=GL.balls.length; i< GL.balls.length; i++){

								var _aB = GL.balls[i];

								if(_aB.destroy){

									var pos = GL.balls.indexOf(_aB)
									GL.balls.splice(pos, 1);


								}else{

									_aB.draw();

								}

							}

						}else{
							Game.ctx.restore();
						}
					}


			// }

	},
	loop : function(time){

		requestAnimationFrame(Game.loop);

		if(time-GL.lastTime >= 1000/GL.fps){
			GL.lastTime = time;
			//
			Game.layout();			
		}


	},

	navTouchUser : function(e){

		e.preventDefault();


		if(GL.revers){


			for(var i=0; e.targetTouches.length; i++ ){

				var touch = e.targetTouches[i];

				if(touch.clientY > GL.userLineY ){

					var act = touch.clientX - (GL.H/2);

					if(act<0){

						act=0;

					}else if( (act+GL.H) > GL.cW){

						act = GL.cW - Gl.H;

					}

					GL.userStartX = act;



				}else if(touch.clientY < GL.enemyLineY ){

					var act = touch.clientX - (GL.H/2);

					if(act<0){

						act=0;

					}else if( (act+GL.H) > GL.cW){

						act = GL.cW - Gl.H;

					}

					GL.enemyStartX = act;

				}



			}

		}else{

			for(var i=0; e.targetTouches.length; i++ ){

				var touch = e.targetTouches[i];

			}

		}	

	},


	nav : function(e){

		var keynav = e.keyCode ? e.keyCode : e.charCode;


		if(keynav == 112){

			GL.pause = GL.pause == true ? false : true;
			Game.screens = Game.canvas.toDataURL();

			console.log(Game.screens)


			

			Game.screenbox.style.display = GL.pause ? 'block' : 'none';

			Game.screenbox.src = Game.canvas.toDataURL();



		}

		if(keynav == 38 || keynav == 119){
			// console.log('w góre');

			if(GL.revers){

				GL.userStartX -= 7;

				if(GL.userStartX<= 0 ){
					GL.userStartX = 0;
				}


			}else{

					GL.userStartY -= 7;

				if(GL.userStartY<= 0 ){
					GL.userStartY = 0;
				}

			}


		}else if(keynav == 40 || keynav == 115){

			if(GL.revers){

				GL.userStartX += 7;

				if(GL.userStartX>= (GL.cW-GL.H)){
					GL.userStartX = GL.cW-GL.H;
				}

			}else{

				GL.userStartY += 7;

				if(GL.userStartY>= (GL.cH-GL.H)){
					GL.userStartY = GL.cH-GL.H;
				}

			}



		}

	},
	navEnemy : function(e){

		var keynav = e.keyCode ? e.keyCode : e.charCode;

		if(keynav == 111){
			// console.log('w góre');

			if(GL.revers){

				GL.enemyStartX -= 7;

					if(GL.enemyStartX<= 0 ){
						GL.enemyStartX = 0;
					}


			}else{

				GL.userStartY -= 7;

				if(GL.enemyStartY<= 0 ){
					GL.enemyStartY = 0;
				}

			}


		}else if(keynav == 108){


			if(GL.revers){

				GL.enemyStartX += 7;

				if(GL.enemyStartX+GL.H > GL.cW ){
					GL.enemyStartX = GL.cW-GL.H;
				}



			}else{


				   GL.enemyStartY += 7;

				if(GL.enemyStartY>= (GL.cH-GL.H)){
				   GL.enemyStartY = GL.cH-GL.H;
				}


			}





		}

	},

	addBall : function(ev){

		GL.activeBall++;

		if(GL.activeBall <= GL.maxBall){


			if(GL.revers){

				GL.balls.push( new Ball( (GL.cW/2) , (GL.cH/2), GL.W/4 ) );

			}else{

				GL.balls.push( new Ball( (GL.cW/2), (GL.cH/2), (GL.W/2) ) );

			}

			

		}else{
			GL.end = true;
		}

	}

};