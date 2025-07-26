
$(function(){

	//刷卡優惠按鈕自動抓日期更新
	var toggleCardCampaign = document.querySelector('#toggleCardCampaign');
	toggleCardCampaign.addEventListener('click', function(){
		var yyyymm = dayjs().format('YYYYMM');
		window.open('https://www.vivatv.com.tw/html/'+ yyyymm +'_creditcard.html');
	});
	// $('#toggleCardCampaign').click(function(){
	// 	var yyyymm = dayjs().format('YYYYMM');
	// 	window.open('https://www.vivatv.com.tw/html/'+ yyyymm +'_creditcard.html');
	// });

	//圖片路徑後加上亂數(測試用)
	// $('img').each(function(){
	// 	var imgsrc = $(this).attr('data-src');
	// 	imgsrc = imgsrc + "?nocache=" + Math.random();
	// 	$(this).attr('data-src', imgsrc);
	// });


	//lazy load
	// $('img.lazy-load').each(function(index, element){
		
	// 	let ew = element.width;
	// 	let eh = element.height;

	// 	console.log('ew:' + ew);
	// 	console.log('eh:' + eh);
	// 	console.log('element:' + element);


	// 	if ( ew == eh ) {
	// 		if ( $(element).hasClass('rounded-circle') ) {
	// 			$(element).wrap('<div class="w-100 overflow-hidden rounded-circle is-load zoom-in"></div>');	
	// 		} else if ( !$(element).hasClass('no-zoom-in') ) {
	// 			$(element).wrap('<div class="w-100 overflow-hidden is-load zoom-in"></div>');
	// 		}
	// 	} else {
	// 		$(element).wrap('<div class="is-load"></div>');
	// 	}
		
	// });
	var imgLazyLoad = document.querySelectorAll('img.lazy-load');
	
	imgLazyLoad.forEach(function(element){

		let ew = element.offsetWidth;
		let eh = element.offsetHeight;		

		if ( ew == eh ) {
			if ( element.classList.contains('rounded-circle') ) {
				var wrapper = document.createElement('div');
				wrapper.classList.add('w-100', 'overflow-hidden', 'rounded-circle', 'is-load', 'zoom-in');
				element.parentNode.insertBefore(wrapper, element);
				wrapper.appendChild(element);
			} else if ( !element.classList.contains('no-zoom-in') ) {
				var wrapper = document.createElement('div');
				wrapper.classList.add('w-100', 'overflow-hidden', 'is-load', 'zoom-in');
				element.parentNode.insertBefore(wrapper, element);
				wrapper.appendChild(element);
			}
		} else {
			var wrapper = document.createElement('div');
			wrapper.classList.add('is-load');
			element.parentNode.insertBefore(wrapper, element);
			wrapper.appendChild(element);
		}
	});



	//enable tooltips
	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
	  return new bootstrap.Tooltip(tooltipTriggerEl)
	})

	


	//結帳流程中隱藏右上角的購物車圖示
	// if ($('#checkOutStep')[0]) {
	// 	$('#toggleCart, .cart-badge').hide();
	// }

	var checkOutStep = document.querySelector('#checkOutStep');
	if (checkOutStep[0]) {
		var toggleCart = document.querySelector('#toggleCart');
		var cartBadge = document.querySelector('.cart-badge');
		toggleCart.style.display = 'none';
		cartBadge.style.display = 'none';
	}


	var targetImg = $('#swpProduct .lazy-load');

	$(targetImg).click(function(){
		var targetImgSrc = $(this).attr('data-src');
		$('body').append(
		'<div class="modal fade" id="targetImgModal" aria-hidden="true" aria-labelledby="targetImgModalLabel" tabindex="-1">'+
		  '<div class="modal-dialog modal-dialog-centered" style="max-width: 750px;">'+
		    '<div class="modal-content rounded-0">'+
		      '<div class="modal-body p-0"></div>'+
		    '</div>'+
		  '</div>'+
		'</div>');
		
		$('#targetImgModal .modal-body').html('<img src="'+ targetImgSrc +'" class="img-fluid">');
		$('#targetImgModal').modal('show');
	});


	

  $('#swpProductThumb .swiper-slide').on('mouseover', function() {
	  swpProduct.slideTo($(this).index() + 1);
  });

  $('#swpProductThumbInModal .swiper-slide').on('mouseover', function() {
	  swpProductInModal.slideTo($(this).index() + 1);
  });


	$('.swiper-pagination-bullet').hover(function() {
    $( this ).trigger( "click" );
  });

});









// function appendHomeBulletin() {
// 	var homeBulletinModal = 
// 	'<div class="modal fade" id="homeBulletinModal" tabindex="-1" aria-labelledby="homeBulletinModal" aria-hidden="true">'+
//     '<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">'+
//       '<div class="modal-content rounded-0">'+
//         '<div class="modal-header">'+
//           '<span class="modal-title fs-6">配送公告</span>'+
//           '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'+
//         '</div>'+
//         '<div class="modal-body p-2 fs-65">'+
//           '<div class="d-flex flex-column justify-content-center p-2">'+
//             '<div class="d-flex justify-content-center mb-2 fs-65">因疫情關係宅配的貨運量較大，故配送時間將會有所延遲，暫無法指定配送時段，請您見諒！</div>'+
//             '<div class="d-flex justify-content-center mb-2 fs-65">提醒您，因避免接觸，部份地區宅配可能會與您電聯約定指定配送區域，並以拍照留存替代簽名。</div>'+
//           '</div>'+
//         '</div>'+
//         '<div class="modal-footer p-2">'+
//           '<div class="d-flex flex-column w-100">'+
//             '<div class="d-flex justify-content-between flex-column">'+
//               '<div class="btn-group" role="group">'+
//                 '<button type="button" class="btn btn-danger rounded-pill w-100 m-1" data-bs-dismiss="modal">確定</button>'+
//               '</div>'+
//             '</div>'+
//           '</div>'+
//         '</div>'+
//       '</div>'+
//     '</div>'+
//   '</div>';

  

// 	if ($('.shoppingcart-list')[0] && $('.wizard span:first-child').hasClass('active')) {

// 		$('#mainWrapper').append(homeBulletinModal);
// 		console.log('homeBulletinModal appended');

// 	}
// }

// $(function(){
// 	appendHomeBulletin();
// 	setTimeout(function(){
// 		$('#homeBulletinModal').modal('show');
// 	}, 500);
// });




//desktop版分類bar
var desktopNav = document.querySelector('#desktopNav');
var desktopNavLink = document.querySelectorAll('#desktopNav .nav-link');
var desktopTabPane = document.querySelectorAll('#desktopNav .tab-pane');

const showDesktopNav =  function() {
	for (var i = 0; i < desktopNavLink.length; i++) {
		desktopNavLink[i].classList.remove('active');
		desktopTabPane[i].classList.remove('show', 'active');
	}
	
	var tabTrigger = new bootstrap.Tab(this);
	tabTrigger.show();
}

const hideDesktopNav =  function() {
	for (var i = 0; i < desktopNavLink.length; i++) {
		desktopNavLink[i].classList.remove('active');
		desktopTabPane[i].classList.remove('show', 'active');
	}
}

const clickToPrimaryCategory = function(e) {
	e.preventDefault();
	var u = this.getAttribute('data-url');
	location.href = u;
}

for (var i = 0; i < desktopNavLink.length; i++) {
	desktopNavLink[i].addEventListener('mouseenter', showDesktopNav, false);
	desktopNavLink[i].addEventListener('click', clickToPrimaryCategory, false);
}

desktopNav.addEventListener('mouseleave', hideDesktopNav, false);

/*$('#desktopNav .nav-link').mouseenter(function() {
  $('#desktopNav .nav-link').removeClass('active');
  $('#desktopNav .tab-pane').removeClass('show active');
  $(this).tab('show');
});

$('#desktopNav .nav-link').on('click', function(e) {
	e.preventDefault();
	var u = $(this).attr('data-url');
	location.href = u;
});


$('#desktopNav').mouseleave(function() {
	$('#desktopNav .nav-link').removeClass('active');
	$('#desktopNav .tab-pane').removeClass('show active');
});*/


//載入或resize時去檢查
$(window).on('load resize', function(e){
	//檢查viewport高度
	checkViewportHeight();
	adjustPageHeight();
	//檢查「主題活動文字」區塊寬度
	checkWidthToToggle('#campaignLink', '#campaignToggleBtn');
	checkWidthToToggle('#subCategory', '#subCategoryToggleBtn');
});



$('#toggleMenu').click(function(){
	
	$('#Search').collapse('hide');
	//檢查viewport高度
	checkViewportHeight();
	//檢查「品牌旗鑑」區塊寬度
	setTimeout(function(){
		checkWidthToToggle('#brandLink', '#brandToggleBtn');
	}, 500);
	
})

//複製到剪貼簿
function copyToClipboard(t) {
    var $temp = $("<input>");
    $("body").append($temp);
    var element = $(t).parent().find('.freight-id').text();
    
    $temp.val(element).select();
    document.execCommand("copy");
    $temp.remove();

    snackBar('#copiedToClipboard');
}

//檢查viewport高度的函式
function checkViewportHeight() {
	let vh = window.innerHeight;
	let nh = $('#topNav').outerHeight();
	let moh = $('.modal-header').outerHeight();
	
	let sh = $('.secondary-category').outerHeight();
	let sih = $('.secondary-category-items').outerHeight();

	$('.primary-category').outerHeight(vh - 50);
	$('.secondary-category').outerHeight(vh - 50);
	$('.minor-category').outerHeight((vh - 50) - 50);
	
	let sh2 = $('.secondary-category').outerHeight();
	let mh = $('.minor-category').outerHeight();
}

//分類選單：點擊「品牌」後去highlight其子分類
$('[data-highlight-target]').click(function(){
	let targetID = $(this).attr('data-highlight-target');
	
	$('[data-toggle="highlight"]').each(function(){
		$(this).removeClass('highlight');
	});
	$(targetID).addClass('highlight');
	if ($('#brandLink').hasClass('flex-wrap')) {
		$('#brandLink').removeClass('flex-wrap');
		$('#brandToggleBtn').children('.icon-chevron-down, .icon-chevron-up').toggleClass('icon-chevron-down icon-chevron-up');
	}

	jumpToAnchor(targetID);
});

function jumpToAnchor(aid) {
	location.href = aid;
}

//
$('[data-toggle="flex-wrap"]').click(function(){
	$(this).children('.icon-chevron-down, .icon-chevron-up').toggleClass('icon-chevron-down icon-chevron-up');
	let target = $(this).attr('data-target');
	let toggle = $(this).attr('data-toggle');
	$(target).toggleClass(toggle);
});


//點擊「非搜尋列區域」時，關掉搜尋列
// $(document).mouseup(function(e) {
//     var container = $("#Search, #History, #moreButtons");
//     // if the target of the click isn't the container nor a descendant of the container
//     if (!container.is(e.target) && container.has(e.target).length === 0) 
//     {
//         if (container.hasClass('show')) {
//         	container.collapse('hide');
//         }
//     }
// });
$(document).on('click', function(e) {
    var container = $("#Search, #moreButtons, #specAndAmount");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        if (container.hasClass('show')) {
        	container.collapse('hide');
        }

    }

    var history = $('#History');
    var vw = $(window).width();
    if (!history.is(e.target) && history.has(e.target).length === 0 && vw <= 1400) 
    {
        if (history.hasClass('show')) {
        	history.collapse('hide');
        }

    }


});

//加上backdrop
// var myCollapsible = $("#Search, #History, #moreButtons, #specAndAmount");
var myCollapsible = $("#Search, #History, #moreButtons");

