const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });
}

// Scroll-triggered animations: add .is-visible when element enters viewport
(function () {
  var animated = document.querySelectorAll(".animate-on-scroll");
  if (!animated.length) return;
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { rootMargin: "0px 0px -60px 0px", threshold: 0.1 }
  );
  animated.forEach(function (el) {
    observer.observe(el);
  });
})();

// Contact page: duration options depend on selected service (matches slider/cenník)
(function () {
  const serviceSelect = document.getElementById("res-service");
  const durationSelect = document.getElementById("res-duration");
  if (!serviceSelect || !durationSelect) return;

  const serviceDurations = {
    "lomi": [ [30], [60], [90], [120] ],
    "lavove-kamene": [ [60], [90], [120] ],
    "antistres": [ [30], [60] ],
    "lymfaticka": [ [30], [60], [90, "+ nohy"] ],
    "reflexna": [ [60], [90], [120] ],
    "klasicka": [ [30], [60], [90] ],
    "myofascialne": [ [30], [60], [90, "+ klasická masáž chrbta"] ]
  };

  function updateDurationOptions() {
    const service = serviceSelect.value;
    durationSelect.innerHTML = "";
    const placeholder = document.createElement("option");
    placeholder.value = "";
    if (!service) {
      placeholder.textContent = "Najprv vyberte typ služby";
      durationSelect.appendChild(placeholder);
      durationSelect.disabled = true;
      return;
    }
    placeholder.textContent = "Vyberte trvanie";
    durationSelect.appendChild(placeholder);
    const opts = serviceDurations[service];
    if (opts && opts.length) {
      durationSelect.disabled = false;
      opts.forEach(function (o) {
        const min = o[0];
        const suffix = o[1] ? " (" + o[1] + ")" : "";
        const option = document.createElement("option");
        option.value = min;
        option.textContent = min + " min" + suffix;
        durationSelect.appendChild(option);
      });
    }
  }

  serviceSelect.addEventListener("change", updateDurationOptions);
  updateDurationOptions();

  // Prefill from typy-masazi: ?service=...&duration=...
  var params = new URLSearchParams(window.location.search);
  var prefilledService = params.get("service");
  var prefilledDuration = params.get("duration");
  if (prefilledService && serviceDurations[prefilledService]) {
    serviceSelect.value = prefilledService;
    updateDurationOptions();
    if (prefilledDuration) {
      var durOpt = durationSelect.querySelector('option[value="' + prefilledDuration + '"]');
      if (durOpt) {
        durationSelect.value = prefilledDuration;
        durationSelect.disabled = false;
      }
    }
  }
})();

// Ensure duration (Trvanie masáže) is sent with form – disabled fields are not submitted
(function () {
  var form = document.getElementById("reservation-form");
  var durationSelect = document.getElementById("res-duration");
  var durationDisplay = document.getElementById("res-duration-display");
  if (!form || !durationSelect) return;
  form.addEventListener("submit", function () {
    if (durationSelect.value) {
      durationSelect.disabled = false;
      if (durationDisplay && durationSelect.options[durationSelect.selectedIndex]) {
        durationDisplay.value = durationSelect.options[durationSelect.selectedIndex].text;
      }
    }
  });
})();
