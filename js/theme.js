(function () {
  var STORAGE_KEY = "witold1-theme";
  var THEMES = ["auto", "stargazer", "winter", "galaxy", "polygon"];
  var MANUAL_THEMES = ["stargazer", "winter", "galaxy", "polygon"];
  var THEME_CLASSES = [
    "theme-auto",
    "theme-light",
    "theme-dark",
    "theme-stargazer",
    "theme-winter",
    "theme-galaxy",
    "theme-polygon"
  ];

  // Auto schedule (local time):
  //   06:00–11:00 morning  → galaxy
  //   11:00–17:00 day      → winter (Dec–Feb) / galaxy (other months)
  //   17:00–21:00 evening  → polygon
  //   21:00–06:00 night    → stargazer
  var MORNING_HOUR = 6;
  var DAY_HOUR = 11;
  var EVENING_HOUR = 17;
  var NIGHT_HOUR = 21;
  var BOUNDARIES = [MORNING_HOUR, DAY_HOUR, EVENING_HOUR, NIGHT_HOUR];

  var refreshTimer = null;

  function getStoredPreference() {
    try {
      var value = localStorage.getItem(STORAGE_KEY);
      // Migrate former LittleLink "default" to seasonal auto.
      if (value === "default" || value === null) {
        return "auto";
      }
      return THEMES.indexOf(value) !== -1 ? value : "auto";
    } catch (e) {
      return "auto";
    }
  }

  function isWinterMonth(date) {
    var month = date.getMonth();
    return month === 11 || month === 0 || month === 1;
  }

  function resolveAutoTheme(date) {
    date = date || new Date();
    var hour = date.getHours();

    if (hour >= NIGHT_HOUR || hour < MORNING_HOUR) {
      return "stargazer";
    }
    if (hour < DAY_HOUR) {
      return "galaxy";
    }
    if (hour < EVENING_HOUR) {
      return isWinterMonth(date) ? "winter" : "galaxy";
    }
    return "polygon";
  }

  function resolveTheme(preference, date) {
    if (MANUAL_THEMES.indexOf(preference) !== -1) {
      return preference;
    }
    return resolveAutoTheme(date);
  }

  function syncInteractiveThemes(theme) {
    if (window.PolygonTheme) {
      window.PolygonTheme.setActive(theme === "polygon");
    }
    if (window.CloudyStormTheme) {
      window.CloudyStormTheme.setActive(theme === "cloudy");
    }
  }

  function applyThemeClass(theme) {
    var root = document.documentElement;
    var classes = root.className.split(/\s+/).filter(Boolean);

    classes = classes.filter(function (name) {
      return THEME_CLASSES.indexOf(name) === -1;
    });

    classes.push("theme-" + theme);
    root.className = classes.join(" ");
    syncInteractiveThemes(theme);
  }

  function syncPicker(preference) {
    var select = document.getElementById("theme-select");
    if (select && select.value !== preference) {
      select.value = preference;
    }
  }

  function applyPreference(preference) {
    if (THEMES.indexOf(preference) === -1) {
      preference = "auto";
    }

    var resolved = resolveTheme(preference);
    applyThemeClass(resolved);
    syncPicker(preference);
    scheduleAutoRefresh(preference);
  }

  function setPreference(preference) {
    if (THEMES.indexOf(preference) === -1) {
      preference = "auto";
    }
    try {
      localStorage.setItem(STORAGE_KEY, preference);
    } catch (e) {
      /* ignore quota / private mode */
    }
    applyPreference(preference);
  }

  function msUntilNextBoundary(date) {
    date = date || new Date();
    var next = new Date(date.getTime());
    next.setSeconds(0, 0);
    next.setMilliseconds(0);

    var hour = date.getHours();
    var i;
    for (i = 0; i < BOUNDARIES.length; i++) {
      if (hour < BOUNDARIES[i]) {
        next.setHours(BOUNDARIES[i], 0, 0, 0);
        return Math.max(1000, next.getTime() - date.getTime() + 250);
      }
    }

    // Past night boundary → next morning.
    next.setDate(next.getDate() + 1);
    next.setHours(MORNING_HOUR, 0, 0, 0);
    return Math.max(1000, next.getTime() - date.getTime() + 250);
  }

  function scheduleAutoRefresh(preference) {
    if (refreshTimer) {
      clearTimeout(refreshTimer);
      refreshTimer = null;
    }
    if (preference !== "auto") {
      return;
    }
    refreshTimer = setTimeout(function () {
      applyPreference("auto");
    }, msUntilNextBoundary());
  }

  // Apply as soon as this deferred script runs.
  applyPreference(getStoredPreference());

  document.addEventListener("DOMContentLoaded", function () {
    applyPreference(getStoredPreference());

    var select = document.getElementById("theme-select");
    if (select) {
      select.addEventListener("change", function () {
        setPreference(select.value);
      });
    }
  });

  document.addEventListener("visibilitychange", function () {
    if (!document.hidden && getStoredPreference() === "auto") {
      applyPreference("auto");
    }
  });
})();
