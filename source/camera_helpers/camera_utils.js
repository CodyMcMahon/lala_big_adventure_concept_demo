var camera_utils = {
  attach_game_object_to_camera:function(object,coords){
    views.game.camera.add(object.mesh);
    object.pos.x = coords.x;
    object.pos.y = coords.y;
    object.pos.z = coords.z;
  },
  detach_game_object_from_camera:function(object){
    views.game.camera.remove(object.mesh);
  },
}
