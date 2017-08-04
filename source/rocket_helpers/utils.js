var rocket_utils = {
  attach_rocket_to_face:function(thing,face){
    var rocket = views.game.rocket;
    var hit_face = thing.mesh.geometry.faces[face];
    var verts = thing.mesh.geometry.vertices;
    var facenorm = hit_face.normal;
    var center_point = physics.center_of_three_points(verts[hit_face['a']],verts[hit_face['b']],verts[hit_face['c']]);
    var vec_norm = new THREE.Vector3(0,1,0);
    var face_rot = new THREE.Quaternion();
    face_rot.setFromUnitVectors(vec_norm,facenorm);
    views.game.rocket.rot.setFromQuaternion(face_rot);
    var euler = new THREE.Euler(rocket.rot.x,rocket.rot.y,rocket.rot.z,'ZXY');
    var rot_mat = new THREE.Matrix4();
    rot_mat.makeRotationFromEuler(euler);
    views.game.rocket.rot_mat = rot_mat;
    views.game.rocket.mesh.position.x = center_point.x + thing.pos.x;
    views.game.rocket.mesh.position.y = center_point.y + thing.pos.y;
    views.game.rocket.mesh.position.z = center_point.z + thing.pos.z;
  },
  rocket_launch:function(){

  },
}
