
window.onload = function() {
	//cache test
	// var testTarget = document.querySelector('.footer .bg-independence .row .col');
	// var testTxt = ' cache test 123 ';
	// if (testTarget) {
	// 	testTarget.append(testTxt);
	// }

	var policyRuns = 0;

	var policyInterval = setInterval(()=>{

		policyRuns+=1;

		if (policyRuns === 5) {
			clearInterval(policyInterval);
		}

		changePrivacyPolicyHref();
		// changeArticleTitle();
		// setEventTheme();
		// appendBannerInCheckOut4();
		// handleDysonInstallments();
		// handleProductIntroImg();
	}, 1000);
}

// setTimeout(()=>{
// 	changePrivacyPolicyHref();
// }, 1000);

// window.navigation.addEventListener("navigate", (event) => {
//     console.log('location changed!');
// })

// window.addEventListener('locationchange', function () {
//     console.log('location changed!');
// });

// window.addEventListener('hashchange', function () {
//     console.log('hash changed!');
// });

// create an Observer instance
// const resizeObserver = new ResizeObserver(entries => {
//   console.log('Body height changed:', entries[0].target.clientHeight)
// })

// start observing a DOM node
//resizeObserver.observe(document.body)


function handleProductTabs() {
	if (document.body.contains(document.getElementById('productTabContent'))) {

		document.querySelectorAll('#productTabs .nav-link').forEach(linkItem => {
		  linkItem.addEventListener('click', _ => {
		    document.getElementById('productTabContent').scrollIntoView(true);
		  })
		})
	}
}




document.addEventListener("DOMContentLoaded", (event) => {
  	setInterval(()=>{
		// setEventTheme();
		handleProductTabs();
	}, 1000);
});


// function handleDysonInstallments() {
// 	if ( dayjs().isBefore(dayjs('2023-05-06')) ) {
// 		var productPageGridLayout = document.querySelector('#productPageGridLayout');
// 		var productTagID = document.querySelector('#productTagID .p-id').innerText;
// 		var installments = document.querySelectorAll('.d-flex.justify-content-center.align-items-center.fs-6.text-danger');
// 		if ((productTagID == '312741' || productTagID == '312742') && productPageGridLayout) {
// 			[].forEach.call(installments, (el) => {
// 				el.innerText = '福利價';
// 			});
// 		}
// 	}
// }





function appendBannerInCheckOut4() {
	var checkOutStep4 = document.querySelector('#checkOutStep .d-flex.flex-column.align-items-center.step-4.done');
	var checkOutStep4Banner = document.querySelector('#checkOutStep4Banner');

	if (checkOutStep4 && !checkOutStep4Banner) {
		// console.log('checkOutStep4 exists!');
		var checkOutStep = document.querySelector('#checkOutStep');
		var checkOutStep4BannerDiv = document.createElement('div');
		var child = document.querySelector('#checkOutStep + .d-flex.flex-column.p-3');

		checkOutStep.insertBefore(checkOutStep4BannerDiv, child);

		checkOutStep4BannerDiv.classList.add('w-100');
		checkOutStep4BannerDiv.innerHTML = 
		'<a href="https://www.vivatv.com.tw/html/202304signup.html" target="_blank">'+
		'<img id="checkOutStep4Banner" src="https://www.vivatv.com.tw/html/images/act/2023/04/checkOut4-1400x560.jpg" class="img-fluid mt-3 rounded-3">'+
		'</a>';
	}
}

function changePrivacyPolicyHref() {
	var target = document.querySelector('#offcanvasCookie a.text-decoration-underline.text-white');
	(target) && target.setAttribute('href', '/information/guide/privacyPolicy');
}

function changeArticleTitle() {
	//改知識文title
	var docTitle = document.title;
	// console.log(docTitle.substring(0,6));
	if ( document.querySelector('article[data-article-id]') && docTitle.substring(0,6) != '【悅讀美好】') {
		document.title = '【悅讀美好】' + docTitle;
	}
}

