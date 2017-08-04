var dev = {
  ld:function(asset,name){
    load_game_object(asset,name);
  },
  mv:function(name,location){
    views.game.object_dict[name].mesh.position.x = location.x;
    views.game.object_dict[name].mesh.position.y = location.y;
    views.game.object_dict[name].mesh.position.z = location.z;
  },
  rot:function(name,r){
    views.game.object_dict[name].mesh.rotation.x = r.x;
    views.game.object_dict[name].mesh.rotation.y = r.y;
    views.game.object_dict[name].mesh.rotation.z = r.z;
  },
  camera: {
    set_pos:function(p){
      views.game.camera.position.x = p.x;
      views.game.camera.position.y = p.y;
      views.game.camera.position.z = p.z;
    },
    set_rot:function(r){
      views.game.camera.rotation.x = r.x;
      views.game.camera.rotation.y = r.y;
      views.game.camera.rotation.z = r.z;
    },
    set_speed:function(s){
      DEV_CAM_SPEED = s;
    },
  },
};
