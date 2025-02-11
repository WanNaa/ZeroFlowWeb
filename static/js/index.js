window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

    //  *********  Added
    document.querySelectorAll('.button-group span').forEach(button => {
      button.addEventListener('click', function() {
        // Remove 'active' class from all buttons in the same group
        this.parentNode.querySelectorAll('span').forEach(btn => btn.classList.remove('active'));
        // Add 'active' class to the clicked button
        this.classList.add('active');
      });
    });


    // 获取所有的模型按钮
    const modelButtons = document.querySelectorAll('.model-button');
    // 获取所有的优化器按钮
    const optimizerButtons = document.querySelectorAll('.optimizer-button');
    // 获取所有的表格行
    const rows = document.querySelectorAll('.results-row');

    // 为模型按钮添加点击事件监听器
    modelButtons.forEach(button => {
        button.addEventListener('click', function() {
        // 移除所有模型按钮的 'active' 类
        modelButtons.forEach(btn => btn.classList.remove('active'));
        // 为当前点击的模型按钮添加 'active' 类
        this.classList.add('active');

        // 更新表格行的显示
        updateTable();
        });
    });

    // 为优化器按钮添加点击事件监听器
    optimizerButtons.forEach(button => {
        button.addEventListener('click', function() {
        // 移除所有优化器按钮的 'active' 类
        optimizerButtons.forEach(btn => btn.classList.remove('active'));
        // 为当前点击的优化器按钮添加 'active' 类
        this.classList.add('active');

        // 更新表格行的显示
        updateTable();
        });
    });

    // 更新表格行的函数
    function updateTable() {
    // 获取当前激活的模型和优化器
    const currentModel = document.querySelector('.model-button.active').getAttribute('data-model');
    const currentOptimizer = document.querySelector('.optimizer-button.active').getAttribute('data-optimizer');

    // 遍历所有行，根据模型和优化器显示或隐藏行
    rows.forEach(row => {
        // 检查行是否同时匹配当前模型和优化器
        if (row.classList.contains(currentModel) && row.classList.contains(currentOptimizer)) {
            row.style.display = ''; // 显示行
        } else {
            row.style.display = 'none'; // 隐藏行
            }
        });
    }

// 初始化表格显示
updateTable();


})