$(myCollapsible).on('show.bs.collapse', function(){
	if ($('#myBackdrop').length) {
		//do nothing
	} else  {

		var vw = $(window).width();

		if ( vw >= 1200 ) {

		} 
		else {

			$('<div id="myBackdrop" class="modal-backdrop opacity-50"></div>').appendTo(document.body);
			
			
			if (vw >= 1200) {
				setTimeout(function(){
					$('body').addClass('modal-open');
					$('body').css({ paddingRight: '17px'});
				}, 500);
			} else {
				setTimeout(function(){
					$('body').addClass('modal-open');
				}, 500);
			}
		}
	}
});




$(myCollapsible, '#History').on('hide.bs.collapse', function(){
	$(".modal-backdrop").remove();
	$('body').removeClass('modal-open');
	$('body').removeAttr('style');
});

$('#specAndAmount').on('show.bs.collapse', function(){
	if ( $('#additionalPurchase')[0]) {
		$('#additionalPurchase').hide();
	} else {
		var vw = $(window).width();
		if (vw >= 1200) {
			$('<div id="myBackdrop" class="modal-backdrop opacity-50"></div>').appendTo(document.body);
			setTimeout(function(){
				$('body').addClass('modal-open');
				$('body').css({ paddingRight: '17px'});
			}, 500);
		} else {
			$('<div id="myBackdrop" class="modal-backdrop opacity-50"></div>').appendTo(document.body);
			setTimeout(function(){
				$('body').addClass('modal-open');
			}, 500);
		}
	}
});

$('#specAndAmount').on('hide.bs.collapse', function(){
	if ( $('#additionalPurchase')[0]) {
		$('#additionalPurchase').modal('hide');
	} else {
		$(".modal-backdrop").remove();
		$('body').removeClass('modal-open');
		$('body').removeAttr('style');
	}
});


// $(document).on('click', function(e) {
// 	if ($('body').hasClass('offcanvas-backdrop')) {
// 		$('#specAndAmount').offcanvas('hide');
// 	}
//     console.log('clicked on document');
// })
// $("#specAndAmount, [data-bs-toggle='offcanvas']").on('click',function(e) {
//     e.stopPropagation();
//     console.log('clicked on specAndAmount');
// });









//檢查子元素總寬度來決定toggle btn要不要顯示
function checkWidthToToggle(element, btn) {
	var childWidth = 0;
	var parentWidth = $(element).outerWidth();
	$( element + ' > *').each(function() { childWidth += $(this).outerWidth(); }); 

	if (childWidth <= parentWidth) {
		$(btn).hide();
	} else {
		$(btn).show();
	}
}



//為所有button加上ripple效果
function createRipple(event) {
	const button = event.currentTarget;

	const circle = document.createElement("span");
	const diameter = Math.max(button.clientWidth, button.clientHeight);
	const radius = diameter / 2;

	circle.style.width = circle.style.height = `${diameter}px`;

	circle.style.left = `${event.offsetX - radius}px`;
    circle.style.top = `${event.offsetY - radius}px`;

	circle.classList.add("ripple");

	const ripple = button.getElementsByClassName("ripple")[0];

	if (ripple) {
	    ripple.remove();
	}

	button.appendChild(circle);
}
setTimeout(function(){
	const buttons = document.getElementsByTagName("button");
	for (const button of buttons) {
	  button.addEventListener("click", createRipple);
	}

}, 1000);


$('div[data-bg-image]').each(function() {
    let bgImage = $(this).attr('data-bg-image');
    $(this).css('background-image', 'url(' + bgImage + ')');
});
//抓data-header-color及data-body-color來設定文字顏色及背景底色
$('div[data-header-color]').each(function() {
    let hColor = $(this).attr('data-header-color');
    let hBgColor = '#' + hColor.substr(1) + '1A';
    $(this).find('[data-type="header"]').css('color', hColor);
    $(this).find('[data-type="view-all"]').css('color', hColor);
    $(this).find('[data-type="view-all"]').css('background-color', hBgColor);

});

$('div[data-body-color]').each(function() {
    let bColor = $(this).attr('data-body-color');
    $(this).css('background-color', bColor);
});

//主打專區設定底色(漸層)
// let themeColor = $('#heroSection').attr('data-theme');
// let color2 = "rgba(255, 255, 255, 0)";
// let str = "linear-gradient(" + themeColor + "," + color2 + ")";
// $("#heroSection").css("background",str);


//初始化swiper
//desktop版分類選單中的旗艦館swiper
const swpFlagshipBrandInSubcategory = new Swiper('#swpFlagshipBrandInSubcategory .swiper-container', {
	loop: false,
	// roundLengths: true,
	speed: 300,
	observer: true,
  	observeParents: true,
  	parallax:true,
  	slidesPerView: 10,
	slidesPerGroup: 10,
	spaceBetween: 10,
	effect: 'slide',
	pagination: {	
    	el: '#swpFlagshipBrandInSubcategory .swiper-pagination',
    	type: 'bullets',
        clickable: true,
	},
	navigation: {
		nextEl: '#swpFlagshipBrandInSubcategory .swiper-button-next',
		prevEl: '#swpFlagshipBrandInSubcategory .swiper-button-prev',
	},
	breakpoints: {
		1400: {
			slidesPerView: 10,
			slidesPerGroup: 10,
			spaceBetween: 10,
		}
	}
});

//大廣
const swpMain = new Swiper('#swpMain .swiper-container', {
	loop: true,
	roundLengths: true,
	speed: 1000,
	loopAdditionalSlides: 3,
	observer: true,
  	observeParents: true,
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	effect: 'slide',
	slidesPerView: 1,
	centeredSlides: true,
	pagination: {	
    	el: '#swpMain .swiper-pagination',
    	type: 'bullets',
	},
	navigation: {
		nextEl: '#swpMain .swiper-button-next',
		prevEl: '#swpMain .swiper-button-prev',
	},
	breakpoints: {
		768: {
			slidesPerView: 1,
			spaceBetween: 10,
		},
		992: {
			slidesPerView: 1,
			spaceBetween: 10,
		},
		1200: {
			slidesPerView: 1.5,
			spaceBetween: 0,
		},
		1900: {
			slidesPerView: 1.8,
			spaceBetween: 0,
		},
		2500: {
			slidesPerView: 1.9393,
			spaceBetween: 0,
		}
	}
});

$('.swiper-fluid .swiper-slide').on('mouseover', function() {
	if ($('#swpMain')[0]) {
		swpMain.autoplay.stop();
	} else if ( $('#swpCategoryBig')[0]) {
		swpCategoryBig.autoplay.stop();
	} else if ( $('#swpFlagshipBig')[0]) {
		swpFlagshipBig.autoplay.stop();
	} else {
		//do nothing
	}
});

$('.swiper-fluid .swiper-slide').on('mouseout', function() {
	if ($('#swpMain')[0]) {
		swpMain.autoplay.start();
	} else if ( $('#swpCategoryBig')[0]) {
		swpCategoryBig.autoplay.start();
	} else if ( $('#swpFlagshipBig')[0]) {
		swpFlagshipBig.autoplay.start();
	} else {
		//do nothing
	}
});

$(window).on('resize', function(){
	if ($('#swpMain')[0]) {
		swpMain.update();
		console.log('swpMain updated');
	}
});

//直式小廣
const swpPortrait = new Swiper('#swpPortrait .swiper-container', {
	slidesPerView: 3.5,
	loop: 0,
	spaceBetween: 10,
	freeMode: true,
	navigation: {
		nextEl: '#swpPortrait .swiper-button-next',
		prevEl: '#swpPortrait .swiper-button-prev',
	},
	breakpoints: {
		768: {
			slidesPerView: 5.5,
		},
		992: {
			slidesPerView: 7.5,
		},
		1200: {
			slidesPerView: 8,
			slidesPerGroup: 8,
		}
	}
});

//知識文&活動頁
const swpCampaign = new Swiper('#swpCampaign .swiper-container', {
	loop: true,
	autoplay: false,
	effect: 'slide',
	slidesPerView: 1,
	pagination: {
    el: '#swpCampaign .swiper-pagination',
    type: 'bullets',
  },
  navigation: {
		nextEl: '#swpCampaign .swiper-button-next',
		prevEl: '#swpCampaign .swiper-button-prev',
	},
  breakpoints: {
  	768: {
  		slidesPerView: 3,
  		spaceBetween: 10,
  	},
  	992: {
  		slidesPerView: 3,
  		spaceBetween: 10,
  	},
  	1200: {
  		slidesPerView: 3,
  		spaceBetween: 15,
  	}
  }
});

//主題精選A區第1個swiper
const swpPickUpA1 = new Swiper('#swpPickUpA1', {
	slidesPerView: 3.3,
	loop: 1,
	spaceBetween: 5,
	freeMode: true,
	pagination: {
    el: '#swpPickUpA1Btn .swiper-pagination',
    type: 'fraction',
  },
	navigation: {
		nextEl: '#swpPickUpA1Btn .custom-button-next',
		prevEl: '#swpPickUpA1Btn .custom-button-prev',
	},
	breakpoints: {
		768: {
			slidesPerView: 5.3,
		},
		992: {
			slidesPerView: 6,
			slidesPerGroup: 6,
			spaceBetween: 10,
		},
		1200: {
			slidesPerView: 3,
			slidesPerGroup: 3,
			spaceBetween: 15,
		}
	}
});
//主題精選A區第2個swiper
const swpPickUpA2 = new Swiper('#swpPickUpA2', {
	slidesPerView: 3.3,
	loop: 1,
	spaceBetween: 5,
	freeMode: true,
	pagination: {
    el: '#swpPickUpA2Btn .swiper-pagination',
    type: 'fraction',
  },
	navigation: {
		nextEl: '#swpPickUpA2Btn .custom-button-next',
		prevEl: '#swpPickUpA2Btn .custom-button-prev',
	},
	breakpoints: {
		768: {
			slidesPerView: 5.3,
		},
		992: {
			slidesPerView: 6,
			slidesPerGroup: 6,
			spaceBetween: 10,
		},
		1200: {
			slidesPerView: 6,
			slidesPerGroup: 6,
			spaceBetween: 15,
		}
	}
});
//主題精選A區第3個swiper
const swpPickUpA3 = new Swiper('#swpPickUpA3', {
	slidesPerView: 3.3,
	loop: 1,
	spaceBetween: 5,
	freeMode: true,
	pagination: {
    el: '#swpPickUpA3Btn .swiper-pagination',
    type: 'fraction',
  },
	navigation: {
		nextEl: '#swpPickUpA3Btn .custom-button-next',
		prevEl: '#swpPickUpA3Btn .custom-button-prev',
	},
	breakpoints: {
		768: {
			slidesPerView: 5.3,
		},
		992: {
			slidesPerView: 6,
			slidesPerGroup: 6,
			spaceBetween: 10,
		},
		1200: {
			slidesPerView: 6,
			slidesPerGroup: 6,
			spaceBetween: 15,
		}
	}
});
//主題精選B區第1個swiper
const swpPickUpB1 = new Swiper('#swpPickUpB1', {
	slidesPerView: 3.3,
	loop: 1,
	spaceBetween: 5,
	freeMode: true,
	pagination: {
    el: '#swpPickUpB1Btn .swiper-pagination',
    type: 'fraction',
  },
	navigation: {
		nextEl: '#swpPickUpB1Btn .custom-button-next',
		prevEl: '#swpPickUpB1Btn .custom-button-prev',
	},
	breakpoints: {
		768: {
			slidesPerView: 5.3,
		},
		992: {
			slidesPerView: 6,
			slidesPerGroup: 6,
			spaceBetween: 10,
		},
		1200: {
			slidesPerView: 3,
			slidesPerGroup: 3,
			spaceBetween: 15,
		}
	}
});
//主題精選B區第2個swiper
const swpPickUpB2 = new Swiper('#swpPickUpB2', {
	slidesPerView: 3.3,
	loop: 1,
	spaceBetween: 5,
	freeMode: true,
	pagination: {
    el: '#swpPickUpB2Btn .swiper-pagination',
    type: 'fraction',
  },
	navigation: {
		nextEl: '#swpPickUpB2Btn .custom-button-next',
		prevEl: '#swpPickUpB2Btn .custom-button-prev',
	},
	breakpoints: {
		768: {
			slidesPerView: 5.3,
		},
		992: {
			slidesPerView: 6,
			slidesPerGroup: 6,
			spaceBetween: 10,
		},
		1200: {
			slidesPerView: 6,
			slidesPerGroup: 6,
			spaceBetween: 15,
		}
	}
});
//主題精選第1區第3個swiper
const swpPickUpB3 = new Swiper('#swpPickUpB3', {
	slidesPerView: 3.3,
	loop: 1,
	spaceBetween: 5,
	freeMode: true,
	pagination: {
	    el: '#swpPickUpB3Btn .swiper-pagination',
	    type: 'fraction',
  	},
	navigation: {
		nextEl: '#swpPickUpB3Btn .custom-button-next',
		prevEl: '#swpPickUpB3Btn .custom-button-prev',
	},
	breakpoints: {
		768: {
			slidesPerView: 5.3,
		},
		992: {
			slidesPerView: 6,
			slidesPerGroup: 6,
			spaceBetween: 10,
		},
		1200: {
			slidesPerView: 6,
			slidesPerGroup: 6,
			spaceBetween: 15,
		}
	}
});

