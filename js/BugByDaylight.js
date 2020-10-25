class BugByDaylight {
    constructor() {
        this.COFFIN_DANCE_INDEX = 10;
        this.mClock = new THREE.Clock();
        this.mModelFiles = [
            // 黎明Bug
            "/model/DBD/fengmin/Feng.pmx", "/model/DBD/meg/meg.pmx", "/model/DBD/huntress/Huntress.pmx", 
            "/model/DBD/amanda/Amanda.pmx", 
            // 卡婊危机
            "/model/RE/jill1/Jill.pmx", "/model/RE/jill3/JillRE3remake.pmx", "/model/RE/jill5/Jill.pmx", 
            "/model/RE/claire/ClaireCasual.pmx", "/model/RE/helena/Helena_TallOaks.pmx", "/model/RE/sherry/Sherry.pmx", 
            "/model/RE/ada/Ada.pmx", "/model/RE/Rebecca/Rebecca_Chambers.pmx", 
            // 最终幻想
            "/model/FF/Tifa/Tifa.pmx", "/model/FF/yuna/pmx/yuna.pmx", 
            // 铁拳
            "/model/Tekken/Miharu_Hirano/Miharu_Hirano.pmx", 
            // 绝地求生
            "/model/PUBG/PUGB_Male/Male.pmx", "/model/PUBG/PUBG_Female_Base/Female.pmx", "/model/PUBG/CF_Suzy_Miss_A/Suzy_Brown.pmx", 
            "/model/PUBG/CSO2_707/707.pmx", "/model/PUBG/FEAROnline_Benedict/Benedict.pmx", 
            // 漫威
            "/model/Marvel/Ironman/Ironman.pmx", "/model/Marvel/Black_Widow_FF/FF.pmx", "/model/Marvel/Black_Widow_Team_Suit/Team-Suit.pmx",
            "/model/Marvel/Supergirl/Hitomi_Supergirl.pmx", "/model/Marvel/Doctor_Strange/Doctor_Strange.pmx", "/model/Marvel/Antman/Antman.pmx",
            "/model/Marvel/Superman/Superman.pmx",
            // 古墓丽影
            "/model/TR/Lara_Croft/Lara_Croft.pmx",
            // Sim4
            "/model/Sim/Petra/Petra.pmx",
            // 动画
            "/model/Cartoon/Alice/Alice.pmx", "/model/Cartoon/Athena/Athena.pmx", "/model/Cartoon/Reisalin_Stout/Reisalin_Stout_Black.pmx", 
            "/model/Cartoon/Helen_Parr/Mrs_Incredible.pmx", "/model/Cartoon/Sly_Cooper/Sly_Cooper.pmx", "/model/Cartoon/Lisbeth/Lisbeth.pmx", 
            // DOA 6
            "/model/DOA/Leifang/Leifang.pmx", "/model/DOA/Luna_Pomelo/Luna_Pomelo.pmx", "/model/DOA/Honoka/honoka_c13.pmx", 
            "/model/DOA/Honoka_Stu/honoka_c1.pmx", 
            "/model/DOA/Marie/Marie_Rose_otaku.pmx", "/model/DOA/Marie_Rose_C/Marie_Rose_C.pmx", "/model/DOA/Marie_Rose/Marie_Rose.pmx",
            "/model/DOA/Kasumi_Furisode/Kasumi_Furisode.pmx", "/model/DOA/Mai_Shiranui/Mai_Shiranui.pmx", "/model/DOA/Momiji_Santa/Momiji_Santa.pmx",
        ];
        this.mModelForCoffinDanceFiles = [
            "/model/DBD/Ghostface/ghostface.pmx", "/model/DBD/Leatherface/Leatherface.pmx", "/model/DBD/MichealMyers/MichealMyers.pmx", 
            "/model/DBD/Freddy/Freddy.pmx", 
        ];
        this.mMotionForCoffinDanceFiles = [
            ["/motion/CoffinDance/MAN1.vmd"], ["/motion/CoffinDance/MAN2.vmd"], ["/motion/CoffinDance/MAN3.vmd"], 
            ["/motion/CoffinDance/MAN4.vmd"], 
        ]
        this.mMotionFiles = [
            ["/motion/LuoHuaQinMotion.vmd"], ["/motion/QianSiXiMotion.vmd"], 
            ["/motion/HongZhaoYuanMotion.vmd"], ["/motion/ZuiLinMotion.vmd"], 
            ["/motion/LianRenXinMotion.vmd"], 
            ["/motion/LearnCatMotion.vmd"], ["/motion/HaiCaoMotion.vmd"], 
            ["/motion/LittleAppleMotion.vmd"], 
            ["/motion/BarBarBarMotion3.vmd"], ["/motion/WhatYouWaitingForMotion.vmd"], 
            ["/motion/CoffinDance/CORONA-CHAN.vmd"]
        ];
        this.mCameraFiles = [
            ["/motion/LuoHuaQinCamera.vmd"], ["/motion/QianSiXiCamera.vmd"], 
            ["/motion/HongZhaoYuanCamera.vmd"], , ["/motion/ZuiLinCamera.vmd"], 
            ["/motion/LianRenXinCamera.vmd"],
            ["/motion/LearnCatCamera.vmd"], ["/motion/JiLeCamera.vmd"], 
            ["/motion/LittleAppleCamera.vmd"], 
            ["/motion/BarBarBarCamera.vmd"], ["/motion/WhatYouWaitingForCamera.vmd"], 
            ["/motion/CoffinDance/CAMERA.vmd"]
        ];
        this.mMusicFiles = [
            "/music/LuoHuaQin.mp3", "/music/QianSiXi.mp3", "/music/HongZhaoYuan.mp3", 
            "/music/ZuiLin.mp3", "/music/LianRenXin.mp3", 
            "/music/LearnCatCut.mp3", "/music/HaiCaoCut.mp3", "/music/LittleApple.mp3", 
            "/music/BarBarBar.mp3", "/music/WaitingFor.mp3", "/music/CoffinDance.wav"
        ];
        this.mDebug = false;
        this.mAutoCamera = true;
        this.mAbortLoader = false;
        this.mLastModelIndex = 0;
        this.mLastMotionIndex = 0;

		this.init();
    }

    init() {
        this.initThree();
        this.initCamera();
        this.initScene();
        this.initLight();
        this.initModel();
    }

    initThree() {
        const self = this;
        this.mRenderer = new THREE.WebGLRenderer({
            antialias : true, alpha: true
        });
        this.mRenderer.shadowMap.enabled = true; // 麻痹的这一个d搞了我一下午，为什么编译器不会报错，引擎的问题还是js的问题
        this.mRenderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认的是THREE.PCFShadowMap，没有设置的这个清晰 
        this.mRenderer.shadowCameraNear = 0.5;
        this.mRenderer.shadowCameraFar = 1000;
        this.mRenderer.shadowMapWidth = 4096;
        this.mRenderer.shadowMapHeight = 4096;
        this.mRenderer.setSize(window.innerWidth, window.innerHeight);
        // add layout
        // this.mContainer = document.createElement('div');
        // document.body.appendChild(this.mContainer);
        this.mContainer = document.getElementById('canvas-frame')
        this.mContainer.appendChild(this.mRenderer.domElement);
        this.mRenderer.setClearColor(0xffffff, 1.0);
        // this.mRenderer.gammaInput = true;
        // this.mRenderer.gammaOutput = true;
    
        this.mStats = new Stats();
        this.mStats.domElement.style.position = 'absolute';
        this.mStats.domElement.style.left = '10px';
        this.mStats.domElement.style.top = '50px';

        this.mContinuous = false;
    
        // onSurfaceChanged
        window.addEventListener('resize', function(){self.onWindowResize();}, false);
    }

    initCamera() {
        this.mCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000);
        this.mCamera.position.set(30, 30, 30);
    }

    initScene() {
        this.mScene = new THREE.Scene();
        this.mScene.background = new THREE.Color(0xa0a0a0);
        // this.mScene.fog = new THREE.Fog(0xa0a0a0, 100, 1000);

        this.mAxis = new THREE.AxesHelper(500);
        this.mAxis.material.visible = false;
        this.mScene.add(this.mAxis);

        // 创建控件并绑定在相机上
        this.mOrbitControl = new THREE.OrbitControls(this.mCamera, this.mRenderer.domElement);
        this.mOrbitControl.target = new THREE.Vector3(0, 10, 0);
        this.mOrbitControl.autoRotate = false;
        this.mOrbitControl.minDistance = 1;
        this.mOrbitControl.maxDistance = 150;
        this.mOrbitControl.update();
        this.mOrbitControl.maxPolarAngle = Math.PI / 2;

        this.mLoadingManager = new THREE.LoadingManager();
        this.mLoadingManager.onLoad = function () {
            // call back function when the texture gets loaded
        }
        this.mTextureLoader = new THREE.TextureLoader(this.mLoadingManager);

        // skybox
        var skyBoxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
        // const cubeTextureLoader = new THREE.CubeTextureLoader();
        // const skyBoxTexture = cubeTextureLoader.load([
        //     '/texture/SkyBox/posx.jpg', 
        //     '/texture/SkyBox/negx.jpg', 
        //     '/texture/SkyBox/posy.jpg', 
        //     '/texture/SkyBox/negy.jpg', 
        //     '/texture/SkyBox/posz.jpg', 
        //     '/texture/SkyBox/negz.jpg', 
        // ]);
        var materialArray = [];
        const path = "/texture/SkyBox/";
        var directions  = ["posx", "negx", "posy", "negy", "posz", "negz"]; 
        var format = ".jpg";
        for (var i = 0; i < 6; i++)
            materialArray.push(new THREE.MeshBasicMaterial({
                map: this.mTextureLoader.load(path + directions[i] + format),
                side: THREE.BackSide  // 设置镜像翻转
            }));
        const skyBoxMaterial = new THREE.MeshFaceMaterial(materialArray);
        this.mSkyBox = new THREE.Mesh(skyBoxGeo, skyBoxMaterial);
        this.mSkyBox.rotateY(-Math.PI / 2);
        // this.mSkyBox.position.set(0, 500, 0);
        this.mScene.add(this.mSkyBox);
        // this.mScene.background = skyBoxTexture;
    }

    initLight() {
        this.mAmbientLight = new THREE.AmbientLight(0xaaaaaa, 1);
        this.mScene.add(this.mAmbientLight);

        this.mDirectionalLight = new THREE.DirectionalLight(0x777777, 1.0);
        this.mDirectionalLight.position.set(400, 400, 400);
        this.mDirectionalLight.target.position.set(0, 0, 0);
        // this.mDirectionalLight.shadowCameraVisible = true;
        this.mDirectionalLight.castShadow = true;
        this.mDirectionalLight.shadow.camera.near = 0.5;
        this.mDirectionalLight.shadow.camera.far = 5000;
        this.mDirectionalLight.shadow.camera.top = 1800;
        this.mDirectionalLight.shadow.camera.bottom = -1000;
        this.mDirectionalLight.shadow.camera.left = -1200;
        this.mDirectionalLight.shadow.camera.right = 1200;
        this.mScene.add(this.mDirectionalLight);

        this.mSpotLight = new THREE.SpotLight(0xcccccc, 0.8);
        this.mSpotLight.position.set(0, 75, -45);
        this.mSpotLight.angle = Math.PI / 6; // 设置聚光光源发散角度
        this.mSpotLight.castShadow = true;
        this.mSpotLight.receiveShadow = true;
        this.mSpotLight.shadow.camera.near = 0.5;
        this.mSpotLight.shadow.camera.far = 200;
        this.mSpotLight.shadow.camera.width = 1000;
        this.mSpotLight.shadow.camera.height = 1000;
        this.mScene.add(this.mSpotLight);

        // lens flare
        var lensFlareTex0 = this.mTextureLoader.load("/texture/LensFlare/lensflare0.png");
        var lensFlareTex2 = this.mTextureLoader.load("/texture/LensFlare/lensflare2.png");
        var lensFlareTex3 = this.mTextureLoader.load("/texture/LensFlare/lensflare3.png");
        const flareColor = new THREE.Color(0xffffff);
        flareColor.setHSL(0.55, 0.9, 1.0);
        // need new version of Lensflare and three.js
        // var lensFlare = new Lensflare();
        // lensFlare.addElement(new LensflareElement(lensFlareTex1, 512, 0));
        // lensFlare.addElement(new LensflareElement(lensFlareTex2, 512, 0));
        // lensFlare.addElement(new LensflareElement(lensFlareTex3, 60, 0.6));
        // this.mDirectionalLight.add(lensFlare);

        var lensFlare = new THREE.Lensflare();
        lensFlare.addElement(new THREE.LensflareElement(lensFlareTex0, 500, 0.0, flareColor));
        lensFlare.addElement(new THREE.LensflareElement(lensFlareTex2, 512, 0.0));
        lensFlare.addElement(new THREE.LensflareElement(lensFlareTex2, 512, 0.0));
        lensFlare.addElement(new THREE.LensflareElement(lensFlareTex2, 512, 0.0));
        lensFlare.addElement(new THREE.LensflareElement(lensFlareTex3, 60, 0.6));
        lensFlare.addElement(new THREE.LensflareElement(lensFlareTex3, 70, 0.7));
        lensFlare.addElement(new THREE.LensflareElement(lensFlareTex3, 120, 0.9));
        lensFlare.addElement(new THREE.LensflareElement(lensFlareTex3, 70, 1.0));
        lensFlare.position.copy(this.mSpotLight.position);
        // this.mDirectionalLight.add(lensFlare);

        this.mScene.add(lensFlare);
    }

    initModel() {
        const self = this;
        // mesh
        this.mMeshLineMaterial = new THREE.LineBasicMaterial({color: 0x000000, opacity: 0.2});
        this.mMeshLineMaterial.visible = false;
        this.mMeshGrid = new THREE.Geometry();
        this.mMeshGrid.vertices.push(new THREE.Vector3(-50, 0, 0));
        this.mMeshGrid.vertices.push(new THREE.Vector3( 50, 0, 0));
        for (var i = 0; i <= 10; i ++) {
            var line = new THREE.Line(this.mMeshGrid, this.mMeshLineMaterial);
            line.position.z = (i * 10) - 50;
            this.mScene.add(line);

            var line = new THREE.Line(this.mMeshGrid, this.mMeshLineMaterial);
            line.position.x = (i * 10) - 50;
            line.rotation.y = 90 * Math.PI / 180;
            this.mScene.add(line);
        }

        // // plane
        // var planeGeo = new THREE.PlaneGeometry(5000, 5000);
        // var planeTexture = this.mTextureLoader.load('/texture/Terrain/grasslight-big.jpg');
        // planeTexture.wrapS = THREE.RepeatWrapping;
        // planeTexture.wrapT = THREE.RepeatWrapping;
        // planeTexture.repeat.set(100, 100);
        // var planeNormalTexture = this.mTextureLoader.load('/texture/Terrain/grasslight-big-nm.jpg');
        // planeNormalTexture.wrapS = THREE.RepeatWrapping;
        // planeNormalTexture.wrapT = THREE.RepeatWrapping;
        // planeNormalTexture.repeat.set(100, 100);
        // var planeMaterial = new THREE.MeshStandardMaterial({
        //     map: planeTexture, 
        //     normalMap: planeNormalTexture,
        //     side: THREE.DoubleSide
        // }); 
        // var planeMesh = new THREE.Mesh(planeGeo, planeMaterial);
        // planeMesh.rotateX(-Math.PI / 2);
        // planeMesh.receiveShadow = true; // 接收阴影
        // this.mScene.add(planeMesh);

        // // load xilou FBX
        // var xilouMaterials = [
        //     new THREE.MeshPhysicalMaterial({
        //         map: this.mTextureLoader.load('/model/FBX/PBR_XiLou/XiLou_m1_C.jpg'), 
        //         normalMap: this.mTextureLoader.load('/model/FBX/PBR_XiLou/XiLou_m1_N.jpg'),
        //         metalnessMap: this.mTextureLoader.load('/model/FBX/PBR_XiLou/XiLou_m1_Ao.jpg'),
        //         specularMap: this.mTextureLoader.load('/model/FBX/PBR_XiLou/XiLou_m1_S.tga')
        //     }), 
        //     new THREE.MeshPhysicalMaterial({
        //         map: this.mTextureLoader.load('/model/FBX/PBR_XiLou/XiLou_m3_C.jpg'), 
        //         normalMap: this.mTextureLoader.load('/model/FBX/PBR_XiLou/XiLou_m3_N.jpg'),
        //         metalnessMap: this.mTextureLoader.load('/model/FBX/PBR_XiLou/XiLou_m3_Ao.jpg'),
        //         specularMap: this.mTextureLoader.load('/model/FBX/PBR_XiLou/XiLou_m3_S.tga')
        //     }),
        //     null,
        //     new THREE.MeshPhysicalMaterial({
        //         map: this.mTextureLoader.load('/model/FBX/PBR_XiLou/XiLou_m2_C.jpg'), 
        //         normalMap: this.mTextureLoader.load('/model/FBX/PBR_XiLou/XiLou_m2_N.jpg'),
        //         metalnessMap: this.mTextureLoader.load('/model/FBX/PBR_XiLou/XiLou_m2_Ao.jpg'),
        //         specularMap: this.mTextureLoader.load('/model/FBX/PBR_XiLou/XiLou_m2_S.tga')
        //     })
        // ];

        var xilouLoader = new THREE.FBXLoader();
        xilouLoader.setCrossOrigin("Anonymous");
        xilouLoader.load("/model/FBX/PBR_XiLou/XiLou.fbx", function(object) {
            object.traverse(function(child) {
                if (child.isMesh) {    //  instanceof THREE.Mesh
                    child.material = xilouMaterials;
                    child.castShadow = true;
                    child.receiveShadow = true; // 接收阴影
                }
            });
            object.position.z -= 70;
            object.scale.set(0.1, 0.1, 0.1)
            object.rotateY(-Math.PI / 2);

            self.mScene.add(object);

            self.render();
        })

        // load mmd scene
        this.mMmdSceneLoader = new THREE.MMDLoader();
        this.loadMMDScene("/model/Scene/ancient_garden/stage.pmx", 1);

        // load mmd model
        this.mMmdLoader = new THREE.MMDLoader();
        // this.mMmdLoader.setCrossOrigin("Anonymous");
        this.loadMMD(this.mModelFiles[0], 1, this.mMotionFiles[0], this.mCameraFiles[0], this.mMusicFiles[0]);
    }

    loadMMDScene(path, scale) {
        const self = this;
        this.mMmdSceneLoader.load(path, null, function(object) {
            object.castShadow = true;
            object.receiveShadow = true;

            self.mScene.add(object);
            object.scale.set(scale, scale, scale);

            self.render();
        }, self.onProgress.bind(self), self.onError);
    }

    loadMMD(modelPath, scale, motionPath, cameraPath, musicPath) {
        const self = this;
        self.mAbortLoader = false;
        self.mMMDAnimHelper = new THREE.MMDHelper();
        self.mMmdLoaderRequest = this.mMmdLoader.load(modelPath, motionPath, function(object) {
            object.castShadow = true;
            object.receiveShadow = true;

            self.mMMDAnimHelper.add(object);
            self.mMMDAnimHelper.setAnimation(object);
            self.mLastModel = object
            self.mMMDModelReady = true

            // 骨骼辅助显示
            self.mIkHelper = new THREE.CCDIKHelper(object);
            self.mIkHelper.visible = false;
            self.mScene.add(self.mIkHelper);

            // 物理刚体辅助显示
            self.mMMDAnimHelper.setPhysics(object);
            self.mPhysicsHelper = new THREE.MMDPhysicsHelper(object);
            self.mPhysicsHelper.visible = false;
            self.mScene.add(self.mPhysicsHelper);
            self.render();

            self.mMmdLoader.loadVmds(cameraPath, function (vmd) {
                self.mMMDAnimHelper.setCamera(self.mCamera);
                self.mMmdLoader.pourVmdIntoCamera(self.mCamera, vmd);
                self.mMMDAnimHelper.setCameraAnimation(self.mCamera);
                self.mMMDAnimHelper.doCameraAnimation = self.mAutoCamera;
                self.mMmdLoader.loadAudio(musicPath, function (audio, listener) {
                    var audioParams ={delayTime: 0};
                    self.mMMDAnimHelper.setAudio(audio, listener, audioParams);
                    // 该函数作用:查找摄像机 音频 动作数据 模块 中最长的时间 当到达最最长时间 
                    // 所有都停止 如果未设置 则模块到达自己结束时间停止 不会同步
                    self.mMMDAnimHelper.unifyAnimationDuration();
                    
                    self.mMMDReady = true;
                    self.mContinuous = true;
                    self.render();
                }, self.onProgress.bind(self), self.onError);
            }, self.onProgress.bind(self), self.onError);

            self.mScene.add(object);
            object.scale.set(scale, scale, scale);
        }, self.onProgress.bind(self), self.onError);
        // self.mMmdLoaderRequest.onabort = function () {
        //     alert("testOnAbort");
        //     self.mAbortLoader = false;
        //     self.loadMMD(self.mModelFiles[self.mLastModelIndex], 1, this.mMotionFiles[self.mLastMotionIndex], 
        //         this.mCameraFiles[self.mLastMotionIndex], this.mMusicFiles[self.mLastMotionIndex]);
        // }
    }

    motionSelect(motion) {
        const self = this;
        self.mAbortLoader = true;
        if (undefined != self.mPhysicsHelper)
            self.mScene.remove(self.mPhysicsHelper);
        if (undefined != self.mLastModel)
            self.mScene.remove(self.mLastModel);
        if (null != self.mMMDAnimHelper && null != self.mMMDAnimHelper.audioManager 
            && null != self.mMMDAnimHelper.audioManager.audio)
            self.mMMDAnimHelper.audioManager.audio.stop();
        self.mMMDAnimHelper = null;

        self.mLastMotionIndex = motion;
        self.mMMDReady = false;
        self.mContinuous = false;
        // if (motion == self.COFFIN_DANCE_INDEX) {
        //     for (var i = 0; i < self.mModelForCoffinDanceFiles.length; i++) {
        //         self.loadMMD(self.mModelForCoffinDanceFiles[i], 1, self.mMotionForCoffinDanceFiles[i], null, null);
        //     }
        // }
        self.loadMMD(self.mModelFiles[self.mLastModelIndex], 1, self.mMotionFiles[motion], 
            self.mCameraFiles[motion], self.mMusicFiles[motion]);
    }

    characterSelect(character) {
        const self = this;
        self.mAbortLoader = true;
        if (undefined != self.mPhysicsHelper)
            self.mScene.remove(self.mPhysicsHelper);
        if (undefined != self.mLastModel)
            self.mScene.remove(self.mLastModel);
        if (null != self.mMMDAnimHelper && null != self.mMMDAnimHelper.audioManager 
            && null != self.mMMDAnimHelper.audioManager.audio)
            self.mMMDAnimHelper.audioManager.audio.stop();
        self.mMMDAnimHelper = null;

        self.mLastModelIndex = character;
        self.mMMDReady = false;
        self.mContinuous = false;
        self.loadMMD(self.mModelFiles[character], 1, this.mMotionFiles[self.mLastMotionIndex], 
            this.mCameraFiles[self.mLastMotionIndex], this.mMusicFiles[self.mLastMotionIndex]);
    }

    render() {
        var delta = this.mClock.getDelta();

        this.mRenderer.clear();
        this.mRenderer.render(this.mScene, this.mCamera);

        if (null != this.mMMDAnimHelper && this.mMMDReady) {
            this.mMMDAnimHelper.animate(delta);
        }
        if (this.mPhysicsHelper != undefined && this.mPhysicsHelper.visible) 
            this.mPhysicsHelper.update();

        if (null != this.mStats)
            this.mStats.update();

        const self = this;
        if (this.mContinuous) {
            requestAnimationFrame(function(){ 
                self.render(); 
            });
        }
    }

    onError(xhr) {
        var url = decodeURI(xhr.target.responseURL);
        if (undefined != url && -1 != url.indexOf("/")) {
            fileName = url.substr(url.lastIndexOf("/") + 1) 
            console.log("加载失败" + "\n" + "失败地址：" + fileName);
        }
    }

    onProgress(xhr) {
        // if (null == xhr.currentTarget.onabort) {
        //     xhr.currentTarget.onabort = function() {
        //         alert("testXhrOnAbort");
        //     }
        // }
        if (this.mAbortLoader) {
            xhr.currentTarget.abort();
        }
        var url = decodeURI(xhr.target.responseURL);
        var fileName = url.substr(url.lastIndexOf("/") + 1);
        var fileType = url.substr(url.lastIndexOf(".") + 1);
        switch(fileType) {
            case "pmx":
                fileType = "模型文件";
                break;
            case "vmd":
                fileType = "动作文件";
                break;
            case "tga":
                fileType = "贴图文件";
                break;
            case "png":
                fileType = "贴图文件";
                break;
            case "jpg":
                fileType = "贴图文件";
                break;
            case "mp3":
                fileType = "音频文件";
                break;
            case "wav":
                fileType = "音频文件";
                break;
            default:
                fileType = "其他文件";
        }

        if (xhr.lengthComputable) {
            if (xhr.loaded == xhr.total) {
                // $("#progressBar").attr("class","progress-bar progress-bar-success");
                console.log(fileType+": " + fileName + "加载完成");
                // $("#progressTitle").html("");
                if (fileType == "音频文件") {
                    // $("#progressTitle").html("当前音乐：" + fileName);
                    console.log("所有文件已加载" + "</br>" + "处理文件中...");
                    document.getElementById('text-progress').innerHTML = "加载完成";
                }
            } else {
                // var percentComplete = Math.round((xhr.loaded / xhr.total * 100), 2);
                // var progressBarStyleValue = percentComplete + "%";
                // $("#progressTitle").html(fileType + ": " + fileName + "已加载 " + progressBarStyleValue 
                //     + '<span class="glyphicon glyphicon-arrow-down" style="color: rgb(0, 255, 255); font-size: 15px;"></span>');
                // $("#progressBar").attr("style", "width:" + progressBarStyleValue + ";");
                // $("#progressBar").attr("class", "progress-bar progress-bar-info") 
                var percentComplete = Math.round((xhr.loaded / xhr.total * 100), 2);
                document.getElementById('text-progress').innerHTML = fileType + ": " + percentComplete + '%';
                bar.style.width = percentComplete + '%'
            }
        } else {
            console.log(fileType+":" + fileName + "加载未进行，请检查网络");
        }
    }

    onWindowResize() {
        this.mCamera.aspect = window.innerWidth / window.innerHeight;
        this.mCamera.updateProjectionMatrix();
        this.mRenderer.setSize(window.innerWidth, window.innerHeight);
    }

    onKeyPress(event) {
        var key;
        if (navigator.appName == "Netscape") {
            key = String.fromCharCode(event.charCode);
        } else {
            key = String.fromCharCode(event.keyCode);
        }
        switch (key) {
            case 'G':
            case 'g':
                this.mShowAssist = !this.mShowAssist;
                this.mMeshLineMaterial.visible = this.mShowAssist;
                this.mAxis.material.visible = this.mShowAssist;
                document.getElementById("debug_switch").checked = this.mShowAssist;
                this.onDebugStatusChanged();
                break;
            case 'C':
            case 'c':
                this.mAutoCamera = !this.mAutoCamera;
                document.getElementById("auto_camera_switch").checked = this.mAutoCamera;
                this.onAutoCameraStatusChanged();
                break;
            default:
                break;
        }
    }

    updateAutoCameraStatus(checked) {
        this.mAutoCamera = checked;
        this.onAutoCameraStatusChanged();
    }

    onAutoCameraStatusChanged() {
        this.mMMDAnimHelper.doCameraAnimation = this.mAutoCamera;
    }

    updateDebugStatus(checked) {
        this.mShowAssist = checked;
        this.mMeshLineMaterial.visible = checked;
        this.mAxis.material.visible = checked;
        this.onDebugStatusChanged();
    }

    onDebugStatusChanged() {
        if (this.mShowAssist) {
            this.mContainer.appendChild(this.mStats.domElement);
        } else {
            this.mContainer.removeChild(this.mStats.domElement);
        }
        this.mPhysicsHelper.visible = this.mShowAssist;
        this.mIkHelper.visible = this.mShowAssist;
    }
}

export {BugByDaylight};