var physics = {
  distance_between_two_points: function(one,two){
    return Math.sqrt((one.x-two.x)*(one.x-two.x)+(one.y-two.y)*(one.y-two.y)+(one.z-two.z)*(one.z-two.z));
  },
  center_of_three_points: function(one,two,three){
    var temp = {x:0,y:0,z:0};
    temp.x = (one.x+two.x+three.x)/3;
    temp.y = (one.y+two.y+three.y)/3;
    temp.z = (one.z+two.z+three.z)/3;
    return temp;
  },
  rotation_of_face: function(normal,rot_mat){
    var new_rot = {x:0,y:0,z:0,order:"YXZ"};
    new_rot.applyMatrix4(rot_mat);
    return new_rot;
  },
  dot_product(one,two){
    var summation = 0;
    summation += one.x*two.x;
    summation += one.y*two.y;
    summation += one.z*two.z;
    return summation;
  },
  project(b,a){
    var one = physics.dot_product(a,b);
    var two = physics.dot_product(a,a);
    var scaler = one/two;
    return {x:b.x-a.x*scaler,y:b.y-a.y*scaler,z:b.z-a.z*scaler};
  },
}