//熱銷推薦swiper
const swpHotSale = new Swiper('#swpHotSale .swiper-container', {
	slidesPerView: 2,
	slidesPerColumn: 15,
	slidesPerColumnFill: 'row',
	spaceBetween: 0,
	observer: true,
  	observeParents: true,
	allowSlideNext: false,
	allowSlidePrev: false,
	pagination: {
	    el: '#swpHotSale .swiper-pagination',
	    type: 'bullets',
  	},
	navigation: {
		nextEl: '#swpHotSale .swiper-button-next',
		prevEl: '#swpHotSale .swiper-button-prev',
	},
	breakpoints: {
		768: {
			slidesPerView: 5,
		},
		1200: {
			loop: true,
			slidesPerView: 6,
			slidesPerGroup: 6,
			slidesPerColumn: 1,
			slidesPerColumnFill: 'row',
			spaceBetween: 0,
			allowSlideNext: true,
			allowSlidePrev: true,
		},
	}
});

//本週新品swiper
const swpNewArrival = new Swiper('#swpNewArrival .swiper-container', {
	slidesPerView: 2,
	slidesPerColumn: 15,
	slidesPerColumnFill: 'row',
	spaceBetween: 0,
	observer: true,
  	observeParents: true,
	allowSlideNext: false,
	allowSlidePrev: false,
	pagination: {
	    el: '#swpNewArrival .swiper-pagination',
	    type: 'bullets',
  	},
	navigation: {
		nextEl: '#swpNewArrival .swiper-button-next',
		prevEl: '#swpNewArrival .swiper-button-prev',
	},
	breakpoints: {
		768: {
			slidesPerView: 5,
		},
		1200: {
			loop: true,
			slidesPerView: 6,
			slidesPerGroup: 6,
			slidesPerColumn: 1,
			slidesPerColumnFill: 'row',
			spaceBetween: 0,
			allowSlideNext: true,
			allowSlidePrev: true,
		},
	}
});

// window.addEventListener('resize', function() {
//     swpHotSale.update();
//     swpNewArrival.update();
// });

//EC廠商用swiper
const swpVendor = new Swiper('#swpVendor .swiper-container', {
	slidesPerView: 1.5,
	loop: 1,
	spaceBetween: 10,
	freeMode: true,

	navigation: {
		nextEl: '#swpVendor .swiper-button-next',
		prevEl: '#swpVendor .swiper-button-prev',
	},
	breakpoints: {
		768: {
			slidesPerView: 2.5,
		},
		1200: {
			slidesPerView: 3,
			spaceBetween: 15,
		}
	}
});

//瀏覽紀錄swiper
const swpHistory = new Swiper('#swpHistory .swiper-container', {
	slidesPerView: 3.5,
	spaceBetween: 10,
	freeMode: true,
	observer: true,
  	observeParents: true,
  	parallax:true,
	breakpoints: {
		768: {
			slidesPerView: 8,
			spaceBetween: 10,
		},
		1200: {
			direction: 'vertical',
			slidesPerView: 3,
			slidesPerGroup: 3,
			spaceBetween: 5,
			navigation: {
				nextEl: '#swpHistory .vertical-button-next',
				prevEl: '#swpHistory .vertical-button-prev',
			},
		},
		1400: {
			direction: 'vertical',
			slidesPerView: 3,
			slidesPerGroup: 3,
			spaceBetween: 10,
			navigation: {
				nextEl: '#swpHistory .vertical-button-next',
				prevEl: '#swpHistory .vertical-button-prev',
			},
		}
	}
});

//分類頁大BN
const swpCategoryBig = new Swiper('#swpCategoryBig .swiper-container', {
	loop: true,
	roundLengths: true,
	speed: 1000,
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	effect: 'slide',
	slidesPerView: 1,
	centeredSlides: true,
	pagination: {	
    	el: '#swpCategoryBig .swiper-pagination',
    	type: 'bullets',
	},
	navigation: {
		nextEl: '#swpCategoryBig .swiper-button-next',
		prevEl: '#swpCategoryBig .swiper-button-prev',
	},
	breakpoints: {
		768: {
			slidesPerView: 1,
			spaceBetween: 10,
		},
		992: {
			slidesPerView: 1,
			spaceBetween: 10,
		},
		1200: {
			slidesPerView: 1.5,
			spaceBetween: 0,
		},
		1900: {
			slidesPerView: 1.8,
			spaceBetween: 0,
		},
		2500: {
			slidesPerView: 1.9393,
			spaceBetween: 0,
		}
	}
});

//分類頁知識文BN
const swpCategoryArticle = new Swiper('#swpCategoryArticle .swiper-container', {
	loop: true,
	autoplay: true,
	effect: 'slide',
	pagination: {
	    el: '#swpCategoryArticle .swiper-pagination',
	    type: 'bullets',
	},
  	navigation: {
		nextEl: '#swpCategoryArticle .swiper-button-next',
		prevEl: '#swpCategoryArticle .swiper-button-prev',
	},
	breakpoints: {
		1200: {
			autoplay: false,
			slidesPerView: 3,
			slidesPerGroup: 1,
			spaceBetween: 10
		}
	}
});

//旗艦館大BN
const swpFlagshipBig = new Swiper('#swpFlagshipBig .swiper-container', {
	loop: true,
	roundLengths: true,
	speed: 1000,
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	effect: 'slide',
	slidesPerView: 1,
	centeredSlides: true,
	pagination: {	
    	el: '#swpFlagshipBig .swiper-pagination',
    	type: 'bullets',
	},
	navigation: {
		nextEl: '#swpFlagshipBig .swiper-button-next',
		prevEl: '#swpFlagshipBig .swiper-button-prev',
	},
	breakpoints: {
		768: {
			slidesPerView: 1,
			spaceBetween: 10,
		},
		992: {
			slidesPerView: 1,
			spaceBetween: 10,
		},
		1200: {
			slidesPerView: 1.5,
			spaceBetween: 0,
		},
		1900: {
			slidesPerView: 1.8,
			spaceBetween: 0,
		},
		2500: {
			slidesPerView: 1.9393,
			spaceBetween: 0,
		}
	}
});
//旗艦館子分類
const swpFlagshipChild = new Swiper('#swpFlagshipChild .swiper-container', {
	effect: 'slide',

	slidesPerView: 3,
	slidesPerColumn: 2,
	slidesPerColumnFill: 'row',
	slidesPerGroup: 3,
	spaceBetween: 10,
	observer: true,
  	observeParents: true,
	pagination: {
	    el: '#swpFlagshipChild .swiper-pagination',
	    type: 'bullets',
  	},
  	navigation: {
		nextEl: '#swpFlagshipChild .swiper-button-next',
		prevEl: '#swpFlagshipChild .swiper-button-prev',
	},
  	breakpoints: {
  		1200: {
  			slidesPerView: 6,
			slidesPerColumn: 1,
			slidesPerColumnFill: 'row',
			slidesPerGroup: 1,
  		},
  	},
});


//旗艦館知識文BN
const swpFlagshipArticle = new Swiper('#swpFlagshipArticle .swiper-container', {
	loop: true,
	effect: 'slide',
	pagination: {
	  el: '#swpFlagshipArticle .swiper-pagination',
	    type: 'bullets',
	},
	navigation: {
		nextEl: '#swpFlagshipArticle .swiper-button-next',
		prevEl: '#swpFlagshipArticle .swiper-button-prev',
	},
	breakpoints: {
		1200: {
			slidesPerView: 3,
			slidesPerGroup: 1,
			spaceBetween: 10,
		},
	},
});

//商品頁商品圖thumbnail
const swpProductThumb = new Swiper('#swpProductThumb', {
	// loop: true,
	slidesPerView: 5,
	autoplay: false,
	grabCursor: true,
	spaceBetween: 10,
	watchSlidesVisibility: true,
    watchSlidesProgress: true,
    observer: true,
    observeParents: true,
    breakpoints: {
    	768: {
    		slidesPerView: 5,
    	},
    	1200: {
    		slidesPerView: 5,
    	},
    }
});
//商品頁商品圖
const swpProduct = new Swiper('#swpProduct .swiper-container', {
	loop: true,
	observer: true,
    observeParents: true,
	autoplay: {
		delay: 3000,
	},
	// autoplay: false,
	effect: 'fade',
	pagination: {
	  el: '#swpProduct .swiper-pagination',
	  type: 'bullets',
	  clickable: true,
	},
	navigation: {
		nextEl: '#swpProduct .swiper-button-next',
		prevEl: '#swpProduct .swiper-button-prev',
	},
	thumbs: {
		swiper: swpProductThumb,
	}
});


//商品頁的推薦商品
const swpRecommend = new Swiper('#swpRecommend', {
	slidesPerView: 3.5,
	spaceBetween: 10,
	freeMode: true,
	roundLengths: true,
	allowSlideNext: true,
	allowSlidePrev: true,
	breakpoints: {
		768: {
			slidesPerView: 5.5,
		},
		1200: {
			direction: 'vertical',
			slidesPerView: 'auto',
			spaceBetween: 0,
			allowSlideNext: false,
			allowSlidePrev: false,
		},
	}
});






//結帳頁的加價購商品
const swpAdditional = new Swiper('#swpAdditional .swiper-container', {
	slidesPerView: 2.5,
	spaceBetween: 10,
	freeMode: true,
	navigation: {
		nextEl: '#swpAdditional .swiper-button-next',
		prevEl: '#swpAdditional .swiper-button-prev',
	},
	breakpoints: {
		768: {
			slidesPerView: 4.2,
		},
		1200: {
			slidesPerView: 5,
			slidesPerGroup: 5,
			spaceBetween: 15,
		}
	}
});
//會員專區公告訊息
const swpBulletin = new Swiper('#swpBulletin', {
	direction: 'vertical',
	autoplay: true,
	loop: true,
	slidesPerView: 1,
	spaceBetween: 2,

});

//免費服務專線

$('#freeServiceCall').click(function(){
	var vw = $(window).width();
	if (vw < 1200) {
		window.location.href='tel:0809053888';
	}
});


var myHistory = document.getElementById('History')
myHistory.addEventListener('shown.bs.collapse', function () {
  swpHistory.update();
  console.log('swpHistory updated');
})