var timeStamp = Math.floor(Date.now() / 1000);
var commonStyle = document.createElement('link');  
commonStyle.setAttribute('rel','stylesheet');
commonStyle.setAttribute('href','https://www.vivatv.com.tw/common/images/event/common.css?v='+ timeStamp +'');
document.head.appendChild(commonStyle);





// window.addEventListener('click', function(){
// 	setTimeout(()=>{
// 		setEventTheme();
// 	}, 500);
// });







// const flagshipBN_A = document.createElement('div');
// flagshipBN_A.classList.add('w-100');
// flagshipBN_A.innerHTML = 
// '<div id="swpFlagshipArticleTemp" class="p-2 position-relative">'+
// 	'<div class="swiper-container">'+
// 		'<div class="swiper-wrapper">'+
// 	        '<div class="swiper-slide">'+
// 	        	'<a href="https://www.vivatv.com.tw/article/E19D1089127FC387E053844D12AC1375"><img src="https://www.vivatv.com.tw/common/images/blogPost/2022111802/banner.jpg" class="img-fluid"></a>'+
// 	        '</div>'+
// 	    '</div>'+
// 		'<div class="swiper-pagination"></div>'+
// 	'</div>'+
// 	'<div class="d-none d-xl-block">'+
// 	    '<div class="swiper-button-prev"></div>'+
// 	    '<div class="swiper-button-next"></div>'+
// 	'</div>'+
// '</div>';



// if (window.location.href.indexOf('/flagShip/flagshipBrand/DF3EE7E72F9E4406E05400144FF9CEC6') > -1 ) {
	
// 	var swiperStyle = document.createElement('link');  
// 	swiperStyle.setAttribute('rel','stylesheet');
// 	swiperStyle.setAttribute('href','https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css');
// 	document.head.appendChild(swiperStyle);

// 	var swiperScript = document.createElement('script');  
// 	swiperScript.setAttribute('src','https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js');
// 	document.head.appendChild(swiperScript);

// 	document.querySelector('.p-xl-4.py-xl-2.swiper-section .container-xl.p-0').append(flagshipBN_A);

// 	setTimeout(()=>{
// 		const swpFlagshipArticleTemp = new Swiper('#swpFlagshipArticleTemp .swiper-container', {
// 			loop: true,
// 			effect: 'slide',
// 			pagination: {
// 			  el: '#swpFlagshipArticleTemp .swiper-pagination',
// 			    type: 'bullets',
// 			},
// 			navigation: {
// 				nextEl: '#swpFlagshipArticleTemp .swiper-button-next',
// 				prevEl: '#swpFlagshipArticleTemp .swiper-button-prev',
// 			},
// 			breakpoints: {
// 				1200: {
// 					slidesPerView: 3,
// 					slidesPerGroup: 1,
// 					spaceBetween: 10,
// 				},
// 			},
// 		});
// 	}, 500);

// }



//首頁大頁另外append可以點擊的區塊
var clickableDOM = document.createElement('div');
clickableDOM.innerHTML = 
'<div class="clickableDOM">'+
  '<div class="clickableDOM-bg">'+
    '<img src="https://www.vivatv.com.tw/common/images/event/clickableDOM-bg.png" class="img-fluid">'+
  '</div>'+
  '<div class="clickableDOM-rabbit">'+
    '<a href="https://www.vivatv.com.tw/html/202212sp.html">'+
      '<img src="https://www.vivatv.com.tw/common/images/event/clickableDOM-rabbit.png" class="img-fluid" title="前往活動頁">'+
    '</a>'+
  '</div>'+
  '<div class="clickableDOM-bubble">'+
    '<a href="https://www.vivatv.com.tw/html/202212sp.html">'+
      '<img src="https://www.vivatv.com.tw/common/images/event/clickableDOM-bubble-2.png" class="img-fluid" title="前往活動頁">'+
    '</a>'+
  '</div>'+
'</div>';

