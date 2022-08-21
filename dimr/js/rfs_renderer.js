import * as THREE from 'https://cdn.skypack.dev/three@0.132.0';
import { PLYLoader } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/loaders/PLYLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/controls/OrbitControls.js';
// import * as THREE from './three.js-r133/build/three.module.js';
// import { PLYLoader } from './three.js-r133/examples/jsm/loaders/PLYLoader.js';
// import { OrbitControls } from './three.js-r133/examples/jsm/controls/OrbitControls.js';

let container, plyloader;

let camera, scene, renderer, controls;

let CLASS_COLOR = {
    'cabinet': 'rgb(0, 120, 177)', 
    'chair': 'rgb(189, 189, 57)',
    'sofa': 'rgb(144, 86, 76)',
    'table': 'rgb(255, 152, 153)',
    'bookshelf': 'rgb(150, 103, 185)', 
    'bathtub': 'rgb(234, 119, 192)',
    'display': 'rgb(128, 128, 0)',
    'trash': 'rgb(128, 128, 128)',
};

// manually list all files... 
let DATA = {
    "scene0011_01": {
      "input": [
        "ply/scene0011_01_input.ply"
      ],
      "sem": [
        "ply/scene0011_01_semantic_pred.ply"
      ],
      "inst": [
        "ply/scene0011_01_instance_pred.ply"
      ],
      "-1": [
        "ply/retrieval/scene0011_01_0_chair_0.9955.ply",
        "ply/retrieval/scene0011_01_10_chair_0.9712.ply",
        "ply/retrieval/scene0011_01_11_chair_0.9467.ply",
        "ply/retrieval/scene0011_01_12_cabinet_0.8419.ply",
        "ply/retrieval/scene0011_01_13_trash_bin_0.7133.ply",
        "ply/retrieval/scene0011_01_14_trash_bin_0.5451.ply",
        "ply/retrieval/scene0011_01_15_chair_0.3110.ply",
        "ply/retrieval/scene0011_01_16_cabinet_0.2790.ply",
        "ply/retrieval/scene0011_01_17_display_0.2526.ply",
        "ply/retrieval/scene0011_01_18_chair_0.1799.ply",
        "ply/retrieval/scene0011_01_19_cabinet_0.1206.ply",
        "ply/retrieval/scene0011_01_1_chair_0.9930.ply",
        "ply/retrieval/scene0011_01_20_table_0.1075.ply",
        "ply/retrieval/scene0011_01_2_chair_0.9905.ply",
        "ply/retrieval/scene0011_01_3_chair_0.9876.ply",
        "ply/retrieval/scene0011_01_4_chair_0.9863.ply",
        "ply/retrieval/scene0011_01_5_chair_0.9853.ply",
        "ply/retrieval/scene0011_01_6_table_0.9849.ply",
        "ply/retrieval/scene0011_01_7_display_0.9779.ply",
        "ply/retrieval/scene0011_01_8_chair_0.9766.ply",
        "ply/retrieval/scene0011_01_9_chair_0.9759.ply"
      ],
      "0": [
        "ply/generation/scene0011_01_0_chair_0.9955.ply",
        "ply/generation/scene0011_01_10_chair_0.9712.ply",
        "ply/generation/scene0011_01_11_chair_0.9467.ply",
        "ply/generation/scene0011_01_12_cabinet_0.8419.ply",
        "ply/generation/scene0011_01_13_trash_bin_0.7133.ply",
        "ply/generation/scene0011_01_14_trash_bin_0.5451.ply",
        "ply/generation/scene0011_01_15_chair_0.3110.ply",
        "ply/generation/scene0011_01_16_cabinet_0.2790.ply",
        "ply/generation/scene0011_01_17_display_0.2526.ply",
        "ply/generation/scene0011_01_18_chair_0.1799.ply",
        "ply/generation/scene0011_01_19_cabinet_0.1206.ply",
        "ply/generation/scene0011_01_1_chair_0.9930.ply",
        "ply/generation/scene0011_01_20_table_0.1075.ply",
        "ply/generation/scene0011_01_2_chair_0.9905.ply",
        "ply/generation/scene0011_01_3_chair_0.9876.ply",
        "ply/generation/scene0011_01_4_chair_0.9863.ply",
        "ply/generation/scene0011_01_5_table_0.9858.ply",
        "ply/generation/scene0011_01_6_chair_0.9853.ply",
        "ply/generation/scene0011_01_7_chair_0.9766.ply",
        "ply/generation/scene0011_01_8_display_0.9765.ply",
        "ply/generation/scene0011_01_9_chair_0.9759.ply"
      ]
    },
    "scene0030_02": {
      "input": [
        "ply/scene0030_02_input.ply"
      ],
      "sem": [
        "ply/scene0030_02_semantic_pred.ply"
      ],
      "inst": [
        "ply/scene0030_02_instance_pred.ply"
      ],
      "-1": [
        "ply/retrieval/scene0030_02_0_chair_0.9977.ply",
        "ply/retrieval/scene0030_02_10_chair_0.9831.ply",
        "ply/retrieval/scene0030_02_11_chair_0.9803.ply",
        "ply/retrieval/scene0030_02_12_chair_0.9762.ply",
        "ply/retrieval/scene0030_02_13_chair_0.9664.ply",
        "ply/retrieval/scene0030_02_14_chair_0.9503.ply",
        "ply/retrieval/scene0030_02_15_table_0.9403.ply",
        "ply/retrieval/scene0030_02_16_bookshelf_0.9400.ply",
        "ply/retrieval/scene0030_02_17_table_0.9383.ply",
        "ply/retrieval/scene0030_02_18_bookshelf_0.9247.ply",
        "ply/retrieval/scene0030_02_19_table_0.9235.ply",
        "ply/retrieval/scene0030_02_1_chair_0.9975.ply",
        "ply/retrieval/scene0030_02_20_chair_0.9176.ply",
        "ply/retrieval/scene0030_02_21_chair_0.8972.ply",
        "ply/retrieval/scene0030_02_22_bookshelf_0.8363.ply",
        "ply/retrieval/scene0030_02_23_chair_0.8033.ply",
        "ply/retrieval/scene0030_02_24_chair_0.5829.ply",
        "ply/retrieval/scene0030_02_25_bookshelf_0.5251.ply",
        "ply/retrieval/scene0030_02_26_table_0.4803.ply",
        "ply/retrieval/scene0030_02_27_bookshelf_0.4278.ply",
        "ply/retrieval/scene0030_02_28_bookshelf_0.2427.ply",
        "ply/retrieval/scene0030_02_29_table_0.2393.ply",
        "ply/retrieval/scene0030_02_2_chair_0.9958.ply",
        "ply/retrieval/scene0030_02_30_trash_bin_0.1441.ply",
        "ply/retrieval/scene0030_02_3_chair_0.9956.ply",
        "ply/retrieval/scene0030_02_4_chair_0.9951.ply",
        "ply/retrieval/scene0030_02_5_chair_0.9950.ply",
        "ply/retrieval/scene0030_02_6_chair_0.9936.ply",
        "ply/retrieval/scene0030_02_7_chair_0.9925.ply",
        "ply/retrieval/scene0030_02_8_chair_0.9888.ply",
        "ply/retrieval/scene0030_02_9_chair_0.9842.ply"
      ],
      "0": [
        "ply/generation/scene0030_02_0_chair_0.9977.ply",
        "ply/generation/scene0030_02_10_chair_0.9831.ply",
        "ply/generation/scene0030_02_11_chair_0.9803.ply",
        "ply/generation/scene0030_02_12_chair_0.9762.ply",
        "ply/generation/scene0030_02_13_chair_0.9664.ply",
        "ply/generation/scene0030_02_14_chair_0.9503.ply",
        "ply/generation/scene0030_02_15_table_0.9403.ply",
        "ply/generation/scene0030_02_16_bookshelf_0.9400.ply",
        "ply/generation/scene0030_02_17_table_0.9383.ply",
        "ply/generation/scene0030_02_18_bookshelf_0.9247.ply",
        "ply/generation/scene0030_02_19_table_0.9235.ply",
        "ply/generation/scene0030_02_1_chair_0.9975.ply",
        "ply/generation/scene0030_02_20_chair_0.9176.ply",
        "ply/generation/scene0030_02_21_chair_0.8972.ply",
        "ply/generation/scene0030_02_22_bookshelf_0.8363.ply",
        "ply/generation/scene0030_02_23_chair_0.8025.ply",
        "ply/generation/scene0030_02_24_chair_0.5829.ply",
        "ply/generation/scene0030_02_25_bookshelf_0.5251.ply",
        "ply/generation/scene0030_02_26_table_0.4803.ply",
        "ply/generation/scene0030_02_27_bookshelf_0.4278.ply",
        "ply/generation/scene0030_02_28_bookshelf_0.2427.ply",
        "ply/generation/scene0030_02_29_table_0.2393.ply",
        "ply/generation/scene0030_02_2_chair_0.9958.ply",
        "ply/generation/scene0030_02_30_trash_bin_0.1441.ply",
        "ply/generation/scene0030_02_3_chair_0.9956.ply",
        "ply/generation/scene0030_02_4_chair_0.9951.ply",
        "ply/generation/scene0030_02_5_chair_0.9950.ply",
        "ply/generation/scene0030_02_6_chair_0.9936.ply",
        "ply/generation/scene0030_02_7_chair_0.9925.ply",
        "ply/generation/scene0030_02_8_chair_0.9888.ply",
        "ply/generation/scene0030_02_9_chair_0.9842.ply"
      ]
    },
    "scene0217_00": {
      "input": [
        "ply/scene0217_00_input.ply"
      ],
      "sem": [
        "ply/scene0217_00_semantic_pred.ply"
      ],
      "inst": [
        "ply/scene0217_00_instance_pred.ply"
      ],
      "-1": [
        "ply/retrieval/scene0217_00_0_chair_0.9952.ply",
        "ply/retrieval/scene0217_00_10_trash_bin_0.3840.ply",
        "ply/retrieval/scene0217_00_11_table_0.1550.ply",
        "ply/retrieval/scene0217_00_1_chair_0.9871.ply",
        "ply/retrieval/scene0217_00_2_trash_bin_0.9859.ply",
        "ply/retrieval/scene0217_00_3_bookshelf_0.9828.ply",
        "ply/retrieval/scene0217_00_4_table_0.9075.ply",
        "ply/retrieval/scene0217_00_5_bookshelf_0.9075.ply",
        "ply/retrieval/scene0217_00_6_trash_bin_0.8924.ply",
        "ply/retrieval/scene0217_00_7_trash_bin_0.8017.ply",
        "ply/retrieval/scene0217_00_8_trash_bin_0.6690.ply",
        "ply/retrieval/scene0217_00_9_table_0.5016.ply"
      ],
      "0": [
        "ply/generation/scene0217_00_0_chair_0.9952.ply",
        "ply/generation/scene0217_00_10_trash_bin_0.3840.ply",
        "ply/generation/scene0217_00_11_table_0.1550.ply",
        "ply/generation/scene0217_00_1_chair_0.9871.ply",
        "ply/generation/scene0217_00_2_trash_bin_0.9859.ply",
        "ply/generation/scene0217_00_3_bookshelf_0.9828.ply",
        "ply/generation/scene0217_00_4_table_0.9075.ply",
        "ply/generation/scene0217_00_5_bookshelf_0.9075.ply",
        "ply/generation/scene0217_00_6_trash_bin_0.8924.ply",
        "ply/generation/scene0217_00_7_trash_bin_0.8017.ply",
        "ply/generation/scene0217_00_8_trash_bin_0.6690.ply",
        "ply/generation/scene0217_00_9_table_0.5016.ply"
      ]
    }
  }