// if ($('#additionalPurchase')[0]) {
// 	$('#additionalPurchase').on('shown.bs.modal', function() {
		
		// swpProduct.update();
		
		//商品頁商品圖thumbnail
		const swpProductThumbInModal = new Swiper('#swpProductThumbInModal', {
			// loop: true,
			slidesPerView: 5,
			autoplay: false,
			spaceBetween: 10,
			grabCursor: true,
			watchSlidesVisibility: true,
		    watchSlidesProgress: true,
		    observer: true,
		    observeParents: true,
		    breakpoints: {
		    	768: {
		    		slidesPerView: 5,
		    	},
		    	1200: {
		    		slidesPerView: 5,
		    	},
		    }
		});
		//商品頁商品圖
		const swpProductInModal = new Swiper('#swpProductInModal .swiper-container', {
			loop: true,
			observer: true,
		    observeParents: true,
			autoplay: {
				delay: 3000,
			},
			effect: 'fade',
			pagination: {
			  el: '#swpProductInModal .swiper-pagination',
			    type: 'bullets',
			},
			navigation: {
				nextEl: '#swpProductInModal .swiper-button-next',
				prevEl: '#swpProductInModal .swiper-button-prev',
			},
			thumbs: {
				swiper: swpProductThumbInModal,
			}
		});
	// });
// }


// var myadditionalPurchase = document.getElementById('additionalPurchase')
// myadditionalPurchase.addEventListener('shown.bs.modal', function () {
//   swpProduct.update();
// })



/*this code is not for modal switching it's only for bug solving of bootstrap 4*/
/*  this code is to solve bootstrap modal switching bug*/
$('.modal').on('shown.bs.modal', function (e) {
	// setTimeout(function(){
		$('body').addClass('modal-open');
		var vw = $(window).width();
		if ( vw >= 1200 ) {
			// $('body').css({ paddingRight: '17px'});
		}
	// }, 200);
	
});


//商品列表: grid-view和list-view切換
$('[data-toggle-view]').click(function(){
	$('[data-toggle-view]').removeClass('active');
	$(this).addClass('active');
	let className = $(this).attr('data-toggle-view');
	let targetID = $(this).attr('data-target');
	$(targetID).removeClass();
	$(targetID).addClass('d-flex ' + className);
});


//detect sticky
// var observer = new IntersectionObserver(function(entries) {
// 	if(entries[0].intersectionRatio === 0)
// 		document.querySelector("#pickUp1").classList.add("sticky-now");
// 	else if(entries[0].intersectionRatio === 1)
// 		document.querySelector("#pickUp1").classList.remove("sticky-now");
// }, { threshold: [0,1] });

// if ($('#pickUp1-Top').length) {
// 	observer.observe(document.querySelector("#pickUp1-Top"));
// }


// var observer = new IntersectionObserver(function(entries) {
// 	if(entries[0].intersectionRatio === 0)
// 		document.querySelector("#pickUp2").classList.add("sticky-now");
// 	else if(entries[0].intersectionRatio === 1)
// 		document.querySelector("#pickUp2").classList.remove("sticky-now");
// }, { threshold: [0,1] });

// if ($('#pickUp2-Top').length) {
// 	observer.observe(document.querySelector("#pickUp2-Top"));
// }



//youtube modal指定player id
var live1_ID = 'yuhgIlXwPh8'; //1台youtube直播id
var live2_ID = '9fXkGPPws_c'; //2台youtube直播id

$('#toggleYT1').click(function() {
	$('#ytPlayer').html('<iframe src="https://www.youtube.com/embed/'+ live1_ID +'?playsinline=1&controls=1&showinfo=1&rel=0&modestbranding=1&enablejsapi=0&autoplay=1&mute=1" allow="autoplay" allowfullscreen frameborder="0"></iframe>');
});
$('#toggleYT2').click(function() {
	$('#ytPlayer').html('<iframe src="https://www.youtube.com/embed/'+ live2_ID +'?playsinline=1&controls=1&showinfo=1&rel=0&modestbranding=1&enablejsapi=0&autoplay=1&mute=1" allow="autoplay" allowfullscreen frameborder="0"></iframe>');
});
//modal關閉後清掉player
$('#youtubeModal').on('hidden.bs.modal', function () {
    $('#ytPlayer').html('');
});

//商品影片modal
$('button[data-youtube]').click(function() {
    var productVideo_ID = $(this).attr('data-youtube');
    $('#ytPlayer').html('<iframe src="https://www.youtube.com/embed/'+ productVideo_ID +'?playsinline=1&controls=1&showinfo=1&rel=0&modestbranding=1&enablejsapi=0&autoplay=1&mute=1" allow="autoplay" allowfullscreen frameborder="0"></iframe>');
});









//檢查目標內所有radio button是否有checked
function isRadioChecked (target) {
	var check = true;
    $(target + " input:radio").each(function(){
        var name = $(this).attr("name");
        if($("input:radio[name="+name+"]:checked").length == 0){
            check = false;
        }
    });
    
    if(check){
        console.log('One radio in each group is checked.');
    }else{
        console.log('Please select one option in each question.');
    }

    return check;
}

function isMultiSpecAllSelected() {
	var check = false;
	if (ttlMSQty == maxMSQty) {
		check = true;
	}

	if (check) {
		$('#addToCart, #buyNow, #btnOKCart, #btnOKBuy').attr('disabled', false);
	} else {
		$('#addToCart, #buyNow, #btnOKCart, #btnOKBuy').attr('disabled', true);
	}
	
}

//控制「加入購物車」、「直接購買」、「確定」按鈕的enable/disable狀態(開啟規格/數量視窗時檢查)
$('#specAndAmount').on('show.bs.collapse', function(){
	
	$('#addToCart, #buyNow, #btnOKCart, #btnOKBuy, #btnadditionalPurchaseBuy').attr('disabled', true);

	if ($('#mobileMultiSpec')[0]) {
		console.log('#mobileMultiSpec exists!');
		isMultiSpecAllSelected();

	} else if(isRadioChecked('#specAndAmount')) {
		$('#addToCart, #buyNow, #btnOKCart, #btnOKBuy, #btnadditionalPurchaseBuy').attr('disabled', false);
	} else {
		//do nothing
	}



});

//控制「加入購物車」、「直接購買」、「確定」按鈕的enable/disable狀態(點選radio button時檢查)
$("#specAndAmount input:radio").change(function(e){
	if(isRadioChecked('#specAndAmount')) {
		$('#addToCart, #buyNow, #btnOKCart, #btnOKBuy, #btnadditionalPurchaseBuy').attr('disabled', false);
	}
});



//預設「加入購物車」、「直接購買」、「確定」按鈕為隱藏
$('#CartAndBuy, #OKCart, #OKBuy').hide();

//點擊「選擇商品規格」則顯示「加入購物車」及「直接購買」
$('#toggleSpec').click(function(){
	setTimeout(function(){
		$('#CartAndBuy').show();
		$('#OKCart').hide();
		$('#OKBuy').hide();
	}, 100);
		
});
//點擊「加入購物車」顯示「確定」
$('#toggleSpecFromCart').click(function(){
	setTimeout(function(){
		$('#CartAndBuy').hide();
		$('#OKCart').show();
		$('#OKBuy').hide();
	}, 100);
});
//點擊「直接購買」顯示「確定」
$('#toggleSpecFromBuy').click(function(){
	setTimeout(function(){
		$('#CartAndBuy').hide();
		$('#OKCart').hide();
		$('#OKBuy').show();
	}, 100);
});

//加入購物車動畫
$('#addToCart, #btnOKCart').on('click', function () {
	// cartAnimation(this);
	// addToCart(this);
    
});


function cartAnimation(t) {

	if ($('#toggleCart').is(':visible')) {
		var cart = $('#toggleCart');
	} else {
		var cart = $('#shoppingCartList');
	}
	var imgtodrag;
	if ($('#specImg').is(':visible')) {
		imgtodrag = $('#specImg').find("img").eq(0);	
	} else {
		imgtodrag = $('#swpProduct .swiper-slide-active').find("img").eq(0);	
	}

		var vw = $(window).width();
		var speed = 500;

		if ( vw >= 1200 ) {
			speed = 200;
		}

    

    if (imgtodrag) {
        var imgclone = imgtodrag.clone()
            .offset({
            top: imgtodrag.offset().top,
            left: imgtodrag.offset().left
        })
            .css({
            'opacity': '0.8',
                'position': 'absolute',
                'height': '85px',
                'width': '85px',
                'z-index': '2000'
        })
            .appendTo($('body'))
            .animate({
            'top': cart.offset().top + 15,
            'left': cart.offset().left + 15,
            'width': 15,
            'height': 15
        }, speed, 'easeInOutExpo');
        

        imgclone.animate({
        	'top': cart.offset().top + 22.5,
            'left': cart.offset().left + 25,
            'width': 0,
            'height': 0
        }, function () {

        	if ( $('#specAndAmount').hasClass('show') ) {
        		$('.offcanvas-header > button').click();
        	}

            
            
            
            
            // $(t).detach();
            imgclone.detach();

            
            // snackBar('#cartAdded');
        });
    }
}

//提示訊息(snackBar)
function snackBar(id) {
  $(id).addClass('show');

  setTimeout(function(){
  	$(id).removeClass('show');
  }, 2000);
}

//加入收藏

function toggleFav(t) {
	var isFav = $(t).attr('data-fav');
	if (isFav == 'true') {

		$(t).removeClass('text-danger');
		$(t).find('span.feather').toggleClass('icon-heart icon-heart2');
		snackBar('#favRemoved');
		$(t).attr('data-fav', 'false');

	} else {

		$(t).addClass('text-danger');
		$(t).find('span.feather').toggleClass('icon-heart icon-heart2');
		snackBar('#favAdded');
		$(t).attr('data-fav', 'true');

	}
	
}



//取得簡訊認證碼按鈕
var seconds;
var countdownTimer;

function getSMSCode(t) {
	$(t).attr('disabled', true);
	
	setTimeout(function(){
		snackBar('#SMSSent'); //提示訊息
	}, 500);
	
	seconds = 300; //300秒
	countdownTimer = setInterval('secondPassed()', 1000);
}


function secondPassed() {
  var minutes = Math.round((seconds - 30)/60),
      remainingSeconds = seconds % 60;

  if (remainingSeconds < 10) {
      remainingSeconds = "0" + remainingSeconds;
  }
  
  $('#btnSMSCode').html(minutes + ":" + remainingSeconds + ' 後可重新獲取');

  if (seconds == 0) {

      clearInterval(countdownTimer);
      
      $('#btnSMSCode').html('<span class="feather icon-key"></span> 取得簡訊認證碼');
      $('#btnSMSCode').attr('disabled', false);

  } else {
      seconds--;
  }
}
//密碼toggle顯示/隱藏
$('[data-toggle="password"]').click(function(){
	$(this).find('.feather').toggleClass('icon-eye, icon-eye-off');
	var target = $(this).attr('data-target');
	togglePassword(target);
});

function togglePassword(id){
	var type = $(id).attr('type');

	if(type=='password'){
		$(id).attr('type', 'text');
	} else{
		$(id).attr('type', 'password');
	}
}


//回上層按鈕
// 2021-07-12: 改為抓body的scrollTop (原本是抓window)
$('body').append('<div id="scrollToTop" class="d-block d-xl-none"><button class="btn bg-dark-theme rounded-pill-start text-white fs-5" type="button"><span class="feather icon-chevron-up"></span></button></div>');	

var position = $(window).scrollTop(); 

// should start at 0
$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    
    if(scroll > position) {
        
        $('#scrollToTop').removeClass('showup');
        
    } else {
         
         if (position > 1000) {
        	$('#scrollToTop').addClass('showup');
        } else {
        	$('#scrollToTop').removeClass('showup');
        }
    }
    position = scroll;
});

