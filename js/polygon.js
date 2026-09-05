(function (global) {
  var TSPARTICLES_URL = "js/vendor/tsparticles.min.js";
  var CONTAINER_ID = "polygon-particles";

  var OPTIONS = {
    fps_limit: 60,
    detectRetina: true,
    interactivity: {
      detectsOn: "canvas",
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: true, mode: "repulse" },
        resize: true
      },
      modes: {
        push: { particles_nb: 4 },
        repulse: { distance: 200, duration: 0.4 }
      }
    },
    particles: {
      color: { value: "#ffffff" },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.4,
        width: 1
      },
      move: {
        bounce: false,
        direction: "none",
        enable: true,
        outMode: "out",
        random: false,
        speed: 2,
        straight: false
      },
      number: {
        density: { enable: true, area: 800 },
        value: 80
      },
      opacity: { value: 0.5 },
      shape: { type: "circle" },
      size: { random: true, value: 5 }
    }
  };

  var running = false;
  var starting = false;
  var loadPromise = null;
  var container = null;

  function prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function ensureEngine() {
    if (global.tsParticles && typeof global.tsParticles.load === "function") {
      return global.tsParticles;
    }
    if (typeof global.Main === "function") {
      global.tsParticles = new global.Main();
      if (typeof global.tsParticles.init === "function") {
        global.tsParticles.init();
      }
      return global.tsParticles;
    }
    if (typeof global.particlesJS === "function") {
      return {
        load: function (id, options) {
          return Promise.resolve(global.particlesJS(id, options));
        }
      };
    }
    return null;
  }

  function loadLibrary() {
    if (ensureEngine()) {
      return Promise.resolve(ensureEngine());
    }
    if (loadPromise) {
      return loadPromise;
    }
    loadPromise = new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      script.src = TSPARTICLES_URL;
      script.onload = function () {
        var engine = ensureEngine();
        if (engine) {
          resolve(engine);
        } else {
          loadPromise = null;
          reject(new Error("tsParticles global missing after load"));
        }
      };
      script.onerror = function () {
        loadPromise = null;
        reject(new Error("Failed to load " + TSPARTICLES_URL));
      };
      document.head.appendChild(script);
    });
    return loadPromise;
  }

  function getHost() {
    return document.querySelector(".theme-fx--polygon");
  }

  function ensureMount() {
    var host = getHost();
    if (!host) {
      throw new Error("Missing .theme-fx--polygon mount");
    }
    var el = document.getElementById(CONTAINER_ID);
    if (!el) {
      el = document.createElement("div");
      el.id = CONTAINER_ID;
      host.appendChild(el);
    }
    return el;
  }

  function destroyContainer() {
    if (container && typeof container.destroy === "function") {
      try {
        container.destroy();
      } catch (e) {
        /* ignore */
      }
    }
    container = null;

    var el = document.getElementById(CONTAINER_ID);
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }

    if (global.tsParticles && typeof global.tsParticles.domItem === "function") {
      try {
        var item = global.tsParticles.domItem(0);
        if (item && typeof item.destroy === "function") {
          item.destroy();
        }
      } catch (e) {
        /* ignore */
      }
    }
  }

  function start() {
    if (running || starting || prefersReducedMotion()) {
      return;
    }
    starting = true;

    loadLibrary()
      .then(function (engine) {
        starting = false;
        if (!document.documentElement.classList.contains("theme-polygon")) {
          return;
        }
        destroyContainer();
        ensureMount();
        running = true;
        return engine.load(CONTAINER_ID, OPTIONS).then(function (c) {
          container = c || null;
          if (!document.documentElement.classList.contains("theme-polygon")) {
            destroyContainer();
            running = false;
          }
        });
      })
      .catch(function (err) {
        starting = false;
        running = false;
        console.error("[PolygonTheme] failed to start", err);
      });
  }

  function stop() {
    starting = false;
    running = false;
    destroyContainer();
  }

  function setActive(isActive) {
    if (isActive) {
      start();
    } else {
      stop();
    }
  }

  global.PolygonTheme = {
    setActive: setActive,
    start: start,
    stop: stop
  };
})(window);
