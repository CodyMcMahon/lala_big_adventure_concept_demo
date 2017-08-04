function rocket_launch(){
  //rocket_wire.copy(smount);
  //smount.remove(views.game.rocket.mesh);
  //rocket_wire.add(views.game.rocket.mesh);
  mag_ratio = rocket_controls.mag / ROCKET_MAX_MAG;
  t_factor = ARC_BASE_RADIUS / rocket_controls.curl;
  t_comp = t_factor * t_unit * mag_ratio;
  rocket_traj = new traj_path(rocket_wire,rocket_controls,t_comp,arc_vec);
  rocket_active = 1;
}
function balls_time(){
//  var balls = new game_object(ball,origin,normal_matrix);
  var balll = new planet_path(ball,1);
//  balls.mass = 1;
  var plann = new planet_path(pl,5);
  views.game.object_list.push(balll);
  views.game.object_list.push(plann);
  are_we_fucking_ready = true;
}