$('#scrollToTop .btn').click(function(){
	// $(window).scrollTop(0);
	$('html, body').animate({
	   scrollTop: 0
	}, function(){
		// alert('123');
		setTimeout(function(){
			$('#scrollToTop').removeClass('showup');
		}, 250);
	   
	});
});

$('#scrollToTopDesktop').click(function(){
	$('html, body').animate({
		scrollTop: 0,
	});
});




//選擇數量
var maxQty = 6;	//最大值
var minQty = 1;	//最小值

function addQty(t) {
	var qty = $(t).parent().find('input').val(); //抓目前顯示的數量
	var newQty = parseInt(qty) + 1;
	(newQty > maxQty) ? (newQty = maxQty) : '';
	
	$(t).parent().find('input').val(newQty);
	
	updateTotal();
}
function subQty(t) {
	var qty = $(t).parent().find('input').val();
	var newQty = parseInt(qty) - 1;
	(newQty < minQty) ? (newQty = minQty) : '';
	
	$(t).parent().find('input').val(newQty);
	
	updateTotal();
}


//個別選擇規格及數量(例如A口味選2, B口味選3)

var maxMSQty = 5;	//最大可選數量
var minMSQty = 0;	//最小可選數量
var ttlMSQty = 0;	//目前已選數量
var avlMSQty = maxMSQty - ttlMSQty; //剩餘可選數量
var newMSQty;

function addMSQty(t) {
	var msqty = $(t).parent().find('input').val(); //抓目前顯示的數量
	newMSQty = parseInt(msqty);

	//條件：目前已選數量不超過最大可選數量, 剩餘可選數量至少要1
	if ( ttlMSQty <= maxMSQty && avlMSQty > 0 ) {  
		
		newMSQty++;
		$(t).parent().find('input').val(newMSQty);

		ttlMSQty = updateMSTotal();
		avlMSQty = maxMSQty - ttlMSQty;

		console.log('目前已選數量:' + ttlMSQty);

		isMultiSpecAllSelected();

	} else {
		//do nothing
	}

	
}
function subMSQty(t) {
	var msqty = $(t).parent().find('input').val();
	newMSQty = parseInt(msqty);

	//條件：目前已選數量大於最小可選數量, 當前input的數量至少要1
	if ( ttlMSQty >= minMSQty && newMSQty > 0 ) {
		
		newMSQty--;
		$(t).parent().find('input').val(newMSQty);

		ttlMSQty = updateMSTotal();
		avlMSQty = maxMSQty - ttlMSQty;

		console.log('目前已選數量:' + ttlMSQty);

		isMultiSpecAllSelected();

	} else {
		//do nothing
	}
	
}



function updateMSTotal() {

	var curMSQty = 0;
	var t = '';

	$('.multi-spec input[type="number"]').each(function(){

		var i = $(this).attr('id');
		curMSQty = curMSQty + parseInt($(this).val());
		

	});

	avlMSQty = maxMSQty - curMSQty;

	$('.multi-spec input[type="number"]').each(function(){
		
		var v = $(this).val();
		var n = $(this).parent().find('.input-group-text').html();

		if ( v > 0 ) {
			t = t + n + ' x ' + v + '、';
		}

	});

	var result = t.slice(0, -1);

	$('#selectedSpecs, #selectedSpecsMobile').html( result );
	$('#selectedAmount, #selectedAmountMobile').html( avlMSQty );
	
	return curMSQty;

}



$('.multi-spec input[type="number"]').on('input blur', function(){
	this.value = this.value.replace(/[^0-9]/g, '');

	if ( this.value == '' ) {
		this.value = 0;
	}
	updateMSTotal();
});

$(function(){
	updateMSTotal();
})







function updateItemPrice(t) {
	// var originalPrice = $(t).parents('.cart-item').find('.p-price').html(); 
	// var originalPrice = $(t).parents('.cart-item').find('.p-price').attr('data-price');	
	
	// var currentQty = $(t).parent().find('input').val();
	
	// var newPrice = parseInt(originalPrice) * parseInt(currentQty);
	// $(t).parents('.cart-item').find('.p-price').attr('new-price', newPrice);
}

// $('.select-quantity').on('change', function(){
// 	updateSubtotal();
// });

$(document).on('change', '.select-quantity', function(){
	updateSubtotal();
});

function updateSubtotal() {

	$('#shoppingCart .select-quantity').each(function(){
		var q = parseInt($(this).find('select').val());
		var p = parseInt($(this).attr('data-price'));
		$(this).find('.subtotal').html( q * p );
	});
	

	updateCart();

}

//不讓使用者自行輸入數字
// $("[type='number']").keydown(function (evt) {
//     evt.preventDefault();
// });

//購物車刪除商品
function removeFromCart(t) {
	var cartItem = $(t).parents('.cart-item');

	cartItem.animate({
        opacity: 0
    }, function () {
    	snackBar('#cartRemoved'); //提示訊息
        cartItem.detach();
        updateCart(); 
    });
}

//我的收藏刪除商品
function removeFromFavorite(t) {
	var cartItem = $(t).parents('.fav-item');

	cartItem.animate({
        opacity: 0
    }, function () {
    	snackBar('#favRemoved'); //提示訊息
        cartItem.detach();
        updateFavorite();
    });
}

//補貨通知刪除商品
function removeFromRestock(t) {
	var cartItem = $(t).parents('.restock-item');

	cartItem.animate({
        opacity: 0
    }, function () {
    	snackBar('#restockRemoved'); //提示訊息
        cartItem.detach();
        updateRestock();
    });
}

$(function(){

	// saveScrollPos();
	

	updateSubtotal();
	updateCart();
	updateFavorite();
	updateRestock();
	checkIfHome();
	adjustPageHeight();

	// updateTotal();

})



function checkIfHome() {
	if ($('#heroSection')[0]) {
		$('#campaignLinkAndSearch').removeClass('d-none').addClass('d-flex');
	}
}

function adjustPageHeight() {

	$('main').css('min-height', 'auto');

	var viewportWidth = $(window).width();
	var viewportHeight = $(window).height();
	var headerHeight = $('#topNav').height();
	var mainHeight = $('main').height();
	var footerHeight = $('footer').height();

	var totalHeight = headerHeight + mainHeight + footerHeight;
	var minHeight = viewportHeight - headerHeight - footerHeight;

	// console.log('headerHeight: '+headerHeight);
	// console.log('mainHeight: '+mainHeight);
	// console.log('footerHeight: '+footerHeight);
	// console.log('totalHeight: '+totalHeight);
	// console.log('minHeight: '+minHeight);

	// if ( totalHeight < viewportHeight ) {
		// $('main').height(minHeight);
		$('main').css('min-height', minHeight);
	// }
}

$('#shoppingCart').on('shown.bs.modal', function(){
	updateCart();
	console.log('購物車開啟');
	updateTotal();
});


function updateCart() {
	
	var cartItemAmount = 0;

	if ( $('#shoppingCart .cart-item .form-select')[0] ) {
		$('#shoppingCart .cart-item .form-select').each(function(){
			var n = $(this).val();
			cartItemAmount += parseInt(n);
		});
	} else {
		cartItemAmount = $('#shoppingCart').find('.cart-item').length;
	}

	

	
	

	

	updateTotal();
	
	

	if(cartItemAmount == 0) {
		$('#topNav .cart-badge').html('');
		$('#shoppingCart .modal-body, #shoppingCartList').html('<div id="cartEmpty" class="d-flex flex-column justify-content-center p-3 text-center mx-auto"><span class="feather icon-meh fs-1"></span><span class="fs-6">購物車是空的</span></div>');
		$('#shoppingCart .modal-footer').html('<div class="d-flex flex-column w-100"><div class="d-flex"><button type="button" class="btn btn-danger rounded-pill w-100 m-1" data-bs-dismiss="modal">快去逛逛吧！</button></div></div>');
		
	} else {
		$('#cartEmpty').remove();
		var cartNotEmpty = 
			'<div class="d-flex flex-column w-100">'+
            '<div class="d-flex justify-content-between align-items-center p-2 fs-6">'+
              '<div class="d-flex align-items-center">'+
                '<span>共</span>'+
                '<span class="text-danger mx-2 fs-5" id="cartItemAmount"></span>'+
                '<span>件商品</span>'+
              '</div>'+
              '<div class="d-flex align-items-center">'+
                '<span>合計</span>'+
                '<span class="p-price mx-1 fs-5" id="Total"></span>'+
              '</div>'+
            '</div>'+
            '<div class="d-flex justify-content-between flex-column">'+
              // '<button type="button" class="btn btn-danger rounded-pill m-1" onclick="alert(&quot;跑結帳流程&quot;);">結帳</button>'+
              '<button type="button" class="btn btn-danger rounded-pill m-1" onclick="location.href=&quot;checkOut1.html&quot;">下一步</button>'+
              '<button type="button" class="btn btn-outline-secondary rounded-pill m-1" data-bs-dismiss="modal">繼續購物</button>'+
            '</div>'+
          '</div>'
		$('#shoppingCart .modal-footer').html(cartNotEmpty);
	}


	$('#shoppingCart #cartItemAmount').html(cartItemAmount);
	
	(cartItemAmount != 0) ? $('#topNav .cart-badge').html(cartItemAmount) : '';
	
	// console.log('cartItemAmount: ' + cartItemAmount);
	updateTotal();
}

function updateFavorite() {
	var cartItemAmount = $('#myFavorite').find('.fav-item').length;

	if(cartItemAmount == 0) {
		$('#myFavoriteList').html('<div id="favEmpty" class="d-flex flex-column justify-content-center p-3 p-xl-4 text-center mx-auto"><span class="feather icon-meh fs-1"></span><span class="fs-6">我的收藏清單是空的</span></div>');
	} else {
		$('#favEmpty').remove();
	}
}

function updateRestock() {
	var cartItemAmount = $('#myRestock').find('.restock-item').length;

	if(cartItemAmount == 0) {
		$('#myRestockList').html('<div id="restockEmpty" class="d-flex flex-column justify-content-center p-3 p-xl-4 text-center mx-auto"><span class="feather icon-meh fs-1"></span><span class="fs-6">補貨通知清單是空的</span></div>');
	} else {
		$('#restockEmpty').remove();
	}
}



function updateTotal() {
	updateCoupon();
	var total = 0;

	// $('#shoppingCart .cart-item .p-isprice').each(function(){
	// 	total += parseInt($(this).html());
	// });

	$('#shoppingCart .cart-item .subtotal').each(function(){
		total += parseInt($(this).html());
	});

	
	$('#shoppingCart #Total, #Total2').html(total);

	var c = parseInt($('#couponSelectAmount').html());
	$('#Total3').html( total - c );

	console.log('total updated');
}

$('#chooseCoupon select, #chooseCoupon input').on('change', function(){
	updateCoupon();
	updateTotal();

});

function updateCoupon() {
	
	var discount = 0;
	
	$('#chooseCoupon input[type="checkbox"][data-bs-toggle="collapse"]').each(function(){
		
		if ( $(this).is(":checked") ) {
			
			var tmp = $(this).attr('data-bs-target');
			// console.log('tmp: '+ tmp);
			var v = $(tmp).find('select').val();
			var i = $(tmp).find('input').val();
			
			if ($(tmp).find('input')[0]) {
				// console.log('i:' + i);
				if (i != '') {
					discount += parseInt(i);
				} else {
					discount += 0;
				}
					
			} else {
				discount += parseInt(v);	
			}

			var t = $(this).parents('[data-bs-parent="#chooseCoupon"]').find('.coupon-type').html();
			$('#couponSelectType').html(t);
		} 

	});

	$('#couponSelectAmount').html(discount);

}


