var mShowAssist = false;
var mStats;
var mRenderer;
var mCamera;
var mScene;
var mOrbitControl;
var mAmbientLight;
var mDirectionalLight;    // SunLight
var mSpotLight;
var mMeshGrid;
var mAxis;
var mMeshLineMaterial;
// FBX load
var mFbxAnimMixers;
var mFbxAnimations = ["idle", "run", "attack", "death"];
var mFbxActions = [];
var mClock = new THREE.Clock();

function onKeyPress(event) {
    var key;
    if (navigator.appName == "Netscape") {
        key = String.fromCharCode(event.charCode);
    } else {
        key = String.fromCharCode(event.keyCode);
    }
    switch (key) {
        case 'G':
        case 'g':
            mShowAssist = !mShowAssist;
            mMeshLineMaterial.visible = mShowAssist;
            mAxis.material.visible = mShowAssist;
            break;
        case '1':
            playAnimation(1);
        case '2':
            playAnimation(2);
        case '3':
            playAnimation(3);
        case '4':
            playAnimation(4);
        default:
            break;
    }
    if (mShowAssist) {
        document.getElementById('canvas-frame').appendChild(mStats.domElement);
    } else {
        document.getElementById('canvas-frame').removeChild(mStats.domElement);
    }
}

function initThree() {
    mRenderer = new THREE.WebGLRenderer({
        antialias : true
    });
    mRenderer.shadowMap.enabled = true; // 麻痹的这一个d搞了我一下午，为什么编译器不会报错，引擎的问题还是js的问题
    mRenderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认的是THREE.PCFShadowMap，没有设置的这个清晰 
    mRenderer.shadowCameraNear = 0.5;
    mRenderer.shadowCameraFar = 100000;
    mRenderer.shadowMapWidth = 4096;
    mRenderer.shadowMapHeight = 4096;
    mRenderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-frame').appendChild(mRenderer.domElement);
    mRenderer.setClearColor(0xffffff, 1.0);

    mStats = new Stats();
    mStats.domElement.style.position = 'absolute';
    mStats.domElement.style.left = '5px';
    mStats.domElement.style.top = '5px';

    // onSurfaceChanged
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    mCamera.aspect = window.innerWidth / window.innerHeight;
    mCamera.updateProjectionMatrix();
    mRenderer.setSize(window.innerWidth, window.innerHeight);
}

function initCamera() {
    mCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);
    mCamera.position.x = 300;
    mCamera.position.y = 300;
    mCamera.position.z = 300;
    mCamera.up.x = 0;
    mCamera.up.y = 1;
    mCamera.up.z = 0;
    mCamera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
}

function initScene() {
    mScene = new THREE.Scene();

    mAxis = new THREE.AxesHelper(500);
    mAxis.material.visible = mShowAssist;
    mScene.add(mAxis);

    // 创建控件并绑定在相机上
    mOrbitControl = new THREE.OrbitControls(mCamera, mRenderer.domElement);
    mOrbitControl.target = new THREE.Vector3(0, 100, 0);
    mOrbitControl.autoRotate = false;
    mOrbitControl.minDistance = 1;
    mOrbitControl.maxDistance = 1000;
}

function initLight() {
    mAmbientLight = new THREE.AmbientLight(0x777777);
    mScene.add(mAmbientLight);

    mDirectionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    mDirectionalLight.position.set(500, 500, 500);
    mDirectionalLight.target.position.set(0, 0, 0);
    // mDirectionalLight.shadowCameraVisible = true;
    mDirectionalLight.castShadow = true;
    mDirectionalLight.shadow.camera.near = 0.5;
    mDirectionalLight.shadow.camera.far = 3000;
    mDirectionalLight.shadow.camera.top = 1800;
    mDirectionalLight.shadow.camera.bottom = -1000;
    mDirectionalLight.shadow.camera.left = -1200;
    mDirectionalLight.shadow.camera.right = 1200;
    mScene.add(mDirectionalLight);

    mSpotLight = new THREE.SpotLight(0xffffff);
    mSpotLight.position.set(0, 200, 0);
    mSpotLight.angle = Math.PI / 3; // 设置聚光光源发散角度
    mSpotLight.castShadow = true;
    mSpotLight.receiveShadow = true;
    mSpotLight.shadow.camera.near = 0.5;
    mSpotLight.shadow.camera.far = 1000;
    mSpotLight.shadow.camera.width = 1000;
    mSpotLight.shadow.camera.height = 1000;
    mScene.add(mSpotLight);
}

