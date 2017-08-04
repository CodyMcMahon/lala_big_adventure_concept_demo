var CONTROL_OBJECT_TO_ASSET = {
  VERT:'die',
  HOR:'die',
  CURL:'die',
  SPIN:'die',
  LAUNCH:'die',
};
var VERT_POS = {
  x:-5,
  y:-3,
  z:-6,
};
var HOR_POS = {
  x:-3,
  y:-3,
  z:-6,
};
var CURL_POS = {
  x:-1,
  y:-3,
  z:-6,
};
var SPIN_POS = {
  x:1,
  y:-3,
  z:-6,
};
var LAUNCH_POS = {
  x:5,
  y:-3,
  z:-6,
};
var control_object = (function control_object_creator(){
  function control_object(mes,c){
    this.mesh = mes;
    this.pos = mes.position;
    camera_utils.attach_game_object_to_camera(this,c);
  }
  game_object.prototype = {

  };
  return control_object;
})();
var control_object_loader = {
  load_vert:function(){
    loader.load(asset_dictionary[CONTROL_OBJECT_TO_ASSET.VERT], function( geometry ,material) {
      var mesh = new THREE.SkinnedMesh( geometry, new THREE.MeshFaceMaterial(material) );
      views.game.control_objects['VERT'] = new control_object(mesh,VERT_POS);
    });
  },
  load_hor:function(){
    loader.load(asset_dictionary[CONTROL_OBJECT_TO_ASSET.HOR], function( geometry ,material) {
      var mesh = new THREE.SkinnedMesh( geometry, new THREE.MeshFaceMaterial(material) );
      views.game.control_objects['HOR'] = new control_object(mesh,HOR_POS);
    });
  },
  load_curl:function(){
    loader.load(asset_dictionary[CONTROL_OBJECT_TO_ASSET.CURL], function( geometry ,material) {
      var mesh = new THREE.SkinnedMesh( geometry, new THREE.MeshFaceMaterial(material) );
      views.game.control_objects['CURL'] = new control_object(mesh,CURL_POS);
    });
  },
  load_spin:function(){
    loader.load(asset_dictionary[CONTROL_OBJECT_TO_ASSET.SPIN], function( geometry ,material) {
      var mesh = new THREE.SkinnedMesh( geometry, new THREE.MeshFaceMaterial(material) );
      views.game.control_objects['SPIN'] = new control_object(mesh,SPIN_POS);
    });
  },
  load_launch:function(){
    loader.load(asset_dictionary[CONTROL_OBJECT_TO_ASSET.LAUNCH], function( geometry ,material) {
      var mesh = new THREE.SkinnedMesh( geometry, new THREE.MeshFaceMaterial(material) );
      views.game.control_objects['LAUNCH'] = new control_object(mesh,LAUNCH_POS);
    });
  },
  load_all:function(){
    this.load_vert();
    this.load_hor();
    this.load_curl();
    this.load_spin();
    this.load_launch();
  },
};
