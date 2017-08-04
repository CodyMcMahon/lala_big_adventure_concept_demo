function rocket_control(rocket_controls){
    mount.rotation.set(rocket_controls.vert,rocket_controls.hor,0);
    smount.rotation.set(0,rocket_controls.spin,0);
    arc_path.xRadius = rocket_controls.curl;
    arc_path.yRadius = rocket_controls.curl;
    arc_path.aX = rocket_controls.curl;
    arc_path.aY = 0;
    if(rocket_active){
      //console.log("it reached rocket_tick.ks");
      var start_pos = rocket_traj.get_position();
      rocket_traj.next();
      var end_pos = rocket_traj.get_position();
      //collision shit here
      //console.log(end_pos);
    }
}
function gravity(time){
  return 0.5 * (GRAVITY_CONSTANT) * (time**2);  
 // s2 = 0.5 * (GRAVITY_CONSTANT) * ((time-t_unit)**2);
 // return s1 - s2;
}
function balls_distance(){
  if(are_we_fucking_ready){
    var disty = views.game.object_list[3].dist(views.game.object_list[2].mesh.getWorldPosition());
    var disty = 100*(1/disty**2);
    var disty = new THREE.Vector3(0,disty,0);
    var dirr = new THREE.Vector3();
    dirr.subVectors(views.game.object_list[3].pos,views.game.object_list[2].pos).normalize();
    disty.projectOnVector(dirr);
    ball.position.add(disty); 

  }
}  
