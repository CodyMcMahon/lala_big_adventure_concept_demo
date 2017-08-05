function build_main_menu_scene(){
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 68, window.innerWidth / window.innerHeight, 1, 50000 );
  views.game.scene = scene;
  views.game.camera = camera;
  camera.position.y = 10;
  camera.rotation.order = "YXZ";
  //camera.rotation.x = -Math.PI/8;
  /*
  if(!assets_loaded['grass']){*/
    var groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
    texture_loader.load(asset_dictionary['grass'],function(texture){
      var material = new THREE.MeshBasicMaterial({map: texture});
      assets_loaded['grass'] = new THREE.Mesh(groundGeo,material);
      assets_loaded['grass'].rotation.x = -Math.PI/2;
      assets_loaded['grass'].position.y = -45;
      views.game.scene.add(assets_loaded['grass']);
    });
  /*}
  else{
    views.game.scene.add(assets_loaded['grass']);
  }
  */
  var path = 'assets/skyboxes/d1';
  var format = '.png';
  var urls= [path+'xp'+format,path+'xn'+format,path+'yp'+format,path+'yn'+format,path+'zp'+format,path+'zn'+format];
  var reflectionCube = new THREE.CubeTextureLoader().load( urls );
  reflectionCube.format = THREE.RGBFormat;
  views.game.scene.background = reflectionCube;
  var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
  hemiLight.color.setHSL( 0.6, 1, 0.6 );
  hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
  hemiLight.position.set( 0, 500, 0 );
  views.game.scene.add(views.game.camera);
  //load_rocket();
  views.game.scene.add( hemiLight );
  //control_object_loader.load_all();
  onWindowResize();
  setTimeout(start_the_demo,500);
  setTimeout(start_the_demo2,2500);
}