// 檢查checkbox狀態來決定collpase
$(function(){
	checkToCollapse();
});
function checkToCollapse() {
	$('#chooseCoupon input[type="checkbox"]').each(function(){
		if ($(this).is(':checked')) {

			var target = $(this).attr('data-bs-target');
	    	$(target).collapse('show');
		} else {
			var target = $(this).attr('data-bs-target');
	    	$(target).collapse('hide');
	    	$('#couponSelectType').html('');
		}
		updateTotal();
	});

	updateCoupon();
}
$('#chooseCoupon .collapse.w-100').on('shown.bs.collapse', function() {
    checkToCollapse();
});
$('#chooseCoupon .collapse.w-100').on('hidden.bs.collapse', function() {
    checkToCollapse();
});


//優惠金只能選一種, 所以如果選了別的優惠金, 就uncheck原本的優惠金
$('#chooseCoupon div[data-bs-parent="#chooseCoupon"]').on('hidden.bs.collapse', function() {
	if (!$(this).hasClass('show')) {
		$(this).find('input[type="checkbox"]').prop('checked', false);
		$(this).find('.collapse').collapse('hide');
		$('#couponSelectType').html();
	}
});


//(測試用) 加入購物車效果
//測試用商品資料
var testItem = {
	id: '2986202021',
	name: '【可夫萊精品堅果】雙活菌堅果穀粉(550g/罐)X1+雙活菌什錦堅果(200g/罐)X2',
	price: '1040',
	quantity: 1,
	maxqty: 5,
	spec: '無',
};

//desktop或mobile的數量input改變時, 去更新實際數量的值
$('#mobileQty, #desktopQty').on('input blur', function(){
	testItem.quantity = $(this).val();
});







//mobile版加入購物車(一般商品)
function addToCartMobile(t) {
	//跑動畫
	cartAnimation(t);
	//抓數量及規格
	testItem.quantity = $('#mobileQty').val();
	testItem.spec = $('#mobileSpec input:checked').val();

	var option = '';

	for (let i=1; i <= testItem.maxqty; i++ ) {
		if ( i == testItem.quantity) {
			var j = '<option value="'+ i +'" selected>'+ i +'</option>';
		} else {
			var j = '<option value="'+ i +'">'+ i +'</option>';
		}
		option += j;
	}

	var testItemDOM = 
	'<div class="d-flex flex-column p-3 cart-item col item-invisible">'+
		'<div class="d-flex mb-2 mb-xl-3">'+
			'<div class="col-3"><a href="https://www.vivatv.com.tw/Product.go?itemCode='+ testItem.id +'"><img src="https://www.vivatv.com.tw/common/images/product/'+ testItem.id +'/1.jpg" class="img-fluid"></a></div>'+
			'<div class="d-flex col-9 ps-md-2">'+
				'<div class="d-flex flex-column justify-content-between">'+
					'<div class="px-2 pb-1 p-name-1">'+ testItem.name +'</div>'+
					'<div class="d-inline px-2">規格：<span>'+ testItem.spec +'</span></div>'+
				'</div>'+
			'</div>'+
		'</div>'+
					
		'<div class="d-flex justify-content-between align-items-center">'+
			'<div class="d-flex align-items-center select-quantity" data-price="'+ testItem.price +'">'+
				'<div class="d-flex me-2">'+
					'<div class="input-group">'+
						'<label class="input-group-text fs-7">數量</label>'+
					  '<select class="form-select fs-7">'+ option +
					  '</select>'+
					'</div>'+
				'</div>'+
				'<div class="d-flex"><span class="me-1">小計</span><span class="fs-6 p-price lh-1 pe-2 subtotal">'+ parseInt(testItem.price) * parseInt(testItem.quantity) +'</span></div>'+
			'</div>'+
			'<div class="d-flex">'+
				'<div class="input-group">'+
					'<button class="btn" type="button" onclick="toggleFav(this);" data-fav="false"><span class="feather icon-heart"></span></button>'+
					'<button class="btn pe-0" type="button" onclick="removeFromCart(this);"><span class="feather icon-trash-2"></span></button>'+
				'</div>'+
			'</div>'+
		'</div>'+
	'</div>';

	$('#shoppingCartList').append(testItemDOM);

	updateCart();

	setTimeout(function(){
		$('.cart-item.item-invisible').toggleClass('item-invisible item-visible');
	}, 250);

	snackBar('#cartAdded');
	console.log('已加入購物車(Mobile)');

	return true;

	
}

//pc版加入購物車(一般商品)
function addToCartDesktop(t) {
	
	if ( !isRadioChecked('#desktopSpec') ) {

		snackBar('#specConfirm');

		$('#desktopSpec').addClass('bg-alert');
		
		setTimeout(function(){
			$('#desktopSpec').removeClass('bg-alert');
		}, 3000);

	} 

	else { 

		cartAnimation(t);

		testItem.quantity = $('#desktopQty').val();
		testItem.spec = $('input[name=specRadioDesktop]:checked').val();
		
		var option = '';
		
		for (let i=1; i <= testItem.maxqty; i++ ) {
			if ( i == testItem.quantity) {
				var j = '<option value="'+ i +'" selected>'+ i +'</option>';
			} else {
				var j = '<option value="'+ i +'">'+ i +'</option>';
			}
			option += j;
		}
		
		var testItemDOM = 
		'<div class="d-flex flex-column p-3 cart-item item-invisible">'+
			'<div class="d-flex pb-2">'+
				'<div class="col-3"><a href="https://www.vivatv.com.tw/Product.go?itemCode='+ testItem.id +'"><img src="https://www.vivatv.com.tw/common/images/product/'+ testItem.id +'/1.jpg" class="img-fluid"></a></div>'+
				'<div class="d-flex col-9">'+
					'<div class="d-flex flex-column justify-content-between">'+
						'<div class="px-2 pb-1 p-name-1">'+ testItem.name +'</div>'+
						'<div class="d-inline px-2 pb-1">規格：<span>'+ testItem.spec +'</span></div>'+
					'</div>'+
				'</div>'+
			'</div>'+
						
			'<div class="d-flex justify-content-between align-items-center">'+
				'<div class="d-flex align-items-center select-quantity" data-price="'+ testItem.price +'">'+
					'<div class="d-flex me-2">'+
						'<div class="input-group">'+
							'<label class="input-group-text fs-7">數量</label>'+
						  '<select class="form-select fs-7">'+ option +
						  '</select>'+
						'</div>'+
					'</div>'+
					'<div class="d-flex"><span class="me-1">小計</span><span class="fs-6 p-price lh-1 pe-2 subtotal">'+ parseInt(testItem.price) * parseInt(testItem.quantity) +'</span></div>'+
				'</div>'+
				'<div class="d-flex">'+
					'<div class="input-group">'+
						'<button class="btn" type="button" onclick="toggleFav(this);" data-fav="false"><span class="feather icon-heart"></span></button>'+
						'<button class="btn pe-0" type="button" onclick="removeFromCart(this);"><span class="feather icon-trash-2"></span></button>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>';
		
		$('#shoppingCartList').append(testItemDOM);
	
		updateCart();

		setTimeout(function(){
			$('.cart-item.item-invisible').toggleClass('item-invisible item-visible');
		}, 250);

		snackBar('#cartAdded');

		console.log('已加入購物車(PC)');

		return true;
	}
}

//mobile版加入購物車(組合商品)
function addToCartBundleMobile(t) {

		cartAnimation(t);

		testItem.quantity = $('#mobileQty').val();
		testItem.spec = '';
		var tmp;

		$('#mobileSpec input:checked').each(function(index){
			tmp = $(this).val();

			if ( index === $('#mobileSpec input:checked').length - 1) {
				testItem.spec = testItem.spec + tmp;
			} else {
				testItem.spec = testItem.spec + tmp + '、';	
			}
			
		});	
		
		var option = '';
		
		for (let i=1; i <= testItem.maxqty; i++ ) {
			if ( i == testItem.quantity) {
				var j = '<option value="'+ i +'" selected>'+ i +'</option>';
			} else {
				var j = '<option value="'+ i +'">'+ i +'</option>';
			}
			option += j;
		}
		
		var testItemDOM = 
		'<div class="d-flex flex-column p-3 cart-item item-invisible">'+
			'<div class="d-flex pb-2">'+
				'<div class="col-3"><a href="https://www.vivatv.com.tw/Product.go?itemCode='+ testItem.id +'"><img src="https://www.vivatv.com.tw/common/images/product/'+ testItem.id +'/1.jpg" class="img-fluid"></a></div>'+
				'<div class="d-flex col-9">'+
					'<div class="d-flex flex-column justify-content-between">'+
						'<div class="px-2 pb-1 p-name-1">'+ testItem.name +'</div>'+
						'<div class="d-inline px-2 pb-1">規格：<span>'+ testItem.spec +'</span></div>'+
					'</div>'+
				'</div>'+
			'</div>'+
						
			'<div class="d-flex justify-content-between align-items-center">'+
				'<div class="d-flex align-items-center select-quantity" data-price="'+ testItem.price +'">'+
					'<div class="d-flex me-2">'+
						'<div class="input-group">'+
							'<label class="input-group-text fs-7">數量</label>'+
						  '<select class="form-select fs-7">'+ option +
						  '</select>'+
						'</div>'+
					'</div>'+
					'<div class="d-flex"><span class="me-1">小計</span><span class="fs-6 p-price lh-1 pe-2 subtotal">'+ parseInt(testItem.price) * parseInt(testItem.quantity) +'</span></div>'+
				'</div>'+
				'<div class="d-flex">'+
					'<div class="input-group">'+
						'<button class="btn" type="button" onclick="toggleFav(this);" data-fav="false"><span class="feather icon-heart"></span></button>'+
						'<button class="btn pe-0" type="button" onclick="removeFromCart(this);"><span class="feather icon-trash-2"></span></button>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>';
		
		$('#shoppingCartList').append(testItemDOM);
	
		updateCart();

		setTimeout(function(){
			$('.cart-item.item-invisible').toggleClass('item-invisible item-visible');
		}, 250);

		snackBar('#cartAdded');

		console.log('已加入購物車(Mobile)');

		return true;

		
}