function fixArticleLandingImage() {
	let landingImage = document.querySelector('article.d-flex > .container-fluid.p-0 > .d-flex.justify-content-center');
	if (landingImage) {
		landingImage.classList.remove('d-flex', 'justify-content-center');
		landingImage.classList.add('text-center');
	}

	let article = document.querySelector('[data-article-id="2023010501"]');
	if (article) {
		var row = article.querySelector('.row.row-cols-3.row-cols-xl-6.g-0.mb-3.mb-xl-5');

		if (row) {
			row.classList.remove('row-cols-xl-6');
			row.classList.add('row-cols-xl-2');

			var cols = row.querySelectorAll('.col');
			[].forEach.call(cols, (el)=> {
				el.classList.add('p-xl-3');
			});	
		}
		
	}
}

function appendClickableDOM() {
	let swpMainDOM = document.querySelector('#swpMain');
	let divClickableDOM = document.querySelector('.clickableDOM');
	if (swpMainDOM && !divClickableDOM) {
		swpMainDOM.append(clickableDOM);
		//console.log('clickableDOM appended.');
	}
}



function setEventTheme() {
	
	if ( !document.body.classList.contains('dark-mode') ) {

	

		var eventInterval_Blackfriday = dayjs().isBetween('2024-11-25 00:00:00', '2024-12-01 23:59:59', 'second', '[]');
		var checkOutStep = document.querySelector('#checkOutStep');

		if (window.location.hash == "#dark") {
			darkMode();
		}

		// var topNavAnimatedBannerButton = document.querySelector('#topNavAnimatedBanner');
		// if (topNavAnimatedBannerButton) {
		// 	topNavAnimatedBannerButton.addEventListener('click', function(e){		
		// 		e.preventDefault();
		// 		location.href = 'https://www.vivatv.com.tw/html/20221111act.html';
		// 	});
		// }

		// var HomePopupModalTarget = document.querySelector('#HomePopupModal .modal-body > .d-flex.justify-content-center');
		// if (HomePopupModalTarget) {
		// 	HomePopupModalTarget.addEventListener('click', function(e){
		// 		e.preventDefault();
		// 		location.href = 'https://www.vivatv.com.tw/html/20221111act.html';
		// 	});
		// }

		// 首頁TV區塊class調整
		var tvScheduleHome = document.querySelector('#tvScheduleHome');
		if (tvScheduleHome) {
			tvScheduleHome.parentNode.classList.remove('flex-md-row');
			tvScheduleHome.parentNode.classList.add('flex-lg-row');
		}

		fixArticleLandingImage();
		
		var pageNotFound = document.querySelector('#mainWrapperNew .col-12.col-lg-6.text-center h2');
		var productNotFound = document.querySelector('#mainWrapperNew .col-12.col-lg-6.text-center h1');

		var initLogin = document.querySelector('#initLogin');
		var fillOutSection = document.querySelector('#fillOutSection');
		var article = document.querySelector('article.noto-sans-tc');
		var articleList = document.querySelector('#articleList');

		
		// 結帳流程、活動登記頁不套用
		if (checkOutStep || initLogin || fillOutSection || article || articleList) {
			document.body.classList.remove('red-mode');
			document.body.classList.remove('dark-mode');
		} 
		//頁面不存在不套用
		else if (pageNotFound) {
			if (pageNotFound.innerText == '頁面不存在'){
				document.body.classList.remove('red-mode');
				document.body.classList.remove('dark-mode');	
			}
		}
		//查無此商品不套用
		else if (productNotFound) {
			if (productNotFound.innerText == '查無此商品'){
				document.body.classList.remove('red-mode');
				document.body.classList.remove('dark-mode');	
			}
		}
		else {
			if (eventInterval_Blackfriday) {
				
				document.body.classList.add('dark-mode');
				// appendClickableDOM();

			}  else {
				//default
				document.body.classList.add('default-mode');
			}
		}
	}
}


function darkMode(){
	document.body.classList.add('dark-mode');
}

function handleProductIntroImg () {

	var images = document.querySelectorAll('#productIntro img');

	if (images.length) {
		[].forEach.call(images, (el)=>{
		  // console.log(el.naturalWidth);
		  if (el.naturalWidth == 1) {
		    el.src="https://www.vivatv.com.tw/common/images/event/image-error.jpg";
		  }
		});	
	}
}


window.addEventListener('popstate',function(event){
   // setTimeout(()=>{
   	// console.log(event);
   // },1000);
})