var traj_path = (function traj_path_creator(){
  function traj_path(thing,rocket_controls,t_comp){
    this.start_coords = thing.position;
    this.coords = thing.position;
    this.t_comp = t_comp;
    this.t_comp_init_val = t_comp;
    this.arc_vec = new THREE.Vector3();
  }
  traj_path.prototype = {
    next:function(){
    this.arc_vec.x = arc_path.getPoint(this.t_comp).x;
    this.arc_vec.y = arc_path.getPoint(this.t_comp).y;
    rocket_wire.position.copy(this.arc_vec);
    tan_vec.x = arc_path.getTangent(this.t_comp%1).x;
    tan_vec.y = arc_path.getTangent(this.t_comp%1).y;
    rocket_quat.setFromUnitVectors(tan_vec,vecnorm);
    rocket_quat.z *= -1;
    rocket_wire.rotation.setFromQuaternion(rocket_quat);
//    mount.position.y = gravity(t_unit_count); 
    t_unit_count += t_unit;
    this.t_comp += this.t_comp_init_val;
     },
    get_position:function(){
      return this.coords;
    },
  };
  return traj_path;
})();

var planet_path = (function planet_path_creator(){
  function planet_path(mes,mass){
    this.mesh = mes;
    this.geo = this.mesh.geometry;
    this.pos = this.mesh.position;
    this.radial_box = 0;
    this.mass = mass;
    this.distance = 0;
  }
  planet_path.prototype = {
    dist:function(planet){
    this.distance = this.pos.distanceTo(planet);
    return this.distance;
    },
  };
  return planet_path;
})();  