//pc版加入購物車(組合商品)
function addToCartBundleDesktop(t) {
	
	if ( !isRadioChecked('#desktopSpec') ) {

		snackBar('#specConfirm');

		$('#desktopSpec').addClass('bg-alert');
		
		setTimeout(function(){
			$('#desktopSpec').removeClass('bg-alert');
		}, 3000);

	} 
	
	else { 

		cartAnimation(t);

		testItem.quantity = $('#desktopQty').val();
		testItem.spec = '';
		var tmp;

		$('#desktopSpec input:checked').each(function(index){
			tmp = $(this).val();

			if ( index === $('#desktopSpec input:checked').length - 1) {
				testItem.spec = testItem.spec + tmp;
			} else {
				testItem.spec = testItem.spec + tmp + '、';	
			}
			
		});	
		
		var option = '';
		
		for (let i=1; i <= testItem.maxqty; i++ ) {
			if ( i == testItem.quantity) {
				var j = '<option value="'+ i +'" selected>'+ i +'</option>';
			} else {
				var j = '<option value="'+ i +'">'+ i +'</option>';
			}
			option += j;
		}
		
		var testItemDOM = 
		'<div class="d-flex flex-column p-3 cart-item item-invisible">'+
			'<div class="d-flex pb-2">'+
				'<div class="col-3"><a href="https://www.vivatv.com.tw/Product.go?itemCode='+ testItem.id +'"><img src="https://www.vivatv.com.tw/common/images/product/'+ testItem.id +'/1.jpg" class="img-fluid"></a></div>'+
				'<div class="d-flex col-9">'+
					'<div class="d-flex flex-column justify-content-between">'+
						'<div class="px-2 pb-1 p-name-1">'+ testItem.name +'</div>'+
						'<div class="d-inline px-2 pb-1">規格：<span>'+ testItem.spec +'</span></div>'+
					'</div>'+
				'</div>'+
			'</div>'+
						
			'<div class="d-flex justify-content-between align-items-center">'+
				'<div class="d-flex align-items-center select-quantity" data-price="'+ testItem.price +'">'+
					'<div class="d-flex me-2">'+
						'<div class="input-group">'+
							'<label class="input-group-text fs-7">數量</label>'+
						  '<select class="form-select fs-7">'+ option +
						  '</select>'+
						'</div>'+
					'</div>'+
					'<div class="d-flex"><span class="me-1">小計</span><span class="fs-6 p-price lh-1 pe-2 subtotal">'+ parseInt(testItem.price) * parseInt(testItem.quantity) +'</span></div>'+
				'</div>'+
				'<div class="d-flex">'+
					'<div class="input-group">'+
						'<button class="btn" type="button" onclick="toggleFav(this);" data-fav="false"><span class="feather icon-heart"></span></button>'+
						'<button class="btn pe-0" type="button" onclick="removeFromCart(this);"><span class="feather icon-trash-2"></span></button>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>';
		
		$('#shoppingCartList').append(testItemDOM);
	
		updateCart();

		setTimeout(function(){
			$('.cart-item.item-invisible').toggleClass('item-invisible item-visible');
		}, 250);

		snackBar('#cartAdded');

		console.log('已加入購物車(PC)');

		return true;

		
	}
}

//mobile版加入購物車(任選規格及數量)
function addToCartMultiSpecMobile(t) {

		cartAnimation(t);

		testItem.quantity = '1';
		testItem.spec = $('#selectedSpecsMobile').html();
		
		var testItemDOM = 
		'<div class="d-flex flex-column p-3 cart-item item-invisible">'+
			'<div class="d-flex pb-2">'+
				'<div class="col-3"><a href="https://www.vivatv.com.tw/Product.go?itemCode='+ testItem.id +'"><img src="https://www.vivatv.com.tw/common/images/product/'+ testItem.id +'/1.jpg" class="img-fluid"></a></div>'+
				'<div class="d-flex col-9">'+
					'<div class="d-flex flex-column justify-content-between">'+
						'<div class="px-2 pb-1 p-name-1">'+ testItem.name +'</div>'+
						'<div class="d-inline px-2 pb-1">規格：<span>'+ testItem.spec +'</span></div>'+
					'</div>'+
				'</div>'+
			'</div>'+
						
			'<div class="d-flex justify-content-between align-items-center">'+
				'<div class="d-flex align-items-center select-quantity" data-price="'+ testItem.price +'">'+
					'<div class="d-flex me-2">'+
						// '<div class="input-group">'+
						// 	'<label class="input-group-text fs-7">數量</label>'+
						//   '<select class="form-select fs-7">'+ option +
						//   '</select>'+
						// '</div>'+
					'</div>'+
					'<div class="d-flex"><span class="me-1">小計</span><span class="fs-6 p-price lh-1 pe-2 subtotal">'+ parseInt(testItem.price) * parseInt(testItem.quantity) +'</span></div>'+
				'</div>'+
				'<div class="d-flex">'+
					'<div class="input-group">'+
						'<button class="btn" type="button" onclick="toggleFav(this);" data-fav="false"><span class="feather icon-heart"></span></button>'+
						'<button class="btn pe-0" type="button" onclick="removeFromCart(this);"><span class="feather icon-trash-2"></span></button>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>';
		
		$('#shoppingCartList').append(testItemDOM);
	
		updateCart();

		setTimeout(function(){
			$('.cart-item.item-invisible').toggleClass('item-invisible item-visible');
		}, 250);

		snackBar('#cartAdded');

		console.log('已加入購物車(Mobile)');

		return true;

		
}

//pc版加入購物車(任選規格及數量)
function addToCartMultiSpecDesktop(t) {
	
	if ( ttlMSQty != maxMSQty ) {

		snackBar('#specConfirm');

		$('#desktopMultiSpec').addClass('bg-alert');
		
		setTimeout(function(){
			$('#desktopMultiSpec').removeClass('bg-alert');
		}, 3000);

	} 
	
	else { 

		cartAnimation(t);

		testItem.quantity = '1';
		testItem.spec = $('#selectedSpecs').html();
		
		var testItemDOM = 
		'<div class="d-flex flex-column p-3 cart-item item-invisible">'+
			'<div class="d-flex pb-2">'+
				'<div class="col-3"><a href="https://www.vivatv.com.tw/Product.go?itemCode='+ testItem.id +'"><img src="https://www.vivatv.com.tw/common/images/product/'+ testItem.id +'/1.jpg" class="img-fluid"></a></div>'+
				'<div class="d-flex col-9">'+
					'<div class="d-flex flex-column justify-content-between">'+
						'<div class="px-2 pb-1 p-name-1">'+ testItem.name +'</div>'+
						'<div class="d-inline px-2 pb-1">規格：<span>'+ testItem.spec +'</span></div>'+
					'</div>'+
				'</div>'+
			'</div>'+
						
			'<div class="d-flex justify-content-between align-items-center">'+
				'<div class="d-flex align-items-center select-quantity" data-price="'+ testItem.price +'">'+
					'<div class="d-flex me-2">'+
						// '<div class="input-group">'+
						// 	'<label class="input-group-text fs-7">數量</label>'+
						//   '<select class="form-select fs-7">'+ testItem.quantity +
						//   '</select>'+
						// '</div>'+
					'</div>'+
					'<div class="d-flex"><span class="me-1">小計</span><span class="fs-6 p-price lh-1 pe-2 subtotal">'+ parseInt(testItem.price) * parseInt(testItem.quantity) +'</span></div>'+
				'</div>'+
				'<div class="d-flex">'+
					'<div class="input-group">'+
						'<button class="btn" type="button" onclick="toggleFav(this);" data-fav="false"><span class="feather icon-heart"></span></button>'+
						'<button class="btn pe-0" type="button" onclick="removeFromCart(this);"><span class="feather icon-trash-2"></span></button>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>';
		
		$('#shoppingCartList').append(testItemDOM);
	
		updateCart();

		setTimeout(function(){
			$('.cart-item.item-invisible').toggleClass('item-invisible item-visible');
		}, 250);

		snackBar('#cartAdded');

		console.log('已加入購物車(PC)');

		return true;

		
	}
}



//mobile版直接購買(一般商品)
function directPurchaseMobile(t) {
	if (addToCartMobile(this)) {
		setTimeout(function(){
			document.location.href='checkOut1.html';
		}, 1000);	
	}
}

//pc版直接購買(一般商品)
function directPurchaseDesktop(t) {
	if (addToCartDesktop(this)) {
		setTimeout(function(){
			document.location.href='checkOut1.html';
		}, 1000);	
	}
}

//mobile版直接購買(組合商品)
function directPurchaseBundleMobile(t) {
	if (addToCartBundleMobile(this)) {
		setTimeout(function(){
			document.location.href='checkOut1.html';
		}, 1000);	
	}
}

//pc版直接購買(組合商品)
function directPurchaseBundleDesktop(t) {
	if (addToCartBundleDesktop(this)) {
		setTimeout(function(){
			document.location.href='checkOut1.html';
		}, 1000);	
	}
}

//mobile版直接購買(任選規格及數量)
function directPurchaseMultiSpecMobile(t) {
	if (addToCartMultiSpecMobile(this)) {
		setTimeout(function(){
			document.location.href='checkOut1.html';
		}, 1000);	
	}
}

//pc版直接購買(任選規格及數量)
function directPurchaseMultiSpecDesktop(t) {
	if (addToCartMultiSpecDesktop(this)) {
		setTimeout(function(){
			document.location.href='checkOut1.html';
		}, 1000);	
	}
}







function signUpCheck() {
  if ($('#membershipAgreement').is(":checked")) {
  	$('#turnOnPhoneModal').modal('show');
  }
  else {
  	$('#disagreeModal').modal('show');
  }
}


// if (window.location.hash == "#underAgeModal") {
//   setTimeout(function(){
//     $('#underAgeModal').modal('show');
//   }, 1000);
// }


$(function(){
	$('[data-message="error"]').hide();
	if (window.location.hash == "#errormsg") {
	    $('[data-message="error"]').show();
	}

	$('[data-logged-in="true"]').hide();
	if (window.location.hash == "#loggedin") {
	    $('[data-logged-in="true"]').show();
	    $('[data-logged-in="false"]').hide();
	}
});



// $('#orderAccordion .collapse').on('hidden.bs.collapse', function(){
// 	var i = $(this).attr('id');
// 	$('[data-bs-target="#' + i +'"]').prop('checked', false);
// });

// $('[data-bs-parent*="#orderCollapse"]').on('hidden.bs.collapse', function(){
// 	var i = $(this).attr('id');
// 	$('[data-bs-target="#' + i +'"]').prop('checked', false);
// });



//地址清單刪除地址
function removeAddress(t) {
	var addressItem = $(t).parents('.address-item');

	addressItem.animate({
        opacity: 0
    }, function () {
    	snackBar('#addressRemoved'); //提示訊息
        addressItem.detach();
        updateAddress(); 
    });
}


function updateAddress() {
	var addressItemAmount = $('#recentAddressList').find('.address-item').length;

	if(addressItemAmount == 0) {
		
		$('#recentAddressList .modal-body').html('<div class="d-flex flex-column justify-content-center p-3 text-center border-top"><span class="feather icon-meh fs-1"></span><span class="fs-6">地址簿是空的</span></div>');
		
		
	} else {
		$('#cartEmpty').remove();
	}
}

$('#orderAccordion input[data-target]').on('change', function(){
	var v = $(this).attr('data-target');
	$(v).collapse('show');
});

$('#invoiceCarrier').on('change', function(){
	var v = $(this).val();
	console.log(v);
	$(v).collapse('show');
});


$('input:checkbox[id*="invoiceReturnCheck"]').on('change', function(){
	if (!$(this).is(":checked")) {
		$('#alertModal').modal('show');
	}
});


function changeAddress(){
	var nuName = $('input[name=recentAddressRadio]:checked').attr('data-name');
	var nuTel = $('input[name=recentAddressRadio]:checked').attr('data-tel');
	var nuPhone = $('input[name=recentAddressRadio]:checked').attr('data-phone');
	var nuAddress = $('input[name=recentAddressRadio]:checked').attr('data-address');

	$('#selectedName').html(nuName);
	$('#selectedPhone').html(nuPhone);
	$('#selectedTel').html(nuTel);
	$('#selectedAddress').html(nuAddress);
}

function changeAddressInOrderTracking(){
	var nuName = $('input[name=recentAddressRadio]:checked').attr('data-name');
	var nuTelArea = $('input[name=recentAddressRadio]:checked').attr('data-tel-area');
	var nuTelNum = $('input[name=recentAddressRadio]:checked').attr('data-tel-num');
	var nuPhone = $('input[name=recentAddressRadio]:checked').attr('data-phone');
	var nuAddressCity = $('input[name=recentAddressRadio]:checked').attr('data-address-city');
	var nuAddressTown = $('input[name=recentAddressRadio]:checked').attr('data-address-town');
	var nuAddressRoad = $('input[name=recentAddressRadio]:checked').attr('data-address-road');

	$('#newName').val(nuName);
	$('#newPhone').val(nuPhone);
	$('#newTelArea').val(nuTelArea);
	$('#newTelNum').val(nuTelNum);
	$('#newAddressCity').val(nuAddressCity).change();
	$('#newAddressTown').val(nuAddressTown).change();
	$('#newAddressRoad').val(nuAddressRoad);
}

