(function (global) {
  var FOG_URL = "images/themes/cloudy-fog.png";
  var THREE_URL = "js/vendor/three.min.js";
  var RAIN_COUNT = 12000;

  var running = false;
  var starting = false;
  var rafId = null;
  var threePromise = null;
  var resizeHandler = null;

  var scene = null;
  var camera = null;
  var renderer = null;
  var flash = null;
  var rain = null;
  var cloudParticles = [];

  function prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function loadThree() {
    if (global.THREE) {
      return Promise.resolve(global.THREE);
    }
    if (threePromise) {
      return threePromise;
    }
    threePromise = new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      script.src = THREE_URL;
      script.onload = function () {
        if (global.THREE) {
          resolve(global.THREE);
        } else {
          reject(new Error("THREE global missing after load"));
        }
      };
      script.onerror = function () {
        threePromise = null;
        reject(new Error("Failed to load " + THREE_URL));
      };
      document.head.appendChild(script);
    });
    return threePromise;
  }

  function getHost() {
    return document.querySelector(".theme-fx--cloudy");
  }

  function onWindowResize() {
    if (!camera || !renderer) {
      return;
    }
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    if (!running || !renderer || !scene || !camera) {
      rafId = null;
      return;
    }

    for (var i = 0; i < cloudParticles.length; i++) {
      cloudParticles[i].rotation.z -= 0.002;
    }

    if (rain) {
      rain.position.z -= 0.222;
      if (rain.position.z < -200) {
        rain.position.z = 0;
      }
    }

    if (flash) {
      // Prefer intensity — `.power` is unreliable across Three builds.
      var flashLevel =
        typeof flash.intensity === "number" ? flash.intensity : 0;
      if (Math.random() > 0.93 || flashLevel > 100) {
        if (flashLevel < 100) {
          flash.position.set(
            Math.random() * 400,
            300 + Math.random() * 200,
            100
          );
        }
        flash.intensity = 50 + Math.random() * 500;
      }
    }

    try {
      renderer.render(scene, camera);
    } catch (err) {
      console.error("[CloudyStorm] render failed", err);
      stop();
      return;
    }

    rafId = requestAnimationFrame(animate);
  }

  function buildClouds(THREE) {
    var PlaneGeo = THREE.PlaneGeometry || THREE.PlaneBufferGeometry;
    if (!PlaneGeo) {
      console.warn("[CloudyStorm] No plane geometry available");
      return;
    }

    var loader = new THREE.TextureLoader();
    loader.load(
      FOG_URL,
      function (texture) {
        if (!running || !scene) {
          return;
        }
        var cloudGeo = new PlaneGeo(500, 500);
        var cloudMaterial = new THREE.MeshLambertMaterial({
          map: texture,
          transparent: true
        });

        for (var p = 0; p < 25; p++) {
          var cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
          cloud.position.set(
            Math.random() * 800 - 400,
            500,
            Math.random() * 500 - 450
          );
          cloud.rotation.x = 1.16;
          cloud.rotation.y = -0.12;
          cloud.rotation.z = Math.random() * 360;
          cloud.material.opacity = 0.6;
          cloudParticles.push(cloud);
          scene.add(cloud);
        }
      },
      undefined,
      function (err) {
        console.warn("[CloudyStorm] fog texture failed to load:", FOG_URL, err);
      }
    );
  }

  function buildScene(THREE) {
    var mount = getHost();
    if (!mount) {
      throw new Error("Missing .theme-fx--cloudy mount");
    }

    // Clear any prior canvas left behind.
    while (mount.firstChild) {
      mount.removeChild(mount.firstChild);
    }

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 1;
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.27;

    scene.add(new THREE.AmbientLight(0x555555));

    var directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

    flash = new THREE.PointLight(0x062d89, 30, 500, 1.7);
    flash.position.set(200, 300, 100);
    scene.add(flash);

    renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    scene.fog = new THREE.FogExp2(0x11111f, 0.002);
    renderer.setClearColor(scene.fog.color);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    var positions = new Float32Array(RAIN_COUNT * 3);
    for (var i = 0; i < RAIN_COUNT; i++) {
      positions[i * 3] = Math.random() * 400 - 200;
      positions[i * 3 + 1] = Math.random() * 500 - 250;
      positions[i * 3 + 2] = Math.random() * 400 - 200;
    }
    var rainGeo = new THREE.BufferGeometry();
    rainGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    rain = new THREE.Points(
      rainGeo,
      new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.1,
        transparent: true
      })
    );
    scene.add(rain);

    resizeHandler = onWindowResize;
    window.addEventListener("resize", resizeHandler);

    // Rain/lightning should run even if the fog texture is slow or fails.
    animate();
    buildClouds(THREE);
  }

  function destroyScene() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    if (resizeHandler) {
      window.removeEventListener("resize", resizeHandler);
      resizeHandler = null;
    }
    if (renderer) {
      try {
        renderer.dispose();
      } catch (e) {
        /* ignore */
      }
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    }
    cloudParticles = [];
    scene = null;
    camera = null;
    renderer = null;
    flash = null;
    rain = null;
  }

  function start() {
    if (running || starting || prefersReducedMotion()) {
      return;
    }
    starting = true;

    loadThree()
      .then(function (THREE) {
        starting = false;
        if (!document.documentElement.classList.contains("theme-cloudy")) {
          return;
        }
        destroyScene();
        running = true;
        buildScene(THREE);
      })
      .catch(function (err) {
        starting = false;
        running = false;
        console.error("[CloudyStorm] failed to start", err);
      });
  }

  function stop() {
    starting = false;
    running = false;
    destroyScene();
  }

  function setActive(isActive) {
    if (isActive) {
      start();
    } else {
      stop();
    }
  }

  global.CloudyStormTheme = {
    setActive: setActive,
    start: start,
    stop: stop
  };
})(window);
