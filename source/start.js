function init_renderer(){
  container = document.getElementById( 'container' );
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );
  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.renderReverseSided = false;
}

function init(){
  init_renderer();
  build_main_menu_scene();
  switch_to_game();
}
function state_updater(){
  update_state();
  setTimeout(state_updater,1000/GAME_STATE_FRAMES_PER_SECOND);
}
function start_up(){
  kill_number_html = document.getElementById("killnumber");
  init();
  window.addEventListener( 'resize', onWindowResize, false );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.addEventListener( 'keydown', onDocumentKeyDown, false );
	document.addEventListener( 'keyup', onDocumentKeyUp, false );
  state_updater();
  animate();
}
