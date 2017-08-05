//constants
var ZERO_POINT = {x:0,y:0,z:0};
var origin = new THREE.Vector3(0,0,0);
var ZERO_EULER = new THREE.Euler(0,0,0,'ZXY');
var GAME_STATE_FRAMES_PER_SECOND = 60;
var DEV_CAM_SPEED = 1;
var ROCKET_ASSET = "rocket";
var ROCKET_BASE_MAG = 0.01;
var ROCKET_MAX_MAG = 3;
var GRAVITY_CONSTANT = -9.8;
var ARC_BASE_RADIUS = 10;
var ARC_MAX_RADIUS = 1000000;
var t_unit = 1 / GAME_STATE_FRAMES_PER_SECOND;
var t_unit_count = 1 / GAME_STATE_FRAMES_PER_SECOND;
var empty_vec = new THREE.Vector3(0,0,0);
var tan_vec = new THREE.Vector3(0,0,0);
var are_we_fucking_ready = false;
var game_screen;
var locked_mouse = false;

var GAME_SENSITIVITY = .4;
var MOUSE_LEASH = 10;

var rail_speed = 1;
var kill_number = 0;
var kill_number_html;

var rotation_state = 0;
var rail;
var reticule;
var reticule_mini;
var laser_current = 0;
var laser = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
var laser_fire = false;
var laser_direction=[{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0}];
var target_reticule={x:0,y:0};
var pulse;
var pulse_fire = false;
var pulse_direction={x:0,y:0,z:0};
var pulse_animation = false;
var pulse_animation_down = false;
var ship;
var bat = [];
var ship_moment = {x:0,y:0};
var joy_stick = {x:0,y:0};

var ball_rot_x = 0;
var ball_rot_y = 0;

//
var loader = new THREE.JSONLoader();
var container = null;
var game_state = null;
var renderer = null;
var current_view = null;
var rocket_traj = null;
var dev_mode = false;
var texture_loader = new THREE.TextureLoader();

var rail_location = {x:0,y:0,z:0};

//some shit we will always need, like each other
var arc_path = new THREE.ArcCurve(ARC_BASE_RADIUS,ARC_BASE_RADIUS,ARC_BASE_RADIUS,Math.PI,3*Math.PI,true);
var arc_vec = new THREE.Vector3();
var rocket_wire = new THREE.Object3D();
rocket_wire.rotation.order = "YXZ";
var rocket_quat = new THREE.Quaternion();
var vecnorm = new THREE.Vector3(0,1,0);
var mount = new THREE.Object3D();
mount.rotation.order = "YXZ";
var smount = new THREE.Object3D();
smount.rotation.order = "YXZ";

//  var materials = [ new THREE.MeshPhongMaterial({color:0xffffff,shading:THREE.FlatShading,vertexColors:THREE.VertexColors, shininess:0}), new THREE.MeshBasicMaterial({color:0xff00ff,shading:THREE.FlatShading,wireframe:true,transparent:true})];
 // materials[0].emissive.set(0x00ff00);
  var ballmat = new THREE.MeshLambertMaterial({color:0xff0000});
  var ball_geo = new THREE.SphereGeometry(0.02,4,4);
 // var faceIndices = ['a','b','c'];
 // var color, vertexIndex, p, radius = 200, ball_geo = new THREE.SphereGeometry(1,32,32);
 // f = ball_geo.faces;
 // v = ball_geo.vertices;
 // for(var i=0;i<f.length;i++){face=f[i];for(var j=0;j<3;j++){vertexIndex=face[faceIndices[j]];p=v[vertexIndex];color = new THREE.Color(0xffffff);color.setHSL((p.y/radius+1)/2,1.0,0.5);face.vertexColors[j]=color;}};
//  var ball = THREE.SceneUtils.createMultiMaterialObject(ball_geo,materials);
 // ball.scale.set(2,2,2);
  var ball = new THREE.Mesh(ball_geo,ballmat);
  //views.game.scene.add(ball);
//  views.game.object_list[views.game.object_list.length] = ball;
//  views.game.object_dict['ball'] = ball;
  var arc_ring_geo = new THREE.RingGeometry(4.5,5,32);
  var arc_ring_material = new THREE.MeshBasicMaterial({color:0x00f000,side:THREE.DoubleSide,shading:THREE.FlatShading});
  var arc_ring_mesh = new THREE.Mesh(arc_ring_geo,arc_ring_material);
  arc_ring_mesh.name = "arc ring mesh";
  ball.name = "ball mesh";
  ball.position.set(0,0,0);
  arc_ring_mesh.scale.set(0.5,0.5,0.5);
  arc_ring_mesh.add(ball);
//  views.game.object_list[views.game.object_list.length] = arc_ring_mesh;
//  views.game.object_dict['arc ring'] = arc_ring_mesh;
var raycaster = new THREE.Raycaster();

var planet1 = new THREE.Object3D();
var planet_geo = new THREE.SphereGeometry(5,32,32);
var planet_mat = new THREE.MeshLambertMaterial({color:0x0044ff});
var planet_mesh = new THREE.Mesh(planet_geo,planet_mat);

function planet_creator(radius,res,color_0x){
  var geometry = new THREE.SphereGeometry(radius,res,res);
  var material = new THREE.MeshLambertMaterial({color: color_0x});
  var planet = new THREE.Mesh(geometry,material);
  return planet;
}
var planet_vec = new THREE.Vector3(-50,30,50);
var pl = planet_creator(7,32,'0xff0000');
var normal_matrix = new THREE.Matrix4();

var me = {
  keyboard : [],
  mouse : {
    down : false,
    rc   : false,
    curr : {
      x : 0,
      y : 0,
    },
    past : {
      x : 0,
      y : 0,
    },
    last : {
      x : 0,
      y : 0,
    },
  },
};

var views = {
  game : {
    scene : 0,
    camera : 0,
    rocket : 0,
    object_list : [],
    object_dict : [],
    control_objects : [],
  },
  loading : {
    scene : 0,
    camera : 0,
    objects : [],
  },
};

var then = { x : -1, y : 0 };
var rocket_vars = null;
var rocket_active = false;
var view_state = null;
function switch_to_loading(){
  view_state = 'loading';
  current_view = views.loading;
}
function switch_to_game(){
  view_state = 'game';
  current_view = views.game;
}
