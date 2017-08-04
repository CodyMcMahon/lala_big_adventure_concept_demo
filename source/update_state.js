function update_state(){
  //rocket_control(rocket_controls);
  //balls_distance();
  if(ship && reticule){

    /*OLD CODE
    var both_going = (joy_stick.y > .5 || joy_stick.y < -.5) && (joy_stick.y > .5 || joy_stick.y < -.5);
    if(joy_stick.x > .5 || joy_stick.x < -.5){
      ship_moment.x = Math.min(ship_moment.x + .06,1);

      var temp_boost_x = joy_stick.x > 0 ? joy_stick.x-.5 : joy_stick.x+.5;
      temp_boost_x = Math.min(temp_boost_x,ship_moment.x);
      if(ship.position.x > 1){
        ship.position.x = Math.min(temp_boost_x+ship.position.x,30);
      }
      else{
        ship.position.x = Math.max(temp_boost_x+ship.position.x,-30);
      }
      //if(joy_stick.x > .6 || joy_stick.x < -.6){
        if(both_going){
          joy_stick.x -= (joy_stick.x/20);
        }
        else{
          joy_stick.x -= (joy_stick.x/14);
        }
      //}
    }
    else{
        ship_moment.x = Math.max(ship_moment.x - .1,0);
        //joy_stick.x -= (joy_stick.x/24);
    }
    if(joy_stick.y > .5 || joy_stick.y < -.5){
      ship_moment.y = Math.min(ship_moment.y + .06,1);
      var temp_boost_y = joy_stick.y > 0 ? joy_stick.y-.5 : joy_stick.y+.5;
      temp_boost_y = Math.min(temp_boost_y,.75);
      if(ship.position.y > 1){
        ship.position.y = Math.min(temp_boost_y+ship.position.y,16);
      }
      else{
        ship.position.y = Math.max(temp_boost_y+ship.position.y,-16);
      }
      //if(joy_stick.y > .6 || joy_stick.y < -.6){
        if(both_going){
          joy_stick.y -= (joy_stick.y/20);
        }
        else{
          joy_stick.y -= (joy_stick.y/14);
        }
      //}
    }
    else{
      ship_moment.x = Math.max(ship_moment.y - .1,0);
      //joy_stick.y -= (joy_stick.y/24);
    }
    ship.rotation.x = -joy_stick.y/2;
    ship.rotation.y = joy_stick.x/2;

     */

    //ship.rotation.x = ship_moment.x;
    //ship.rotation.y = ship_moment.y;
    //reticule.position.x = -ship.position.x*3-ship_moment.x*10;
    //reticule.position.y = ship.position.y*3+ship_moment.y*10;
    //console.log('x:'+ship.position.x+' y:'+ship.position.y);
      //ship.position.x=joy_stick.x*5;
      //ship.position.y=joy_stick.y*5;

      //notes
      //x locked at (-30,30)
      //y locked at (-16,16)
      //dead zone at joy_stick = 0.7


      //console.log(deg);
      //this is to solve div by zero errors
      var x_max_move = 2;
      var y_max_move = 2;
      var abs_x = Math.abs(joy_stick.x);
      var abs_y = Math.abs(joy_stick.y);
      var abs_hyp = Math.sqrt(abs_x*abs_x+abs_y*abs_y);
      var x_ratio = abs_hyp?abs_x / abs_hyp:0;
      var y_ratio = abs_hyp?abs_y / abs_hyp:0;
      var x_move = joy_stick.x>0 ? Math.min(joy_stick.x - (x_ratio * .4),x_max_move) : Math.max(joy_stick.x + (x_ratio * .4),-x_max_move);
      var y_move = joy_stick.y>0 ? Math.min(joy_stick.y - (y_ratio * .4),y_max_move) : Math.max(joy_stick.y + (y_ratio * .4),-y_max_move);
      var x_dead = joy_stick.x>0 ? Math.min(x_ratio*abs_hyp,x_ratio*.4) : Math.max(x_ratio*abs_hyp,x_ratio*-.4);
      var y_dead = joy_stick.y>0 ? Math.min(y_ratio*abs_hyp,y_ratio*.4) : Math.max(y_ratio*abs_hyp,y_ratio*-.4);

      if(abs_hyp > .4){
        joy_stick.x -= (Math.pow(1.04,(abs_x - (x_ratio * .25)))-1) * joy_stick.x;
        joy_stick.y -= (Math.pow(1.04,(abs_y - (y_ratio * .25)))-1) * joy_stick.y;
        if(ship.position.x > 0){
          ship.position.x = Math.min(ship.position.x - x_move,50);

        }
        else{
          ship.position.x = Math.max(ship.position.x - x_move,-50);

        }
        if(ship.position.y > 0){
          ship.position.y = Math.min(ship.position.y + y_move,27);

        }
        else{
          ship.position.y = Math.max(ship.position.y + y_move,-20);

        }
      }
      else{
        //dead zone
      }

      //target_reticule.x = (target_reticule.x-ship.position.x*3-joy_stick.x*40)/2;
      //target_reticule.y = -(target_reticule.y-ship.position.y*3-joy_stick.y*40)/2;
      reticule.position.x = (reticule.position.x+ship.position.x*2.3-joy_stick.x*180)/2;
      reticule.position.y = (reticule.position.y+ship.position.y*2.3+joy_stick.y*180)/2;

      var z_delta = ship.position.z - reticule.position.z;
      var y_delta = ship.position.y - reticule.position.y;
      var x_delta = ship.position.x - reticule.position.x;
      var rot_vector = new THREE.Vector3(x_delta,y_delta,z_delta);
      rot_vector.normalize();
      reticule_mini.position.x = reticule.position.x + rot_vector.x*170;
      reticule_mini.position.y = reticule.position.y + rot_vector.y*170;
      reticule_mini.position.z = reticule.position.z + rot_vector.z*170;
      //ship.rotation.setFromVector3(rot_vector);
      ship.rotation.x = -Math.atan(y_delta/z_delta);
      ship.rotation.y = Math.atan(x_delta/z_delta);

      var rotation_point_x = (reticule.position.x+ship.position.x*1.1-x_dead*10)/1.8;
      var rotation_point_y = (reticule.position.y+ship.position.y*1.1+y_dead*10)/1.8;
      var rotation_point_z = reticule.position.z;

      var z_delta_cam = ship.position.z - rotation_point_z;
      var y_delta_cam = ship.position.y - rotation_point_y;
      var x_delta_cam = ship.position.x - rotation_point_x;

      var rot_vector_cam = new THREE.Vector3(x_delta_cam,y_delta_cam,z_delta_cam);
      rot_vector_cam.normalize();

      //views.game.camera.position.x = reticule.position.x + rot_vector_cam.x * (views.game.camera.position.z - reticule.position.z)/1.4;
      //views.game.camera.position.y = reticule.position.y + rot_vector_cam.y * (views.game.camera.position.z - reticule.position.z)/3;
      //views.game.camera.position.z = reticule.position.z + rot_vector_cam.z * (views.game.camera.position.z - reticule.position.z);

      var x_camera_rot = -Math.atan(y_delta_cam/z_delta_cam)/2;
      if(x_camera_rot > 0){
        if(x_camera_rot > Math.PI/18){
          x_camera_rot = Math.PI/18;
        }
      }
      else{
        if(x_camera_rot < -Math.PI/18){
          x_camera_rot = -Math.PI/18;
        }
      }
      var y_camera_rot = Math.atan(x_delta_cam/z_delta_cam)/2;
      if(y_camera_rot > 0){
        if(y_camera_rot > Math.PI/12){
          y_camera_rot = Math.PI/12;
        }
      }
      else{
        if(y_camera_rot < -Math.PI/12){
          y_camera_rot = -Math.PI/12;
        }
      }

      views.game.camera.rotation.x = x_camera_rot;
      views.game.camera.rotation.y = y_camera_rot;

      if(laser_fire){
        var ve = new THREE.Vector3();
        ve.setFromMatrixPosition( ship.matrixWorld );
        views.game.scene.updateMatrixWorld();
        laser[laser_current].position.x = ve.x;
        laser[laser_current].position.y = ve.y;
        laser[laser_current].position.z = ve.z;
        laser[laser_current].rotation.x = ship.rotation.x;
        laser[laser_current].rotation.y = ship.rotation.y;
        laser[laser_current].rotation.z = ship.rotation.z;
        laser_direction[laser_current].x = -rot_vector.x;
        laser_direction[laser_current].y = -rot_vector.y;
        laser_direction[laser_current].z = -rot_vector.z;
        laser_fire = false;
        laser_current = (laser_current+1)%25;
      }
      for(var i = 0; i < 25;i++){
        laser[i].position.x += laser_direction[i].x*25;
        laser[i].position.y += laser_direction[i].y*25;
        laser[i].position.z += laser_direction[i].z*25 - .5;
      }


      if(pulse_fire){
        var ve = new THREE.Vector3();
        ve.setFromMatrixPosition( ship.matrixWorld );
        views.game.scene.updateMatrixWorld();
        pulse.position.x = ve.x;
        pulse.position.y = ve.y;
        pulse.position.z = ve.z;
        pulse.rotation.x = ship.rotation.x;
        pulse.rotation.y = ship.rotation.y;
        pulse.rotation.z = ship.rotation.z;
        pulse_direction.x = -rot_vector.x;
        pulse_direction.y = -rot_vector.y;
        pulse_direction.z = -rot_vector.z;
        pulse_fire = false;
      }

      pulse.position.x += pulse_direction.x*2;
      pulse.position.y += pulse_direction.y*2;
      pulse.position.z += pulse_direction.z*2 - .5;

      //bat.position.x -= .25;
      rail.position.z-=.5;

      reticule.rotation.x = views.game.camera.rotation.x;
      reticule.rotation.y = views.game.camera.rotation.y;
      reticule.rotation.z = views.game.camera.rotation.z;
      reticule_mini.rotation.x = views.game.camera.rotation.x;
      reticule_mini.rotation.y = views.game.camera.rotation.y;
      reticule_mini.rotation.z = views.game.camera.rotation.z;

      if(me.mouse.down && me.mouse.rc){
        if(ship.rotation.z > 0){
          ship.rotation.z += Math.min((Math.PI/20), Math.PI - ship.rotation.z);
        }
        else if(ship.rotation.z <= 0){
          ship.rotation.z += Math.max(-(Math.PI/20),ship.rotation.z - Math.PI);
        }

      }
      else if(me.mouse.down){
        if(Math.abs(ship.rotation.z) > Math.PI/2){
          ship.rotation.z -= (Math.PI/20);
        }
        else if(Math.abs(ship.rotation.z) < Math.PI/2){
          ship.rotation.z += (Math.PI/20);
        }

      }
      else if(me.mouse.rc){
        if(Math.abs(ship.rotation.z) > Math.PI/2){
          ship.rotation.z += (Math.PI/20);
        }
        else if(Math.abs(ship.rotation.z) < Math.PI/2){
          ship.rotation.z -= (Math.PI/20);
        }

      }
      else{
        if(ship.rotation.z > 0){
          ship.rotation.z -= Math.min((Math.PI/20),ship.rotation.z);
        }
        else if(ship.rotation.z < 0){
          ship.rotation.z -= Math.max(-(Math.PI/20),ship.rotation.z);
        }
      }
      if(ship.rotation.z > Math.PI){
        ship.rotation.z -= Math.PI*2;
      }
      else if(ship.rotation.z < -Math.PI){
        ship.rotation.z += Math.PI*2;
      }
      for(var i = 0; i < 25; i++){
        for(var o = 0; o < 10; o++){
          var distance = Math.sqrt((laser[i].position.x - bat[o].position.x) * (laser[i].position.x - bat[o].position.x) + (laser[i].position.y - bat[o].position.y) * (laser[i].position.y - bat[o].position.y) + (laser[i].position.z - bat[o].position.z) * (laser[i].position.z - bat[o].position.z));
          if(distance < 13){
            bat[o].position.z = 100;
          }
        }
      }
      if(pulse.position.z - rail.position.z <= -400){
        pulse_direction = {x:0,y:0,z:0};
        pulse_animation = true;
        //pulse_animation_down = false;
      }
      if(pulse_animation){
        for(var o = 0; o < 10; o++){
          var distance = Math.sqrt((pulse.position.x - bat[o].position.x) * (pulse.position.x - bat[o].position.x) + (pulse.position.y - bat[o].position.y) * (pulse.position.y - bat[o].position.y) + (pulse.position.z - bat[o].position.z) * (pulse.position.z - bat[o].position.z));
          if(distance < pulse.scale.x*.7){
            bat[o].position.z = 100;
          }
        }
        //console.log(pulse_animation_down);
        if(pulse_animation_down){
          //console.log('asd');
          if(pulse.scale.x === 1){
            pulse_animation = false;
            pulse_animation_down = false;
            pulse.position.z = 100;
          }
          else{
            pulse.scale.set(pulse.scale.x-1,pulse.scale.x-1,pulse.scale.x-1);
          }
        }
        else{
          if(pulse.scale.x === 50){
            //console.log(pulse_animation_down);
            pulse_animation_down = true;
            //console.log(pulse_animation_down);
          }
          else{
            pulse.scale.set(pulse.scale.x+1,pulse.scale.x+1,pulse.scale.x+1);
          }
        }
      }
      views.game.camera.position.x = ship.position.x/2;
      views.game.camera.position.y = ship.position.y/2;
  }

  if(dev_mode){
    /*
    w = 87
    a = 65
    s = 83
    d = 68
    e = 69
    q = 81
    */
    if(me.mouse.down){
      if(me.keyboard[87]){//w
        current_view.camera.rotation.x -= .02*Math.PI;
      }
      if(me.keyboard[65]){//a
        current_view.camera.rotation.y += .02*Math.PI;
      }
      if(me.keyboard[83]){//s
        current_view.camera.rotation.x += .02*Math.PI;
      }
      if(me.keyboard[68]){//d
        current_view.camera.rotation.y -= .02*Math.PI;
      }

      if(me.keyboard[69]){//e
        current_view.camera.rotation.z -= .02*Math.PI;
      }
      if(me.keyboard[81]){//q
        current_view.camera.rotation.z += .02*Math.PI;
      }
    }
    else{
      if(me.keyboard[90]){//z
        ball.rotation.y += 0.2;
      }
      if(me.keyboard[88]){//x
      	ball.rotation.x += 0.2;
      }
      if(me.keyboard[87]){//w
       	current_view.camera.position.z -= DEV_CAM_SPEED * Math.sin(-current_view.camera.rotation.y  + Math.PI/2);
       	current_view.camera.position.x += DEV_CAM_SPEED * Math.sin(-current_view.camera.rotation.y);
     	 }
     	 if(me.keyboard[65]){//a
       	 current_view.camera.position.z += DEV_CAM_SPEED * Math.sin(current_view.camera.rotation.y);
       	 current_view.camera.position.x -= DEV_CAM_SPEED * Math.sin(current_view.camera.rotation.y + Math.PI/2);
     	 }
     	 if(me.keyboard[83]){//s
       	 current_view.camera.position.z += DEV_CAM_SPEED * Math.sin(-current_view.camera.rotation.y + Math.PI/2);
       	 current_view.camera.position.x -= DEV_CAM_SPEED * Math.sin(-current_view.camera.rotation.y);
      	}
     	 if(me.keyboard[68]){//d
       	current_view.camera.position.z -= DEV_CAM_SPEED * Math.sin(current_view.camera.rotation.y);
       	current_view.camera.position.x += DEV_CAM_SPEED * Math.sin(current_view.camera.rotation.y + Math.PI/2);
      	}
      	if(me.keyboard[69]){//e
      	  current_view.camera.position.y += DEV_CAM_SPEED;
     	 }
      	if(me.keyboard[81]){//q
       	 current_view.camera.position.y -= DEV_CAM_SPEED;
      	}
    	}
  }
}
