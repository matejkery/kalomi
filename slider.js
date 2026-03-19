(function () {
  var track = document.getElementById("sliderTrack");
  var dotsContainer = document.getElementById("sliderDots");
  var prevBtn = document.querySelector(".slider-arrow-prev");
  var nextBtn = document.querySelector(".slider-arrow-next");

  if (!track || !prevBtn || !nextBtn) return;

  var slides = track.querySelectorAll(".slider-slide");
  var dots = dotsContainer ? dotsContainer.querySelectorAll(".slider-dot") : [];
  var total = slides.length;
  var current = 0;

  var hash = window.location.hash;
  if (hash) {
    var index = parseInt(hash.slice(1), 10);
    if (!isNaN(index) && index >= 0 && index < total) current = index;
  }

  var currentNameEl = document.getElementById("sliderCurrentName");
  var currentDescEl = document.getElementById("sliderCurrentDesc");
  var longDescCurrent = document.getElementById("sliderLongDescCurrent");
  var durationSelect = document.getElementById("slider-duration");
  var rezervujBtn = document.getElementById("sliderRezervujBtn");

  var slideOptions = [
    [ [30, 18], [60, 28], [90, 38], [120, 48] ],
    [ [60, 32], [90, 42], [120, 52] ],
    [ [30, 18], [60, 28] ],
    [ [30, 18], [60, 28], [90, 38, "+ nohy"] ],
    [ [60, 28], [90, 38], [120, 48] ],
    [ [30, 18], [60, 28], [90, 38] ],
    [ [30, 22], [60, 32], [90, 42, "+ klasická masáž chrbta"] ]
  ];
  var serviceValues = ["lomi", "lavove-kamene", "antistres", "reflexna", "lymfaticka", "klasicka", "myofascialne"];

  function updateRezervujHref() {
    if (!rezervujBtn || !durationSelect) return;
    var val = durationSelect.value;
    if (val) {
      var parts = val.split("|");
      var minutes = parts[0];
      var service = serviceValues[current];
      rezervujBtn.href = "kontakt.html?service=" + encodeURIComponent(service) + "&duration=" + encodeURIComponent(minutes);
    } else {
      rezervujBtn.href = "kontakt.html";
    }
  }

  function updateDurationSelect() {
    if (!durationSelect) return;
    var opts = slideOptions[current];
    if (!opts || opts.length === 0) {
      durationSelect.innerHTML = "";
      durationSelect.disabled = true;
      updateRezervujHref();
      return;
    }
    durationSelect.disabled = false;
    durationSelect.innerHTML = "";
    opts.forEach(function (o) {
      var min = o[0];
      var price = o[1];
      var suffix = o[2] ? " (" + o[2] + ")" : "";
      var text = min + " min – " + price + " €" + suffix;
      var value = min + "|" + price + (o[2] ? "|" + o[2] : "");
      var option = document.createElement("option");
      option.value = value;
      option.textContent = text;
      durationSelect.appendChild(option);
    });
    updateRezervujHref();
  }

  function updateSlider() {
    track.style.transform = "translateX(-" + current * 100 + "%)";
    var slide = slides[current];
    if (slide && currentNameEl) {
      currentNameEl.textContent = slide.getAttribute("data-title") || "";
    }
    if (slide && currentDescEl) {
      currentDescEl.textContent = slide.getAttribute("data-desc") || "";
    }
    if (slide && longDescCurrent) {
      var longDescEl = slide.querySelector(".slider-long-desc");
      longDescCurrent.innerHTML = longDescEl ? longDescEl.innerHTML : "";
    }
    dots.forEach(function (dot, i) {
      var isActive = i === current;
      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-selected", isActive);
    });
    updateDurationSelect();
  }

  prevBtn.addEventListener("click", function () {
    current = current === 0 ? total - 1 : current - 1;
    updateSlider();
  });

  nextBtn.addEventListener("click", function () {
    current = current === total - 1 ? 0 : current + 1;
    updateSlider();
  });

  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () {
      current = i;
      updateSlider();
    });
  });

  updateSlider();

  if (durationSelect) {
    durationSelect.addEventListener("change", updateRezervujHref);
  }
})();