init();

function init() {

    container =  document.getElementById('hook');

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );
    //scene.fog = new THREE.Fog( 0x72645b, 2, 15 );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set( 0, 6, 6 );
    camera.up.set( 0, 0, 1 ); // important! we want to rotate around z axis.

    // renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( 0.8 * window.innerWidth, 0.8 * window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;

    renderer.shadowMap.enabled = true;

    container.appendChild( renderer.domElement );

    // controls
    controls = new OrbitControls( camera, renderer.domElement );
    controls.listenToKeyEvents( window ); // optional
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;

    // auto rotation
    controls.autoRotate = true;
    
    // controls.minDistance = 100;
    // controls.maxDistance = 500;
    // controls.maxPolarAngle = Math.PI / 2;

    // PLY file Loader

    plyloader = new PLYLoader();

    // Lights

    scene.add( new THREE.HemisphereLight( 0xbdbdbd, 0x111122 ) );
    //scene.add( new THREE.HemisphereLight( 0xffffff, 0xffffff ) );

    addShadowedLight( 10, 10, 10, 0x888888, 1.35 );
    //addShadowedLight( , 1, - 1, 0xffffff, 1 );

    // resize
    window.addEventListener( 'resize', onWindowResize );

}

function post_load_ply (type, color=0x888888) {
    if (type === "points_colored") {
        return (geometry) => {
            const material = new THREE.PointsMaterial( { vertexColors: true, size: 0.02 } ); // enable vertex color from ply.
            const points = new THREE.Points( geometry, material );
            scene.add( points );
        }
    } else if (type === "plane") {
        // pass in point cloud to get bbox
        return (geometry) => {
            const material = new THREE.PointsMaterial( { vertexColors: true, size: 0.02 } ); // enable vertex color from ply.
            const points = new THREE.Points( geometry, material );
            // add fake ground
            geometry.computeBoundingBox();
            let bbox = geometry.boundingBox;
            add_plane(bbox.max.x - bbox.min.x, bbox.max.y - bbox.min.y, bbox.min.z);
            //add_plane(0.62*(bbox.max.x - bbox.min.x), 0.82*(bbox.max.y - bbox.min.y), bbox.min.z);
        }
    } else if (type === "points") {
        return (geometry) => {
            const material = new THREE.PointsMaterial( { color: 0x000000, size: 0.02 } ); // disable color for input
            const points = new THREE.Points( geometry, material );
            scene.add( points );
        }
    } else if (type === "pred") {
        return (geometry) => {
            const material = new THREE.MeshPhongMaterial( { color: color, flatShading: true, side: THREE.DoubleSide } );
            //const material = new THREE.MeshStandardMaterial( { color: 0x888888, flatShading: true } );
            //const material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
            const mesh = new THREE.Mesh( geometry, material );
            scene.add( mesh );
        }
    } else {
        return (geometry) => {
            const material = new THREE.MeshPhongMaterial( { color: 0x888888, flatShading: true, side: THREE.DoubleSide } );
            const mesh = new THREE.Mesh( geometry, material );
            scene.add( mesh );
        }
    }

}

