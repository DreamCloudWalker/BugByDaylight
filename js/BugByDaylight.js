class BugByDaylight {
    constructor() {
        this.mClock = new THREE.Clock();
        this.mNurseAnims = ["death", "attack", "run", "idle"]; 
        this.mKoreaAnims = ["walk", "tidy"];
        this.mDebug = false;

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
        this.mRenderer.shadowCameraFar = 10000;
        this.mRenderer.shadowMapWidth = 4096;
        this.mRenderer.shadowMapHeight = 4096;
        this.mRenderer.setSize(window.innerWidth, window.innerHeight);
        // add layout
        this.mContainer = document.createElement('div');
        document.body.appendChild(this.mContainer);
        this.mContainer.appendChild(this.mRenderer.domElement);
        this.mRenderer.setClearColor(0xffffff, 1.0);
        // this.mRenderer.gammaInput = true;
        // this.mRenderer.gammaOutput = true;
    
        if (this.mDebug) {
            this.mStats = new Stats();
            this.mStats.domElement.style.position = 'absolute';
            this.mStats.domElement.style.left = '5px';
            this.mStats.domElement.style.top = '5px';
            this.mContainer.appendChild(this.mStats.dom);
        }

        this.mContinuous = false;
    
        // onSurfaceChanged
        window.addEventListener('resize', function(){self.onWindowResize();}, false);
    }

    initCamera() {
        this.mCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 50000);
        this.mCamera.position.set(300, 300, 300);
    }

    initScene() {
        this.mScene = new THREE.Scene();
        this.mScene.background = new THREE.Color(0xa0a0a0);
        this.mScene.fog = new THREE.Fog(0xa0a0a0, 1000, 10000);

        this.mAxis = new THREE.AxesHelper(500);
        this.mAxis.material.visible = false;
        this.mScene.add(this.mAxis);

        // 创建控件并绑定在相机上
        this.mOrbitControl = new THREE.OrbitControls(this.mCamera, this.mRenderer.domElement);
        this.mOrbitControl.target = new THREE.Vector3(0, 100, 0);
        this.mOrbitControl.autoRotate = false;
        this.mOrbitControl.minDistance = 1;
        this.mOrbitControl.maxDistance = 3000;
        this.mOrbitControl.update();
        this.mOrbitControl.maxPolarAngle = Math.PI / 2;

        this.mTextureLoader = new THREE.TextureLoader();

        // skybox
        var skyBoxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
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
                map: this.mTextureLoader.load(path + directions[i] + format, null, null),
                side: THREE.BackSide  // 设置镜像翻转
            }));
        const skyBoxMaterial = new THREE.MeshFaceMaterial(materialArray);
        this.mSkyBox = new THREE.Mesh(skyBoxGeo, skyBoxMaterial);
        this.mSkyBox.rotateY(-Math.PI / 2);
        // this.mSkyBox.position.set(0, 5000, 0);
        this.mScene.add(this.mSkyBox);
        // this.mScene.background = skyBoxTexture;
    }

    initLight() {
        this.mAmbientLight = new THREE.AmbientLight(0xaaaaaa, 1);
        this.mScene.add(this.mAmbientLight);

        this.mDirectionalLight = new THREE.DirectionalLight(0x777777, 1.0);
        this.mDirectionalLight.position.set(4000, 4000, 4000);
        this.mDirectionalLight.target.position.set(0, 0, 0);
        // this.mDirectionalLight.shadowCameraVisible = true;
        this.mDirectionalLight.castShadow = true;
        this.mDirectionalLight.shadow.camera.near = 0.5;
        this.mDirectionalLight.shadow.camera.far = 50000;
        this.mDirectionalLight.shadow.camera.top = 1800;
        this.mDirectionalLight.shadow.camera.bottom = -1000;
        this.mDirectionalLight.shadow.camera.left = -1200;
        this.mDirectionalLight.shadow.camera.right = 1200;
        this.mScene.add(this.mDirectionalLight);

        this.mSpotLight = new THREE.SpotLight(0xcccccc, 0.8);
        this.mSpotLight.position.set(0, 750, -350);
        this.mSpotLight.angle = Math.PI / 6; // 设置聚光光源发散角度
        this.mSpotLight.castShadow = true;
        this.mSpotLight.receiveShadow = true;
        this.mSpotLight.shadow.camera.near = 0.5;
        this.mSpotLight.shadow.camera.far = 2000;
        this.mSpotLight.shadow.camera.width = 1000;
        this.mSpotLight.shadow.camera.height = 1000;
        this.mScene.add(this.mSpotLight);

        // lens flare
        var textureLoader = new THREE.TextureLoader();
        var lensFlareTex0 = textureLoader.load("/texture/LensFlare/lensflare0.png");
        var lensFlareTex2 = textureLoader.load("/texture/LensFlare/lensflare2.png");
        var lensFlareTex3 = textureLoader.load("/texture/LensFlare/lensflare3.png");
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

        // plane
        var planeGeo = new THREE.PlaneGeometry(50000, 50000);
        var planeTexture = this.mTextureLoader.load('/texture/Terrain/grasslight-big.jpg');
        planeTexture.wrapS = THREE.RepeatWrapping;
        planeTexture.wrapT = THREE.RepeatWrapping;
        planeTexture.repeat.set(100, 100);
        var planeNormalTexture = this.mTextureLoader.load('/texture/Terrain/grasslight-big-nm.jpg');
        planeNormalTexture.wrapS = THREE.RepeatWrapping;
        planeNormalTexture.wrapT = THREE.RepeatWrapping;
        planeNormalTexture.repeat.set(100, 100);
        var planeMaterial = new THREE.MeshStandardMaterial({
            map: planeTexture, 
            normalMap: planeNormalTexture,
            side: THREE.DoubleSide
        }); 
        var planeMesh = new THREE.Mesh(planeGeo, planeMaterial);
        planeMesh.rotateX(-Math.PI / 2);
        planeMesh.receiveShadow = true; // 接收阴影
        this.mScene.add(planeMesh);

        // // load OBJ
        // var onProgress = function(xhr) {
        //     if (xhr.lengthComputable) {
        //         var percentComplete = xhr.loaded / xhr.total * 100;
        //         console.log(Math.round(percentComplete, 2) + '% loading');
        //     }
        // };
        // var onError = function(error) {
        //     console.log('load error!' + error.getWebGLErrorMessage());
        // };
        // // PBR Material
        // var pbrMaterial = new THREE.MeshPhysicalMaterial({
        //     map: THREE.ImageUtils.loadTexture('/model/PBR_Safa/C501_1_1_lambert1_AlbedoTransparency.jpg', null, function(t){}), 
        //     normalMap: this.mTextureLoader.load('/model/PBR_Safa/C501_1_1_lambert1_Normal.jpg'),
        //     metalnessMap: this.mTextureLoader.load('/model/PBR_Safa/C501_1_1_lambert1_MetallicSmoothness.jpg')
        // });
        // // var mtlLoader = new THREE.MTLLoader();
        // // mtlLoader.setPath('model/PBR_Safa/');
        // // mtlLoader.load('shafa_obj.mtl', function(material) {
        // //     material.preload();
        // var objLoader = new THREE.OBJLoader();
        // // objLoader.setMaterials(material);
        // objLoader.setPath('model/PBR_Safa/');
        // objLoader.load('shafa_obj.obj', function(object) {
        //     object.traverse(function(child) {
        //         if (child instanceof THREE.Mesh) {
        //             child.material = pbrMaterial;
        //             child.castShadow = true;
        //             child.receiveShadow = true; // 接收阴影
        //         }
        //     });
        //     object.position.x += 320;
        //     self.mScene.add(object);
        // }, onProgress, onError);
        // // });

        // // load FBX nurse
        // var fbxLoader = new THREE.FBXLoader();
        // fbxLoader.setCrossOrigin("Anonymous");
        // fbxLoader.load("/model/zombienurse/zombienurse_Rig.FBX", function(object) {
        //     self.mNurseAnimMixers = new THREE.AnimationMixer(object);
        //     self.mNurseActions = [];

        //     object.traverse(function(child) {
        //         if (child.isMesh) {    //  instanceof THREE.Mesh
        //             child.castShadow = true;
        //             child.receiveShadow = true; // 接收阴影
        //         }
        //     });
        //     self.mScene.add(object);
        //     object.position.x -= 200;
        //     console.log(object.animations.length);
        //     self.mNurseAnimMixers.clipAction(object.animations[0]).play();

        //     self.loadNextAnim(fbxLoader, '/model/zombienurse/', self.mNurseAnims, self.mNurseAnimMixers, self.mNurseActions);
        // });

        // // load FBX hyena 这个模型自带环境光会叠加上导致环境光太亮
        // var hyenaLoader = new THREE.FBXLoader();
        // hyenaLoader.setCrossOrigin("Anonymous");
        // hyenaLoader.load("/model/hyena/hyena.FBX", function(object) {
        //     self.mHyenaAnimMixers = new THREE.AnimationMixer(object);

        //     object.traverse(function(child) {
        //         if (child.isMesh) {    //  instanceof THREE.Mesh
        //             child.castShadow = true;
        //             child.receiveShadow = true; // 接收阴影
        //         }
        //     });
        //     self.mScene.add(object);
        //     object.position.x += 400;
        //     object.rotateX(-Math.PI / 2);
        //     console.log(object.animations.length);
        //     self.mHyenaAnimMixers.clipAction(object.animations[0]).play();
        // });

        // // load FBX woman sophia
        // var sophiaLoader = new THREE.FBXLoader();
        // sophiaLoader.setCrossOrigin("Anonymous");
        // sophiaLoader.load("/model/sophia/rp_sophia_animated_003_idling.fbx", function(object) {
        //     self.mFbxSophiaMixers = new THREE.AnimationMixer(object);

        //     object.traverse(function(child) {
        //         if (child.isMesh) {    //  instanceof THREE.Mesh
        //             child.castShadow = true;
        //             child.receiveShadow = true; // 接收阴影
        //         }
        //     });
        //     self.mScene.add(object);
        //     object.position.x += 200;
        //     object.rotateX(-Math.PI / 2);
        //     console.log(object.animations.length);
        //     self.mFbxSophiaMixers.clipAction(object.animations[0]).play();
        // });

        // // load dustbin FBX
        // var dustbinPBRMaterial = new THREE.MeshPhysicalMaterial({
        //     map: THREE.ImageUtils.loadTexture('/model/PBR_Dustbin/lajitong_Material _47_BaseColor.jpg', null, function(t){}),
        //     metalness: 0.1, 
        //     roughness: 0.2
        // });
        // var dustbinLoader = new THREE.FBXLoader();
        // dustbinLoader.setCrossOrigin("Anonymous");
        // dustbinLoader.load("/model/PBR_Dustbin/dustbin.fbx", function(object) {
        //     object.traverse(function(child) {
        //         if (child.isMesh) {    //  instanceof THREE.Mesh
        //             child.material = dustbinPBRMaterial;
        //             child.castShadow = true;
        //             child.receiveShadow = true; // 接收阴影
        //         }
        //     });
        //     object.position.x -= 220;
        //     object.scale.x = 0.1;
        //     object.scale.y = 0.1;
        //     object.scale.z = 0.1;
        //     self.mScene.add(object);
        // });

        // load xilou FBX
        var xilouMaterials = [
            new THREE.MeshPhysicalMaterial({
                map: this.mTextureLoader.load('/model/PBR_XiLou/XiLou_m1_C.jpg', null, null), 
                normalMap: this.mTextureLoader.load('/model/PBR_XiLou/XiLou_m1_N.jpg'),
                metalnessMap: this.mTextureLoader.load('/model/PBR_XiLou/XiLou_m1_Ao.jpg'),
                specularMap: this.mTextureLoader.load('/model/PBR_XiLou/XiLou_m1_S.tga')
            }), 
            new THREE.MeshPhysicalMaterial({
                map: this.mTextureLoader.load('/model/PBR_XiLou/XiLou_m3_C.jpg', null, null), 
                normalMap: this.mTextureLoader.load('/model/PBR_XiLou/XiLou_m3_N.jpg'),
                metalnessMap: this.mTextureLoader.load('/model/PBR_XiLou/XiLou_m3_Ao.jpg'),
                specularMap: this.mTextureLoader.load('/model/PBR_XiLou/XiLou_m3_S.tga')
            }),
            null,
            new THREE.MeshPhysicalMaterial({
                map: this.mTextureLoader.load('/model/PBR_XiLou/XiLou_m2_C.jpg', null, null), 
                normalMap: this.mTextureLoader.load('/model/PBR_XiLou/XiLou_m2_N.jpg'),
                metalnessMap: this.mTextureLoader.load('/model/PBR_XiLou/XiLou_m2_Ao.jpg'),
                specularMap: this.mTextureLoader.load('/model/PBR_XiLou/XiLou_m2_S.tga')
            })
        ];

        var xilouLoader = new THREE.FBXLoader();
        xilouLoader.setCrossOrigin("Anonymous");
        xilouLoader.load("/model/PBR_XiLou/XiLou.fbx", function(object) {
            object.traverse(function(child) {
                if (child.isMesh) {    //  instanceof THREE.Mesh
                    child.material = xilouMaterials;
                    child.castShadow = true;
                    child.receiveShadow = true; // 接收阴影
                }
            });
            object.position.z -= 700;
            object.rotateY(-Math.PI / 2);

            self.mScene.add(object);

            self.render();
        })

        // load mmd model
        var fengminLoader = new THREE.MMDLoader();
        this.mFengminAnimHelper = new THREE.MMDHelper();
        var motionFiles = ["/motion/QianSiXiMotion.vmd"];
        var cameraFiles = ["/motion/HongZhaoYuanCamera.vmd"];
        var audioFile =    "/music/QianSiXi.mp3";
        // fengminLoader.setCrossOrigin("Anonymous");
        fengminLoader.load("/model/fengmin/Feng.pmx", motionFiles, function(object) {
            object.castShadow = true;
            object.receiveShadow = true;

            self.mFengminAnimHelper.add(object);
            self.mFengminAnimHelper.setAnimation(object);

            // 骨骼辅助显示
            var ikHelper = new THREE.CCDIKHelper(object);
            ikHelper.visible = false;
            self.mScene.add(ikHelper);

            // 物理刚体辅助显示
            self.mFengminAnimHelper.setPhysics(object);
            self.mPhysicsHelper = new THREE.MMDPhysicsHelper(object);
            self.mPhysicsHelper.visible = true;
            self.mScene.add(self.mPhysicsHelper);
            self.render();

            fengminLoader.loadVmds(cameraFiles, function (vmd) {
                fengminLoader.pourVmdIntoCamera(self.mCamera, vmd);
                fengminLoader.loadAudio(audioFile, function (audio, listener) {
                    var audioParams ={delayTime: 0};
                    self.mFengminAnimHelper.setAudio(audio, listener, audioParams);
                    // 该函数作用:查找摄像机 音频 动作数据 模块 中最长的时间 当到达最最长时间 所有都停止 如果未设置 则模块到达自己结束时间停止 不会同步
                    self.mFengminAnimHelper.unifyAnimationDuration();
                    
                    self.mFengminReady = true;
                    self.mContinuous = true;
                    self.render();
                }, self.onProgress, self.onError);
            }, self.onProgress, self.onError);

            self.mScene.add(object);
            object.scale.set(10, 10, 10)
        }, self.onProgress, self.onError);

        // // load J-15 material
        // var j15PBRMaterial = new THREE.MeshPhysicalMaterial({
        //     map: THREE.ImageUtils.loadTexture('/model/J-15/mat0_c.jpg', null, function(t){}), 
        //     emissive:0x111111,
        //     normalMap: this.mTextureLoader.load('/model/J-15/mat0_n.jpg'),
        //     metalnessMap: this.mTextureLoader.load('/model/J-15/mat0_g.jpg'), 
        //     roughnessMap: this.mTextureLoader.load('/model/J-15/mat0_r.jpg'), 
        //     emissiveMap: this.mTextureLoader.load('/model/J-15/mat0_s.jpg')
        // });
        // objLoader.setPath('model/J-15/');
        // objLoader.load('J-15.obj', function(object) {
        //     object.traverse(function(child) {
        //         if (child instanceof THREE.Mesh) {
        //             child.material = j15PBRMaterial;
        //             child.castShadow = true;
        //             child.receiveShadow = true; // 接收阴影
        //         }
        //     });
        //     object.scale.set(50, 50, 50)
        //     self.mScene.add(object);
        // }, onProgress, onError);
    }

    loadNextAnim(loader, rootPath, names, mixers, actions) {
        const self = this;
        const anim = names.pop();
    
        loader.load(rootPath + anim + '.FBX', function (object) {
            const action = mixers.clipAction(object.animations[0]);
            actions.push(action);
    
            object.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = false;
                }
            });
            // self.mScene.add(object); // do not add repeat
            
            if (names.length > 0) {
                self.loadNextAnim(loader, rootPath, names, mixers, actions);
            } else {
                self.playAnimation(0);
                self.render();
            }
        } );
    }

    stopAnimation() {
        if (null != this.mNurseAnimMixers) 
            this.mNurseAnimMixers.stopAllAction();
        if (null != this.mHyenaAnimMixers)
            this.mHyenaAnimMixers.stopAllAction();
    }
    
    playAnimation(index) {
        if (null != this.mNurseAnimMixers) 
            this.mNurseAnimMixers.stopAllAction();
        if (null != this.mNurseActions) {
            const action1 = this.mNurseActions[index];
            action1.weight = 1;
            action1.fadeIn(0.5);
            action1.play();
        }
    }

    render() {
        var delta = this.mClock.getDelta();

        this.mRenderer.clear();
        this.mRenderer.render(this.mScene, this.mCamera);
        
        if (null != this.mNurseAnimMixers) {
            this.mNurseAnimMixers.update(delta);
        }
        if (null != this.mFbxSophiaMixers) {
            this.mFbxSophiaMixers.update(delta);
        }
        if (null != this.mHyenaAnimMixers) {
            this.mHyenaAnimMixers.update(delta);
        }

        if (null != this.mFengminAnimHelper && this.mFengminReady) {
            this.mFengminAnimHelper.animate(delta);
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
        fileName = url.substr(url.lastIndexOf("/") + 1) 
        console.log("加载失败" + "\n" + "失败地址：" + fileName);
    }

    onProgress(xhr) {
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
                fileType = "tga文件";
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
                $("#progressBar").attr("class","progress-bar progress-bar-success");
                console.log(fileType+": " + fileName + "加载完成");
                $("#progressTitle").html("");
                if (fileType == "音频文件")
                    console.log("所有文件已加载" + "</br>" + "处理文件中...");   
            } else {
                var percentComplete = Math.round((xhr.loaded / xhr.total * 100), 2);
                var progressBarStyleValue = percentComplete + "%";
                $("#progressTitle").html(fileType + ": " + fileName + "已加载 " + progressBarStyleValue 
                    + '<span class="glyphicon glyphicon-arrow-down" style="color: rgb(0, 255, 255); font-size: 15px;"></span>');
                $("#progressBar").attr("style", "width:" + progressBarStyleValue + ";");
                $("#progressBar").attr("class", "progress-bar progress-bar-info") 
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
        // var key;
        // if (navigator.appName == "Netscape") {
        //     key = String.fromCharCode(event.charCode);
        // } else {
        //     key = String.fromCharCode(event.keyCode);
        // }
        // switch (key) {
        //     case 'G':
        //     case 'g':
        //         this.mShowAssist = !this.mShowAssist;
        //         this.mMeshLineMaterial.visible = this.mShowAssist;
        //         this.mAxis.material.visible = this.mShowAssist;
        //         break;
        //     case '1':
                    // playAnimation(1);
        //     case '2':
        //         playAnimation(2);
        //     case '3':
        //         playAnimation(3);
        //     case '4':
        //         playAnimation(4);
        //     default:
        //         break;
        // }
        // if (this.mShowAssist) {
        //     document.getElementById('canvas-frame').appendChild(this.mStats.domElement);
        // } else {
        //     document.getElementById('canvas-frame').removeChild(this.mStats.domElement);
        // }
    }
}

export {BugByDaylight};