function initObjects() {
    // mesh
    mMeshLineMaterial = new THREE.LineBasicMaterial({color: 0x000000, opacity: 0.2});
    mMeshLineMaterial.visible = mShowAssist;
    mMeshGrid = new THREE.Geometry();
    mMeshGrid.vertices.push(new THREE.Vector3(-50, 0, 0));
    mMeshGrid.vertices.push(new THREE.Vector3( 50, 0, 0));
    for (var i = 0; i <= 10; i ++) {
        var line = new THREE.Line(mMeshGrid, mMeshLineMaterial);
        line.position.z = (i * 10) - 50;
        mScene.add(line);

        var line = new THREE.Line(mMeshGrid, mMeshLineMaterial);
        line.position.x = (i * 10) - 50;
        line.rotation.y = 90 * Math.PI / 180;
        mScene.add(line);
    }

    // plane
    var planeGeo = new THREE.PlaneGeometry(1000, 1000);
    var planeMaterial = new THREE.MeshStandardMaterial({color: 0xcccccc}); // , side: THREE.DoubleSide
    var planeMesh = new THREE.Mesh(planeGeo, planeMaterial);
    planeMesh.rotateX(-Math.PI / 2);
    planeMesh.receiveShadow = true; // 接收阴影
    mScene.add(planeMesh);

    // Cube
    // var cubeGeo = new THREE.CubeGeometry(50, 50, 50);
    // var cubeMaterial = new THREE.MeshStandardMaterial({color: 0xff0000});
    // var cube = new THREE.Mesh(cubeGeo, cubeMaterial);
    // cube.castShadow = true;
    // cube.receiveShadow = true; // 接收阴影
    // mScene.add(cube);
    // cube.position.set(50, 25, 0);

    // load OBJ
    var onProgress = function(xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% loading');
        }
    };
    var onError = function(error) {
        console.log('load error!' + error.getWebGLErrorMessage());
    };
    // PBR Material
    var pbrMaterial = new THREE.MeshPhysicalMaterial({
        map: THREE.ImageUtils.loadTexture('/model/PBR_Safa/C501_1_1_lambert1_AlbedoTransparency.jpg', null, function(t){}), 
        normalMap: new THREE.ImageUtils.loadTexture('/model/PBR_Safa/C501_1_1_lambert1_Normal.jpg'),
        metalnessMap: new THREE.ImageUtils.loadTexture('/model/PBR_Safa/C501_1_1_lambert1_MetallicSmoothness.jpg')
    });
    // var mtlLoader = new THREE.MTLLoader();
    // mtlLoader.setPath('model/PBR_Safa/');
    // mtlLoader.load('shafa_obj.mtl', function(material) {
    //     material.preload();
    var objLoader = new THREE.OBJLoader();
    // objLoader.setMaterials(material);
    objLoader.setPath('model/PBR_Safa/');
    objLoader.load('shafa_obj.obj', function(object) {
        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material = pbrMaterial;
                child.castShadow = true;
                child.receiveShadow = true; // 接收阴影
            }
        });
        object.position.x -= 300;
        object.position.z -= 100;
        mScene.add(object);
    }, onProgress, onError);
    // });

    // load FBX nurse
    var fbxLoader = new THREE.FBXLoader();
    fbxLoader.setCrossOrigin("Anonymous");
    fbxLoader.load("/model/zombienurse/zombienurse_Rig.fbx", function(object) {
        object.traverse(function(child) {
            if (child.isMesh) {    //  instanceof THREE.Mesh
                child.castShadow = true;
                child.receiveShadow = true; // 接收阴影
            }
        });
        mScene.add(object);
        object.position.x -= 290;
        mFbxAnimMixers = new THREE.AnimationMixer(object);
        console.log(object.animations.length);
        mFbxAnimMixers.clipAction(object.animations[0]).play();

        loadNextAnim(fbxLoader);
    });

    // load dustbin FBX
    var dustbinPBRMaterial = new THREE.MeshPhysicalMaterial({
        map: THREE.ImageUtils.loadTexture('/model/PBR_Dustbin/lajitong_Material _47_BaseColor.jpg', null, function(t){}),
        metalness: 0.1, 
        roughness: 0.2
    });
    var dustbinLoader = new THREE.FBXLoader();
    dustbinLoader.setCrossOrigin("Anonymous");
    dustbinLoader.load("/model/PBR_Dustbin/dustbin.fbx", function(object) {
        object.traverse(function(child) {
            if (child.isMesh) {    //  instanceof THREE.Mesh
                child.material = dustbinPBRMaterial;
                child.castShadow = true;
                child.receiveShadow = true; // 接收阴影
            }
        });
        object.position.x -= 300;
        object.scale.x = 0.1;
        object.scale.y = 0.1;
        object.scale.z = 0.1;
        mScene.add(object);
    });

    // load J-15 material
    var j15PBRMaterial = new THREE.MeshPhysicalMaterial({
        map: THREE.ImageUtils.loadTexture('/model/J-15/mat0_c.jpg', null, function(t){}), 
        emissive:0x111111,
        normalMap: new THREE.ImageUtils.loadTexture('/model/J-15/mat0_n.jpg'),
        metalnessMap: new THREE.ImageUtils.loadTexture('/model/J-15/mat0_g.jpg'), 
        roughnessMap: new THREE.ImageUtils.loadTexture('/model/J-15/mat0_r.jpg'), 
        emissiveMap: new THREE.ImageUtils.loadTexture('/model/J-15/mat0_s.jpg')
    });
    objLoader.setPath('model/J-15/');
    objLoader.load('J-15.obj', function(object) {
        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material = j15PBRMaterial;
                child.castShadow = true;
                child.receiveShadow = true; // 接收阴影
            }
        });
        object.scale.set(50, 50, 50)
        mScene.add(object);
    }, onProgress, onError);
}

function loadNextAnim(loader) {
    const anim = mFbxAnimations.pop();

    loader.load(`/model/zombienurse/${anim}.fbx`, function (object) {
        const action = mFbxAnimMixers.clipAction(object.animations[0]);
        mFbxActions.push(action);

        object.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = false;
            }
        } );
        // mScene.add(object);
        
        if (mFbxAnimations.length > 0) {
            loadNextAnim(loader);
        }
    } );
}

function stopAnimation() {
    mFbxAnimMixers.stopAllAction();    
}

function playAnimation(index) {
    mFbxAnimMixers.stopAllAction();
    const action = mFbxActions[index];
    action.weight = 1;
    action.fadeIn(0.5);
    action.play();
}

function render() {
    var delta = mClock.getDelta();
    mOrbitControl.update(delta);

    mRenderer.clear();
    mRenderer.render(mScene, mCamera);
    updateScene(delta);

    mStats.update();

    requestAnimationFrame(render);
}

function updateScene(deltaTime) {
    if (null != mFbxAnimMixers) {
        mFbxAnimMixers.update(deltaTime);
    }
}

function main() {
    initThree();
    initCamera();
    initScene();
    initLight();
    initObjects();
    render();
}