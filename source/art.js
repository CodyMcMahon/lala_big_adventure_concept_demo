function animate() {
	//update_reticule();
	requestAnimationFrame( animate );
	reticule.renderOrder = 1;
	render();
}
function render() {
	renderer.render( current_view.scene, current_view.camera );
	//assets_loaded['grass'].rotation.x -= 0.01;
}
//not functioning
function update_reticule(){
	if(reticule){
		reticule.position.x += (target_reticule.x - reticule.position.x)/2;
		reticule.position.y += (target_reticule.y - reticule.position.y)/2;
	}
}
