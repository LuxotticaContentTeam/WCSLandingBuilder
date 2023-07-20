
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { smoothstep } from "./utils";

export class Env3D {
	constructor(option){
		this.elem = option.elemDOM
		this.modelPath = option.modelPath;
		this.texture = option.texturePath
		this.modelSetting = {
			scale:option.modelSetting.scale,
			position:option.modelSetting.position,
			rotation:option.modelSetting.rotation
		}
		this.cameraDist = option.cameraDist

		this.MODEL;
		this.camera,
		this.scene = new THREE.Scene(),
		this.renderer = new THREE.WebGLRenderer({
			// alpha:true,
			antialias: true
		});
			
		this.orbitControls;
		this.animate = this.animate.bind(this)
		this.rotate360 = this.rotate360.bind(this)
		this.rotateDirection = '';
		this.rotation = 0;
		this.startRotation = 0;

		this.MATERIAL= null;

		this.mouseAnimSettings = {
			mouseX:0,
			mouseXLast:0,
			mouseDiffX: 0,
			mouseY:0,
			mouseYLast:0,
			mouseDiffY: 0,
			handler:undefined
		}
		this.rotateObject360Settings = {
			duration : 2000,// Total duration for one complete rotation (in milliseconds)
	 		rotationSpeed : Math.PI * 2 / 2000, // Rotation speed to complete one rotation in the given duration
			currentTime : 0,
			rotating : false// Flag to check if
		}
	}

	async init(){
		this.buildEnviroment();
		this.setRenderer();
		// this.setLights();
		this.setOrbitControls()
		await this.loadModel();
		await this.setTexture();
		// console.log('MODEL: ', this.MODEL);
		this.setMaterial();
		this.setModel(this.MODEL);
		this.render();
		// this.mouseAnimation();
	}

	buildEnviroment(){
		this.setCamera();
		
	}

	setRenderer(){
		this.renderer.setPixelRatio( window.devicePixelRatio,2 );
		this.renderer.setSize( 1000, 1000);
		this.renderer.outputEncoding = THREE.sRGBEncoding;
		this.renderer.physicallyCorrectLights = true;
		this.renderer.setClearColor(0xeeeeee, 0);
		document.querySelector(this.elem).appendChild( this.renderer.domElement );
	}

	setCamera(){
		this.camera = new THREE.PerspectiveCamera( 30 ,1, .1, 100);
		this.camera.position.set( 0.65,9.47,17.65 );
		this.camera.rotation.set( -.5, .03, 0.017 );
	}

	loadModel(){
		const loader = new GLTFLoader();
		return new Promise(resolve=>{
			let this_ = this
			loader.load(
				// resource URL
				this.modelPath,
				// called when the resource is loaded
				function ( gltf ) {
					// console.log(gltf)
					let obj = gltf.scene;
					this_.MODEL =gltf.scene
					// modelTransdorm(obj)

					resolve('resolved');
					
					this_.render();
				},
				// called while loading is progressing
				function ( xhr ) {
			
					// console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
			
				},
				// called when loading has errors
				function ( error ) {
			
					console.log( 'An error happened: ', error );
			
				}
			);

		})
	} 

	setModel(MODEL){
		MODEL.scale.set(this.modelSetting.scale[0],this.modelSetting.scale[1],this.modelSetting.scale[2])
		MODEL.position.set(this.modelSetting.position[0],this.modelSetting.position[1],this.modelSetting.position[2])
		
		
		MODEL.rotation.x = this.modelSetting.rotation[0]
		MODEL.rotation.y = this.modelSetting.rotation[1]
		MODEL.rotation.z = this.modelSetting.rotation[2]
		MODEL.material = this.MATERIAL;
		this.scene.add(MODEL)
	}
	setMaterial(){
		this.MATERIAL = new THREE.MeshPhysicalMaterial({
			metalness: 0,  
			roughness: 0,
			transmission: 1, // Add transparency
		  });
	}
	setLights(){
		//LIGHTs
		var Alight = new THREE.AmbientLight( 0xffffff,2);
		this.scene.add(Alight)
		// Create point lights
		const light1 = new THREE.PointLight(0xffffff, 1, 1, 2);
		const light2 = new THREE.PointLight(0xffffff, 1, 1, 2);
		const light3 = new THREE.PointLight(0xffffff, 1, 1, 2);
		const light4 = new THREE.PointLight(0xffffff, 1, 1, 2);

		// Create light filters
		const filter1 = new THREE.Mesh(new THREE.BoxGeometry(.5,.5, .5), new THREE.MeshBasicMaterial({ color: 0xffffff }));
		const filter2 = filter1.clone();
		const filter3 = filter1.clone();
		const filter4 = filter1.clone();

		// Position lights and filters around the object
		light1.position.set(1, 0, 0);
		filter1.position.copy(light1.position);
		light2.position.set(-1, 0, 0);
		filter2.position.copy(light2.position);
		light3.position.set(0, 0, -1);
		filter3.position.copy(light3.position);
		light4.position.set(0, 0, 1);
		filter4.position.copy(light4.position);

		// Add lights and filters to scene
		this.scene.add(light1, light2, light3, light4,filter1,filter2,filter3,filter4);
	}

