function load_game_object(obj_name,var_name){
  var g = views.game;
  loader.load( asset_dictionary[obj_name], function( geometry ,material) {
    //material.forEach(function (m) {
    //  m.skinning = true;
    //});
    var mesh = new THREE.SkinnedMesh( geometry, new THREE.MeshFaceMaterial(material) );
    var s = 1;
    mesh.scale.set( s, s, s );
    mesh.position.y = 0;
    mesh.position.x = 0;
    mesh.position.z = 0;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    g.scene.add( mesh );
    //var mixer = new THREE.AnimationMixer( mesh );
    var rot_mat = new THREE.Matrix4();
    rot_mat.makeRotationFromEuler(ZERO_EULER);
    var this_object = new game_object(mesh,ZERO_POINT,rot_mat);
    g.object_list[g.object_list.length] = this_object;
    g.object_dict[var_name] = this_object;
  } );
}

function planet_creator(radius,res,color_0x){
  var geometry = new THREE.SphereGeometry(radius,res,res);
  var material = new THREE.MeshLambertMaterial({color: color_0x});
  var planet = new THREE.Mesh(geometry,material);
  return planet;
}

function load_rocket(){
  var g = views.game;
  loader.load( asset_dictionary[ROCKET_ASSET], function( geometry ,material) {
    //material.forEach(function (m) {
    //  m.skinning = true;
    //});
    var mesh = new THREE.SkinnedMesh( geometry, new THREE.MeshFaceMaterial(material) );
    var s = 1;
    mesh.scale.set( s, s, s );
    mesh.position.y = 0;
    mesh.position.x = 0;
    mesh.position.z = 0;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    //var mixer = new THREE.AnimationMixer( mesh );
    var rot_mat = new THREE.Matrix4();
    rot_mat.makeRotationFromEuler(ZERO_EULER);
    var this_object = new game_object(mesh,ZERO_POINT,rot_mat);
    views.game.rocket = this_object;
    views.game.scene.add(mount);
    mount.add(smount);
    smount.add(rocket_wire);
    rocket_wire.add(views.game.rocket.mesh);
  } );
}
var game_object = (function game_object_creator(){
  function game_object(mes,c,r){
    mes.position.y = c.y;
    mes.position.x = c.x;
    mes.position.z = c.z;
    mes.rotation.setFromRotationMatrix(r);
    mes.rotation.order = 'YXZ';
    this.mesh = mes;
    this.rot_mat = r;
    this.rot =  this.mesh.rotation;
    this.pos = this.mesh.position;
    this.geo = this.mesh.geometry;
    this.radial_box = 0;
    this.raycaster = new THREE.Raycaster();
    this.mass = 0;
    for(var i = 0; i < this.geo.vertices.length;i++){
      var temp = physics.distance_between_two_points(this.geo.vertices[i],ZERO_POINT) * 1.2;
      if(temp > this.radial_box){
        this.radial_box = temp;
      }
    }
  }
  game_object.prototype = {
    distance:function(){
    return this.pos; 

    },
  };
  return game_object;
})();
var planet_object = (function planet_object_creator(){
  function planet_object(mes,c,r){
    mes.position.set(c.x,c.y,c.z);
    mes.rotation.order = 'YXZ';
    this.mesh = mes;
    this.rot = this.mesh.rotation;
    this.pos = this.mesh.position;
    this.geo = this.mesh.geometry;
    this.mat = this.mesh.material;
    this.radial_box = 0;
    }
  game_object.prototype = {

  };
  return game_object;
})();