function confirmRecipientData() {


	var confirmedName = $('#newName').val();
	var confirmedPhone = $('#newPhone').val();
	var confirmedTel = $('#newTelArea').val() + '-' + $('#newTelNum').val();
	var confirmedAddress = $('#newAddressCity').val() + $('#newAddressTown').val() + $('#newAddressRoad').val();
	var confirmedNote = $('#newNote').val();
	var confirmedNoteInput = $('newNoteInput').val();

	if (confirmedName.length > 0 && confirmedPhone.length > 0 && confirmedAddress.length > 0 && confirmedNote.length > 0 ) {
		if ($('#newNote').val() == '其他' && $('newNoteInput').val() != undefined) {
			confirmedNote = '其他 - ';
			$('#currentNote').html(confirmedNote + confirmedNoteInput);
		} else {
			$('#currentNote').html(confirmedNote);
		}

		$('#currentName').html(confirmedName);
		$('#currentPhone').html(confirmedPhone);
		$('#currentTel').html(confirmedTel);
		$('#currentAddress').html(confirmedAddress);

		$('#editRecipientForm').collapse('hide');
		snackBar('#recipientDataChanged');	
	} else {
		
		snackBar('#recipientDataUnfinish');
		$('#editRecipientForm .mt-m1px').addClass('bg-alert');
		
		setTimeout(function(){
			$('#editRecipientForm .mt-m1px').removeClass('bg-alert');
		}, 3000);
	}

	

}


function changeInvoiceAddress(){
	var nuName = $('input[name=invoiceAddressRadio]:checked').attr('data-name');
	var nuTel = $('input[name=invoiceAddressRadio]:checked').attr('data-tel');
	var nuPhone = $('input[name=invoiceAddressRadio]:checked').attr('data-phone');
	var nuAddress = $('input[name=invoiceAddressRadio]:checked').attr('data-address');

	$('#selectedInvoiceName').html(nuName);
	$('#selectedInvoicePhone').html(nuPhone);
	$('#selectedInvoiceTel').html(nuTel);
	$('#selectedInvoiceAddress').html(nuAddress);
}

function sendIDtoApplyForm(t) {
	var orderID = $(t).attr('data-order-id');
	$('#returnOrderID').html(orderID);
}

function checkReturnTextarea() {
	if($("#returnTextarea").val().trim().length < 1)
	{
		$('#submitReturnTextarea').attr('disabled', true);
	} else {
		$('#submitReturnTextarea').attr('disabled', false);
	}
}

$('#returnApplyFormModal').on('shown.bs.modal', function(){
	checkReturnTextarea();
});

$('#returnTextarea').on('change', function(){
	checkReturnTextarea();
});

//618
// $('#vivaLogo').parent().after('<div id="eventClicker"></div>');
// $('#eventClicker').click(function(){
// 	window.open('https://www.vivatv.com.tw/html/20210618_Bright%20_provision.html');
// });

$('#defaultNote').on('change', function(){
	var value = $(this).val();
	if ( value == '4' ) {
		$('#defaultNoteInput').attr('disabled', false);
	} else {
		$('#defaultNoteInput').attr('disabled', true);
	}
});

$('#newNote').on('change', function(){
	var value = $(this).val();
	if ( value == '其他' ) {
		$('#newNoteInput').attr('disabled', false);
	} else {
		$('#newNoteInput').attr('disabled', true);
	}
});

$('#specifiedNote').on('change', function(){
	var value = $(this).val();
	if ( value == '4' ) {
		$('#specifiedNoteInput').attr('disabled', false);
	} else {
		$('#specifiedNoteInput').attr('disabled', true);
	}
});

//lazy load
const selector = ".lazy-load";
const dataSrc = "data-src";
const observerConfig = {
    root: null,
    rootMargin: '0px',
    threshold: [0]
};

const callback = function(entries, selfObserver) {
    Array.prototype.forEach.call(entries, function (entry) {
        if (entry.isIntersecting) {

            selfObserver.unobserve(entry.target);
            let src = entry.target.getAttribute(dataSrc);
            if ("img" === entry.target.tagName.toLowerCase()) {
                if (src) {	
                	entry.target.src = src;

                }
            } else {

            	let child = entry.target.children[0];
            	// console.log('child: '+ child);
            	child.src = src;

            	// console.log('data-src: ' + src);
            	// console.log(entry.target.children);
            }
        }
    });
}


let $images = document.querySelectorAll(selector);
let observer = new IntersectionObserver(callback, observerConfig);

Array.prototype.forEach.call($images, function (image) {
    observer.observe(image);
});




$(function() {
    $('img.lazy-load').on('load',function() {
        // fire when image loads
        $(this).parent().addClass('loaded');
    });
});


//
const changeNav = (entries, observer) => {
	entries.forEach((entry) => {
		// verify the element is intersecting
		// if(entry.isIntersecting && entry.intersectionRatio >= 0.5) {
		if(entry.isIntersecting) {

			var ratio = entry.intersectionRatio;
			
			document.querySelector('#stickyChild .active').classList.remove('active');
			
			var id = entry.target.parentNode.getAttribute('id');
			
			var newLink = document.querySelector(`[data-scroll-target="#${id}"]`).classList.add('active');
			
			var newButton = document.querySelector(`[data-scroll-target="#${id}"]`);

			var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) - 80 ;

			if ( newButton.offsetLeft > vw || newButton.parentNode.scrollLeft > 0 ) {
				newButton.parentNode.scrollLeft = newButton.offsetLeft - 10;
			}
			

		} 
	});
}

// init the observer
// const options2 = {
// 	rootMargin: '-95px 0px -50% 0px',
// 	rootMargin: '0px',
// 	threshold: [0, 1]
// }



// const observer2 = new IntersectionObserver(changeNav, options2);

// target the elements to be observed
// const flagships = document.querySelectorAll('.flagship-type');
// flagships.forEach((flagship) => {
// 	observer2.observe(flagship);
// });


//先宣告變數
// let contentBox;

// let nextArticleID = 1;
// let visibleAds = new Set();
// let previouslyVisibleAds = null;

// let adObserver;
// let refreshIntervalID = 0;

// window.addEventListener("load", startup, false);

//初始設置
function startup() {
 //  contentBox = document.querySelector("#newArrival");


 //  document.addEventListener("visibilitychange", handleVisibilityChange, false);

 //  let observerOptions = {
 //    root: null,
 //    rootMargin: "0px",
 //    threshold: [0.0, 0.75]
 //  };



 //  adObserver = new IntersectionObserver(intersectionCallback, observerOptions);

 //  const ads = document.querySelectorAll('.ad-123');
	// ads.forEach((ad) => {
	// 	adObserver.observe(ad);
	// });

  // buildContents();
  // refreshIntervalID = window.setInterval(handleRefreshInterval, 1000);
}

// function buildContents() {
	//do nothing
// }
//處理document的visibility changes
// function handleVisibilityChange() {
//   if (document.hidden) {
//     if (!previouslyVisibleAds) {
//       previouslyVisibleAds = visibleAds;
//       visibleAds = [];
//       previouslyVisibleAds.forEach(function(adBox) {
//         updateAdTimer(adBox);
//         adBox.dataset.lastViewStarted = 0;
//       });
//     }
//   } else {
//     previouslyVisibleAds.forEach(function(adBox) {
//       adBox.dataset.lastViewStarted = performance.now();
//     });
//     visibleAds = previouslyVisibleAds;
//     previouslyVisibleAds = null;
//   }
// }

//處理intersection changes
// function intersectionCallback(entries) {
//   entries.forEach(function(entry) {
//     let adBox = entry.target;

//     if (entry.isIntersecting) {
//       if (entry.intersectionRatio >= 0.75) {
//         adBox.dataset.lastViewStarted = entry.time;
//         visibleAds.add(adBox);
//       }
//     } else {
//       visibleAds.delete(adBox);
//       if ((entry.intersectionRatio === 0.0) && (adBox.dataset.totalViewTime >= 60000)) {
//         // replaceAd(adBox);
//       }
//     }
//   });
// }

//處理週期行為
// function handleRefreshInterval() {
//   let redrawList = [];

//   visibleAds.forEach(function(adBox) {
//     let previousTime = adBox.dataset.totalViewTime;
//     updateAdTimer(adBox);

//     if (previousTime != adBox.dataset.totalViewTime) {
//       redrawList.push(adBox);
//     }
//   });

//   if (redrawList.length) {
//     window.requestAnimationFrame(function(time) {
//       redrawList.forEach(function(adBox) {
//         drawAdTimer(adBox);
//       });
//     });
//   }
// }

//更新timer
// function updateAdTimer(adBox) {
//   let lastStarted = adBox.dataset.lastViewStarted;
//   let currentTime = performance.now();

//   if (lastStarted) {
//     let diff = currentTime - lastStarted;

//     adBox.dataset.totalViewTime = parseFloat(adBox.dataset.totalViewTime) + diff;
//   }

//   adBox.dataset.lastViewStarted = currentTime;
// }
//繪製timer
// function drawAdTimer(adBox) {
//   let timerBox = adBox.querySelector(".timer");
//   let totalSeconds = adBox.dataset.totalViewTime / 1000;
//   let sec = Math.floor(totalSeconds % 60);
//   let min = Math.floor(totalSeconds / 60);

//   timerBox.innerText = min + ":" + sec.toString().padStart(2, "0");
// }


// pagehide或beforeunload時, 儲存目前的scroll position和pathname到session中
// 同時檢查如果session已有紀錄的話, 則scroll到已記錄的位置
// 2021-07-14: 此功能先不實裝
// function saveScrollPos() {

// 	var pathName = document.location.pathname;


// 	var isOnIOS = navigator.userAgent.match(/iPad/i)|| navigator.userAgent.match(/iPhone/i);
// 	var eventName = isOnIOS ? "pagehide" : "beforeunload";

// 	window.addEventListener(eventName, function (event) { 
// 	  var scrollPosition = $('body').scrollTop();
//     sessionStorage.setItem("scrollPosition_" + pathName, scrollPosition.toString());  
// 	});

	
// 	if (sessionStorage["scrollPosition_" + pathName]) {
//     $('body').scrollTop(sessionStorage.getItem("scrollPosition_" + pathName));
    
// 	}

// }


$('[data-scroll-target]').click(function(){
  var target = $(this).attr('data-scroll-target');
  var top = parseInt($(target).offset().top);
  var offset = 0;
  if ( $(this).attr('data-scroll-offset') ) {
    offset = parseInt($(this).attr('data-scroll-offset'));
  }
  var offset2 = 0;
  if ( $(this).attr('data-scroll-offset-target') ) {
  	var i = $(this).attr('data-scroll-offset-target');
  	offset2 = parseInt($(i).innerHeight());
  	console.log('offset2: '+ offset2);
  }
  var scrollto = top - offset;
  scrollto = scrollto - offset2;

  //一定要有body, 否則舊版ios不會有作用
  $('html, body').animate({scrollTop: scrollto}, 'fast');

});


// const el = document.querySelector(".myElement")
// const stickyObserver = new IntersectionObserver( 
//   ([e]) => e.target.classList.toggle("is-pinned", e.intersectionRatio < 1),
//   { threshold: [1] }
// );

// stickyObserver.observe(el);


var stickyObserver = new IntersectionObserver(function(entries) {
	if(entries[0].intersectionRatio === 0)
		document.querySelector("#stickyTarget").classList.add("stuck");
	else if(entries[0].intersectionRatio === 1)
		document.querySelector("#stickyTarget").classList.remove("stuck");
}, { threshold: [0,1] });

if ($('.sticky-observer-top').length) {
	stickyObserver.observe(document.querySelector(".sticky-observer-top"));
}