function addShadowedLight( x, y, z, color, intensity ) {

    const directionalLight = new THREE.DirectionalLight( color, intensity );
    directionalLight.position.set( x, y, z );
    scene.add( directionalLight );

    directionalLight.castShadow = true;

    const d = 1;
    directionalLight.shadow.camera.left = - d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = - d;

    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 4;

    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;

    directionalLight.shadow.bias = - 0.001;

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );

    controls.update();

    renderer.render( scene, camera );

}

function load_input () {
    let scene_name = document.getElementById('scene_name').value;
    // console.log("[INFO] load input for ", scene_name);
    clear_scene();
    plyloader.load(DATA[scene_name]['input'], post_load_ply("points_colored") );
}

function change_k () {
    let K = document.getElementById('mode').value;
    // console.log("[INFO] change mode ", K);
}


function run () {
    // disable run button first
    let button = document.getElementById("run");
    button.disabled = true;
    button.value = "Running";

    let scene_name = document.getElementById('scene_name').value;
    let mode = document.getElementById('mode').value;

    clear_scene();
    plyloader.load(DATA[scene_name]['input'], post_load_ply("points") );
    
    let files = DATA[scene_name][mode];
    
    for (let file of files) {
        if (file.includes("_pred.ply")) {
            plyloader.load(file, post_load_ply("points_colored") );
        } else {
            let conf = parseFloat(file.slice(0, -4).split('_').at(-1));
            if (conf >= 0.3) {
                let label = file.split('_')[3];
                plyloader.load(file, post_load_ply("pred", CLASS_COLOR[label]));
            }
        }
    }

    // reset button
    button.disabled = false;
    button.value = "Run";

}

function clear_scene () {
    for (let i = scene.children.length - 1; i >= 0; i--) {
        if(scene.children[i].type === "Mesh" || scene.children[i].type === "Points")
            scene.remove(scene.children[i]);
    }
}

function add_plane(h, w, z) {
    // Ground
    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry( h, w ),
        new THREE.MeshPhongMaterial( { color: 0xaaaaaa, specular: 0x101010, side: THREE.DoubleSide } )
    );
    //plane.rotation.x = - Math.PI / 2;
    plane.position.z = z;
    plane.receiveShadow = true;
    scene.add( plane );
}

// bind to window
window.load_input = load_input;
window.change_k = change_k;
window.run = run;

load_input();
change_k();

animate();