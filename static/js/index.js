window.HELP_IMPROVE_VIDEOJS = false;

const INTERP_BASE = "./static/interpolation/stacked";
const NUM_INTERP_FRAMES = 240;

let interp_images = [];
function preloadInterpolationImages() {
  for (let i = 0; i < NUM_INTERP_FRAMES; i++) {
    const path = `${INTERP_BASE}/${String(i).padStart(6, '0')}.jpg`;
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  const image = interp_images[i];
  image.ondragstart = image.oncontextmenu = () => false;
  $('#interpolation-image-wrapper').empty().append(image);
}

function resetVideos() {
  document.querySelectorAll('video').forEach(video => {
    video.currentTime = 0;
    video.play();
  });
}

function fastForwardVideos() {
  document.querySelectorAll('video').forEach(video => {
    video.currentTime += 10;
    video.play();
  });
}

function rewindVideos() {
  document.querySelectorAll('video').forEach(video => {
    video.currentTime -= 10;
    video.play();
  });
}

function endVideos() {
  document.querySelectorAll('video').forEach(video => {
    video.currentTime = video.duration;
    video.pause();
  });
}

function playPauseVideo() {
  document.querySelectorAll('video').forEach(video => {
    video.paused || video.ended ? video.play() : video.pause();
  });
}

$(document).ready(function() {
  // Navbar burger click event
  $(".navbar-burger").click(function() {
    $(this).toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  // Initialize carousels
  const options = {
    slidesToScroll: 1,
    slidesToShow: 3,
    loop: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000
  };
  const carousels = bulmaCarousel.attach('.carousel', options);
  carousels.forEach(carousel => {
    carousel.on('before:show', state => console.log(state));
  });

  const element = document.querySelector('#my-element');
  if (element?.bulmaCarousel) {
    element.bulmaCarousel.on('before-show', state => console.log(state));
  }

  // Preload interpolation images
  preloadInterpolationImages();

  $('#interpolation-slider').on('input', function() {
    setInterpolationImage(this.value);
  });

  setInterpolationImage(0);
  $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

  bulmaSlider.attach();

  // Button group active class toggle
  document.querySelectorAll('.button-group span').forEach(button => {
    button.addEventListener('click', function() {
      this.parentNode.querySelectorAll('span').forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Model and optimizer button click event
  const modelButtons = document.querySelectorAll('.model-button');
  const optimizerButtons = document.querySelectorAll('.optimizer-button');
  const rows = document.querySelectorAll('.results-row');

  const setActiveButton = (buttons, updateTable) => {
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        buttons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        updateTable();
      });
    });
  };

  setActiveButton(modelButtons, updateTable);
  setActiveButton(optimizerButtons, updateTable);

  function updateTable() {
    const currentModel = document.querySelector('.model-button.active').getAttribute('data-model');
    const currentOptimizer = document.querySelector('.optimizer-button.active').getAttribute('data-optimizer');

    rows.forEach(row => {
      if (row.classList.contains(currentModel) && row.classList.contains(currentOptimizer)) {
        row.style.display = ''; // Show row
      } else {
        row.style.display = 'none'; // Hide row
      }
    });
  }

  updateTable();

  // Video controls
  const video = document.querySelector('video');
  const progress = document.querySelector('.controls progress');

  function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;
  }

  video.addEventListener('timeupdate', updateProgress);
  video.addEventListener('ended', () => {
    progress.value = 100;
  });

  document.querySelector('.button.reset').addEventListener('click', () => {
    video.currentTime = 0;
    progress.value = 0;
  });
});

