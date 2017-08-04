function onWindowResize() {
	if(current_view){
		var width = window.innerWidth;
		var height = Math.floor(width*9/16);
		var offset = (window.innerHeight - height) / 2;
		renderer.domElement.style.top = ''+offset+'px';
		//add exception here if screen is WAY WAY too wide
		current_view.camera.aspect = width / height;
		current_view.camera.updateProjectionMatrix();
		renderer.setSize( width , height );
	}
	else{
		console.log('did not resize');
	}
}
function onDocumentMouseMove(event){
	//console.log("mouse_moved");
	//me.mouse.curr.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	//me.mouse.curr.y = ( event.clientY / window.innerHeight ) * 2 - 1;
	if(locked_mouse){
		if(me.mouse.curr.x + event.movementX/200 > -1 && me.mouse.curr.x + event.movementX/200 < 1){
			me.mouse.curr.x += event.movementX/200;
		}
		if(me.mouse.curr.y + event.movementY/200 > -1 && me.mouse.curr.y + event.movementY/200 < 1){
			me.mouse.curr.y += event.movementY/200;
		}
		var reading = {x:event.movementX,y:event.movementY};
		reading.x = reading.x/40*GAME_SENSITIVITY;
		reading.y = reading.y/40*GAME_SENSITIVITY;
		if (joy_stick.x - reading.x > 10){
			joy_stick.x = 10;
		}
		else if (joy_stick.x - reading.x < -10){
			joy_stick.x = -10;
		}
		else{
			joy_stick.x-=reading.x;
		}
		if (joy_stick.y - reading.y > 10){
			joy_stick.y = 10;
		}
		else if (joy_stick.y - reading.y < -10){
			joy_stick.y = -10;
		}
		else{
			joy_stick.y-=reading.y;
		}

	}
}
function onDocumentMouseDown(event){
  //mouse 1
  if(event.button === 0){
	  me.mouse.past.x = me.mouse.curr.x;
    me.mouse.past.y = me.mouse.curr.y;
    me.mouse.down = true;
  }
  if(event.button === 2){
    me.mouse.past.x = me.mouse.curr.x;
    me.mouse.past.y = me.mouse.curr.y;
    me.mouse.rc = true;
  }
}
function onDocumentMouseUp(event){
  //mouse 1
  if(event.button === 0){
    me.mouse.down = false;
  }
  if(event.button === 2){
    me.mouse.rc = false;
  }
}
function onDocumentKeyDown(event){
	//fire
	if(event.which ===	67){
		pulse_fire = true;
		pulse_animation = false;
		pulse_animation_down = false;
		pulse.scale.set(1,1,1);
	}
	if(event.which === 79){
		for(var i = 0;i < 10;i++){
	    bat[i].position.z = rail.position.z-650;
	  }
	}
	if(event.which === 88){
		laser_fire = true;
	}
	if(event.which === 57){
		document.exitPointerLock();
		locked_mouse = 0;
	}
	if(event.which === 48){
		//terminate program
		require('electron').remote.getCurrentWindow().close();
	}
  me.keyboard[event.which] = true;
}
function onDocumentKeyUp(event){
  me.keyboard[event.which] = false;
}
