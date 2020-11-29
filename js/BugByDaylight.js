class BugByDaylight {
    constructor() {
        this.COFFIN_DANCE_INDEX = 10;
        this.FIREWORM_LIGHT_NUM = 10;
        this.WATER_SPLASH_MAX_NUM = 30;
        this.WATER_SPLASH_PARTICLE_NUM = 400;   // for each splash
        this.WATER_SPLASH_SIZE = 0.04;
        this.WATER_SIZE = 64;
        this.DAY_AMBIENT_COLOR = 0xaaaaaa;
        this.NIGHT_AMBIENT_COLOR = 0x333333;
        this.DAY_DIRECTION_LIGHT_COLOR = 0x777777;
        this.NIGHT_DIRECTION_LIGHT_COLOR = 0x333333;
        this.DAY_SPOTLIGHT_COLOR = 0xbbbbbb;
        this.NIGHT_SPOTLIGHT_COLOR = 0x555555;
        this.mSplashIndex = 0;
        this.mDaySkyboxPath = "/texture/SkyBox/seaside/";
        this.mNightSkyboxPath = "/texture/SkyBox/night/";
        this.mClock = undefined;
        this.mModelGames = [
            "游戏类型", "黎明杀🐔", "生化危机", "最终幻想", "铁拳", "绝地求生", "漫威", "古墓丽影", "模拟人生", "卡通人物", "死或生", "银河战士", "X-战警", "星际争霸"
        ];
        this.mModelNameFiles = [
            // Test
            ["默认角色"],
            // Dead by Bug
            ["凤敏", "梅格·托马斯", "🐰妈", "🐷妹（电锯惊魂）", "鬼面（惊声尖叫）", "佛莱迪（猛鬼街）","迈克尔·迈尔斯（月光光心慌慌）", "皮脸（德州电锯杀人狂）"], 
            // 卡婊危机
            ["吉尔-生化危机1", "吉尔-生化危机3重置版", "吉尔-生化危机5", "克莱尔", "克莱尔（便装）", "Helena-生化危机6", "雪梨-生化危机6", "挨打·王-生化危机6",
            "挨打·王-生化危机4", "Rebecca-生化危机0", "Vector-浣熊市行动", "汉克（生化危机2）", "威斯克(生化危机5)", "Excella Gionne(生化危机5)", "Elza Walker(生化危机1.5)"], 
            // 最终幻想
            ["尤娜（婚纱）", "尤娜", "蒂法（旗袍）"], 
            // 铁拳
            ["Miharu_Hirano"], 
            // 绝地求生
            ["吃鸡男", "吃鸡女(Base)", "吃鸡女(Avatar01)", "Suzy_Brown", "707", "Benedict"], 
            // 漫威
            ["钢铁侠", "黑寡妇", "黑寡妇（团队装）",
            "Hitomi_Supergirl", "奇异博士", "蚁人",
            "超人", "奥创"],
            // 古墓丽影
            ["劳拉"],
            // Sim4
            ["Petra"],
            // 动画
            [
            // 泠鸢
            "泠鸢-汉服", "泠鸢", "泠鸢-朋克",
            "TDA", "Lulua", "Lulua_TypeA",
            "Alice", "Athena", "Reisalin_Stout_Black", 
            "弹力女侠", "Sly_Cooper", "Lisbeth"
            ], 
            // DOA 6
            ["雷芳(李小龙)", "雷芳(辫子)", "雷芳(长发)", 
            "Luna_Pomelo", 
            // 穂乃果
            "honoka（牛仔1）", "honoka（牛仔2）", "honoka（牛仔3）", "honoka_c1（校园）", 
            "honoka（粉和服）", "honoka（旗袍）", "honoka（喇叭袖）", 
            // 玛丽·螺丝
            "Marie_Rose（otaku）", "Marie_Rose（旗袍）", "Marie_Rose（和服）", "Marie_Rose（粉旗袍）", 
            "Marie_Rose（背带）", "Marie_Rose（圣诞）", "Marie_Rose（兔子耳）", "Marie_Rose（校服）", 
            // 霞
            "Kasumi_Furisode(霞)", "Kasumi_Furisode(和服)", "Kasumi_Casual_Ponytail(牛仔马尾)", 
            "Kasumi_Casual_Long_Hair(牛仔长发)", "Kasumi_Overall(红吊带)", 
            // 不知火舞
            "Mai_Shiranui", 
            // 红叶
            "Momiji_Santa(红叶)", "Momiji_Santa(警服)", "Momiji_Santa(啦啦队)", 
            // 绫音
            "Ayane_SwimSuit(绫音)", "Ayane_SwimSuit(泳装)", "Ayane(皮衣)", "Ayane(和服)",
            // 八田美咲
            "Misaki(和服)", "Misaki(校服)",
            // 环
            "Tamaki(环)", "Tamaki(浴袍)",
            ],
            // Metroid 银河战士
            ["萨姆丝·阿兰(便服)", "萨姆丝·阿兰"],
            // X战警
            ["金刚狼(夹克)"]
        ];
        this.mModelFiles = [
            // Test
            ["/model/DOA/Honoka/Honoka_Jeans/honoka_c13_Alt2.pmx"],
            // Dead by Bug
            ["/model/DBD/fengmin/Feng.pmx", "/model/DBD/meg/meg.pmx", "/model/DBD/huntress/Huntress.pmx", 
            "/model/DBD/amanda/Amanda.pmx", "/model/DBD/Ghostface/ghostface.pmx", "/model/DBD/Freddy/Freddy.pmx", 
            "/model/DBD/MichealMyers/MichealMyers.pmx", "/model/DBD/Leatherface/Leatherface.pmx"], 
            // 卡婊危机
            ["/model/RE/jill1/Jill.pmx", "/model/RE/jill3/JillRE3remake.pmx", "/model/RE/jill5/Jill.pmx", "/model/RE/Claire_Prisioner/Claire.pmx", 
            "/model/RE/claire/ClaireCasual.pmx", "/model/RE/helena/Helena_TallOaks.pmx", "/model/RE/sherry/Sherry.pmx", 
            "/model/RE/Ada_RE6_Spy/AdaRE6_Spy.pmx", "/model/RE/ada/Ada.pmx", "/model/RE/Rebecca/Rebecca_Chambers.pmx", "/model/RE/vector/Vector.pmd", 
            "/model/RE/RE2_Remake_Hunk/RE2_Remake_Hunk.pmx", "/model/RE/Albert_Wesker/Albert_Wesker.pmx", "/model/RE/Excella_Gionne/Excella_Gionne.pmx", 
            "/model/RE/Elza_Walker_RE1_5/elza_walker_no_vest.pmx"], 
            // 最终幻想
            ["/model/FF/yuna/pmx/yuna.pmx", "/model/FF/yuna(Default)/yuna_gunner.pmd", "/model/FF/Tifa/Tifa.pmx"], 
            // 铁拳
            ["/model/Tekken/Miharu_Hirano/Miharu_Hirano.pmx"], 
            // 绝地求生
            ["/model/PUBG/PUGB_Male/Male.pmx", "/model/PUBG/PUBG_Female_Base/Female.pmx", "/model/PUBG/PUBG_F_Avatar01/F_Avatar_01.pmx",
            "/model/PUBG/CF_Suzy_Miss_A/Suzy_Brown.pmx", "/model/PUBG/CSO2_707/707.pmx", "/model/PUBG/FEAROnline_Benedict/Benedict.pmx"], 
            // 漫威
            ["/model/Marvel/Ironman/Ironman.pmx", "/model/Marvel/Black_Widow_FF/FF.pmx", "/model/Marvel/Black_Widow_Team_Suit/Team-Suit.pmx",
            "/model/Marvel/Supergirl/Hitomi_Supergirl.pmx", "/model/Marvel/Doctor_Strange/Doctor_Strange.pmx", "/model/Marvel/Antman/Antman.pmx",
            "/model/Marvel/Superman/Superman.pmx", "/model/Marvel/Ultron/Marvel_Ultron.pmx"],
            // 古墓丽影
            ["/model/TR/Lara_Croft/Lara_Croft.pmx"],
            // Sim4
            ["/model/Sim/Petra/Petra.pmx"],
            // 动画
            [
            "/model/Cartoon/Yousa/Yousa_v2/yousa.pmx", "/model/Cartoon/Yousa/Yousa_Punk/yousa.pmx", "/model/Cartoon/Yousa/Yousa_Punk/yousa_punk.pmx", 
            "/model/Cartoon/TDA_Twinkle_Party_Miku/Twinkle_Party.pmx", "/model/Cartoon/lulua_Ver1/lulua_Ver1.pmx", "/model/Cartoon/lulua_Ver1/lulua_Ver1_TypeA.pmx",
            "/model/Cartoon/Alice/Alice.pmx", "/model/Cartoon/Athena/Athena.pmx", "/model/Cartoon/Reisalin_Stout/Reisalin_Stout_Black.pmx", 
            "/model/Cartoon/Helen_Parr/Mrs_Incredible.pmx", "/model/Cartoon/Sly_Cooper/Sly_Cooper.pmx", "/model/Cartoon/Lisbeth/Lisbeth.pmx"
            ], 
            // DOA 6
            // 雷芳
            ["/model/DOA/Leifang/Leifang_BruceLee/Leifang.pmx", "/model/DOA/Leifang/Leifang_Five_Brilliant_Colors/Leifang_Five_Brilliant_Colors_Hair_A.pmx", 
            "/model/DOA/Leifang/Leifang_Five_Brilliant_Colors/Leifang_Five_Brilliant_Colors_Hair_B.pmx", 
            // 露娜
            "/model/DOA/Luna_Pomelo/Luna_Pomelo.pmx", 
            // 穂乃果 Honoka
            "/model/DOA/Honoka/Honoka_Jeans/honoka_c13.pmx", "/model/DOA/Honoka/Honoka_Jeans/honoka_c13_Alt2.pmx", "/model/DOA/Honoka/Honoka_Jeans/honoka_c13_Alt3.pmx", 
            "/model/DOA/Honoka/Honoka_Stu/honoka_c1.pmx", "/model/DOA/Honoka/Honoka_Kimono_Pink/Honoka_Kimono.pmx", "/model/DOA/Honoka/Honoka_Chinese_New_Year/Honoka_Mandarin1.pmx",
            "/model/DOA/Honoka/Honoka_Fairy_Tail_Mashup/Honoka_Fairy_Tail_Mashup.pmx",
            // 玛丽·螺丝
            "/model/DOA/Marie_Rose/Marie/Marie_Rose_otaku.pmx", "/model/DOA/Marie_Rose/Marie_Rose_C/Marie_Rose_C.pmx", "/model/DOA/Marie_Rose/Marie_Rose_Furisode/Marie_Rose.pmx",
            "/model/DOA/Marie_Rose/Marie_Rose_CP/Marie_Chinese_Dress.pmx", "/model/DOA/Marie_Rose/Marie_Rose_Jeans/MarieRose_Overalls.pmx", 
            "/model/DOA/Marie_Rose/Marie_Rose_Fraise_Noel/Marie.pmx", "/model/DOA/Marie_Rose/Marie_Rose_Bunny/Marie_Rose_Bunny.pmx",
            "/model/DOA/Marie_Rose/Marie_Rose_School/Marie_Rose_School.pmx",
            // 霞 Kasumi
            "/model/DOA/Kasumi/Kasumi_Default/Kasumi.pmx", "/model/DOA/Kasumi/Kasumi_Furisode/Kasumi_Furisode.pmx", "/model/DOA/Kasumi/Kasumi_Casual/Kasumi_Casual_Ponytail.pmx", 
            "/model/DOA/Kasumi/Kasumi_Casual/Kasumi_Casual_Long_Hair.pmx", "/model/DOA/Kasumi/Kasumi_Overall/Kasumi_Overall.pmx", 
            // 不知火舞 Mai Shiranui
            "/model/DOA/Mai_Shiranui/Mai_Shiranui.pmx", 
            // 红叶 Momiji
            "/model/DOA/Momiji/Momiji_Santa/Momiji_Santa.pmx", "/model/DOA/Momiji/Momiji_Cheerleader/Momiji_Cheerleader.pmx", "/model/DOA/Momiji/Momiji_Cop/Momiji.pmx", 
            // 绫音 Ayane
            "/model/DOA/Ayane/Ayane_Default/Ayane.pmx", "/model/DOA/Ayane/Ayane_c19_seaside_eden_swimsuit/Ayane_Seaside_Eden_Swimsuit.pmx",
            "/model/DOA/Ayane/Ayane_FF5/Ayane_FF5.pmx", "/model/DOA/Ayane/Ayane_Furisode_Kimono_Twilight_Butterfly/Ayane_Furisode_Kimono_Twilight_Butterfly.pmx",
            // 八田美咲 Misaki
            "/model/DOA/Misaki/Misaki_Furisode_Kimono_Morning_Star/Misaki_Furisode_Kimono_Morning_Star.pmx", "/model/DOA/Misaki/Misaki_School/Misaki_School.pmx",
            // 环 
            "/model/DOA/Tamaki/Tamaki_Mona_Costume/Tamaki_Mona_Costume.pmx", "/model/DOA/Tamaki/Tamaki_Indigo_Peacock/Tamaki_Indigo_Peacock.pmx", 
            ],
            // Metroid 银河战士
            ["/model/Metroid/SamusAran/Samus_Casual.pmd", "/model/Metroid/SamusAran/ZeroSuitSamus.pmd"], 
            // X战警
            ["/model/X-Men/Wolverine_Logan_Jacket_Outfit/Wolverine_Jacket.pmx"],
            // 其他游戏

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
            // ancient
            ["/motion/Ancient/LuoHuaQinMotion.vmd"], ["/motion/Ancient/QianSiXiMotion.vmd"], 
            ["/motion/Ancient/HongZhaoYuanMotion.vmd"], ["/motion/Ancient/ZuiLinMotion.vmd"], 
            ["/motion/Ancient/LianRenXinMotion.vmd"], ["/motion/Ancient/XiaoQiuYueMing.vmd"],
            ["/motion/Ancient/YueZhongTianMotion.vmd"], ["/motion/Ancient/XiaShanMotion.vmd"], 
            ["/motion/Ancient/XingyunLin.vmd"],["/motion/Ancient/QianDengYuanMotion.vmd"], 
            ["/motion/Ancient/BanHuShaMotion.vmd"],
            // Popular
            ["/motion/Popular/LearnCatMotion.vmd"], ["/motion/Popular/HaiCaoMotion.vmd"], 
            ["/motion/Popular/LittleAppleMotion.vmd"], ["/motion/Popular/JiLeMotion.vmd"], 
            // Jp&Korea
            ["/motion/JP&Korea/BarBarBarMotion3.vmd"], ["/motion/JP&Korea/WhatYouWaitingForMotion.vmd"], 
            ["/motion/JP&Korea/BirthdayMotion.vmd"], ["/motion/JP&Korea/BangBangMotion.vmd"], 
            ["/motion/JP&Korea/BoPeepBoPeepMotion.vmd"], 
            // Funny
            ["/motion/Funny/CoffinDance/CORONA-CHAN.vmd"], ["/motion/Funny/MaBaoguo/MaBaoguo.vmd"],
            ["/motion/Funny/CaiXukun/caixukun.vmd"], ["/motion/Funny/BadWater/BadBadWaterMotion.vmd"]
        ];
        this.mSceneFiles = [
            "/model/Scene/DOAX2_Pool/DOAX2_Pool_Move.pmx", "/model/Scene/DOA5_Stage_Sakura/DOA5_Sakura.pmx", "/model/Scene/Hot_Spring/Hot_Spring.pmx", 
            "/model/Scene/ancient_garden/stage.pmx", 
            "/model/Scene/chinese_night/merge.pmx", "/model/Scene/Girl's_Room/Girl's_Room.pmx", 
            "/model/Scene/Raccoon_City_Streets/raccoon_city.pmx", "/model/Scene/Raccoon_City_street_2/City.pmx", "/model/Scene/Spencer_Mansion/Spencer_with_desk.pmx", 
            "/model/Scene/Island/Island.pmx", "/model/Scene/City_Garden/City_Garden.pmx",
            "/model/Scene/Exhibition_Hall/room.pmx", "/model/Scene/Desert_Camp/Desert_Camp.pmx", "/model/Scene/Countryside_Road/1.pmx", 
            "/model/Scene/MidLakePavilion/MidLakePavilion.pmx", "/model/Scene/WaterLilyPavilion/MidLakePavilion.pmx", 
            "/model/Scene/Musume_Forest/stage.pmd", 
            "/model/Scene/JP_Yard/Stage.pmd", "/model/Scene/Summer_Apartment/Summer_Apartment.pmx"
        ];
        this.mCameraFiles = [
            // ancient
            ["/motion/Ancient/LuoHuaQinCamera.vmd"], ["/motion/Ancient/QianSiXiCamera.vmd"], 
            ["/motion/Ancient/HongZhaoYuanCamera.vmd"], ["/motion/Ancient/ZuiLinCamera.vmd"], 
            ["/motion/Ancient/LianRenXinCamera.vmd"], ["/motion/Ancient/XiaoQiuYueMing.vmd"],
            ["/motion/Ancient/YueZhongTianMotion.vmd"], ["/motion/Ancient/XiaShanCamera.vmd"], 
            ["/motion/Ancient/XingyunLinCamera.vmd"], ["/motion/Ancient/QianDengYuanCamera.vmd"], 
            ["/motion/Ancient/BanHuShaCamera.vmd"], 
            // Popular
            ["/motion/Popular/LearnCatCamera.vmd"], ["/motion/Popular/JiLeCamera.vmd"], 
            ["/motion/Popular/LittleAppleCamera.vmd"], ["/motion/Popular/JiLeCamera.vmd"], 
            // Jp&Korea
            ["/motion/JP&Korea/BarBarBarCamera.vmd"], ["/motion/JP&Korea/WhatYouWaitingForCamera.vmd"], 
            ["/motion/JP&Korea/BirthdayCamera.vmd"], ["/motion/JP&Korea/BangBangCamera.vmd"], 
            ["/motion/JP&Korea/BoPeepBoPeepCamera.vmd"], 
            // Funny
            ["/motion/Funny/CoffinDance/CAMERA.vmd"], ["/motion/DefaultCamera.vmd"],
            ["/motion/Funny/CaiXukun/caixukunCamera.vmd"], ["/motion/DefaultCamera.vmd"]
        ];
        this.mMusicFiles = [
            // ancient
            "/music/LuoHuaQin.mp3", "/music/QianSiXi.mp3", "/music/HongZhaoYuan.mp3", 
            "/music/ZuiLin.mp3", "/music/LianRenXin.mp3", "/music/XiaoQiuYueMing.mp3", 
            "/music/YueZhongTian.mp3", "/music/XiaShan.mp3", "/music/XingYunLing.mp3", 
            "/music/QianDengYuan.mp3", "/music/BanHuSha.mp3", 
            // Popular
            "/music/LearnCatCut.mp3", "/music/HaiCaoCut.mp3", "/music/LittleApple.mp3", "/music/JiLeJinTu.mp3", 
            // Jp&Korea
            "/music/BarBarBar.mp3", "/music/WaitingFor.mp3", "/music/Birthday.mp3", "/music/BangBang.mp3", "/music/BoPeepBoPeep.mp3", 
            // Funny
            "/music/CoffinDance.mp3", "/music/MaBaoguo.mp3", "/music/caixukun.mp3", "/music/BadBadWater.mp3"
        ];
        this.mDebug = false;
        this.mAutoCamera = true;
        this.mAbortLoader = false;
        this.mLastGameIndex = 0;
        this.mLastModelIndex = 0;
        this.mLastMotionIndex = 0;
        this.mLastSceneIndex = 0;

		this.init();
    }

    init() {
        var curHour = (new Date()).getHours();
        var day = (curHour < 18 && curHour > 7);

        this.initUI(day);
        this.initThree();
        this.initCamera();
        this.initScene();
        this.initSkyBox(day);
        this.initLight(day);  // default night
        this.initModel();
        this.initWater();
        this.initWaterSplash();
    }

    initUI(day) {
        document.getElementById("daynight_switch").checked = !day;
        if (day) 
            document.getElementById("day_or_night").innerHTML = "白天";
        else
            document.getElementById("day_or_night").innerHTML = "晚上";
    }

    initThree() {
        const self = this;
        this.mRenderer = new THREE.WebGLRenderer({
            antialias : true, alpha: true
        });
        this.mRenderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
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
        this.mCamera.position.set(0, 20, 50);

        // 创建控件并绑定在相机上
        this.mOrbitControl = new THREE.OrbitControls(this.mCamera, this.mRenderer.domElement);
        this.mOrbitControl.target = new THREE.Vector3(0, 10, 0);
        this.mOrbitControl.autoRotate = false;
        this.mOrbitControl.minDistance = 1;
        this.mOrbitControl.maxDistance = 150;
        this.mOrbitControl.update();
        this.mOrbitControl.maxPolarAngle = Math.PI / 2;
    }

    initScene() {
        this.mScene = new THREE.Scene();
        this.mScene.background = new THREE.Color(0xa0a0a0);
        // this.mScene.fog = new THREE.Fog(0xa0a0a0, 100, 1000);

        this.mAxis = new THREE.AxesHelper(500);
        this.mAxis.material.visible = false;
        this.mScene.add(this.mAxis);

        this.mLoadingManager = new THREE.LoadingManager();
        this.mLoadingManager.onLoad = function () {
            // call back function when the texture gets loaded
        }
        this.mTextureLoader = new THREE.TextureLoader(this.mLoadingManager);

        // // 创建video对象
        // this.mVideo = document.createElement('video');
        // this.mVideo.src = "/motion/Funny/MaBaoguo/mabaoguo.mp4"; // 设置视频地址
        // // this.mVideo.autoplay = "autoplay"; // 要设置播放
        // // video对象作为VideoTexture参数创建纹理对象
        // var videoTexture = new THREE.VideoTexture(this.mVideo)
        // var vdieoGeometry = new THREE.PlaneGeometry(9.5, 6.4); // 矩形平面
        // var videoMaterial = new THREE.MeshPhongMaterial({
        //     map: videoTexture, // 设置纹理贴图
        // }); // 材质对象Material
        // var videoMesh = new THREE.Mesh(vdieoGeometry, videoMaterial); // 网格模型对象Mesh
        // videoMesh.position.set(-43.75, 14.7, -41);
        // videoMesh.rotateY(38 * (Math.PI / 180))
        // this.mScene.add(videoMesh); // 网格模型添加到场景中
    }

    initSkyBox(day) {
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
        var directions  = ["posx", "negx", "posy", "negy", "posz", "negz"]; 
        var format = ".jpg";
        var path = this.mDaySkyboxPath
        if (!day) {
            path = this.mNightSkyboxPath
        }
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

    initLight(day) {
        if (day) {
            this.mAmbientLight = new THREE.AmbientLight(this.DAY_AMBIENT_COLOR, 1);
        } else {
            this.mAmbientLight = new THREE.AmbientLight(this.NIGHT_AMBIENT_COLOR, 1);
        }
        this.mScene.add(this.mAmbientLight);

        if (day) {
            this.mDirectionalLight = new THREE.DirectionalLight(this.DAY_DIRECTION_LIGHT_COLOR, 1.0);
        } else {
            this.mDirectionalLight = new THREE.DirectionalLight(this.NIGHT_DIRECTION_LIGHT_COLOR, 1.0);
        }
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

        if (day) {
            this.mSpotLight = new THREE.SpotLight(this.DAY_SPOTLIGHT_COLOR, 0.2);
        } else {
            this.mSpotLight = new THREE.SpotLight(this.NIGHT_SPOTLIGHT_COLOR, 0.2);
        }
        this.mSpotLight.position.set(0, 75, -45);
        this.mSpotLight.angle = Math.PI / 8; // 设置聚光光源发散角度
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
        // var this.mLensFlare = new Lensflare();
        // this.mLensFlare.addElement(new LensflareElement(lensFlareTex1, 512, 0));
        // this.mLensFlare.addElement(new LensflareElement(lensFlareTex2, 512, 0));
        // this.mLensFlare.addElement(new LensflareElement(lensFlareTex3, 60, 0.6));
        // this.mDirectionalLight.add(this.mLensFlare);

        this.mLensFlare = new THREE.Lensflare();
        this.mLensFlare.addElement(new THREE.LensflareElement(lensFlareTex0, 500, 0.0, flareColor));
        this.mLensFlare.addElement(new THREE.LensflareElement(lensFlareTex2, 512, 0.0));
        this.mLensFlare.addElement(new THREE.LensflareElement(lensFlareTex2, 512, 0.0));
        this.mLensFlare.addElement(new THREE.LensflareElement(lensFlareTex2, 512, 0.0));
        this.mLensFlare.addElement(new THREE.LensflareElement(lensFlareTex3, 60, 0.6));
        this.mLensFlare.addElement(new THREE.LensflareElement(lensFlareTex3, 70, 0.7));
        this.mLensFlare.addElement(new THREE.LensflareElement(lensFlareTex3, 120, 0.9));
        this.mLensFlare.addElement(new THREE.LensflareElement(lensFlareTex3, 70, 1.0));
        this.mLensFlare.position.copy(this.mSpotLight.position);
        // this.mDirectionalLight.add(this.mLensFlare);
        this.mScene.add(this.mLensFlare);

        // fireworm light
        if (!day) {
            this.mFireWormLights = [];
            var fireWormGeo = new THREE.SphereGeometry(0.1, 0.1, 0.1);
            var distance = 7;
            var fireWormPos = new THREE.Vector3();
            for (var i = 0; i < this.FIREWORM_LIGHT_NUM; i++) {
                var light = new THREE.PointLight(0xffffff, 2.0, distance);
                fireWormPos.set(Math.random(), Math.random(), Math.random()).normalize();
                light.color.setRGB(fireWormPos.x, fireWormPos.y, fireWormPos.z);
                this.mScene.add(light);
                this.mFireWormLights.push(light);

                var material = new THREE.MeshBasicMaterial({color: light.color});
                var emitter = new THREE.Mesh(fireWormGeo, material);
                light.add(emitter);
            }
        }
    }

    initModel() {
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

        // var xilouLoader = new THREE.FBXLoader();
        // xilouLoader.setCrossOrigin("Anonymous");
        // xilouLoader.load("/model/FBX/PBR_XiLou/XiLou.fbx", function(object) {
        //     object.traverse(function(child) {
        //         if (child.isMesh) {    //  instanceof THREE.Mesh
        //             child.material = xilouMaterials;
        //             child.castShadow = true;
        //             child.receiveShadow = true; // 接收阴影
        //         }
        //     });
        //     object.position.z -= 70;
        //     object.scale.set(0.1, 0.1, 0.1)
        //     object.rotateY(-Math.PI / 2);

        //     self.mScene.add(object);

        //     self.render();
        // })

        // load mmd scene
        this.mMmdSceneLoader = new THREE.MMDLoader();
        this.loadMMDScene(this.mSceneFiles[0], 1);

        // load mmd model
        this.mMmdLoader = new THREE.MMDLoader();
        // this.mMmdLoader.setCrossOrigin("Anonymous");
        this.loadMMD(this.mModelFiles[0][0], 1, this.mMotionFiles[0], this.mCameraFiles[0], this.mMusicFiles[0]);
    }

    initWater() {
        var circleWaveTriggerTimesArray = [];
        var circleWaveCentersArray = [];
        var directionWaveVectors = [
            (new THREE.Vector2(0.0, 0.7)).normalize(),
            (new THREE.Vector2(-1.0, 1.0)).normalize(),
            (new THREE.Vector2(-0.2, -1.0)).normalize(),
            (new THREE.Vector2(-1.0, -1.0)).normalize(),
            (new THREE.Vector2(1.0, 0.5)).normalize()
        ];
        var directionWaveMaxNum = directionWaveVectors.length;

        for (var i = 0; i < this.WATER_SPLASH_MAX_NUM; i++) {
            circleWaveTriggerTimesArray.push(0);
            circleWaveCentersArray.push(new THREE.Vector2());
        }

        var vertReader = new XMLHttpRequest();
        var fragReader = new XMLHttpRequest();
        vertReader.open('get', './shader/water.vs', false);
        fragReader.open('get', './shader/water.fs', false);
        vertReader.send();
        fragReader.send();
        var vertShader = vertReader.responseText;
        var fragShader = fragReader.responseText;

        this.mWater = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(this.WATER_SIZE, this.WATER_SIZE, 512, 512),
            new THREE.ShaderMaterial({
                uniforms: {
                    size: {value: new THREE.Vector2(window.innerWidth, window.innerHeight)},
                    time: {value: 0},
                    tDiffuse: {value: this.mRenderTarget.texture},
                    tWaterMap: {value: this.mTextureLoader.load("/texture/Water/water.jpg")},
                    tWaterNormalMap: {value: this.mTextureLoader.load("/texture/Water/waternormals.jpg")},
                    circleWaveCenters: {value: circleWaveCentersArray},
                    circleWaveTriggerTimes: {value: circleWaveTriggerTimesArray},
                    circleWaveNum: {value: 0},
                    directionWaveVectors: {value: directionWaveVectors},
                    directionWaveNum: {value: directionWaveMaxNum}
                },
                vertexShader: vertShader.replace('<maxCircleWaveNum>', 
                    this.WATER_SPLASH_MAX_NUM).replace('<maxDirectionWaveNum>', directionWaveMaxNum),
                fragmentShader: fragShader,
                transparent: true
            })
        );
        this.mWater.rotation.x = -90 * Math.PI / 180;
        this.mWater.position.set(0, 1.5, 7);
        this.mScene.add(this.mWater);
    }

    initWaterSplash() {
        this.WaterHitCheckBoneIndices = [
            8,
            9
        ];
        this.mPreviousBonePositions = [];
        for (var i = 0, len = this.WaterHitCheckBoneIndices.length; i < len; i++) {
            this.mPreviousBonePositions.push(new THREE.Vector3());
        }
        
        var splashVector = new THREE.Vector3(8, 10, 8);
        var count = this.WATER_SPLASH_MAX_NUM * this.WATER_SPLASH_PARTICLE_NUM;
        var geometry = new THREE.InstancedBufferGeometry();
        geometry.copy(new THREE.SphereBufferGeometry(this.WATER_SPLASH_SIZE));

        var translateArray = new Float32Array(count * 3);
        var vectorArray = new Float32Array(count * 3);
        var inputTimeArray = new Float32Array(count);

        for (var i = 0; i < count; i ++) {
            translateArray[ i * 3 + 0 ] = 0;
            translateArray[ i * 3 + 1 ] = 0;
            translateArray[ i * 3 + 2 ] = 0;
        }

        for (var i = 0; i < count; i++) {
            vectorArray[ i * 3 + 0 ] = ( Math.random() - 0.5 ) * splashVector.x;
            vectorArray[ i * 3 + 1 ] = ( Math.random() + 0.5 ) * splashVector.y;
            vectorArray[ i * 3 + 2 ] = ( Math.random() - 0.5 ) * splashVector.z;
        }

        for (var i = 0; i < count; i ++) {
            inputTimeArray[ i ] = 0;
        }

        geometry.addAttribute('translate', new THREE.InstancedBufferAttribute(translateArray, 3, 1));
        geometry.addAttribute('vector', new THREE.InstancedBufferAttribute(vectorArray, 3, 1 ));
        geometry.addAttribute('inputTime', new THREE.InstancedBufferAttribute(inputTimeArray, 1, 1));

        var vertReader = new XMLHttpRequest();
        var fragReader = new XMLHttpRequest();
        vertReader.open('get', './shader/waterSplash.vs', false);
        fragReader.open('get', './shader/waterSplash.fs', false);
        vertReader.send();
        fragReader.send();
        var vertShader = vertReader.responseText;
        var fragShader = fragReader.responseText;

        var material = new THREE.ShaderMaterial({
            uniforms: {
                time: {value: 0}
            },
            vertexShader: vertShader,
            fragmentShader: fragShader,
            depthTest: true,
            depthWrite: true
        });

        this.mWaterSplash = new THREE.Mesh(geometry, material);
        this.mScene.add(this.mWaterSplash);
    }

    loadMMDScene(path, scale) {
        const self = this;
        this.mMmdSceneLoader.load(path, null, function(object) {
            self.mLastScene = object;
            object.castShadow = true;
            object.receiveShadow = true;

            self.mScene.add(object);
            object.scale.set(scale, scale, scale);

            self.render();
        }, self.onProgress.bind(self), self.onError);
    }

    loadMMD(modelPath, scale, motionPath, cameraPath, musicPath) {
        const self = this;
        if (null == self.mCamera) {
            self.initCamera();  // have to reinit camera since pourVmdIntoCamera
        }
        self.mAbortLoader = false;
        self.mMMDAnimHelper = new THREE.MMDHelper();
        self.mMmdLoaderRequest = this.mMmdLoader.load(modelPath, motionPath, function(object) {
            object.castShadow = true;
            object.receiveShadow = true;

            self.mMMDAnimHelper.add(object);
            self.mMMDAnimHelper.setAnimation(object);
            self.mLastModel = object;

            // var pos = new THREE.Vector3();
            // for (var i = 0; i < 211; i++) {
            //     object.skeleton.bones[i].getWorldPosition(pos)
            //     console.log("bone[" + i + "].pos.y = " + pos.y);
            // }

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
                    // self.mVideo.play();
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
        if (undefined != self.mPhysicsHelper) {
            self.deleteGroup(self.mPhysicsHelper);
            self.mScene.remove(self.mPhysicsHelper);
        }
        if (undefined != self.mLastModel) {
            self.deleteGroup(self.mLastModel);
            self.mScene.remove(self.mLastModel);
        }
        if (null != self.mMMDAnimHelper && null != self.mMMDAnimHelper.audioManager 
            && null != self.mMMDAnimHelper.audioManager.audio)
            self.mMMDAnimHelper.audioManager.audio.stop();
        self.mMMDAnimHelper = null;

        self.mLastMotionIndex = motion;
        self.mMMDReady = false;
        self.mClock = undefined;
        self.mCamera = null;
        self.mContinuous = false;
        // if (motion == self.COFFIN_DANCE_INDEX) {
        //     for (var i = 0; i < self.mModelForCoffinDanceFiles.length; i++) {
        //         self.loadMMD(self.mModelForCoffinDanceFiles[i], 1, self.mMotionForCoffinDanceFiles[i], null, null);
        //     }
        // }
        self.loadMMD(self.mModelFiles[self.mLastGameIndex][self.mLastModelIndex], 1, self.mMotionFiles[motion], 
            self.mCameraFiles[motion], self.mMusicFiles[motion]);
    }

    sceneSelect(sceneId) {
        this.mLastSceneIndex = sceneId;
        this.deleteGroup(this.mLastScene);
        this.deleteGroup(this.mWater);
        this.deleteGroup(this.mWaterSplash);
        if (0 == sceneId) { // only add water in the first scene
            this.initWater();
            this.initWaterSplash();
        }

        this.loadMMDScene(this.mSceneFiles[sceneId], 1);
    }

    gameSelect(gameId) {
        const self = this;
        self.mLastGameIndex = gameId;
        $('#character_select').children().remove();
        var modelArray = self.mModelNameFiles[gameId];
        for (let i = 0; i < modelArray.length; i++) {
            $('#character_select').append('<option value=' + i + '>' + modelArray[i] + '</option>');
        }
        self.characterSelect(0)
    }

    characterSelect(character) {
        const self = this;
        self.mAbortLoader = true;
        if (undefined != self.mPhysicsHelper) {
            self.deleteGroup(self.mPhysicsHelper);
            self.mScene.remove(self.mPhysicsHelper);
        }
        if (undefined != self.mLastModel) {
            self.deleteGroup(self.mLastModel);
            self.mScene.remove(self.mLastModel);
        }
        if (null != self.mMMDAnimHelper && null != self.mMMDAnimHelper.audioManager 
            && null != self.mMMDAnimHelper.audioManager.audio)
            self.mMMDAnimHelper.audioManager.audio.stop();
        self.mMMDAnimHelper = null;

        self.mLastModelIndex = character;
        self.mMMDReady = false;
        self.mClock = undefined;
        self.mCamera = null;
        self.mContinuous = false;
        self.loadMMD(self.mModelFiles[self.mLastGameIndex][character], 1, this.mMotionFiles[self.mLastMotionIndex], 
            this.mCameraFiles[self.mLastMotionIndex], this.mMusicFiles[self.mLastMotionIndex]);
    }

    render() {
        if (this.mMMDReady) {
            if (undefined == this.mClock)
                this.mClock = new THREE.Clock();
            var delta = this.mClock.getDelta();

            if (null != this.mMMDAnimHelper) {
                this.mMMDAnimHelper.animate(delta);
            }
            if (this.mPhysicsHelper != undefined && this.mPhysicsHelper.visible) 
                this.mPhysicsHelper.update();

            if (null != this.mWater) {
                if (null != this.mWater.material) {
                    this.mWater.material.uniforms.time.value += delta;
                }
                if (null != this.mWaterSplash.material) {
                    this.mWaterSplash.material.uniforms.time.value += delta;
                }
                if (null != this.mWater.material && null != this.mWaterSplash.material) {
                    this.checkWaterHit();
                }
            }
        }

        this.updateLights();

        this.mRenderer.clear();
        this.mRenderer.render(this.mScene, this.mCamera);
        // this.mRenderer.setFaceCulling(THREE.CullFaceBack);

        if (null != this.mStats)
            this.mStats.update();

        const self = this;
        if (this.mContinuous) {
            requestAnimationFrame(function(){ 
                self.render(); 
            });
        }
    }

    checkWaterHit() {
        var waterHeightThreshold = 0.6;
        var moveThreshold = 0.1;
        var pos = new THREE.Vector3();

        for (var i = 0, len = this.WaterHitCheckBoneIndices.length; i < len; i++) {
            var boneIndex = this.WaterHitCheckBoneIndices[i];
            var previousPosition = this.mPreviousBonePositions[i];

            this.mLastModel.skeleton.bones[boneIndex].getWorldPosition(pos);

            if ((previousPosition.y >= waterHeightThreshold && pos.y < waterHeightThreshold) ||
                 (previousPosition.y < waterHeightThreshold && pos.y >= waterHeightThreshold) ||
                 (pos.y < waterHeightThreshold && this.getLength(previousPosition, pos) > moveThreshold)) {
                this.addRipple(pos.x, pos.z);
            }

            previousPosition.copy( pos );
        }
    }

    getLength(p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2.0) + Math.pow(p1.y - p2.y, 2.0) + Math.pow(p1.z - p2.z, 2.0));
    }

    addRipple(x, y) {
        var uniforms = this.mWater.material.uniforms;
        var currentTime = uniforms.time.value;

        uniforms.circleWaveTriggerTimes.value[this.mSplashIndex] = currentTime;
        uniforms.circleWaveCenters.value[this.mSplashIndex].set(x / (this.WATER_SIZE * 0.5), -y / (this.WATER_SIZE * 0.5));
        uniforms.circleWaveNum.value = this.WATER_SPLASH_MAX_NUM;

        for (var i = 0; i < this.WATER_SPLASH_PARTICLE_NUM; i++) {
            var index = this.mSplashIndex * this.WATER_SPLASH_PARTICLE_NUM + i;

            this.mWaterSplash.geometry.attributes.inputTime.array[index + i] = currentTime;
            this.mWaterSplash.geometry.attributes.translate.array[index * 3 + 0] = x;
            this.mWaterSplash.geometry.attributes.translate.array[index * 3 + 1] = 0;
            this.mWaterSplash.geometry.attributes.translate.array[index * 3 + 2] = y;
        }

        this.mWaterSplash.geometry.attributes.inputTime.needsUpdate = true;
        this.mWaterSplash.geometry.attributes.translate.needsUpdate = true;

        if (++this.mSplashIndex >= this.WATER_SPLASH_MAX_NUM) 
            this.mSplashIndex = 0;
    }

    updateLights() {
        if (null == this.mFireWormLights) {
            return ;
        }
        var time = Date.now() * 0.0006;
        for (var i = 0, il = this.mFireWormLights.length; i < il; i++) {
            var light = this.mFireWormLights[i];
            var x = Math.sin(time + i * 7.0) * 24 * Math.abs(Math.sin(time / i / 7.0));
            var y = Math.cos(time + i * 5.0) * 15 * Math.abs(Math.sin(time / i / 13.0)) + 6;
            var z = Math.cos(time + i * 3.0) * 24 * Math.abs(Math.sin(time / i / 17.0));
            light.position.set(x, y, z);
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
                    document.getElementById('text-progress').innerHTML = "完成";
                }
            } else {
                // var percentComplete = Math.round((xhr.loaded / xhr.total * 100), 2);
                // var progressBarStyleValue = percentComplete + "%";
                // $("#progressTitle").html(fileType + ": " + fileName + "已加载 " + progressBarStyleValue 
                //     + '<span class="glyphicon glyphicon-arrow-down" style="color: rgb(0, 255, 255); font-size: 15px;"></span>');
                // $("#progressBar").attr("style", "width:" + progressBarStyleValue + ";");
                // $("#progressBar").attr("class", "progress-bar progress-bar-info") 
                var percentComplete = Math.round((xhr.loaded / xhr.total * 100), 2);
                document.getElementById('text-progress').innerHTML = fileType + " —— " + percentComplete + '%';
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
        this.mRenderTarget.setSize(window.innerWidth, window.innerHeight);
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

    updateDayOrNight(checked) {
        if (null != this.mAmbientLight) {
            this.deleteGroup(this.mAmbientLight);
        }
        if (null != this.mDirectionalLight) {
            this.deleteGroup(this.mDirectionalLight);
        }
        if (null != this.mSpotLight) {
            this.deleteGroup(this.mSpotLight);
        }
        if (null != this.mLensFlare) {
            this.deleteGroup(this.mLensFlare);
        }
        if (null != this.mFireWormLights) {
            this.deleteGroup(this.mFireWormLights);
        }
        if (null != this.mSkyBox) {
            this.deleteGroup(this.mSkyBox);
        }
        if (!checked) 
            document.getElementById("day_or_night").innerHTML = "白天";
        else
            document.getElementById("day_or_night").innerHTML = "晚上";

        this.initSkyBox(!checked);
        this.initLight(!checked);
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

    deleteGroup(group) {
        if (!group) return ;
        if (group instanceof THREE.Mesh) {
            if (null != group.geometry) {
                group.geometry.dispose();
                group.geometry = null;
            }
            if (null != group.material) {
                if (Array.isArray(group.material)) {
                    group.material.forEach(mat => {
                        mat.dispose();
                        mat = null;
                    });
                } else {
                    group.material.dispose();
                    group.material = null;
                }
            }
            if (null != group.texture) {
                group.texture.dispose();
                group.texture = null;
            }
            this.mScene.remove(group);
            group = null;
            return ;
        }
        if (group instanceof THREE.AmbientLight || group instanceof THREE.DirectionalLight 
            || group instanceof THREE.SpotLight || group instanceof THREE.PointLight) {
            this.mScene.remove(group);
            return ;
        }
        if (Array.isArray(group)) {
            for (var i = 0, len = group.length; i < len; i++) {
                this.deleteGroup(group[i]);
            }
            return ;
        }
        // 删除掉所有的模型组内的mesh
        group.traverse(function (item) {
            if (item instanceof THREE.Mesh) {
                if (null != item.geometry) {
                    item.geometry.dispose(); // 删除几何体
                    item.geometry = null;
                }

                if (null != item.material) {
                    item.material.dispose(); // 删除材质
                    item.material = null;
                }

                if (null != item.texture) {
                    item.texture.dispose(); // 删除材质
                    item.texture = null;
                }
                item = null;
            }
        });
        this.mScene.remove(group);
    }

    onDestroy() {
        var children = this.mScene.children;
        for (var i = 0; i < children.length; i++) {
            deleteGroup(children[i]);
        }
    }

    sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
      }
}

export {BugByDaylight};