	setOrbitControls(){
		this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
		Object.assign(this.orbitControls,{
		//   maxDistance: 5,
		//   minDistance:1,
		// autoRotate:true,
		autoRotateSpeed:3.5,
		enableDamping:true,
		dampingFactor:.03,
		//   enableZoom : false,
		//   enablePan : false,
		//   minPolarAngle : Math.PI/2,
		//   maxPolarAngle : Math.PI/2

		})
			// controls.maxAzimuthAngle = 1;
		// controls.maxPolarAngle = 8;
		this.animate()
	}

	setTexture(){
		let this_ = this;
    
		return new Promise(resolve=>{
      try {
        new RGBELoader()
			  .load(this.texture, function (texture) {
				  texture.mapping = THREE.EquirectangularReflectionMapping;

          // this_.scene.background = texture;
          this_.scene.environment = texture;
          resolve('resolved');
			});
      } catch (error) {
        console.log('ERROR: ', error)
        resolve('resolved');
      }
		 
		})
		
	}

	animate(){
		requestAnimationFrame(this.animate );
		// required if controls.enableDamping or controls.autoRotate are set to true
		this.orbitControls.update();
	
		this.renderer.render( this.scene, this.camera );
		
	}

	render(){
		this.renderer.render( this.scene, this.camera );
	}

  setMouseAnimation(active){
    
    if (active){
      this.mouseAnimSettings.handler = this.mouseAnimation.bind(this);
      document.addEventListener('mousemove',this.mouseAnimSettings.handler,true)
    }else{
      document.removeEventListener('mousemove',this.mouseAnimSettings.handler,true)
    }
  }

	mouseAnimation(e){
  
		this.mouseAnimSettings.mouseX  = e.clientX/2;	
		this.mouseAnimSettings.mouseDiffX = this.mouseAnimSettings.mouseX - this.mouseAnimSettings.mouseXLast;
		this.mouseAnimSettings.mouseY  = e.clientY/2;	
		this.mouseAnimSettings.mouseDiffY = this.mouseAnimSettings.mouseY - this.mouseAnimSettings.mouseYLast;
		
    if (this.MODEL){
      this.MODEL.rotation.y += this.mouseAnimSettings.mouseDiffX * 0.0004;
      this.MODEL.rotation.x += this.mouseAnimSettings.mouseDiffY * 0.0004;
    }
		this.mouseAnimSettings.mouseXLast = this.mouseAnimSettings.mouseX
		this.mouseAnimSettings.mouseYLast = this.mouseAnimSettings.mouseY
		this.renderer.render(this.scene, this.camera);
	
	}

  setScrollAnimation(){
	console.log('qui')
    document.addEventListener('scroll',(e)=>{
        this.MODEL.rotation.x =-.2+ window.scrollY * .001 
    })
  }
  startRotate360(type){
	this.rotateDirection = type;
	this.rotation = 0;
	this.startRotation = this.MODEL.rotation.y
	this.rotate360();
  }
  rotate360(){

	if (Math.abs(this.startRotation - this.MODEL.rotation.y)  < 6.28){
	
		// console.log(this.MODEL.rotation.y)
		if (this.rotateDirection == 'left' || this.rotateDirection == ''){
			this.MODEL.rotation.y -= .1
		}else{
			this.MODEL.rotation.y += .1
		}
		requestAnimationFrame(this.rotate360);
		
		this.renderer.render( this.scene, this.camera );
	}
  }
  customOrbitRotation(){
	
  }
}


// JavaScript function to execute one 360-degree rotation
 
