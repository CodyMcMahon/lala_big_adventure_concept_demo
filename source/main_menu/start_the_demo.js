function start_the_demo(){
  rail = new THREE.Object3D();
  var reticule_geo = new THREE.RingGeometry(10,12,32);
  var reticule_mesh = new THREE.MeshLambertMaterial({color:0x00ff44});
  reticule = new THREE.Mesh(reticule_geo,reticule_mesh);
  reticule.renderOrder = 1;
  var reticule_geo_mini = new THREE.RingGeometry(10,10.5,32);
  var reticule_mesh_mini = new THREE.MeshLambertMaterial({color:0x00ff44});
  reticule_mini = new THREE.Mesh(reticule_geo_mini,reticule_mesh_mini);
  reticule.position.z = -400;
  reticule_mini.position.z = -255;
  reticule_mini.renderOrder = 1;
  renderer.sortObjects = false;
  renderer.autoClear = false;
  console.log('loading shit now');
  g = views.game;
  g.camera.rotation.set(0,0,0);
  g.camera.position.set(0,0,15);
  g.scene.add(rail);
  rail.add(g.camera);
  rail.add(reticule);
  rail.add(reticule_mini);
  dev.ld('cockpit','cockpit');
  dev.ld('die','ship');
  dev.ld('engine','engine');
  dev.ld('wings','wings');
  //dev.ld('buildings','b1');
  //dev.ld('laser_gun','laser_gun');
  for(var i = 0;i < 10;i++){
    dev.ld('die','bat' + i);
    dev.ld('bat_wings','bat_wings' + i);
    dev.ld('bat_body','bat_body' + i);
    dev.ld('pulse','explode' + i);
  }
  for(var i = 0;i < 25;i++){
    dev.ld('laser','laser'+i);
  }
  //dev.ld('pulse','pulse');
  //dev.ld('pulse_gun','pulse_gun');
  dev.ld('rocket_gun','rocket_gun');
}
function start_the_demo2(){
  //views.game.object_dict['b1'].mesh.position.z-=700;
  //views.game.object_dict['b1'].mesh.position.x-=5;
  //views.game.object_dict['b1'].mesh.position.y-=45;
  //views.game.object_dict['ship'].mesh.scale.set(.0005,.0005,.0005);
  ship = views.game.object_dict['ship'].mesh;
  ship.add(views.game.object_dict['engine'].mesh);
  ship.add(views.game.object_dict['wings'].mesh);
  ship.add(views.game.object_dict['cockpit'].mesh);
  //ship.add(views.game.object_dict['laser_gun'].mesh);
  //ship.add(views.game.object_dict['pulse_gun'].mesh);
  ship.add(views.game.object_dict['rocket_gun'].mesh);
  rail.add(ship);
  //ship.rotation.order = "XYZ";
  for(var i = 0;i < 10;i++){
    bat[i] = views.game.object_dict['bat'+i].mesh;
    bat[i].body = views.game.object_dict['bat_body'+i].mesh;
    bat[i].wings = views.game.object_dict['bat_wings'+i].mesh;
    bat[i].explode = views.game.object_dict['explode'+i].mesh;
    bat[i].body.rotation.y = Math.PI;
    bat[i].wings.rotation.y = Math.PI;
    bat[i].add(views.game.object_dict['bat_body'+i].mesh);
    bat[i].add(views.game.object_dict['bat_wings'+i].mesh);
    bat[i].alive = true;
    bat[i].dead_count = 0;
    views.game.scene.remove(bat[i].explode);
    bat[i].explode.scale.set(10,10,10);
  }
  for(var i = 0;i < 10;i++){
    bat[i].position.y = Math.random() * 80 - 30;
    bat[i].position.x = Math.random() * 3000 - 1500;
    bat[i].position.z = Math.random() * 3000 - 1500;
    bat[i].rotation.y = Math.random() * Math.PI * 2;
  }

  for(var i = 0;i < 25;i++){
    laser[i] = views.game.object_dict['laser'+i].mesh;
    laser[i].scale.set(5,5,5);
    laser[i].rest = true;
    laser[i].count = 0;
  }
  //pulse = views.game.object_dict['pulse'].mesh;
  var ve = new THREE.Vector3();
  ve.setFromMatrixPosition( ship.matrixWorld );
  //laser.position.x = ve.x;
  //laser.position.y = ve.y;
  //laser.position.z = ve.z;
  for(var i = 0;i < 25;i++){
    views.game.scene.add(laser[i]);
    laser[i].position.y = -100;
  }
  //pulse.position.x = ve.x;
  //pulse.position.y = -999;
  //pulse.position.z = 100;
  views.game.scene.add(pulse);
  ship.position.y =-7;
  ship.position.z =-10;
  me.mouse.curr.x =0;
  me.mouse.curr.y =0;
  renderer.domElement.onclick = function(){
  	renderer.domElement.requestPointerLock();
    locked_mouse = true;
  };
}
