//點開「信用卡一次付清」時, 去檢查卡片數量
//數量小於3時，把快速結帳開關on；數量等於3時，快速結帳開關off
$('#payOff').on('change', function(){
	if (this.checked == true) {
		checkMainCard();
	}
});





function deleteMemberConfirm() {
	if (document.querySelector('#deleteMemberAgreeCheckbox').checked) {
		document.querySelector('#deleteMemberConfirmDialog').showModal()
	} else {
		document.querySelector('#deleteMemberAgreeAlert').showModal()
	}
	
}
function deleteMemberAgreeAlertClose() {
	document.querySelector('#deleteMemberAgreeAlert').close()
}

function deleteMemberConfirmNo() {
	document.querySelector('#deleteMemberConfirmDialog').close()
}
function deleteMemberConfirmYes() {
	document.querySelector('#deleteMemberConfirmDialog').close()
	setTimeout(()=>{
		// $('#deleteMemberFailModal').modal('show')
		$('#deleteMemberSuccessModal').modal('show')
	}, 500)
	
}

function alertDialogShow(text) {
	document.querySelector('#alertDialog .alert-text').innerHTML = text
	document.querySelector('#alertDialog').showModal()
}

function alertDialogClose() {
	document.querySelector('#alertDialog').close()
}



function checkBeforeAddDemo(t) {
	// 2024新規則如下
	// 1.	當只有一件主商品時，加購商品直接添加於主商品下，同一加購商品只能被加一次，但允許多件不同的加購商品。（可以有加購A＋加購B＋加購C…，但不能有加購Ａ+加購Ａ+加購Ａ，因為主商品只有一件）
	// 2.	每件主商品最多只能帶三件加購商品
	// 3.	當有複數件主商品時，同一件加購商品，可依照主商品的件數，來決定可加購的數量。（例如主商品有兩件時，就可允許有加購Ａ＋加購Ａ的情況，但不能超過兩件，程式需做檢查）
	// 4.	假設購物車中已有Ａ、Ｂ兩件主商品，想再添加ａ、ｂ、ｃ的加購商品，其中ａ想買兩件，則加入範例如下：
	//		主商品A
	//		├─加購商品a
	//		├─加購商品b
	//		└─加購商品c
	//		主商品B
	//		└─加購商品a
	

	var targetImg = t.closest('.col').querySelector('img').getAttribute('src')
	var targetID = targetImg.substring(48, 54)
	var targetName = t.closest('.col').querySelector('img').getAttribute('alt')
	var targetPrice= t.closest('.col').querySelector('.p-price').innerText
	var targetSpec = t.closest('.col').querySelector('select').value
	t.closest('.col').querySelector('select').classList.remove('bg-alert')

	if (targetSpec == 0) {
		alertDialogShow('請選擇加購商品規格')
		
		t.closest('.col').querySelector('select').classList.add('bg-alert')

		return
	}

	console.log('targetSpec:'+targetSpec)
	

	var mainItem = document.querySelectorAll('#shoppingCartList > .cart-item')
	var mainItemQuantity = document.querySelectorAll('#shoppingCartList > .cart-item').length
	
	console.log('主商品總數:'+mainItemQuantity)

	var newItem = document.createElement('div')
	var newItemHTML = 
      '<!-- dummy checkbox -->'+
      '<div class="d-flex align-items-start align-items-xl-center ps-1 pe-3">'+
        '<input class="form-check-input large-checkbox" type="checkbox" name="selectProductForCheckOut" id="selectProductForCheckOut-1-1" checked>'+
      '</div>'+
      '<div class="d-flex flex-column flex-xl-row justify-content-between flex-fill">'+
        '<!-- 商品圖、品名、折扣 -->'+
        '<div class="d-flex">'+
          '<div class="col-2 col-xl-1"><img src="'+ targetImg +'" class="img-fluid"></div>'+
          '<div class="d-flex ps-md-2 col-9 col-xl-11">'+
            '<div class="d-flex flex-column justify-content-between">'+
              '<div class="px-2 mb-1 p-name-1"><span class="border text-secondary px-1 me-1 fs-8">'+ targetID +'</span>'+ targetName +'</div>'+
              '<div class="d-flex px-2">規格：<span>'+ targetSpec +'</span></div>'+
              '<!-- 加價購商品不適用任何購物金 -->'+
              '<!-- <div class="d-flex">'+
                '<div class="px-2 py-1 m-1 rounded border fs-7 text-danger border-danger">*本商品不適用任何購物優惠金</div>'+
              '</div> -->'+
            '</div>'+
          '</div>'+
        '</div>'+
        '<!-- 數量、小計、加入收藏、刪除 -->'+
        '<div class="d-flex flex-wrap justify-content-between align-items-center col-xl-6">'+
          '<div class="d-flex align-items-center select-quantity" data-price="'+ targetPrice +'">'+
            '<!-- 加購商品數量只能選1, 預設用css隱藏不給選 -->'+
            '<div class="d-flex me-2 me-xl-4">'+
              '<div class="input-group">'+
                '<label class="input-group-text fs-7">數量</label>'+
                '<select class="form-select fs-7">'+
                  '<option value="1" selected>1</option>'+
                '</select>'+
              '</div>'+
            '</div>'+
            '<div class="d-flex"><span class="me-1">小計</span><span class="fs-6 p-price lh-1 pe-2 subtotal">'+ targetPrice +'</span></div>'+
          '</div>'+
          '<div class="d-flex me-xl-2">'+
            '<div class="input-group">'+
              '<button class="btn pe-0" type="button" onclick="removeAdditionalPurchase(this);"><span class="feather icon-trash-2"></span></button>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>';
    
    newItem.classList.add('d-flex', 'flex-column', 'flex-xl-row', 'px-3', 'py-0', 'p-xl-3', 'cart-item', 'col', 'additional-purchase', 'item-visible');
    newItem.setAttribute('item-id', targetID)

    newItem.innerHTML = newItemHTML

    

    var existItem = document.querySelectorAll('#shoppingCartList [item-id="' + targetID + '"]')
	var mainItemChildQuantity = document.querySelectorAll('#shoppingCartList > .cart-item .additional-purchase').length
	
	console.log('existItem.length:'+existItem.length)

    
    if (mainItemChildQuantity == (mainItemQuantity * 3)) {
    	
    	alertDialogShow('<h5>已達可加購上限囉！</h5><div class="fs-65">(您可新增其它主商品來加購更多優惠商品)</div>')
    } 
    else {

    	for (let i = 0; i < mainItemQuantity; i++) {
    		if (!mainItem[i].querySelector('[item-id="'+ targetID +'"]') && mainItem[i].querySelectorAll('[item-id]').length < 3) {
    			mainItem[i].querySelector('.additional-purchase-wrapper').appendChild(newItem)
		    	mainItem[i].classList.add('has-child')
		    	snackBar('#cartAdded')
		    	break
    		}
    		else if (mainItem[i].querySelector('[item-id="'+ targetID +'"]') && (i==mainItemQuantity-1)) {
    			mainItem[i].querySelector('.additional-purchase-wrapper').appendChild(newItem)
		    	mainItem[i].classList.add('has-child')
		    	snackBar('#cartAdded')

		    	var current = mainItem[i].querySelector('[item-id="'+ targetID +'"]')
		    	var previous

		    	for (let m = 0; m < mainItemQuantity; m++) {
		    		if ( mainItem[m].querySelector('[item-id="'+ targetID +'"]')) {
		    			//有找到同樣item id的商品，就pass
		    		} else {
		    			previous = mainItem[m].querySelectorAll('[item-id]')
		    		}
		    	}
		    	
		    	
		    	for (let j = 0; j < 2; j++) {
		    		
		    		if (!mainItem[i].querySelector('[item-id="'+ previous[j].getAttribute('item-id') +'"]')) {

		    			swapElements(current, previous[j])

		    			break
		    		}
		    	}
		    	
		    	break
    		}
    	}
    	
    	existItem = document.querySelectorAll('#shoppingCartList [item-id="' + targetID + '"]')
    	mainItemChildQuantity = document.querySelectorAll('#shoppingCartList > .cart-item .additional-purchase').length

    	if (mainItemQuantity == existItem.length ) {
    		t.closest('.col').classList.add('limit-reached')
    		t.closest('.col').style.opacity = .5
    		t.closest('.col').querySelector('button').innerText = '已達上限'
	    	t.closest('.col').querySelector('button').style.pointerEvents = 'none'
	    	t.closest('.col').querySelector('select').style.pointerEvents = 'none'
    	}  

    	
    	updateCart()

    	console.log('加價商品總數:'+ mainItemChildQuantity)
    	console.log(targetID+'目前總數:'+existItem.length)
    }
	
	// document.querySelector('.cart-item.col.additional-purchase').classList.remove('d-none')
	// document.querySelector('.cart-item.col.additional-purchase').classList.add('d-flex')
}



function swapElements(obj1, obj2) {
    // create marker element and insert it where obj1 is
    var temp = document.createElement("div");
    obj1.parentNode.insertBefore(temp, obj1);
    

    // move obj1 to right before obj2
    obj2.parentNode.insertBefore(obj1, obj2);
    // obj2.parentNode.appendChild(obj1);

    // move obj2 to right before where obj1 used to be
    // temp.parentNode.insertBefore(obj2, temp);
    temp.parentNode.appendChild(obj2);

    // remove temporary marker node
    temp.parentNode.removeChild(temp);
}




//商品頁加價購商品輪播
const swpAdditionalBuy = new Swiper('#swpAdditionalBuy .swiper-container', {
	slidesPerView: 3,
	slidesPerGroup: 1,
	allowTouchMove: true,
	loop: 0,
	spaceBetween: 8,
	freeMode: false,
	speed: 200,
	effect: 'slide',
	mousewheel: {
		sensitivity: 1,
		releaseOnEdges: false
	},
	scrollbar: {
	    el: '#swpAdditionalBuy .swiper-scrollbar',
	    draggable: true
	},
	navigation: {
		nextEl: '#swpAdditionalBuy .swiper-button-next',
		prevEl: '#swpAdditionalBuy .swiper-button-prev',
	},
	breakpoints: {
		768: {
			slidesPerView: 6,
			allowTouchMove: true
		},
		1200: {
			slidesPerView: 6,
			allowTouchMove: false
		}
	}
});

//結帳流程加價購商品輪播
const swpAdditionalBuyInCheckout = new Swiper('#swpAdditionalBuyInCheckout .swiper-container', {
	// slidesPerView: 3,
	// slidesPerGroup: 1,
	// allowTouchMove: true,
	allowTouchMove: true,
	slidesPerView: 3,
	slidesPerGroup: 3,
	slidesPerColumn: 2,
	slidesPerColumnFill: 'row',
	spaceBetween: 0,
	allowSlideNext: true,
	allowSlidePrev: true,

	loop: 0,
	spaceBetween: 8,
	freeMode: false,
	speed: 200,
	effect: 'slide',
	
	scrollbar: {
	    el: '#swpAdditionalBuyInCheckout .swiper-scrollbar',
	    draggable: true
	},
	navigation: {
		nextEl: '#swpAdditionalBuyInCheckout .swiper-button-next',
		prevEl: '#swpAdditionalBuyInCheckout .swiper-button-prev',
	},
	breakpoints: {
		768: {
			allowTouchMove: true,
			slidesPerView: 8,
			slidesPerGroup: 8,
			slidesPerColumn: 2,
			slidesPerColumnFill: 'row',
			spaceBetween: 0,
			allowSlideNext: true,
			allowSlidePrev: true
		},
		1200: {
			
			allowTouchMove: false,
			slidesPerView: 8,
			slidesPerGroup: 8,
			slidesPerColumn: 2,
			slidesPerColumnFill: 'row',
			spaceBetween: 0,
			allowSlideNext: true,
			allowSlidePrev: true
		}
	}
});



$(function(){

	var addBuyAmount = 0;

	const addBuyCheckboxes = document.querySelectorAll('input[name="additionalBuyCheckbox"]')
	if (addBuyCheckboxes) {
		addBuyCheckboxes.forEach(addBuyCheckbox => {
			addBuyCheckbox.addEventListener('change', () => {
				
				updateAdditionalBuyQuantity()
				if (!addBuyCheckbox.classList.contains('checked')) {
					addBuyCheckbox.parentNode.querySelector('select').setAttribute('required', true);
					addBuyCheckbox.classList.add('checked');
					addBuyCheckbox.closest('.col').classList.add('selected');
					addBuyAmount = addBuyAmount + parseInt(addBuyCheckbox.closest('.col').querySelector('.p-price').innerText)
					document.querySelector('#addBuyAmount').innerText = addBuyAmount;
				} else {
					addBuyCheckbox.parentNode.querySelector('select').setAttribute('required', false);
					addBuyCheckbox.classList.remove('checked');
					addBuyCheckbox.closest('.col').classList.remove('selected');
					addBuyAmount = addBuyAmount - parseInt(addBuyCheckbox.closest('.col').querySelector('.p-price').innerText)
					document.querySelector('#addBuyAmount').innerText = addBuyAmount;
				}
			})
		})
	}

});


function updateAdditionalBuyQuantity() {
	var addBuyChecked = document.querySelectorAll('input[name="additionalBuyCheckbox"]:checked')
	document.querySelector('#addBuyQuantity').innerText = addBuyChecked.length;
}




//線上客服訊息輪播
const swpChatboxPinnedMsg = new Swiper('#swpChatboxPinnedMsg .swiper-container', {
	slidesPerView: 1,
	loop: 1,
	spaceBetween: 0,
	freeMode: true,
	speed: 500,
	observer: true,
  	observeParents: true,
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	effect: 'fade',
	fadeEffect: {
      crossFade: true
    }
});


function callServiceDialog() {
	document.querySelector('#callServiceDialog').showModal();
}

function callServiceDialogNo() {
	document.querySelector('#callServiceDialog').close();
}

function callServiceDialogYes() {
	document.querySelector('#callServiceDialog').close();
	
	toggleOnlineChatBox();
	document.querySelector('#onlineChatBoxBtn').classList.remove('chat-start');
	document.querySelector('#onlineChatBoxBtn').classList.remove('text-service-chosen');
	window.location.href = 'tel://0809053888';

}




function endChatConfirm() {
	document.querySelector('#endChatConfirmDialog').showModal();
}

function endChatConfirmNo() {
	document.querySelector('#endChatConfirmDialog').close();
}

function endChatConfirmYes() {
	document.querySelector('#endChatConfirmDialog').close();
	
	toggleOnlineChatBox();
	document.querySelector('#onlineChatBoxBtn').classList.remove('chat-start');
	document.querySelector('#onlineChatBoxBtn').classList.remove('text-service-chosen');
}

//線上客服公告收合及展開
const togglePinnedMsg = document.querySelector('#togglePinnedMsg');
if (togglePinnedMsg) {
	togglePinnedMsg.addEventListener('click', ()=> {
		document.querySelector('#swpChatboxPinnedMsg').classList.toggle('hide');
		swpChatboxPinnedMsg.update();
		togglePinnedMsg.classList.toggle('active');
	})	
}





const modalPhoneService = new bootstrap.Modal('#modalPhoneService', {keyboard: false});
if (document.querySelector('#modalPhoneService')) {
	document.querySelector('#modalPhoneService').addEventListener('show.bs.modal', ()=>{
		document.querySelector('#onlineChatBoxBtn').classList.remove('active');
		document.querySelector('#onlineChatBoxBtn').classList.toggle('disable');
	});

	document.querySelector('#modalPhoneService').addEventListener('hide.bs.modal', ()=>{
		document.querySelector('#onlineChatBoxBtn').classList.toggle('disable');
	});
}

function toggleServices() {

	if (document.querySelector('#onlineChatBoxBtn').classList.contains('text-service-chosen')) {
		toggleOnlineChatBox();
		
	} else {
		document.querySelector('#onlineChatBoxBtn').classList.toggle('active');
	}
	

}

const customerInput = document.querySelector('#customerInput');
if (customerInput) {
	customerInput.addEventListener('keypress', function(event) {
		if (event.key === 'Enter') {
			event.preventDefault();
		    handleCustomerMsgInput();
		}
	});
}


function toggleOnlineChatBox() {
	document.querySelector('#onlineChatBoxBtn').classList.add('chat-start');
	document.querySelector('#onlineChatBoxBtn').classList.add('text-service-chosen');
	document.querySelector('#onlineChatBoxBtn').classList.remove('active');
	document.querySelector('#onlineChatBoxBtn').classList.toggle('disable');
	document.querySelector('#toggleServicesBtn').classList.toggle('active');
	document.querySelector('#onlineChatBox').classList.toggle('in');
	if (document.querySelector('#onlineChatBox').classList.contains('in')) {
		document.body.classList.add('chatbox-opened')
	} else {
		document.body.classList.remove('chatbox-opened')
	}
}

function toggleEmoji() {
	if (document.querySelector('#fontSizeWrapper').classList.contains('in')) toggleFsize();
	document.querySelector('#toggleEmojiWrapper').classList.toggle('active');
	document.querySelector('#emojiWrapper').classList.toggle('in');
	// document.querySelector('#onlineChatBoxBody').classList.toggle('shrink');
	
  	
}

function toggleFsize() {
	if (document.querySelector('#emojiWrapper').classList.contains('in')) toggleEmoji();
	document.querySelector('#toggleFontSize').classList.toggle('active');
	document.querySelector('#fontSizeWrapper').classList.toggle('in');
	
  	
}
const fontSizeRange = document.querySelector("#fontSizeRange");

if (fontSizeRange) {
	fontSizeRange.addEventListener("input", (event) => {
	  document.querySelector('#onlineChatBoxBody').setAttribute('data-font-size', event.target.value);
	});	
}





var emojiBtns = document.querySelectorAll('#emojiGroup .btn');
	console.log(emojiBtns);

	emojiBtns.forEach(emojiBtn => {
		emojiBtn.addEventListener('click', () => {
			console.log(emojiBtn.innerText);
			// let currentTxt = document.querySelector('#customerInput').value;
			// document.querySelector('#customerInput').value = currentTxt + emojiBtn.innerText;

			let text = emojiBtn.innerText;
			let position = customerInput.selectionStart;
			let before = customerInput.value.substring(0, position);
			let after = customerInput.value.substring(position, customerInput.value.length);
			customerInput.value = before + text + after;

			// customerInput.selectionStart = customerInput.selectctionEnd = position + text.length;
			customerInput.focus();
		});
	});







function handleCustomerMsgInput() {

	var m = new Date();
	var timeString =
    ("0" + m.getHours()).slice(-2) + ":" +
    ("0" + m.getMinutes()).slice(-2) + ":" +
    ("0" + m.getSeconds()).slice(-2);

	console.log(timeString);

	const customerMsgHtml = 	
	'<div class="chatbox-msg-header">'+
  		'<div class="chatbox-timestamp">'+ timeString +'</div>'+
	'</div>'+
	'<div class="chatbox-msg-body">'+
  		'<div class="chatbox-bubble">'+ customerInput.value +'</div>'+
	'</div>';

  	var customerMsgDiv = document.createElement('div');
  	customerMsgDiv.setAttribute('class', 'chatbox-msg customer-msg');
  	customerMsgDiv.innerHTML = customerMsgHtml;

  	if(customerInput.value.length > 0) {
  		document.querySelector('#onlineChatBoxBody').appendChild(customerMsgDiv);
	  	customerInput.value = '';
  	}
  	

  	if (document.querySelector('#emojiWrapper').classList.contains('in')) toggleEmoji();
  	if (document.querySelector('#fontSizeWrapper').classList.contains('in')) toggleFsize();

  	var objDiv = document.querySelector('#onlineChatBoxBody');
	objDiv.scrollTop = objDiv.scrollHeight;
}

// var myToastEl = document.getElementById('liveToast')
// var myToast = bootstrap.Toast.getOrCreateInstance(myToastEl)



function testImage(url) {
    var tester = new Image();
    tester.addEventListener('load', imageFound);
    tester.addEventListener('error', imageNotFound);
    tester.src = url;
}
function imageFound() {
    console.log('圖片正常Loading');
}
function imageNotFound() {
    console.log('已偵測到廣告阻擋器');
    
    var myAlert =document.getElementById('liveToast');//select id of toast
    var bsAlert = new bootstrap.Toast(myAlert, {
    	autohide: false
    });//inizialize it
    bsAlert.show();//show it

    // myToast.show();
}
testImage("https://www.vivatv.com.tw/common/images/bn/dummy-bn.jpg");


//卡號input輸入4位數後自動跳下一個
$('.card-number').on('keyup', function() {
	
	//澽掉非數字的其它字元
    this.value = this.value.replace(/\D/g, '');
    
	if (this.value.length == this.maxLength) {
		
    	var $next = $(this).next('.card-number');
    	if ($next.length) {
			$(this).next('.card-number').focus();
			//必需清掉下一個input的值,否則使用者輸入太快有機率亂跳
			$(this).next('.card-number').val('');
    	}
    	else {
        	$(this).blur();
    	}
    }
 
    //當卡片組數為3時，只要卡號有變動, 就將快速結帳開關設為off (避免使用者先設on才去改卡號)
    checkMainCard();
    
});


//點擊卡號input自動選取全部
$('.card-number').focus(function() {
	$(this).select();
});


//
const creditCardFullModal = new bootstrap.Modal('#creditCardFullModal', {keyboard: false});
if (document.querySelector('#creditCardFullModal')) {
	document.querySelector('#creditCardFullModal').addEventListener('hide.bs.modal', ()=>{
		checkMainCard();
	});
}

const creditCardListModal = new bootstrap.Modal('#creditCardListModal', {keyboard: false});
if (document.querySelector('#creditCardListModal')) {
	document.querySelector('#creditCardListModal').addEventListener('hide.bs.modal', ()=>{
		checkMainCard();
	});
}


//結帳3: 檢查信用卡list
function checkCreditCardList() {

	//取得目前信用卡列表中的卡片數量
	var currentCardAmount = document.querySelectorAll('#creditCardList .creditcard-item').length;
	//取得目前卡號input的值
	var currentCardNumber = $('[id*="payOffCardNumber-"]').map(function(){
	    return this.value;
	}).get().join('');

	currentCardNumber = currentCardNumber.substring(0,6) + '******' + currentCardNumber.substring(12,16);

	if ( document.querySelectorAll('#creditCardList [data-creditcard-item="'+ currentCardNumber +'"]').length > 0 ) {
		console.log('此卡號已存在');
	} else {
		console.log('此卡號是新的');
	}
	// console.log('目前卡號的存在組數:'+ document.querySelectorAll('#creditCardList [data-creditcard-item="'+ currentCardNumber +'"]').length + ' (大於0表示此卡號已存在)');
	
	//數量為3, 同時卡號不存在
	if (currentCardAmount == 3 && document.querySelectorAll('#creditCardList [data-creditcard-item="'+ currentCardNumber +'"]').length == 0 ) {
		document.querySelector('#fastCheck-P').checked = false;
		creditCardFullModal.show();
	} 
	else {
		document.querySelector('#fastCheck-P').checked = true;
	}
	
}

if (document.querySelector('#fastCheck-P')) {
	document.querySelector('#fastCheck-P').addEventListener('change', (e)=>{
		e.preventDefault();
		if (document.querySelector('#fastCheck-P').checked == true) {
			checkCreditCardList();
		}
	});	
}


const addNewCardModal = new bootstrap.Modal('#addNewCardModal', {keyboard: false});
if (document.querySelector('#addNewCardModal')) {
	document.querySelector('#addNewCardModal').addEventListener('show.bs.modal', ()=>{
		if (document.querySelector('#creditCardListModal')) {
			document.querySelector('#creditCardListModal').style.opacity = 0;
		}
		checkMainCard();
	});

}
if (document.querySelector('#addNewCardModal')) {
	document.querySelector('#addNewCardModal').addEventListener('hide.bs.modal', ()=>{
		if (document.querySelector('#creditCardListModal')) {
			document.querySelector('#creditCardListModal').style.opacity = 1;
		}
		checkMainCard();
	});
}

//新增卡片視窗開啟時清空卡號
if (document.querySelector('#addNewCardModal')) {
	document.querySelector('#addNewCardModal').addEventListener('show.bs.modal', ()=>{
		document.querySelector('#newCardNum-1').value = '';
		document.querySelector('#newCardNum-2').value = '';
		document.querySelector('#newCardNum-3').value = '';
		document.querySelector('#newCardNum-4').value = '';
	});
}

//信用卡管理：新增信用卡時檢查數量
function checkMyCreditCard() {
	
	var currentCardAmount = document.querySelectorAll('#creditCardList .creditcard-item').length;
	
	if (currentCardAmount < 3) {
		addNewCardModal.show();
	} else {
		creditCardFullModal.show();
	}	
}

function removeThisCard(e) {
	
	document.querySelector('#removeCardConfirmDialog').showModal();

	var cardToRemove = e.closest('.creditcard-item').getAttribute('data-creditcard-item');
	
	document.querySelector('#removeConfirm').addEventListener('click', ()=>{

		document.querySelector('#removeCardConfirmDialog').close();

		setTimeout(()=>{

			$('[data-creditcard-item="'+ cardToRemove +'"]').remove();
			

			
			checkMainCard();

		}, 300);

	});

	document.querySelector('#removeCancel').addEventListener('click', ()=>{
		document.querySelector('#removeCardConfirmDialog').close();
		cardToRemove = '';
	});
	
}



function selectCard(e) {
	
	if ( e.closest('#creditCardListModal').querySelector('input[name="creditCardRecordRadio"]:checked') ) {
		
		var cardNumberChosen = e.closest('#creditCardListModal').querySelector('input[name="creditCardRecordRadio"]:checked').closest('.creditcard-item').getAttribute('data-creditcard-item');
		console.log('cardNumberChosen: '+cardNumberChosen);
		var cardMonthChosen = e.closest('#creditCardListModal').querySelector('input[name="creditCardRecordRadio"]:checked').getAttribute('data-creditcard-month');
		var cardYearChosen = e.closest('#creditCardListModal').querySelector('input[name="creditCardRecordRadio"]:checked').getAttribute('data-creditcard-year');

		document.querySelector('#payOffCardNumber-1').value = cardNumberChosen.substring(0, 4);
		document.querySelector('#payOffCardNumber-2').value = cardNumberChosen.substring(4, 8);
		document.querySelector('#payOffCardNumber-3').value = cardNumberChosen.substring(8, 12);
		document.querySelector('#payOffCardNumber-4').value = cardNumberChosen.substring(12, 16);
		document.querySelector('#payOffCardMonth').value = cardMonthChosen;
		document.querySelector('#payOffCardYear').value = cardYearChosen;
	}	
	
	creditCardListModal.hide();
	
}



function checkMainCard() {

	var currentCardAmount = document.querySelectorAll('#creditCardList .creditcard-item').length;
	console.log('目前卡片數量: '+currentCardAmount);
	var creditCardRecordRadioLength = document.querySelectorAll('input[name="creditCardRecordRadio"]').length;
	var creditCardRecordRadioChecked = document.querySelector('input[name="creditCardRecordRadio"]:checked');

	if (!creditCardRecordRadioChecked && creditCardRecordRadioLength > 0 ) {
		document.querySelector('input[name="creditCardRecordRadio"]').checked = true;
	} else if (currentCardAmount == 0) {
		$('.creditcard-list').html('<div id="emptyCardListMsg" class="fs-5 text-center border-top p-5">目前無卡片資料</div>');
	} else {
		// do nothing
	}

	
	if (currentCardAmount < 3) {

		if (document.querySelector('#btnAddNewCard')) {
			document.querySelector('#btnAddNewCard').style.display = 'block';
		}

		if (document.querySelector('#fastCheck-P')) {
			document.querySelector('#fastCheck-P').checked = true;
		}

		if (document.querySelector('#cardFullMsg')) {
			document.querySelector('#cardFullMsg').style.display = 'none';	
		}

	} else {

		if (document.querySelector('#btnAddNewCard')) {
			document.querySelector('#btnAddNewCard').style.display = 'none';
		}

		if (document.querySelector('#fastCheck-P')) {
			document.querySelector('#fastCheck-P').checked = false;
		}

		if (document.querySelector('#cardFullMsg')) {
			document.querySelector('#cardFullMsg').style.display = 'block';	
		}
	}

}

function checkCardMonth() {
	var currentYear = dayjs().format('YYYY');
	var currentMonth = dayjs().format('MM');
	
	var newCardMonth = document.querySelector('#newCardMonth').value;
	var newCardYear = document.querySelector('#newCardYear').value;

	if (newCardYear <= currentYear) {
		if (newCardMonth < currentMonth) {
			alert('您輸入的信用卡資料已過期\n請再次確認輸入的「有效月」及「有效年」是否正確');
			return false;
		}
	}

	return true;
}

function submitNewCard() {

	

	// var newCardNum = document.querySelector('#newCardNum').value;
	var newCardNum = $('[id*="newCardNum-"]').map(function(){
	    return this.value;
	}).get().join('');

	var newCardMonth = document.querySelector('#newCardMonth').value;
	var newCardYear = document.querySelector('#newCardYear').value;
	var currentCardAmount = document.querySelectorAll('#creditCardList .creditcard-item').length / 2;
	var setNewCardMain = document.querySelector('#setNewCardMain');

	//console.log('currentCardAmount:'+currentCardAmount);

	//把可見的卡號拿來當辨試用的ID
	var newCardNumID = newCardNum.substring(0,4) + newCardNum.substring(4,6) + newCardNum.substring(12,16);
	//馬賽克過的卡號
	var newCardNumMasked = newCardNum.substring(0,4) + newCardNum.substring(4,6) + '******' + newCardNum.substring(12,16);
	var newCardNumMaskedSpaced = newCardNum.substring(0,4) + '&nbsp' + newCardNum.substring(4,6) + '**&nbsp;****&nbsp;' + newCardNum.substring(12,16);


	if ( checkCardNum() && currentCardAmount < 3 && checkCardMonth() ) {

		var newCardElement = document.createElement('div');
		newCardElement.innerHTML = 
		'<div class="d-flex flex-column border-top creditcard-item" data-creditcard-item="'+ newCardNumMasked +'">'+
	        '<div class="d-flex p-3">'+
	        	'<div class="d-flex align-items-center flex-grow-1 ps-xl-4">'+
	        		'<input class="form-check-input flex-shrink-0 fs-6" type="radio" name="creditCardRecordRadio" id="creditCardRecordRadio-'+ newCardNumID +'">'+
	        		'<label class="form-check-label ms-3">'+
		            	'<span class="d-flex flex-column ps-5">'+
			                '<span>※依照卡號來顯示銀行名稱※</span>'+	
							'<span>'+ newCardNumMaskedSpaced +'</span>'+
			            '</span>'+
		            '</label>'+
		        '</div>'+
				'<div class="d-flex pe-xl-3">'+
					'<button class="btn px-0" type="button" onclick="removeThisCard(this);"><span class="feather icon-trash-2"></span>刪除</button>'+
				'</div>'+
	        '</div>'+
	    '</div>';

		document.querySelector('#creditCardList').appendChild(newCardElement);
		
		if (document.querySelector('#emptyCardListMsg')) {
			document.querySelector('#emptyCardListMsg').remove();
		}

		if (setNewCardMain.checked == true) {
			document.getElementById('creditCardRecordRadio-' + newCardNumID).checked = true;
		} else {
			document.getElementById('creditCardRecordRadio-' + newCardNumID).checked = false;
		}

		addNewCardModal.hide();

	} 
}

function submitNewCardInCheckOut() {
	// var newCardNum = document.querySelector('#newCardNum').value;
	var newCardNum = $('[id*="newCardNum-"]').map(function(){
	    return this.value;
	}).get().join('');

	var newCardMonth = document.querySelector('#newCardMonth').value;
	var newCardYear = document.querySelector('#newCardYear').value;
	var currentCardAmount = document.querySelectorAll('#creditCardList .creditcard-item').length;
	//var setNewCardMain = document.querySelector('#setNewCardMain');

	// console.log('currentCardAmount:'+currentCardAmount);

	//把可見的卡號拿來當辨試用的ID
	var newCardNumID = newCardNum.substring(0,4) + newCardNum.substring(4,6) + newCardNum.substring(12,16);
	//馬賽克過的卡號
	var newCardNumMasked = newCardNum.substring(0,4) + newCardNum.substring(4,6) + '******' + newCardNum.substring(12,16);
	var newCardNumMaskedSpaced = newCardNum.substring(0,4) + '&nbsp' + newCardNum.substring(4,6) + '**&nbsp;****&nbsp;' + newCardNum.substring(12,16);


	if ( checkCardNum() && currentCardAmount < 3 && checkCardMonth() ) {

		var newCardElement = document.createElement('div');
		newCardElement.innerHTML = 
		'<div class="d-flex flex-column border-top creditcard-item" data-creditcard-item="'+ newCardNumMasked +'">'+
	        '<div class="d-flex ps-4 pe-3 py-3">'+
	          	'<div class="d-flex align-items-center flex-grow-1">'+
	            	'<input class="form-check-input flex-shrink-0 fs-6" type="radio" name="creditCardRecordRadio" id="creditCardRecordRadio-'+ newCardNumID +'" data-creditcard-month="'+ newCardMonth +'" data-creditcard-year="'+ newCardYear +'" checked>'+
	            	'<label class="form-check-label ms-3" for="creditCardRecordRadio-'+ newCardNumID +'">'+
		              	'<span class="d-flex flex-column">'+
			                '<span class="bank-name">※依照卡號來顯示銀行名稱※</span>'+
			                '<span class="card-number">'+ newCardNumMaskedSpaced +'</span>'+
		              	'</span>'+
	            	'</label>'+
	          	'</div>'+
		        '<div class="d-flex">'+
		            '<button class="btn" type="button" onclick="removeThisCard(this);"><span class="feather icon-trash-2"></span></button>'+
		        '</div>'+
	        '</div>'+
	    '</div>';

	    var newCardElementClone = document.createElement('div');
		newCardElementClone.innerHTML = 
		'<div class="d-flex flex-column border-top creditcard-item" data-creditcard-item="'+ newCardNumMasked +'">'+
            '<div class="d-flex ps-4 pe-3 py-3">'+
                '<div class="d-flex align-items-center flex-grow-1">'+
                  	'<label class="form-check-label" for="creditCardRecordRadio-'+ newCardNumID +'">'+
                    	'<span class="d-flex flex-column">'+
                      		'<span class="bank-name">※依照卡號來顯示銀行名稱※</span>'+
                      		'<span class="card-number">'+ newCardNumMaskedSpaced +'</span>'+
                    	'</span>'+
                  	'</label>'+
                '</div>'+
                '<div class="d-flex">'+
                	'<button class="btn" type="button" onclick="removeThisCard(this);"><span class="feather icon-trash-2"></span></button>'+
                '</div>'+
            '</div>'+
        '</div>';

		

		document.querySelector('#creditCardList').appendChild(newCardElement);
		document.querySelector('#creditCardListForDelete').appendChild(newCardElementClone);
		
		if (document.querySelector('#emptyCardListMsg')) {
			document.querySelector('#emptyCardListMsg').remove();
		}

		// if (setNewCardMain.checked == true) {
		// 	document.getElementById('creditCardRecordRadio-' + newCardNumID).checked = true;
		// } else {
		// 	document.getElementById('creditCardRecordRadio-' + newCardNumID).checked = false;
		// }

		addNewCardModal.hide();

	} 
}

function checkCardNum() {
	
	// var newCardNum = document.querySelector('#newCardNum').value;
	var newCardNum = $('#addNewCardModal .card-number').map(function(){
	    return this.value;
	}).get().join('');

	// var newCardNumID = newCardNum.substring(0,4) + newCardNum.substring(4,6) + newCardNum.substring(12,16);

	//console.log('newCardNum:'+newCardNum);
	//console.log('newCardNum.length:'+newCardNum.length);

	if (newCardNum == '') {
		alert('卡號不得空白');
		return false;
	}
	else if (newCardNum.length != 16) {
		alert('請確認卡號是否輸入完整');
		return false;
	}
	else if ( checkDuplicateCard() ) {
		// alert('此卡號已存在，請重新輸入');
		newCardNum = newCardNum.substring(0,6) + '******' + newCardNum.substring(12,16);
		document.querySelector('[data-creditcard-item="'+ newCardNum +'"]').remove();

		return true;
	}
	else {
		return true;
	}
}

function checkDuplicateCard() {

	// var newCardNum = document.querySelector('#newCardNum').value;
	var newCardNum = $('[id*="newCardNum-"]').map(function(){
	    return this.value;
	}).get().join('');

	newCardNum = newCardNum.substring(0,6) + '******' + newCardNum.substring(12,16);
	// var newCardNumID = newCardNum.substring(0,4) + newCardNum.substring(4,6) + newCardNum.substring(12,16);

	//console.log('newCardNumMasked: ' + newCardNum);

	if( document.querySelector('[data-creditcard-item="'+ newCardNum +'"]') ) {
		//新卡號已存在
		return true;
	} else {
		return false;
	}


}


//抓出購物中同品號的第二件商品,將其data-second-discount設為true
function checkIfSameProductExists() {
	var shoppingCart = document.querySelector('#shoppingCart');

	if (shoppingCart) {

		var dataProductId = shoppingCart.querySelectorAll('[data-product-id]');
		var arr = [];

		[].forEach.call(dataProductId, (el)=>{
			arr.push(el.getAttribute('data-product-id'));
		});

		//找出重覆商品(同品號但不同規格的商品)
		let resultDuplicate = arr.filter((el, index) => {
		  return arr.indexOf(el) !== index;
		})

		//找出不重覆的商品
		let resultUnique = arr.filter((el, index) => {
		  return arr.indexOf(el) === index;
		})

		resultDuplicate.forEach(el => {
			
			var targets = shoppingCart.querySelectorAll('[data-product-id="'+ el +'"]');
			
			[].forEach.call(targets, (el) => {
				el.setAttribute('data-second-discount', true);

				var currentAmount = parseInt(el.querySelector('select.form-select').value);
				var dataSecondPrice = parseInt(el.querySelector('[data-second-price]').getAttribute('data-second-price'));
				var subtotalSecondDiscount = currentAmount * dataSecondPrice;
				el.querySelector('.subtotal-second-discount').innerText = subtotalSecondDiscount;
				
			});
			
		});

		resultUnique.forEach(el => {

			var target = shoppingCart.querySelector('[data-product-id="'+ el +'"]');

			var currentAmount = parseInt(target.querySelector('select.form-select').value);

			if (currentAmount > 1) {

				if (target.querySelector('[data-second-price]')) {
					target.setAttribute('data-second-discount', true);
					var dataPrice = parseInt(target.querySelector('[data-price]').getAttribute('data-price'));
					var dataSecondPrice = parseInt(target.querySelector('[data-second-price]').getAttribute('data-second-price'));
					var subtotalSecondDiscount = (currentAmount-1) * dataSecondPrice + dataPrice;
					target.querySelector('.subtotal-second-discount').innerText = subtotalSecondDiscount;
				}
				
				
			} else {
				if (target.querySelector('[data-second-price]')) {
					target.setAttribute('data-second-discount', false);
					var dataPrice = parseInt(target.querySelector('[data-price]').getAttribute('data-price'));
					var subtotal = currentAmount * dataPrice;
					target.querySelector('.subtotal').innerText = subtotal;
				}
				
			}
			
		});

	}
}




//結帳3-修改最近收件地址：把所選的資料帶去editRecentAddressList
function editThisAddress(t) {
	var tSource = t.closest('.address-item').querySelector('[name="recentAddressRadio"]').id;
	var tName = t.closest('.address-item').querySelector('[name="recentAddressRadio"]').getAttribute('data-name');
	var tAreaNum = t.closest('.address-item').querySelector('[name="recentAddressRadio"]').getAttribute('data-area-num');
	var tTel = t.closest('.address-item').querySelector('[name="recentAddressRadio"]').getAttribute('data-tel');
	var tPhone = t.closest('.address-item').querySelector('[name="recentAddressRadio"]').getAttribute('data-phone');
	var tCity1 = t.closest('.address-item').querySelector('[name="recentAddressRadio"]').getAttribute('data-city-1');
	var tCity2 = t.closest('.address-item').querySelector('[name="recentAddressRadio"]').getAttribute('data-city-2');
	var tAddress = t.closest('.address-item').querySelector('[name="recentAddressRadio"]').getAttribute('data-address');

	document.querySelector('#editRecentAddressList').setAttribute('data-source', tSource);
	document.querySelector('#editRecentName').value = tName;
	document.querySelector('#editRecentAreaNum').value = tAreaNum;
	document.querySelector('#editRecentTel').value = tTel;
	document.querySelector('#editRecentPhone').value = tPhone;
	document.querySelector('#editRecentCity1').value = tCity1;
	document.querySelector('#editRecentCity2').value = tCity2;
	document.querySelector('#editRecentAddress').value = tAddress;

}

function saveAddress() {
	
	var targetAddressRadioID = document.querySelector('#editRecentAddressList').getAttribute('data-source');
	var targetAddressItem = document.getElementById(targetAddressRadioID).closest('.address-item');

	document.getElementById(targetAddressRadioID).setAttribute('data-name', document.querySelector('#editRecentName').value);
	document.getElementById(targetAddressRadioID).setAttribute('data-area-num', document.querySelector('#editRecentAreaNum').value);
	document.getElementById(targetAddressRadioID).setAttribute('data-tel', document.querySelector('#editRecentTel').value);
	document.getElementById(targetAddressRadioID).setAttribute('data-phone', document.querySelector('#editRecentPhone').value);
	document.getElementById(targetAddressRadioID).setAttribute('data-city-1', document.querySelector('#editRecentCity1').value);
	document.getElementById(targetAddressRadioID).setAttribute('data-city-2', document.querySelector('#editRecentCity2').value);
	document.getElementById(targetAddressRadioID).setAttribute('data-address', document.querySelector('#editRecentAddress').value);

	targetAddressItem.querySelector('.user-name').innerText = document.querySelector('#editRecentName').value;
	targetAddressItem.querySelector('.user-phone').innerText = document.querySelector('#editRecentPhone').value;
	targetAddressItem.querySelector('.user-tel').innerText = document.querySelector('#editRecentAreaNum').value + document.querySelector('#editRecentTel').value;
	targetAddressItem.querySelector('.user-address').innerText = document.querySelector('#editRecentCity1').value + document.querySelector('#editRecentCity2').value + document.querySelector('#editRecentAddress').value;
}

function fromSource(source) {
	document.querySelector('#recentAddressList').setAttribute('data-from', source);
}

//cookie的offcanvas打開
function offcanvasCookieDemo() {
	var offcanvasCookie = new bootstrap.Offcanvas(document.querySelector('#offcanvasCookie'), {
		toggle: false
	});
	offcanvasCookie.show();
}
// if (document.querySelector('#offcanvasCookie')) {
// 	offcanvasCookieDemo();
// }


// twcaseal
// var twcaScript1 = document.createElement('script');  
// twcaScript1.setAttribute('type','text/javascript');
// twcaScript1.setAttribute('charset','utf-8');
// twcaScript1.innerHTML = 'var twca_cn="*.vivatv.com.tw";';
// document.head.appendChild(twcaScript1);

// var twcaScript2 = document.createElement('script');  
// twcaScript2.setAttribute('type','text/javascript');
// twcaScript2.setAttribute('charset','utf-8');
// twcaScript2.setAttribute('src','//ssllogo.twca.com.tw/v4/twcaseal_v4.js');
// document.head.appendChild(twcaScript2);

//優惠金頁面
function toggleCoupon(t) {

	//先抓屬性來用
	var parent = t.getAttribute('data-parent');
	var target = t.getAttribute('data-target');

	//所有record(排除無資料的類型)
	var records = document.querySelectorAll('#' + parent + ' .coupon-record:not(.coupon-none)');
	//無資料的record
	var none = document.querySelectorAll('#' + parent + ' .coupon-none');
	//要顯示的目標
	var targets = document.querySelectorAll('#' + parent + ' .' + target);
	//該區的所有button
	var buttons = t.parentNode.querySelectorAll('button');

	//動態產生的coupon-none
	var i = document.createElement('div');
	i.setAttribute('class', 'd-flex flex-wrap p-2 fs-7 coupon-record coupon-none');
	i.innerHTML = '<div class="w-100 text-center">目前無優惠金資料</div>';

	//如果coupon-none和目標都不存在的話, 就insert一個coupon-none進去
	if (none.length == 0 && targets.length == 0) {
		document.querySelector('#' + parent).insertAdjacentElement('beforeend', i);
	}
	//或是如果 coupon-none, 目標, 所有非coupon-none的類型, 三者都存在的話, 就把coupon-none移除
	else if (none.length > 0 && targets.length > 0 && records.length > 0) {
		document.querySelector('#' + parent + ' .coupon-none').remove();
	}
	else {
		//保留coupon-none
	}

	//先隱藏所有record
	[].forEach.call(records, (el) => {
			el.classList.add('d-none');
	});
	//再把目標target解除隱藏(目標必須存在，否則不做)
	[].forEach.call(targets, (el) => {
		if (targets.length > 0) {
			el.classList.remove('d-none');
		}
	});

	//控制按鈕的active狀態
	[].forEach.call(buttons, (el) => {
		el.classList.remove('active');
	});
	t.classList.add('active');
}




function showFillOutSection() {
	document.querySelector('#fillOutSection').classList.add('show');
	// document.querySelector('#loginSection').classList.remove('show');
	document.querySelector('#initLogin').style.display = 'none';
}
function submitCheck() {
	if (!document.querySelector('#privacyAgreement').checked) {
		var disagreeModal = new bootstrap.Modal(document.querySelector('#disagreeModal'), {
			toggle: false,
			backdrop: 'static'
		});
		disagreeModal.show();
	} else {
		var submitSuccessModal = new bootstrap.Modal(document.querySelector('#submitSuccessModal'), {
			toggle: false,
			backdrop: 'static'
		});
		submitSuccessModal.show();
	}
}


function ageRuleDemo() {

	var ageRuleModal = new bootstrap.Modal(document.querySelector('#ageRuleModal'), {
		toggle: false,
		backdrop: 'static'
	});
	ageRuleModal.show();
}

if (window.location.hash == "#age") {
	ageRuleDemo();
}

//移除商品規格中，每個list-group-item的第一行空白
var preElements = document.querySelectorAll('#productSpec .list-group-item');
Array.prototype.forEach.call(preElements, function( pre ){
	pre.textContent = pre.textContent.replace(/^\s+/, '');
});


//黑底模式
function darkMode(){
	document.body.classList.add('dark-mode');
}
if (window.location.hash == "#dark") {
	darkMode();
}

//紅底模式
function redMode(){
	document.body.classList.add('red-mode');
}
if (window.location.hash == "#red") {
	redMode();
}




function addBlur() {
	var imagesToBlur = document.querySelectorAll('img.img-fluid');
	[].forEach.call(imagesToBlur, (el) => {
		el.classList.add('img-blur');
	});
}

function removeBlur() {
	var imagesToBlur = document.querySelectorAll('img.img-fluid');
	[].forEach.call(imagesToBlur, (el) => {
		el.classList.remove('img-blur');
	});
}

function ageCheckDemo() {

	//加上模糊效果
	addBlur();

	//顯示年齡檢查modal
	var ageCheckModal = new bootstrap.Modal(document.querySelector('#ageCheckModal'), {
		toggle: false,
		backdrop: 'static'
	});
	ageCheckModal.show();
}

if (window.location.hash == "#18x") {
	ageCheckDemo();
}



function resetSelectInterval() {
	snackBar('#resetToDefault');
}

function confirmSelectInterval() {
	//先show載入中
	snackBar('#nowLoading');
	//過1秒後再把視窗關掉
	setTimeout(function(){
		var myCollapse = new bootstrap.Collapse(document.querySelector('#selectInterval'), {
			toggle: false
		});
		myCollapse.hide();
	}, 1000);
	
	//最後再把結果show出來
	setTimeout(function(){
		var testCollapse = new bootstrap.Collapse(document.querySelector('#testAccordionItem-1'), {
			toggle: false
		});
		testCollapse.show();
	}, 2000);
}



function additionalBuyAdd(id, el) {
	var additionalBuySelected = document.querySelector('#additionalBuySelected');
	var itemHTML = 
	'<div data-select-id="'+ id +'" class="col-2 p-1 m-2">'+
    '<div class="position-relative">'+
      '<img src="https://www.vivatv.com.tw/common/images/product/'+ id +'/1.jpg" class="img-fluid" width="100" height="100">'+
      '<div class="position-absolute top-0 start-0 translate-middle">'+
        '<button type="button" class="btn text-white bg-dark rounded-circle px-1 py-0 fs-65" onclick="additionalBuyRemoveSelf('+ id +', this)"><span class="feather icon-x"></span></button>'+
      '</div>'+
    '</div>'+
  '</div>';
  additionalBuySelected.innerHTML = additionalBuySelected.innerHTML + itemHTML;
  el.closest('.btn-additional-buy-group').classList.toggle('added');
}

//加購&已加購按鈕
function additionalBuyRemove(id, el) {
	var additionalBuySelected = document.querySelector('#additionalBuySelected');
	var item = additionalBuySelected.querySelector('[data-select-id="'+ id +'"]');
	item.remove();
	el.closest('.btn-additional-buy-group').classList.toggle('added');
}

function additionalBuyRemoveSelf(id, el) {
	el.closest('[data-select-id]').remove();
	document.querySelector('[data-product-id="'+ id +'"] .btn-additional-buy-group').classList.toggle('added');
}

function removeThis(e) {
	e.closest('.additional-buy-item').remove();
}


//結帳2：顯示折抵金額警告modal

function discountAlertModalShow() {
	var discountAlertModal = new bootstrap.Modal(document.querySelector('#discountAlertModal'), {
		toggle: false
	});
	discountAlertModal.show();
}




//換貨原因選擇尺寸顏色款式, 依據所選數量顯示select的個數
var exchangeSpecDOM;
const exchangeAmount = document.querySelectorAll('select[id*="exchangeAmount"]');
if (exchangeAmount) {
	[].forEach.call(exchangeAmount, (el) => {
		el.addEventListener('change', () => {
			var amt = el.value;
			var tgt = el.getAttribute('data-target');
			var div = document.querySelector(tgt);
			if (div) {
				div = div.querySelector('.d-flex');
				div.innerHTML = '';	
			}
			

			// 多規格情況
			if (tgt.includes('exchangeSpec')) {

				for (var i = 1; i <= amt; i++) {

					exchangeSpecDOM = 
					'<div class="d-flex flex-column flex-xl-row justify-content-between justify-content-xl-end p-1">'+
					  '<div class="d-flex align-items-center p-1">第'+ i +'件</div>'+
					  
					  '<div class="d-flex flex-fill p-1">'+
					    '<div class="input-group">'+
					      '<label class="input-group-text fs-7 fs-xl-6" for="exchangeOriginalSpec-1-'+ i +'">原規格</label>'+
					      '<select id="exchangeOriginalSpec-1-'+ i +'" class="form-select fs-7 fs-xl-6" required>'+
					        '<option value="" selected disabled>請選擇</option>'+
					        '<option value="1">黑色/船型襪</option>'+
					        '<option value="2">黑色/平口襪</option>'+
					        '<option value="3">黑色/船型襪+平口襪</option>'+
					      '</select>'+
					    '</div>'+
					  '</div>'+
					  
					  '<div class="d-flex flex-fill p-1">'+
					    '<div class="input-group">'+
					      '<label class="input-group-text fs-7 fs-xl-6" for="exchangeNewSpec-1-'+ i +'">想換成</label>'+
					      '<select id="exchangeNewSpec-1-'+ i +'" class="form-select fs-7 fs-xl-6" required>'+
					        '<option value="" selected disabled>請選擇</option>'+
					        '<option value="1">黑色/船型襪</option>'+
					        '<option value="2">黑色/平口襪</option>'+
					        '<option value="3">黑色/船型襪+平口襪</option>'+
					      '</select>'+
					    '</div>'+
					  '</div>'+
					'</div>';
					
					div.innerHTML += exchangeSpecDOM;

				} 

			}
			//單一規格
			else if (tgt.includes('singleSpec') ) {
				// 單一規格商品, 改變換貨數量不影響顯示的規格組數
			}
			//規格寫在備註欄的情況
			else {
				for (var i = 1; i <= amt; i++) {

					exchangeCommentDOM = 
					'<div class="d-flex flex-column flex-xl-row justify-content-between justify-content-xl-end p-1">'+
            '<div class="d-flex align-items-center p-1">第'+ i +'件</div>'+
            
            '<div class="d-flex flex-fill p-1">'+
              '<div class="d-flex flex-fill border rounded p-2">'+
                '<span class="flex-shrink-0">原規格：</span>'+
                '<span>顧客當初填在備註中的規格/尺寸/款式文字</span>'+
              '</div>'+
            '</div>'+
            
            '<div class="d-flex flex-fill p-1">'+
              '<div class="input-group">'+
                '<span class="input-group-text px-2 fs-7">想換成</span>'+
                '<input id="exchangeComment-2-'+ i +'" type="text" class="form-control fs-7 p-3 py-2" placeholder="請簡述需要的規格/尺寸/款式" required>'+
              '</div>'+
            '</div>'+
          '</div>';
					
					div.innerHTML += exchangeCommentDOM;

				} 
			}


		});
	});
}

//取消原因選擇→展開對應的select
const cancelReason = document.querySelectorAll('select[id*="cancelReason"]');
if (cancelReason) {

	[].forEach.call(cancelReason, (el) => {

		el.addEventListener('change', () => {
			
			

			var option = el.options[el.selectedIndex];
			var dataTarget = option.getAttribute('data-target');
			console.log('dataTarget:'+ dataTarget);


			if (dataTarget) {
				var dataParent = document.querySelector(dataTarget).getAttribute('data-bs-parent');			
				var myCollapse = new bootstrap.Collapse(document.querySelector(dataTarget), {
					toggle: false,
					parent: dataParent
				});
				myCollapse.show();
			}

			if (checkAllCancelReasons()) {
				var cancelStep2 = document.querySelector('#cancelStep2');
				var cancelStep2Collapse = new bootstrap.Collapse(cancelStep2, {toggle: false});
				cancelStep2Collapse.show();	
			}
			


		});
		
	});
}

function checkAllCancelReasons() {

	var cancelReasonLength = cancelReason.length;
	var cancelReasonNull = 0;

	[].forEach.call(cancelReason, (el) => {
		console.log('el.value:'+el.value);
		
		if (el.value === '') {
			cancelReasonNull++;
		}

	});


	console.log('cancelReasonLength:'+cancelReasonLength)
	console.log('cancelReasonNull:'+cancelReasonNull)


	if (cancelReasonNull === 0) {
		return true;
	} else {
		return false;
	}

}



//退貨原因選擇→展開對應的select
const returnReason = document.querySelectorAll('select[id*="returnReason"]');
if (returnReason) {
	[].forEach.call(returnReason, (el) => {
		el.addEventListener('change', () => {
			

			var option = el.options[el.selectedIndex];
			var dataTarget = option.getAttribute('data-target');
			console.log('dataTarget:'+ dataTarget);
			if (dataTarget) {
				var dataParent = document.querySelector(dataTarget).getAttribute('data-bs-parent');			
				var myCollapse = new bootstrap.Collapse(document.querySelector(dataTarget), {
					toggle: false,
					parent: dataParent
				});
				myCollapse.show();
			}

			// if (checkAllReturnReasons()) {
			// 	var statementIf = document.querySelector('#statementIf');
			// 	var statementIfCollapse = new bootstrap.Collapse(statementIf, {toggle: false});
			// 	statementIfCollapse.show();	
			// }

		});
		
	});
}

function checkAllReturnReasons() {

	var returnReasonLength = returnReason.length;
	var returnReasonNull = 0;

	[].forEach.call(returnReason, (el) => {
		console.log('el.value:'+el.value);
		
		if (el.value === '' && el.closest('.item').querySelector('.large-checkbox').checked) {
			returnReasonNull++;
		}

	});

	console.log('returnReasonLength:'+returnReasonLength)
	console.log('returnReasonNull:'+returnReasonNull)

	if (returnReasonNull === 0) {
		return true;
	} else {
		return false;
	}

}

//換貨原因選擇尺寸顏色款式→展開對應的select
const exchangeReason = document.querySelectorAll('select[id*="exchangeReason"]');
if (exchangeReason) {
	[].forEach.call(exchangeReason, (el) => {
		el.addEventListener('change', () => {
			

			var option = el.options[el.selectedIndex];
			var dataTarget = option.getAttribute('data-target');
			console.log('dataTarget:'+ dataTarget);
			if (dataTarget) {
				var dataParent = document.querySelector(dataTarget).getAttribute('data-bs-parent');	
				var myCollapse = new bootstrap.Collapse(document.querySelector(dataTarget), {
					toggle: false,
					parent: dataParent
				});
				myCollapse.show();
			}
		});
		
	});
}


//監看退換貨的fieldset, 如果收合則設為disabled=true，反之則設為disabled=false (用意: 沒顯示出來的input/select, 不去檢查validation)

var fieldsetsCollapse = document.querySelectorAll('fieldset.collapse');
if (fieldsetsCollapse) {
	[].forEach.call(fieldsetsCollapse, (el) => {

		el.addEventListener('show.bs.collapse', () => {
			el.disabled = false;
			var childrenInputs = el.querySelectorAll('input[required], select[required]');
			[].forEach.call(childrenInputs, (child) => {
				child.setAttribute('required', true);
			});
		})

		el.addEventListener('hide.bs.collapse', () => {
			el.disabled = true;
			var childrenInputs = el.querySelectorAll('input[required], select[required]');
			[].forEach.call(childrenInputs, (child) => {
				child.setAttribute('required', false);
			});
		})

		if (el.classList.contains('show')) {
			el.disabled = false;
			var childrenInputs = el.querySelectorAll('input[required], select[required]');
			[].forEach.call(childrenInputs, (child) => {
				child.setAttribute('required', true);
			});
		} else {
			el.disabled = true;
			var childrenInputs = el.querySelectorAll('input[required], select[required]');
			[].forEach.call(childrenInputs, (child) => {
				child.setAttribute('required', false);
			});
		}

	});
}


//取消退換貨：表單validation檢查
(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')
  
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
    	
      // if (!checkProductSelection() || !checkInvalidElement(form) || !checkInvoiceAgreement(form) || !form.checkValidity() ) {
      if (!checkProductSelection() || !checkInvalidElement(form) || !form.checkValidity() ) {

        event.preventDefault()
        event.stopPropagation()

        

      } else {

      	event.preventDefault()
        event.stopPropagation()



      	// snackBar('#successfulApplication');

      	var invoiceAgreementAlertModal = new bootstrap.Modal(document.querySelector('#invoiceAgreementAlertModal'), {
      		toggle: false,
      		backdrop: 'static'
      	});

      	var successfulApplication = new bootstrap.Modal(document.querySelector('#successfulApplication'), {
      		toggle: false,
      		backdrop: 'static'
      	});

      	if (document.querySelector('#invoiceAgreementCheckbox').checked) {
      		successfulApplication.show();	
      	} else {
      		invoiceAgreementAlertModal.show();
      	}

      	


      }

      form.classList.add('was-validated')

    }, false)
  })
})()



var selectProductForProcess = document.querySelectorAll('input[name="selectProductForProcess"]');
var returnDeliveryAll = document.querySelectorAll('select[id*="returnDelivery"]');


function checkCurrentReceivedLength() {
	var currentReceived = 0;
	var currentNotReceived = 0;

	// [].forEach.call(returnDeliveryAll, (el) => {
	[].forEach.call(returnReason, (el) => {
		// if (el.value == 1) {
		// 	currentReceived +=1;
		// } else if (el.value == 2) {
		// 	currentNotReceived +=1;
		// }
		if (el.value) {
			currentReceived +=1;
		} else {
			currentNotReceived +=1;
		}
	});

	console.log('currentReceived: ' + currentReceived);
	console.log('currentNotReceived: ' + currentNotReceived);

	// var reminderReceivedCollapse = new bootstrap.Collapse(document.querySelector('#reminderReceived'), {toggle: false});
	// var reminderNotReceivedCollapse = new bootstrap.Collapse(document.querySelector('#reminderNotReceived'), {toggle: false});
	var reminderBothCollapse = new bootstrap.Collapse(document.querySelector('#reminderBoth'), {toggle: false});
	reminderBothCollapse.show();

	// if (currentReceived > 0 && currentNotReceived == 0) {
	// 	reminderReceivedCollapse.show();
	// } else {
	// 	reminderReceivedCollapse.hide();
	// }

	// if (currentNotReceived > 0 && currentReceived == 0) {
	// 	reminderNotReceivedCollapse.show();
	// } else {
	// 	reminderNotReceivedCollapse.hide();
	// }

	// if (currentReceived > 0 && currentNotReceived > 0) {
	// 	reminderReceivedCollapse.hide();
	// 	reminderNotReceivedCollapse.hide();
	// 	reminderBothCollapse.show();

	// } else {
	// 	reminderBothCollapse.hide();
	// }	

}


if (selectProductForProcess) {

	// [].forEach.call(returnDeliveryAll, (el) => {
	[].forEach.call(returnReason, (el) => {
		el.addEventListener('change', () => {

			checkCurrentReceivedLength();

			var dataTarget = el.getAttribute('data-target');

			console.log('dataTarget: '+dataTarget);

			if (dataTarget) {
				var trialInstruction = document.querySelector(dataTarget);
				var statementIf = document.querySelector('#statementIf');
				var statementStatusChecked = document.querySelector('input[name="statementStatus"]:checked');
				

				var statementIfCollapse = new bootstrap.Collapse(statementIf, {toggle: false});

				var trialInstructionCollapse = new bootstrap.Collapse(trialInstruction, {toggle: false});
				

			}



			
			//if (el.value != null) {
			if (checkAllReturnReasons()){
				if (statementIfCollapse) {


					statementIfCollapse.show();
					//trialInstructionCollapse.show();
					setTimeout(()=>{
						trialInstructionCollapse.show();
					}, 200);

				}
			}
			
			else {

				if (statementIfCollapse) {

					// statementIfCollapse.show();
					// trialInstructionCollapse.hide();
					

					


					
					if (document.querySelectorAll('input[name="selectProductForProcess"]:checked').length == 0) {
						
						statementIfCollapse.hide();
						
						if (statementStatusChecked) {
							statementStatusChecked.checked = false;	
						}
						
					}
				}
			}


		});
	});


	[].forEach.call(selectProductForProcess, (el) => {
		el.addEventListener('change', () =>{

			var checkedProduct = document.querySelectorAll('input[name="selectProductForProcess"]:checked');
			var surveyAddress = document.querySelector('#surveyAddress');

			if (surveyAddress && checkedProduct.length > 0) {
				surveyAddress.classList.remove('d-none');
			} else if (surveyAddress) {
				surveyAddress.classList.add('d-none');
			}

			var selectReason = el.closest('.item').querySelector('select[id*="Reason"]');
			
			var amountParent = el.closest('.item').querySelector('.amount-parent');
			var reasonParent = el.closest('.item').querySelector('.reason-parent');
			var deliveryParent = el.closest('.item').querySelector('.delivery-parent');

			var amountAndReason = el.closest('.item').querySelector('.amount-and-reason');
			var amountAndReasonCollapse = new bootstrap.Collapse(amountAndReason, {toggle: false});

			
			var detailGroup = el.closest('.item').querySelector('[id*="DetailGroup"]');

			var reasonChild = reasonParent.querySelector('select[id*="Reason-"]');


			if (deliveryParent) var deliveryChild = deliveryParent.querySelector('select[id*="Delivery-"]');

			var dataTarget = el.getAttribute('data-target');

			if (dataTarget) {


				var trialInstruction = document.querySelector(dataTarget);
				var statementIf = document.querySelector('#statementIf');	
				var statementStatusChecked = document.querySelector('input[name="statementStatus"]:checked');

				var statementIfCollapse = new bootstrap.Collapse(statementIf, {toggle: false});
				var trialInstructionCollapse = new bootstrap.Collapse(trialInstruction, {toggle: false});
				
			}
			

			

			if (el.checked) {

				trialInstructionCollapse.show();

				if (reasonChild) reasonChild.setAttribute('required', true);
				
				if (deliveryChild) deliveryChild.setAttribute('required', true);

				
				amountAndReasonCollapse.show();
				amountAndReason.disabled = false;
				if (detailGroup) {
					if (detailGroup.querySelector('.collapse.show')) detailGroup.querySelector('.collapse.show').disabled = false;	
				}
				


				if (deliveryParent) deliveryParent.classList.remove('d-none');
				if (detailGroup) detailGroup.classList.remove('d-none');

				
				
				// if (statementIfCollapse && el.closest('.item').querySelector('[id*="returnReason-"]').value != 0) {
				if (checkAllReturnReasons()) {					
					statementIfCollapse.show();
					// setTimeout(()=>{
					// 	trialInstructionCollapse.show();
					// }, 200);
				}

			} else {

				

				if (reasonChild) reasonChild.setAttribute('required', false);

				if (deliveryChild) deliveryChild.setAttribute('required', false);

				
				amountAndReasonCollapse.hide();
				amountAndReason.disabled = true;
				if (detailGroup) {
					if (detailGroup.querySelector('.collapse.show')) detailGroup.querySelector('.collapse.show').disabled = true;
				}

				if (deliveryParent) deliveryParent.classList.add('d-none');
				if (detailGroup) detailGroup.classList.add('d-none');

				selectReason.setAttribute('required', false);	

				
				if (statementIfCollapse) {
					if (trialInstructionCollapse) trialInstructionCollapse.hide();
					if (document.querySelectorAll('input[name="selectProductForProcess"]:checked').length == 0) {
						statementIfCollapse.hide();
						
						if (statementStatusChecked) {
							statementStatusChecked.checked = false;	
						}
						
					}
				}
				
			}
			
		});
	})
}


//取消退貨：觸發紅框alert
function triggerInvoiceAlert() {
	document.querySelector('.invoice-agreement').classList.add('bg-alert')
	setTimeout(()=> {
		document.querySelector('.invoice-agreement').classList.remove('bg-alert')
	}, 3000)
}



//取消退換貨: 檢查至少有一樣商品被勾選, 如未勾選則捲動至該處
function checkProductSelection() {



	var selectProductForProcessChecked = document.querySelectorAll('input[name="selectProductForProcess"]:checked');
	var selectProductForProcess = document.querySelector('input[name="selectProductForProcess"]');
	console.log(selectProductForProcess);
	// console.log(window.getComputedStyle(document.querySelector('input[name="selectProductForProcess"]')).visibility);

  //沒勾的情況
  if ( selectProductForProcess && selectProductForProcessChecked.length == 0 && selectProductForProcess.offsetWidth > 0) {
  	
  	var elementTop = document.querySelector('[id*="Survey"] [id*="List"]').offsetTop;
  	window.scrollTo({top: elementTop - 120, behavior: 'smooth'});

  	document.querySelector('[id*="Survey"] [id*="List"]').classList.add('bg-alert');
  	setTimeout(()=>{
			document.querySelector('[id*="Survey"] [id*="List"]').classList.remove('bg-alert');
		}, 3000);

		console.log('至少要勾一件商品');

  } else {
  	return true;
  }



}

//取消退換貨：檢查該form裡面有沒有invalid的input/select, 有的話則捲動至該處
function checkInvalidElement(form) {

	var invalidElement = form.querySelector('input:invalid, select:invalid');
	
	if (invalidElement) {
		var invalidTop = form.querySelector('input:invalid, select:invalid').offsetTop;
		invalidTop = invalidTop + form.querySelector('input:invalid, select:invalid').parentNode.offsetTop;
		window.scrollTo({top: invalidTop - 120, behavior: 'smooth'});


		if ( invalidElement.getAttribute('name') == 'invoiceAgreementCheckbox' ) {
			var invoiceAgreement = invalidElement.closest('.invoice-agreement');
			invoiceAgreement.classList.add('bg-alert');
			setTimeout(()=>{
				invoiceAgreement.classList.remove('bg-alert');
			}, 3000);

		} else {
			invalidElement.classList.add('bg-alert');
			setTimeout(()=>{
				invalidElement.classList.remove('bg-alert');
			}, 3000);
			// invalidElement.setCustomValidity('請填寫');
		}


		console.log('invalidElement: ' + invalidElement.id);
		console.log(invalidElement.getAttribute('name'));

	} else {
		return true;
	}

}

//取消退換貨: 檢查電折單選項有沒有勾選
function checkInvoiceAgreement(form) {
	
	var invoiceAgreement = form.querySelector('.invoice-agreement');
	var invoiceAgreementCheckbox = form.querySelector('input[name="invoiceAgreementCheckbox"]');
	
	if (invoiceAgreement && !invoiceAgreementCheckbox.checked) {
		invoiceAgreement.classList.add('bg-alert');
		setTimeout(()=>{
			invoiceAgreement.classList.remove('bg-alert');
		}, 3000);
	} else {
		return true;
	}
}








//取消退換貨流程: 重覆點擊radio button,不會影響collapse的摺疊
function surveyToggleCheck(t) {
	var target = t.getAttribute('data-target');
	
	var element = document.querySelector(target);
	var parent = element.getAttribute('data-bs-parent');
		
	var bsCollapse = new bootstrap.Collapse(element, {
		toggle: false,
		parent: parent
	});



	bsCollapse.show();
		
}

//購物車: 移除所有已售完商品
function removeAllSoldOut() {
	var soldOut = document.querySelector('#soldOut');
	soldOut.remove();
	snackBar('#cartRemoved');
	updateCart();
}

function checkSoldOut() {
	var childInSoldOut = document.querySelectorAll('#soldOut .cart-item');
	
	if (childInSoldOut.length == 0) {
		document.querySelector('#soldOut').remove();
		
	}
}

function removeSoldOut(e) {
	var parent = e.closest('.cart-item');
	parent.remove();
	checkSoldOut();
	snackBar('#cartRemoved');
	updateCart();
}


//讓checkbox像radio button一樣只能單選, 但保留unchecked功能
function checkboxToRadio(target, self) {

	var parent = document.querySelector(target);
	var checkbox = parent.querySelectorAll('input[type="checkbox"]');

	[].forEach.call(checkbox, (e)=>{
		if (e.id != self.id) {
			e.checked = false;
		}
	});
	
}

//登入demo
function loginDemo() {
	setTimeout(function(){
		document.querySelector('[data-logged-in="true"]').style.display = 'block';
		document.querySelector('[data-logged-in="false"]').style.display = 'none';
	}, 500);
}

//結帳流程2：預購商品checkbox只能單選
function selectPreorderProduct(e) {

	var selectProductForCheckOut = document.querySelectorAll('#shoppingCart input[name="selectProductForCheckOut"]');
	[].forEach.call(selectProductForCheckOut, (el) => {
		console.log(el.id + ': ' + el.checked);
		el.checked = false;
	});

	console.log(e);
	
	e.checked = true;
	
}



//取消流程：輸入銀行代碼自動更新旁邊的下拉選單
const bankIDInput = document.querySelectorAll('[id*="bankIDInput"]');
const bankIDSelect = document.querySelectorAll('[id*="bankIDSelect"]');

if (bankIDInput) {
	[].forEach.call(bankIDInput, (el) => {
		el.addEventListener('change', (e)=>{
			var v = e.srcElement.value;
			e.srcElement.closest('.input-group').querySelector('[id*="bankIDSelect"]').value = v;

		});
	});

		

}

//取消流程：選擇下拉選單自動更新旁邊input的值
if (bankIDSelect) {
	[].forEach.call(bankIDSelect, (el) => {
		el.addEventListener('change', (e)=>{
			var w = e.srcElement.value;
			
			if (w != 0) {
				e.srcElement.closest('.input-group').querySelector('[id*="bankIDInput"]').value = w;
			} else {
				e.srcElement.closest('.input-group').querySelector('[id*="bankIDInput"]').value = "";
			}
		});
	});
		
}

//聯絡客服紀錄：依處理狀態篩選
const serviceStatusSelect = document.querySelector('#serviceStatusSelect');
if (serviceStatusSelect) {
	serviceStatusSelect.addEventListener('change', (e)=> {
		
		var t = e.srcElement.value;
		console.log('t: ' + t);
		var dataMessageType = document.querySelectorAll('#messageAccordion .accordion-item');

		if ( t == 0 ) {
			//全顯示
			[].forEach.call(dataMessageType, (el)=> {
				el.classList.remove('d-none');
			});

		} else {
			//先全隱藏
			[].forEach.call(dataMessageType, (el)=> {
				el.classList.add('d-none');
			});
			//再針對選到的那個顯示
			document.querySelector('#messageAccordion .accordion-item[data-message-type="'+ t +'"]').classList.remove('d-none');
		}
	});
}

function cancelReturnExchange(t) {

	switch (t) {
		case 'cancel':
			//取消流程
			var cancelOrderModal = new bootstrap.Modal(document.querySelector('#invoiceAgreementModal'));
			cancelOrderModal.show();
		break;

		case 'return':
			//退貨流程
			var returnOrderModal = new bootstrap.Modal(document.querySelector('#invoiceAgreementModal'));
			returnOrderModal.show();
		break;

		case 'exchange':
			//換貨流程
			// var exchangeOrderModal = new bootstrap.Modal(document.querySelector('#exchangeOrderModal'));
			// exchangeOrderModal.show();
			// document.location.href = 'exchangeProcess.html';
			alert('surveyCake');
		break;


	}
	
}

//訂單查詢頁: 取消訂單時, 檢查電折單選項是否有勾選
/*const allowanceCheckbox = document.querySelector('#allowanceCheckbox');

if (allowanceCheckbox) {

	var cancelOrderBtn = document.querySelector('#cancelOrderBtn');
	var allowanceAlert = document.querySelector('#allowanceAlert');

	allowanceCheckbox.addEventListener('change', ()=>{

		if (allowanceCheckbox.checked) {
			cancelOrderBtn.disabled = false;
			allowanceAlert.style.display = 'none';
		} else {
			cancelOrderBtn.disabled = true;
			allowanceAlert.style.display = 'block';
		}
	});
}*/

function readMore() {
	var btnReadMore = document.querySelector('#btnReadMore');

	console.log(btnReadMore);

	if (btnReadMore.innerText == '顯示更多文章內容') {
		btnReadMore.innerText = '顯示較少文章內容';
	} else if (btnReadMore.innerText == '顯示較少文章內容') {
		btnReadMore.innerText = '顯示更多文章內容';
	} else {
		// do nothing
	}
}

function toggleMoreAdditionalBuy() {
	var additionalBuy = document.querySelector('#additionalBuy');
	additionalBuy.classList.toggle('expanded');
	var btnMoreAdditionalBuy = document.querySelector('#btnMoreAdditionalBuy');
	if (btnMoreAdditionalBuy.innerText == '看更多') {
		btnMoreAdditionalBuy.innerText = '收合列表';
	} else if (btnMoreAdditionalBuy.innerText == '收合列表') {
		btnMoreAdditionalBuy.innerText = '看更多';
	}
}

function removeSort() {

	var inputRadioInProductSort = document.querySelectorAll('#productSort input[type="radio"]');

	inputRadioInProductSort.forEach((e)=>{
		e.checked = false;
	});

	var productSort = document.querySelector('#productSort');
	var productSortCollapse = new bootstrap.Collapse(productSort, {
	  toggle: true
	})

	var toggleSort = document.querySelector('#toggleSort');
	toggleSort.classList.remove('active');

	alert('排序已取消');
}


function confirmSort() {
	var productSort = document.querySelector('#productSort');
	var productSortCollapse = new bootstrap.Collapse(productSort, {
	  toggle: true
	})
	
	var toggleSort = document.querySelector('#toggleSort');
	toggleSort.classList.add('active');

	alert('執行排序動作');
}

function removeFilter() {

	var inputCheckboxInProductFilter = document.querySelectorAll('#productFilter input[type="checkbox"]');
	inputCheckboxInProductFilter.forEach((e)=>{
		e.checked = false;
	});

	var inputNumberInProductFilter = document.querySelectorAll('#productFilter input[type="number"]');
	inputNumberInProductFilter.forEach((e)=>{
		e.value = '';
	});


	var productFilter = document.querySelector('#productFilter');
	var productFilterCollapse = new bootstrap.Collapse(productFilter, {
	  toggle: true
	})

	var toggleFilter = document.querySelector('#toggleFilter');
	toggleFilter.classList.remove('active');

	alert('篩選已取消');
}
function confirmFilter() {
	var productFilter = document.querySelector('#productFilter');
	var productFilterCollapse = new bootstrap.Collapse(productFilter, {
	  toggle: true
	})

	var toggleFilter = document.querySelector('#toggleFilter');
	toggleFilter.classList.add('active');

	alert('執行篩選動作');
}


//商品列表的功能列, 偵測sticky狀態
const functionBar = document.querySelector('#functionBar');
const functionBarObserver = document.querySelector('.function-bar-observer');

const observerStickyM = new IntersectionObserver( 

  ([e]) => functionBar.classList.toggle('isSticky', e.intersectionRatio == 0),
  {	
  	// rootMargin: '-163px 0px 0px 0px',
  	rootMargin: '0px 0px 0px 0px',
  	threshold: [0, 0.5, 1]
  }
);
if (functionBar) {
	observerStickyM.observe(functionBarObserver);	
}


//結帳流程step1: 公告訊息modal (例如信用卡服務維護、五倍券退貨注意事項...等)
function checkoutBulletinModal(){
	var checkoutBulletinModalHTML = 
	'<div class="modal fade" id="checkoutBulletinModal" tabindex="-1" aria-labelledby="checkoutBulletinModal" aria-hidden="true">'+
		'<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">'+
		  '<div class="modal-content rounded-0">'+
		  	'<div class="modal-header">'+
	          '<span class="modal-title fs-6">信用卡服務公告</span>'+
	          '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'+
	        '</div>'+
		    '<div class="modal-body fs-65">'+
		      '<div class="d-flex flex-column justify-content-center">'+
	            '<p>凱基銀行將進行系統維護，因此凱基信用卡分期交易將無法使用</p>'+
	            '<p>影響時間：3/18(星期五)11:30 PM~3/20(星期日)11:30 PM</p>'+
	            '<p>影響範圍：凱基銀行 信用卡分期將無法交易</p>'+
	            '<p class="mb-0">若有不便之處，敬請見諒。</p>'+
	          '</div>'+
		    '</div>'+
		    '<div class="modal-footer p-2">'+
		      '<div class="d-flex flex-column w-100">'+
		        '<div class="d-flex justify-content-between flex-column">'+
		          '<div class="btn-group" role="group">'+
		            '<button type="button" class="btn btn-outline-secondary rounded-pill w-100 m-1" data-bs-dismiss="modal">確定</button>'+
		          '</div>'+
		        '</div>'+
		      '</div>'+
		    '</div>'+
		  '</div>'+
		'</div>'
	'</div>';

	var checkoutBulletinModalObject = document.createElement('div')
	checkoutBulletinModalObject.innerHTML = checkoutBulletinModalHTML;
	document.body.appendChild(checkoutBulletinModalObject);


	var checkoutBulletinModal = document.querySelector('#checkoutBulletinModal');
	if (checkoutBulletinModal) {
		var modal = new bootstrap.Modal(checkoutBulletinModal, {
			backdrop: true
		});
		modal.show();
	}
}

if (window.location.hash == "#modal") {
	checkoutBulletinModal();
}

//看更多商品test (測試用)
function loadMoreTestItem() {

	var arrTest = [];
	var itemTest;
	var imgsrcTest;
	var svgTest = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E";

  var rowInProductList = document.querySelector('#productList .row');
  
  for (var i = 0; i < 30; i++) {
  	imgsrcTest = "https://picsum.photos/300/300?nocache=" + Math.random();
		itemTest = 
		'<div class="col item p-1 p-lg-2">'+
	    '<a href="productPage.html">'+
	      '<div class="p-2 bg-white shadow-sm">'+
	        '<div class="d-flex bg-white item-body">'+
	          '<div class="d-flex position-relative item-image">'+
	          	'<div class="w-100 overflow-hidden is-load zoom-in loaded">'+
		            '<img src="'+ svgTest +'" data-src="'+ imgsrcTest +'" class="img-fluid lazy-load" width="300" height="300" alt="placeholder image">'+
	            '</div>'+
	            '<div class="position-absolute top-0 start-0 px-2 py-1 bg-discount text-white">49折</div>'+
	          '</div>'+
	          '<div class="d-flex flex-column justify-content-between item-info">'+
	            '<div class="p-1 p-name-2 mb-1">Dr.愛伊健康德國專用高濃度動蒜精(30粒/盒)×7盒123</div>'+
	            '<div class="d-flex justify-content-between item-price">'+
	              '<div class="d-flex mb-1 mb-xl-2">'+
	                '<div class="p-1 p-price">228000</div>'+
	                '<div class="p-1 o-price">468000</div>'+
	              '</div>'+
	              '<div class="d-flex justify-content-center align-items-center tag-group fs-8 mb-1 mb-xl-2">'+
	                '<div class="px-2 py-1 mx-1 rounded border">結帳折100</div>'+
	                '<div class="px-2 py-1 mx-1 rounded border">NEW</div>'+
	              '</div>'+
	            '</div>'+
	          '</div>'+
	        '</div>'+
	      '</div>'+
	    '</a>'+
	  '</div>';
	  rowInProductList.innerHTML += itemTest;	
  }

  let $images = document.querySelectorAll(selector);
	let observer = new IntersectionObserver(callback, observerConfig);
	Array.prototype.forEach.call($images, function (image) {
	    observer.observe(image);
	});
}

//會員資料修改頁: 按「送出」後之訊息
function profileUpdateSuccessModal(){
	var profileUpdateSuccessModalHTML = 
	'<div class="modal fade" id="profileUpdateSuccessModal" tabindex="-1" aria-labelledby="profileUpdateSuccessModal" aria-hidden="true">'+
		'<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">'+
		  '<div class="modal-content rounded-0">'+
		    '<div class="modal-body p-2 fs-65">'+
		      '<div class="d-flex flex-column justify-content-center pt-3">'+
	            '<div class="text-center my-2"><span class="feather icon-check-circle fs-1"></span></div>'+
	            '<div class="text-center my-2"><span class="fs-6">會員資料更新成功</span></div>'+
	          '</div>'+
		    '</div>'+
		    '<div class="modal-footer p-2">'+
		      '<div class="d-flex flex-column w-100">'+
		        '<div class="d-flex justify-content-between flex-column">'+
		          '<div class="btn-group" role="group">'+
		            '<button type="button" class="btn btn-outline-secondary rounded-pill w-100 m-1" data-bs-dismiss="modal">確定</button>'+
		          '</div>'+
		        '</div>'+
		      '</div>'+
		    '</div>'+
		  '</div>'+
		'</div>'
	'</div>';

	var profileUpdateSuccessModalObject = document.createElement('div')
	profileUpdateSuccessModalObject.innerHTML = profileUpdateSuccessModalHTML;
	document.body.appendChild(profileUpdateSuccessModalObject);


	var profileUpdateSuccessModal = document.querySelector('#profileUpdateSuccessModal');
	if (profileUpdateSuccessModal) {
		var modal = new bootstrap.Modal(profileUpdateSuccessModal, {
			backdrop: true
		});
		modal.show();
	}
}

if (window.location.hash == "#profileUpdateSuccessModal") {
	profileUpdateSuccessModal();
}

//忘記密碼頁: 按「送出」後之訊息
function newPasswordSentModal(){
	var newPasswordSentModalHTML = 
	'<div class="modal fade" id="newPasswordSentModal" tabindex="-1" aria-labelledby="newPasswordSentModal" aria-hidden="true">'+
		'<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">'+
		  '<div class="modal-content rounded-0">'+
		    '<div class="modal-body p-2 fs-65">'+
		      '<div class="d-flex flex-column justify-content-center">'+
	            '<div class="text-center my-2"><span class="feather icon-send fs-1"></span></div>'+
	            '<div class="text-center my-2"><span class="fs-6">新密碼已發送至您的E-MAIL信箱及手機簡訊中</span></div>'+
	          '</div>'+
		    '</div>'+
		    '<div class="modal-footer p-2">'+
		      '<div class="d-flex flex-column w-100">'+
		        '<div class="d-flex justify-content-between flex-column">'+
		          '<div class="btn-group" role="group">'+
		            '<button type="button" class="btn btn-outline-secondary rounded-pill w-100 m-1" data-bs-dismiss="modal">確定</button>'+
		          '</div>'+
		        '</div>'+
		      '</div>'+
		    '</div>'+
		  '</div>'+
		'</div>'
	'</div>';

	var newPasswordSentModalObject = document.createElement('div')
	newPasswordSentModalObject.innerHTML = newPasswordSentModalHTML;
	document.body.appendChild(newPasswordSentModalObject);


	var newPasswordSentModal = document.querySelector('#newPasswordSentModal');
	if (newPasswordSentModal) {

		snackBar('#nowLoading');


		var modal = new bootstrap.Modal(newPasswordSentModal, {
			backdrop: true
		});

		setTimeout(function(){
			modal.show();
		}, 2000);
		

		//modal關閉後,導到登入頁
		newPasswordSentModal.addEventListener('hidden.bs.modal', () => {
			document.location.href = 'Login.html';
		});
	}
}

if (window.location.hash == "#newPasswordSentModal") {
	newPasswordSentModal();
}

//訪客留言頁: 顯示留言成功modal
if (window.location.hash == "#submitSuccessModal") {
	var submitSuccessModal = document.querySelector('#submitSuccessModal');
	if (submitSuccessModal) {
		var modal = new bootstrap.Modal(submitSuccessModal, {
			backdrop: true
		});
		modal.show();
	}
}

//會員資料無法mapping之訊息modal
function dataMappingAlertModal(){
	var dataMappingAlertModalHTML = 
	'<div class="modal fade" id="dataMappingAlertModal" tabindex="-1" aria-labelledby="dataMappingAlertModal" aria-hidden="true">'+
		'<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">'+
		  '<div class="modal-content rounded-0">'+
		    '<div class="modal-body p-2 fs-65">'+
		      '<div class="d-flex flex-column justify-content-center">'+
	            '<div class="text-danger text-center my-2"><span class="feather icon-alert-triangle fs-1"></span></div>'+
	            '<div class="text-center"><span class="fs-6">會員資料異常，請至「<a href="guestMessage.html" class="text-decoration-underline">線上留言</a>」或直接撥打客服專線0809-053-888，我們將為您服務。</span></div>'+
	          '</div>'+
		    '</div>'+
		    '<div class="modal-footer p-2">'+
		      '<div class="d-flex flex-column w-100">'+
		        '<div class="d-flex justify-content-between flex-column">'+
		          '<div class="btn-group" role="group">'+
		            '<button type="button" class="btn btn-outline-secondary rounded-pill w-100 m-1" data-bs-dismiss="modal">確定</button>'+
		          '</div>'+
		        '</div>'+
		      '</div>'+
		    '</div>'+
		  '</div>'+
		'</div>'
	'</div>';

	var dataMappingAlertModalObject = document.createElement('div')
	dataMappingAlertModalObject.innerHTML = dataMappingAlertModalHTML;
	document.body.appendChild(dataMappingAlertModalObject);


	var dataMappingAlertModal = document.querySelector('#dataMappingAlertModal');
	if (dataMappingAlertModal) {
		var modal = new bootstrap.Modal(dataMappingAlertModal, {
			backdrop: true
		});
		modal.show();
	}

}

if (window.location.hash == "#dataMappingAlertModal") {
	dataMappingAlertModal();
}

//「重複登入」訊息modal
function duplicateLoginAlertModal(){
	var duplicateLoginAlertModalHTML = 
	'<div class="modal fade" id="duplicateLoginAlertModal" tabindex="-1" aria-labelledby="duplicateLoginAlertModal" aria-hidden="true">'+
		'<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">'+
		  '<div class="modal-content rounded-0">'+
		    '<div class="modal-body p-2 fs-65">'+
		      '<div class="d-flex flex-column justify-content-center p-2">'+
		        '<div class="d-flex justify-content-center align-items-center mb-2 fs-6 fs-xl-5">'+
		          '<div class="pt-1"><span class="feather icon-alert-circle fs-6 fs-xl-5"></span></div>'+
		          '<div class="px-2">您於其他設備重複登入，系統已將您自動登出</div>'+
		        '</div>'+
		        '<div class="d-flex justify-content-center fs-65 fs-xl-6"></div>'+
		      '</div>'+
		    '</div>'+
		    '<div class="modal-footer p-2">'+
		      '<div class="d-flex flex-column w-100">'+
		        '<div class="d-flex justify-content-between flex-column">'+
		          '<div class="btn-group" role="group">'+
		            '<button type="button" class="btn btn-outline-secondary rounded-pill w-100 m-1" data-bs-dismiss="modal">確定</button>'+
		          '</div>'+
		        '</div>'+
		      '</div>'+
		    '</div>'+
		  '</div>'+
		'</div>'
	'</div>';

	var duplicateLoginAlertModalObject = document.createElement('div')
	duplicateLoginAlertModalObject.innerHTML = duplicateLoginAlertModalHTML;
	document.body.appendChild(duplicateLoginAlertModalObject);


	var duplicateLoginAlertModal = document.querySelector('#duplicateLoginAlertModal');
	if (duplicateLoginAlertModal) {
		var modal = new bootstrap.Modal(duplicateLoginAlertModal, {
			backdrop: true
		});
		modal.show();

		//modal關閉後,導到登入頁
		duplicateLoginAlertModal.addEventListener('hidden.bs.modal', () => {
			document.location.href = 'Login.html';
		});
	}

}

if (window.location.hash == "#duplicateLoginAlertModal") {
	duplicateLoginAlertModal();
}

//「閒置時間過長」訊息modal
function idleAlertModal(){
	var idleAlertModalHTML = 
	'<div class="modal fade" id="idleAlertModal" tabindex="-1" aria-labelledby="idleAlertModal" aria-hidden="true">'+
		'<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">'+
		  '<div class="modal-content rounded-0">'+
		    '<div class="modal-body p-2 fs-65">'+
		      '<div class="d-flex flex-column justify-content-center p-2">'+
		        '<div class="d-flex justify-content-center align-items-center mb-2 fs-6 fs-xl-5">'+
		          '<div class="pt-1"><span class="feather icon-alert-circle fs-6 fs-xl-5"></span></div>'+
		          '<div class="px-2">閒置時間過長，系統已將您自動登出</div>'+
		        '</div>'+
		      '</div>'+
		    '</div>'+
		    '<div class="modal-footer p-2">'+
		      '<div class="d-flex flex-column w-100">'+
		        '<div class="d-flex justify-content-between flex-column">'+
		          '<div class="btn-group" role="group">'+
		            '<button type="button" class="btn btn-outline-secondary rounded-pill w-100 m-1" data-bs-dismiss="modal">確定</button>'+
		          '</div>'+
		        '</div>'+
		      '</div>'+
		    '</div>'+
		  '</div>'+
		'</div>'
	'</div>';

	var idleAlertModalObject = document.createElement('div')
	idleAlertModalObject.innerHTML = idleAlertModalHTML;
	document.body.appendChild(idleAlertModalObject);


	var idleAlertModal = document.querySelector('#idleAlertModal');
	if (idleAlertModal) {
		var modal = new bootstrap.Modal(idleAlertModal, {
			backdrop: true
		});
		modal.show();

		//modal關閉後,導到登入頁
		idleAlertModal.addEventListener('hidden.bs.modal', () => {
			document.location.href = 'Login.html';
		});
	}

}

if (window.location.hash == "#idleAlertModal") {
	idleAlertModal();
}





//首頁: 促銷活動 POP-UP Banner
var popupBannerModal = document.querySelector('#popupBannerModal');
if (popupBannerModal) {
	var modal = new bootstrap.Modal(popupBannerModal, {
		backdrop: true
	});
	// setTimeout( () => {
	// 	modal.show();
	// }, 1000);	
}





//刷卡優惠按鈕自動抓日期更新(js)
var toggleCardCampaign = document.querySelector('#toggleCardCampaign');
if (toggleCardCampaign) {
	toggleCardCampaign.addEventListener('click', function(){
		var yyyymm = dayjs().format('YYYYMM');
		window.open('https://www.vivatv.com.tw/html/'+ yyyymm +'_creditcard.html');
	});	
}

//刷卡優惠按鈕自動抓日期更新(jquery)
// $('#toggleCardCampaign').click(function(){
// 	var yyyymm = dayjs().format('YYYYMM');
// 	window.open('https://www.vivatv.com.tw/html/'+ yyyymm +'_creditcard.html');
// });

//圖片路徑後加上亂數(測試用)
$('img').each(function(){
	var imgsrc = $(this).attr('data-src');
	imgsrc = imgsrc + "?nocache=" + Math.random();
	$(this).attr('data-src', imgsrc);
});

//結帳流程2: 一次勾選全部商品
var selectAllProduct = document.querySelector('#selectAllProduct');
var selectProductForCheckOut = document.querySelectorAll('input[name="selectProductForCheckOut"]');	
const toggleAllCheckBox = function() {
	
	selectProductForCheckOut = document.querySelectorAll('input[name="selectProductForCheckOut"]');	
	if (selectAllProduct.checked) {
		selectProductForCheckOut.forEach(function(el){
			el.checked = true;
			el.closest('.cart-item').classList.remove('gray-out');
			updateCart();
		});
	} else {
		selectProductForCheckOut.forEach(function(el){
			el.checked = false;
			el.closest('.cart-item').classList.add('gray-out');
			updateCart();
		});
	}

	updateCart();
}
if (selectAllProduct) {
	selectAllProduct.addEventListener('change', toggleAllCheckBox, false);	
}

selectProductForCheckOut.forEach(function(el){

	el.addEventListener('change', (e)=>{


		el.closest('.cart-item').classList.toggle('gray-out');
		
		var children = el.closest('.cart-item').querySelectorAll('.additional-purchase-wrapper input[name="selectProductForCheckOut"]');
		console.log('children:' + children);

		[].forEach.call(children, (c)=>{
			c.checked = el.checked;		
			console.log(c.id);
		});	

		/*if (el.checked == true) {
			
			[].forEach.call(children, (c)=>{
				c.checked = true;
				console.log('true');
			});	
		} else {
			console.log('false');
			[].forEach.call(children, (c)=>{
				c.checked = false;
			});
		}*/
		updateCart();
	});

	
});


//結帳流程2: 刪除全部商品
var btnRemoveAllProducts = document.querySelector('#btnRemoveAllProducts');
var itemInCart = document.querySelectorAll('#shoppingCartList .cart-item');
var shoppingCartList = document.querySelector('#shoppingCartList');
const RemoveAllProducts = function() {
	shoppingCartList.innerHTML = '';
	updateCart();
}
if (btnRemoveAllProducts) {
	btnRemoveAllProducts.addEventListener('click', RemoveAllProducts, false);	
}




//圖片加上zoom-in及is-load效果(js)
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
//圖片加上zoom-in及is-load效果(jquery)
// $('img.lazy-load').each(function(index, element){
	
// 	let ew = element.width;
// 	let eh = element.height;

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






//enable tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})




//結帳流程中隱藏右上角的購物車圖示(js)
// var checkOutStep = document.querySelector('#checkOutStep');
// if (checkOutStep) {
// 	var toggleCart = document.querySelector('#toggleCart');
// 	var cartBadge = document.querySelector('.cart-badge');
// 	toggleCart.style.display = 'none';
// 	cartBadge.style.display = 'none';
// }
//結帳流程中隱藏右上角的購物車圖示(jquery)
// if ($('#checkOutStep')[0]) {
// 	$('#toggleCart, .cart-badge').hide();
// }






//商品頁:商品圖片點擊後開大圖(js)
var targetImg = document.querySelectorAll('#swpProduct .lazy-load');
if (targetImg) {
	var targetImgModalHTML = 
	'<div class="modal fade" id="targetImgModal" aria-hidden="true" aria-labelledby="targetImgModalLabel" tabindex="-1">'+
	  '<div class="modal-dialog modal-dialog-centered" style="max-width: 750px;">'+
	    '<div class="modal-content rounded-0">'+
	      '<div class="modal-body p-0 shadow"></div>'+
	    '</div>'+
	  '</div>'+
	  '<div class="position-absolute bottom-0 start-50 translate-middle-x bg-dark">'+
		  '<div class="btn-group">'+
		    '<button class="btn text-white fs-5"><span class="feather icon-zoom-in"></span></button>'+
		    '<button class="btn text-white fs-5"><span class="feather icon-zoom-out"></span></button>'+
		    '<button class="btn text-white fs-5"><span class="feather icon-rotate-ccw"></span></button>'+
		    '<button class="btn text-white fs-5"><span class="feather icon-rotate-cw"></span></button>'+
		    '<button class="btn text-white fs-5"><span class="feather icon-x"></span></button>'+
		  '</div>'+
		'</div>'+
	'</div>';

	var div = document.createElement('div');
	div.innerHTML = targetImgModalHTML;
	document.body.append(div);
}
const handleTargetImg = function() {
	var targetImgSrc = this.getAttribute('data-src');
	var targetImgSrcHTML = '<img src="'+ targetImgSrc +'" class="img-fluid shadow-lg">';
	document.querySelector('#targetImgModal .modal-body').innerHTML = targetImgSrcHTML;
	
	var targetImgModal = new bootstrap.Modal(document.getElementById('targetImgModal'));
	targetImgModal.show();
}
targetImg.forEach(function(element){
	element.addEventListener('click', handleTargetImg, false);
});
//商品頁:商品圖片點擊後開大圖(jquery)
// var targetImg = $('#swpProduct .lazy-load');
// $(targetImg).click(function(){
// 	var targetImgSrc = $(this).attr('data-src');
// 	$('body').append(
// 	'<div class="modal fade" id="targetImgModal" aria-hidden="true" aria-labelledby="targetImgModalLabel" tabindex="-1">'+
// 	  '<div class="modal-dialog modal-dialog-centered" style="max-width: 750px;">'+
// 	    '<div class="modal-content rounded-0">'+
// 	      '<div class="modal-body p-0"></div>'+
// 	    '</div>'+
// 	  '</div>'+
// 	'</div>');
	
// 	$('#targetImgModal .modal-body').html('<img src="'+ targetImgSrc +'" class="img-fluid">');
// 	$('#targetImgModal').modal('show');
// });









//滑上商品thumbnail時, 會跟著換上方大圖(js)
var swpProductThumbSwiperSlide = document.querySelectorAll('#swpProductThumb .swiper-slide');
const mouseOverToSlide = function() {
	var i = [].indexOf.call(swpProductThumbSwiperSlide, this);
	swpProduct.slideTo( i + 1);
}
swpProductThumbSwiperSlide.forEach(function(el){
	el.addEventListener('mouseover', mouseOverToSlide, false);
});

var swpProductThumbSwiperSlideInModal = document.querySelectorAll('#swpProductThumbInModal .swiper-slide');
const mouseOverToSlideInModal = function() {
	var i = [].indexOf.call(swpProductThumbSwiperSlideInModal, this);
	swpProductInModal.slideTo( i + 1);
}
swpProductThumbSwiperSlideInModal.forEach(function(el){
	el.addEventListener('mouseover', mouseOverToSlideInModal, false);
});

var swpProductThumbSwiperSlideInAdditionalBuy = document.querySelectorAll('#swpProductThumbInAdditionalBuy .swiper-slide');
const mouseOverToSlideInAdditionalBuy = function() {
	var i = [].indexOf.call(swpProductThumbSwiperSlideInAdditionalBuy, this);
	swpProductInAdditionalBuy.slideTo( i + 1);
}
swpProductThumbSwiperSlideInAdditionalBuy.forEach(function(el){
	el.addEventListener('mouseover', mouseOverToSlideInAdditionalBuy, false);
});



//滑上商品thumbnail時, 會跟著換上方大圖(jquery)
/*$('#swpProductThumb .swiper-slide').on('mouseover', function() {
  swpProduct.slideTo($(this).index() + 1);
});*/

/*$('#swpProductThumbInModal .swiper-slide').on('mouseover', function() {
  swpProductInModal.slideTo($(this).index() + 1);
});*/










//desktop版大分類nav(js)
var desktopNav = document.querySelector('#desktopNav');
var desktopNavLink = document.querySelectorAll('#desktopNav .nav-link');
var desktopTabPane = document.querySelectorAll('#desktopNav .tab-pane');
var hoverTimer;

const showDesktopNav =  function() {


	for (var i = 0; i < desktopNavLink.length; i++) {
		desktopNavLink[i].classList.remove('active');
		desktopTabPane[i].classList.remove('show', 'active');
	}

	var tabTrigger = new bootstrap.Tab(this);
	
	hoverTimer = setTimeout(function(){
		tabTrigger.show();
	}, 0);
	
	
}

const hideDesktopNav =  function() {
	for (var i = 0; i < desktopNavLink.length; i++) {
		desktopNavLink[i].classList.remove('active');
		desktopTabPane[i].classList.remove('show', 'active');
	}
	clearTimeout(hoverTimer);
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

if (desktopNav) {
	desktopNav.addEventListener('mouseleave', hideDesktopNav, false);	
}


//desktop版大分類nav(jquery)
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





//檢查子元素總寬度來決定toggle btn要不要顯示(js)
function checkWidthToToggle(element, btn) {
	var childWidth = 0;
	var parentWidth = document.querySelector(element).offsetWidth;

	var elementChild = document.querySelectorAll( element + ' > * ');
	elementChild.forEach(el => {
		childWidth = childWidth + el.offsetWidth;
	});

	if (childWidth <= parentWidth) {
		document.querySelector(btn).style.display = 'none';
	} else {
		document.querySelector(btn).style.display = 'block';
	}
}
//檢查子元素總寬度來決定toggle btn要不要顯示(jquery)
/*function checkWidthToToggle(element, btn) {
	var childWidth = 0;
	var parentWidth = $(element).outerWidth();
	$( element + ' > *').each(function() { childWidth += $(this).outerWidth(); }); 

	if (childWidth <= parentWidth) {
		$(btn).hide();
	} else {
		$(btn).show();
	}
}*/






//載入或resize時去檢查(js)
const checkOnLoadAndResize = function() {
	//檢查viewport高度
	checkViewportHeight();
	adjustPageHeight();

	//檢查「主題活動文字」區塊寬度
	if (document.querySelector('#campaignLink')) {
		checkWidthToToggle('#campaignLink', '#campaignToggleBtn');
	}
	
	if (document.querySelector('#subCategory')) {
		checkWidthToToggle('#subCategory', '#subCategoryToggleBtn');
	}
	
}
window.onload = window.onresize = checkOnLoadAndResize;

//載入或resize時去檢查(jquery)
/*$(window).on('load resize', function(e){
	//檢查viewport高度
	checkViewportHeight();
	adjustPageHeight();
	//檢查「主題活動文字」區塊寬度
	checkWidthToToggle('#campaignLink', '#campaignToggleBtn');
	checkWidthToToggle('#subCategory', '#subCategoryToggleBtn');
});*/







//手機版分類modal點開時的處理(js)
var toggleMenu = document.querySelector('#toggleMenu');
const toggleMenuHandler = function() {
	//檢查viewport高度
	checkViewportHeight();

	//檢查「品牌旗鑑」區塊寬度
	setTimeout(function(){
		checkWidthToToggle('#brandLink', '#brandToggleBtn');
	}, 500);
}

if (toggleMenu) {



	toggleMenu.addEventListener('click', toggleMenuHandler);

	var menuModal = document.getElementById('menuModal')
	menuModal.addEventListener('hidden.bs.modal', function (event) {
	  document.body.classList.remove('modal-open');
	  console.log('modal-open removed');
	})

}

//手機版分類modal點開時的處理(jquery)
/*$('#toggleMenu').click(function(){
	$('#Search').collapse('hide');
	//檢查viewport高度
	checkViewportHeight();
	//檢查「品牌旗鑑」區塊寬度
	setTimeout(function(){
		checkWidthToToggle('#brandLink', '#brandToggleBtn');
	}, 500);
});*/




//複製貨運單號到剪貼簿(js)
function copyToClipboard(t) {
	var temp = document.createElement('input');
	document.body.append(temp);
    var element = t.parentNode.querySelector('.freight-id').innerText;

    temp.value = element;
    temp.select();
    
    document.execCommand("copy");
    temp.remove();

    snackBar('#copiedToClipboard');
}
//複製貨運單號到剪貼簿(jquery)
/*function copyToClipboard(t) {
    var $temp = $("<input>");
    $("body").append($temp);
    var element = $(t).parent().find('.freight-id').text();
    
    $temp.val(element).select();
    document.execCommand("copy");
    $temp.remove();

    snackBar('#copiedToClipboard');
}*/




//檢查viewport高度(js)
function checkViewportHeight() {
	let vh = window.innerHeight;

	let menuModal = document.querySelector('#menuModal');
	if (menuModal) {
		document.querySelector('.primary-category').style.height = (vh - 50) + 'px';
		document.querySelector('.secondary-category').style.height = (vh - 50) + 'px';
		document.querySelector('.minor-category').style.height = ((vh - 50) - 50) + 'px';

		// console.log('viewport height checked');
	}
}
//檢查viewport高度(jquery)
/*function checkViewportHeight() {
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
}*/






//手機版modal選單：點擊「品牌」後去highlight其子分類(js)
function jumpToAnchor(aid) {
	location.href = aid;
}

var dataHighlightTargets = document.querySelectorAll('[data-highlight-target]');
const handleDataHighlightTarget = function() {
	let targetID = this.getAttribute('data-highlight-target');

	var dataToggleHighlights = document.querySelectorAll('[data-toggle="highlight"]');
	
	[].forEach.call(dataToggleHighlights, function(el){
		el.classList.remove('highlight');
	});

	document.querySelector(targetID).classList.add('highlight');

	var brandLink = document.querySelector('#brandLink');
	var brandToggleBtn = document.querySelector('#brandToggleBtn');

	if ( brandLink.classList.contains('flex-wrap') ) {
		brandLink.classList.remove('flex-wrap');
		brandToggleBtn.querySelector('.icon-chevron-down').classList.toggle('.icon-chevron-up');
		brandToggleBtn.querySelector('.icon-chevron-up').classList.toggle('.icon-chevron-down');
	}

	jumpToAnchor(targetID);
}

dataHighlightTargets.forEach(function(el){
	el.addEventListener('click', handleDataHighlightTarget, false);
});

//手機版modal選單：點擊「品牌」後去highlight其子分類(jquery)
/*$('[data-highlight-target]').click(function(){
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
});*/










//切換flex-wrap(js)
var toggleFlexWrap = document.querySelectorAll('[data-toggle="flex-wrap"]');
const handleToggleFlexWrap = function() {
	var child = this.querySelector('.icon-chevron-down, .icon-chevron-up');
	child.classList.toggle('icon-chevron-down');
	child.classList.toggle('icon-chevron-up');
	let target = this.getAttribute('data-target');
	let toggle = this.getAttribute('data-toggle');
	document.querySelector(target).classList.toggle(toggle);
}
toggleFlexWrap.forEach(function(el){
	el.addEventListener('click', handleToggleFlexWrap, false);
});

//切換flex-wrap(jquery)
/*$('[data-toggle="flex-wrap"]').click(function(){
	$(this).children('.icon-chevron-down, .icon-chevron-up').toggleClass('icon-chevron-down icon-chevron-up');
	let target = $(this).attr('data-target');
	let toggle = $(this).attr('data-toggle');
	$(target).toggleClass(toggle);
});*/



//點擊「非container所列之區域」時，關掉該區域(js)
/*document.addEventListener('click', function(e) {
	var containerList = document.querySelectorAll('#Search, #moreButtons, #specAndAmount');

	containerList.forEach(function(el){
		if ()
	});
});*/

document.addEventListener('click', function (e) {

	//處理搜尋列、更多、選規格及數量
    var containers = document.querySelectorAll('#Search, #moreButtons');
    containers.forEach(element => {

    	

	    if (!element.contains(e.target) ) {

	    	if (element.classList.contains('show')) {
					var bsCollapse = new bootstrap.Collapse(element, {
					  toggle: false
					})
					bsCollapse.hide();
	    	}
	    }
    });

    //處理瀏覽紀錄
    var history = document.querySelector('#History');
    var vw = window.innerWidth;

    if (history) {
	    if ( !history.contains(e.target) && vw <= 1200) {
	    	if (history.classList.contains('show')) {
				var bsCollapse = new bootstrap.Collapse(history, {
				  hide: true
				})
	    	}
	    }	
    }
    
});


//點擊「非container所列之區域」時，關掉該區域(jquery)
/*$(document).on('click', function(e) {
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
});*/




//指定區域開啟時加上backdrop(js)
var myCollapsible = document.querySelectorAll('#Search, #History, #moreButtons');
myCollapsible.forEach(element => {
	element.addEventListener('show.bs.collapse', function(){
		if (document.querySelector('#myBackdrop')) {
			//do nothing
		} else {
			var vw = window.innerWidth;
			
			if ( vw < 1200 ) {

				var myBackdrop = document.createElement('div');
				myBackdrop.id = 'myBackdrop';
				myBackdrop.classList.add('modal-backdrop', 'opacity-50');
				document.body.appendChild(myBackdrop);

				setTimeout(() => {
					document.body.classList.add('modal-open');
				}, 500);

			}	
			
		}
	});

	element.addEventListener('hide.bs.collapse', function(){
		document.body.classList.remove('modal-open');
		document.body.removeAttribute('style');
		if (document.querySelector('#myBackdrop')) {
			document.querySelector('#myBackdrop').remove();	
		}
		
	});
});




//指定區域開啟時加上backdrop(jquery)
/*var myCollapsible = $("#Search, #History, #moreButtons");

$(myCollapsible).on('show.bs.collapse', function(){
	if ($('#myBackdrop').length) {
		//do nothing
	} else  {

		var vw = $(window).width();

		if ( vw >= 1200 ) {
			//do nothing
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
});*/




/*$(myCollapsible, '#History').on('hide.bs.collapse', function(){
	// $(".modal-backdrop").remove();
	$('body').removeClass('modal-open');
	$('body').removeAttr('style');
	$('#myBackdrop').remove();
});*/

//規格及數量開啟時的處理(js)
var specAndAmount = document.querySelector('#specAndAmount');
var additionalPurchase = document.querySelector('#additionalPurchase');

if (specAndAmount) {

	specAndAmount.addEventListener('show.bs.collapse', function(){
		
			var vw = window.innerWidth;
			
			var myBackdrop = document.createElement('div');
			myBackdrop.id = 'myBackdrop';
			myBackdrop.classList.add('modal-backdrop', 'opacity-50');
			document.body.appendChild(myBackdrop);
			
			if ( vw >= 1200 ) {
				setTimeout(() => {
					// document.body.classList.add('modal-open');
					// document.body.style.paddingRight = '17px';
				}, 500);

			} else {
				setTimeout(() => {
					document.body.classList.add('modal-open');
				}, 500);
			}
		
	});

	specAndAmount.addEventListener('hide.bs.collapse', function(){
		if (additionalPurchase) {
			
			setTimeout(() => {

				document.querySelector('.modal-backdrop').remove();
				document.body.classList.remove('modal-open');
				document.body.removeAttribute('style');

				document.querySelector('#topNav').style.paddingRight = '0px';
				document.querySelector('#topNav').style.marginRight = '0px';
			}, 500);

		} else {

			document.querySelector('.modal-backdrop').remove();
			setTimeout(() => {
				document.body.classList.remove('modal-open');
				document.body.removeAttribute('style');
			}, 500);
			
		}
	});

}

//規格及數量開啟時的處理(jquery)
/*$('#specAndAmount').on('show.bs.collapse', function(){
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
});*/













//為所有button加上ripple效果 (js)
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


//抓data-bg-image的值來設定背景圖(js)
var dataBgImage = document.querySelectorAll('[data-bg-image]');
if (dataBgImage) {
	dataBgImage.forEach((el)=>{
		let bgImage = el.getAttribute('data-bg-image');
		el.style.backgroundImage = 'url('+ bgImage +')';
	});
}
//抓data-bg-image的值來設定背景圖(jquery)
/*$('div[data-bg-image]').each(function() {
    let bgImage = $(this).attr('data-bg-image');
    $(this).css('background-image', 'url(' + bgImage + ')');
});*/



//抓data-header-color來設定文字顏色(js)
var dataHeaderColor = document.querySelectorAll('[data-header-color]');
if (dataHeaderColor) {
	dataHeaderColor.forEach((el)=>{

		let hColor = el.getAttribute('data-header-color');
		let hBgColor = '#' + hColor.substr(1) + '1A';
		var dataTypeHeader = el.querySelectorAll('[data-type="header"]');

		dataTypeHeader.forEach((ele)=>{
			ele.style.color = hColor;
			// console.log(hColor);
		});

	});
}
//抓data-header-color及data-body-color來設定文字顏色及背景底色(jquery)
/*$('div[data-header-color]').each(function() {
    let hColor = $(this).attr('data-header-color');
    let hBgColor = '#' + hColor.substr(1) + '1A';

    $(this).find('[data-type="header"]').css('color', hColor);
    $(this).find('[data-type="view-all"]').css('color', hColor);
    $(this).find('[data-type="view-all"]').css('background-color', hBgColor);
});*/



//抓data-body-color來設定底色(js)
var dataBodyColor = document.querySelectorAll('[data-body-color]');
if (dataBodyColor) {
	dataBodyColor.forEach((el)=>{
		let bColor = el.getAttribute('data-body-color');
		el.style.backgroundColor = bColor;
		// console.log('data-body-color: '+ bColor);
	});
}
//抓data-body-color來設定底色(jquery)
/*$('div[data-body-color]').each(function() {
    let bColor = $(this).attr('data-body-color');
    $(this).css('background-color', bColor);
});*/



//主打專區設定底色(漸層)
// let themeColor = $('#heroSection').attr('data-theme');
// let color2 = "rgba(255, 255, 255, 0)";
// let str = "linear-gradient(" + themeColor + "," + color2 + ")";
// $("#heroSection").css("background",str);


//初始化swiper
//desktop版分類選單中的旗艦館swiper
const swpFlagshipBrandInSubcategory = new Swiper('#swpFlagshipBrandInSubcategory .swiper-container', {
	loop: true,
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
	preloadImages: true,
	// lazy: true,
	loadOnTransitionStart: true,
	
	loop: true,
	roundLengths: true,
	speed: 1000,
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
	},
	on: {
		init: function() {
			console.log('swiper initialized.');
			setTimeout(()=>{
				document.querySelector('.swiper-fluid').style.opacity = "1";
			}, 1000);
			
		},
	},
});






//大廣mouseover&mouseout處理(js)
var swiperSlideFluid = document.querySelectorAll('.swiper-fluid .swiper-slide');
if (swiperSlideFluid) {

	var swpMainDiv = document.querySelector('#swpMain');
	var swpCategoryBigDiv = document.querySelector('#swpCategoryBig');
	var swpFlagshipBigDiv = document.querySelector('#swpFlagshipBig');

	swiperSlideFluid.forEach((el)=>{
		el.addEventListener('mouseover', ()=>{
			if (swpMainDiv) {
				swpMain.autoplay.stop();
			} else if (swpCategoryBigDiv) {
				swpCategoryBig.autoplay.stop();
			} else if (swpFlagshipBig) {
				swpFlagshipBig.autoplay.stop();
			} else {
				//do nothing
			}
		});

		el.addEventListener('mouseout', ()=>{
			if (swpMainDiv) {
				swpMain.autoplay.start();
			} else if (swpCategoryBigDiv) {
				swpCategoryBig.autoplay.start();
			} else if (swpFlagshipBig) {
				swpFlagshipBig.autoplay.start();
			} else {
				//do nothing
			}
		});
	});

	// console.log('swiperSlideFluid.length:'+ swiperSlideFluid.length);

	// if (swiperSlideFluid.length < 4) {
	// 	console.log('大廣數量不足');
	// 	swpMain.slidesPerView = 'auto';
	// 	swpMain.autoplay.stop();
	// 	swpMain.loopDestroy();
	// }
}




//大廣mouseover&mouseout處理(jquery)
/*$('.swiper-fluid .swiper-slide').on('mouseover', function() {
	if ($('#swpMain')[0]) {
		swpMain.autoplay.stop();
	} else if ( $('#swpCategoryBig')[0]) {
		swpCategoryBig.autoplay.stop();
	} else if ( $('#swpFlagshipBig')[0]) {
		swpFlagshipBig.autoplay.stop();
	} else {
		//do nothing
	}
});*/
//大廣mouseout處理(jquery)
/*$('.swiper-fluid .swiper-slide').on('mouseout', function() {
	if ($('#swpMain')[0]) {
		swpMain.autoplay.start();
	} else if ( $('#swpCategoryBig')[0]) {
		swpCategoryBig.autoplay.start();
	} else if ( $('#swpFlagshipBig')[0]) {
		swpFlagshipBig.autoplay.start();
	} else {
		//do nothing
	}
});*/

//window resize時去update swpMain (js)
window.onresize = ()=> {
	var swpMainDiv = document.querySelector('#swpMain');
	if (swpMainDiv) {
		swpMain.update();
		console.log('swpMain updated');
	}
}

/*$(window).on('resize', function(){
	if ($('#swpMain')[0]) {
		swpMain.update();
		console.log('swpMain updated');
	}
});*/

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
	loop: false,
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
  		spaceBetween: 10,
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

//主題精選C區第1個swiper
const swpPickUpC1 = new Swiper('#swpPickUpC1', {
	slidesPerView: 3.3,
	loop: 1,
	spaceBetween: 5,
	freeMode: true,
	pagination: {
    el: '#swpPickUpC1Btn .swiper-pagination',
    type: 'fraction',
  },
	navigation: {
		nextEl: '#swpPickUpC1Btn .custom-button-next',
		prevEl: '#swpPickUpC1Btn .custom-button-prev',
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
const swpPickUpC2 = new Swiper('#swpPickUpC2', {
	slidesPerView: 3.3,
	loop: 1,
	spaceBetween: 5,
	freeMode: true,
	pagination: {
    el: '#swpPickUpC2Btn .swiper-pagination',
    type: 'fraction',
  },
	navigation: {
		nextEl: '#swpPickUpC2Btn .custom-button-next',
		prevEl: '#swpPickUpC2Btn .custom-button-prev',
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
const swpPickUpC3 = new Swiper('#swpPickUpC3', {
	slidesPerView: 3.3,
	loop: 1,
	spaceBetween: 5,
	freeMode: true,
	pagination: {
	    el: '#swpPickUpC3Btn .swiper-pagination',
	    type: 'fraction',
  	},
	navigation: {
		nextEl: '#swpPickUpC3Btn .custom-button-next',
		prevEl: '#swpPickUpC3Btn .custom-button-prev',
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
		// 1200: {
		// 	loop: true,
		// 	slidesPerView: 6,
		// 	slidesPerGroup: 6,
		// 	slidesPerColumn: 1,
		// 	slidesPerColumnFill: 'row',
		// 	spaceBetween: 0,
		// 	allowSlideNext: true,
		// 	allowSlidePrev: true,
		// },
		1200: {
			// loop: true,
			slidesPerView: 5,
			slidesPerGroup: 5,
			slidesPerColumn: 2,
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
		// 1200: {
		// 	loop: true,
		// 	slidesPerView: 6,
		// 	slidesPerGroup: 6,
		// 	slidesPerColumn: 1,
		// 	slidesPerColumnFill: 'row',
		// 	spaceBetween: 0,
		// 	allowSlideNext: true,
		// 	allowSlidePrev: true,
		// },
		1200: {
			loop: false,
			slidesPerView: 5,
			slidesPerGroup: 5,
			slidesPerColumn: 2,
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
	autoplay: true,
	
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
			watchOverflow: true,
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
	centerInsufficientSlides: true,
	slidesPerView: 3,
	slidesPerColumn: 1,
	slidesPerColumnFill: 'row',
	slidesPerGroup: 1,
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






//結帳頁的館長推薦swiper
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
			slidesPerView: 8,
			slidesPerGroup: 8,
			spaceBetween: 5,
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

//免費服務專線btn callout (js)
var freeServiceCall = document.querySelector('#freeServiceCall');
if (freeServiceCall) {
	var vw = window.innerWidth;
	freeServiceCall.addEventListener('click', () => {
		if ( vw < 1200 ) {
			window.location.href = 'tel:0809053888';
		}
	});
}

//免費服務專線btn callout(jquery)
/*$('#freeServiceCall').click(function(){
	var vw = $(window).width();
	if (vw < 1200) {
		window.location.href='tel:0809053888';
	}
});*/



//瀏覽紀錄展開時去update swpHistory (js)
var myHistory = document.getElementById('History')
var onlineChatBoxBtn = document.querySelector('#onlineChatBoxBtn')

if (myHistory) {
	myHistory.addEventListener('shown.bs.collapse', function () {
	  swpHistory.update();
	  console.log('swpHistory updated');
	  if (onlineChatBoxBtn) {
	  	onlineChatBoxBtn.classList.add('move-up');
	  }
	})

	myHistory.addEventListener('hidden.bs.collapse', function () {
	  if (onlineChatBoxBtn) {
	  	onlineChatBoxBtn.classList.remove('move-up');
	  }
	})

}



// if ($('#additionalPurchase')[0]) {
// 	$('#additionalPurchase').on('shown.bs.modal', function() {
		
		// swpProduct.update();
		
		//加價購modal商品圖thumbnail
		const swpProductThumbInAdditionalBuy = new Swiper('#swpProductThumbInAdditionalBuy', {
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
		//加價購modal商品圖
		const swpProductInAdditionalBuy = new Swiper('#swpProductInAdditionalBuy .swiper-container', {
			loop: true,
			observer: true,
		    observeParents: true,
			autoplay: {
				delay: 3000,
			},
			effect: 'fade',
			pagination: {
			  el: '#swpProductInAdditionalBuy .swiper-pagination',
			    type: 'bullets',
			},
			navigation: {
				nextEl: '#swpProductInAdditionalBuy .swiper-button-next',
				prevEl: '#swpProductInAdditionalBuy .swiper-button-prev',
			},
			thumbs: {
				swiper: swpProductThumbInAdditionalBuy,
			}
		});

		//館長推薦modal商品圖thumbnail
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
		//館長推薦modal商品圖
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
var modalAll = document.querySelectorAll('.modal');
if (modalAll) {
	modalAll.forEach((el)=>{
		el.addEventListener('shown.bs.modal', ()=>{
			document.body.classList.add('modal-open');
			// console.log('body.modal-open added');
		});
	});
}

/*$('.modal').on('shown.bs.modal', function (e) {
	// setTimeout(function(){
		$('body').addClass('modal-open');
		

		var vw = $(window).width();
		if ( vw >= 1200 ) {
			// $('body').css({ paddingRight: '17px'});
		}
	// }, 200);
	
});*/


//商品列表: grid-view和list-view切換 (js)
var dataToggleView = document.querySelectorAll('[data-toggle-view]');
if (dataToggleView) {

	[].forEach.call(dataToggleView, el => {
		el.addEventListener('click', () => {
			[].forEach.call(dataToggleView, ele => {
				ele.classList.remove('active');
			});
			el.classList.add('active');
			let className = el.getAttribute('data-toggle-view');
			let targetID = el.getAttribute('data-target');
			document.querySelector(targetID).className = '';
			document.querySelector(targetID).classList.add('d-flex', className, 'mb-3', 'mb-xl-5');

		});
	});
}


//商品列表: grid-view和list-view切換 (jquery)
/*$('[data-toggle-view]').click(function(){
	$('[data-toggle-view]').removeClass('active');
	$(this).addClass('active');
	let className = $(this).attr('data-toggle-view');
	let targetID = $(this).attr('data-target');
	$(targetID).removeClass();
	$(targetID).addClass('d-flex ' + className);
});*/




//美好1台輪播
const swpTV1 = new Swiper('#swpTV1 .swiper-container', {
	slidesPerView: 1,
	loop: 1,
	spaceBetween: 0,
	freeMode: true,
	speed: 1000,
	observer: true,
  	observeParents: true,
	autoplay: {
		delay: 2000,
		disableOnInteraction: false,
	},
	effect: 'fade',
	navigation: {
		nextEl: '#swpTV1 .swiper-button-next',
		prevEl: '#swpTV1 .swiper-button-prev',
	},
	pagination: {
		el: '#swpTV1 .swiper-pagination',
    	type: 'bullets',
    	clickable: true
	}
});

//美好2台輪播
const swpTV2 = new Swiper('#swpTV2 .swiper-container', {
	slidesPerView: 1,
	loop: 1,
	spaceBetween: 0,
	freeMode: true,
	speed: 1000,
	observer: true,
  	observeParents: true,
	autoplay: {
		delay: 2000,
		disableOnInteraction: false
	},
	effect: 'fade',
	navigation: {
		nextEl: '#swpTV2 .swiper-button-next',
		prevEl: '#swpTV2 .swiper-button-prev'
	},
	pagination: {
		el: '#swpTV2 .swiper-pagination',
    	type: 'bullets',
    	clickable: true
	}
});


//節目表輪播 mouseover&mouseout 處理(js)
var tvScheduleHome = document.querySelector('#tvScheduleHome');
if (tvScheduleHome) {

	tvScheduleHome.addEventListener('mouseover', ()=> {
		swpTV1.autoplay.stop();
		swpTV2.autoplay.stop();
	});

	tvScheduleHome.addEventListener('mouseout', ()=> {
		swpTV1.autoplay.start();
		swpTV2.autoplay.start();
	});

}


//youtube modal指定player id (js)
var live1_ID = '7IyxOiGMLgw'; //1台youtube直播id
var live2_ID = 'lEXITHxcagI'; //2台youtube直播id

// var toggleYT1 = document.querySelector('#toggleYT1');
// var toggleYT2 = document.querySelector('#toggleYT2');



var ytPlayer = document.querySelector('#ytPlayer');

// if (toggleYT1 || toggleYT2) {


// 	toggleYT1.addEventListener('click', () => {
// 		var live1HTML = '<iframe src="https://www.youtube.com/embed/'+ live1_ID +'?playsinline=1&controls=1&showinfo=1&rel=0&modestbranding=1&enablejsapi=0&autoplay=1&mute=1" allow="autoplay" allowfullscreen frameborder="0"></iframe>';
// 		ytPlayer.innerHTML = live1HTML;
// 	});

// 	toggleYT2.addEventListener('click', () => {
// 		var live2HTML = '<iframe src="https://www.youtube.com/embed/'+ live2_ID +'?playsinline=1&controls=1&showinfo=1&rel=0&modestbranding=1&enablejsapi=0&autoplay=1&mute=1" allow="autoplay" allowfullscreen frameborder="0"></iframe>';
// 		ytPlayer.innerHTML = live2HTML;
// 	});

// }



//節目表頁: 觀看直播按鈕 (js)
var dataYT1 = document.querySelectorAll('[data-youtube-channel="1"]');
var dataYT2 = document.querySelectorAll('[data-youtube-channel="2"]');

if (dataYT1) {
	[].forEach.call(dataYT1, el => {
		el.addEventListener('click', () => {
			ytPlayer.innerHTML = '<iframe src="https://www.youtube.com/embed/'+ live1_ID +'?playsinline=1&controls=1&showinfo=1&rel=0&modestbranding=1&enablejsapi=0&autoplay=1&mute=1" allow="autoplay" allowfullscreen frameborder="0"></iframe>';
		});
	});
}

if (dataYT2) {
	[].forEach.call(dataYT2, el => {
		el.addEventListener('click', () => {
			ytPlayer.innerHTML = '<iframe src="https://www.youtube.com/embed/'+ live2_ID +'?playsinline=1&controls=1&showinfo=1&rel=0&modestbranding=1&enablejsapi=0&autoplay=1&mute=1" allow="autoplay" allowfullscreen frameborder="0"></iframe>';
		});
	});
}


//youtube modal指定player id (jquery)
/*$('#toggleYT1').click(function() {
	$('#ytPlayer').html('<iframe src="https://www.youtube.com/embed/'+ live1_ID +'?playsinline=1&controls=1&showinfo=1&rel=0&modestbranding=1&enablejsapi=0&autoplay=1&mute=1" allow="autoplay" allowfullscreen frameborder="0"></iframe>');
});
$('#toggleYT2').click(function() {
	$('#ytPlayer').html('<iframe src="https://www.youtube.com/embed/'+ live2_ID +'?playsinline=1&controls=1&showinfo=1&rel=0&modestbranding=1&enablejsapi=0&autoplay=1&mute=1" allow="autoplay" allowfullscreen frameborder="0"></iframe>');
});*/



//youtubeModal關閉後清掉player(js)
var youtubeModal = document.querySelector('#youtubeModal');
if (youtubeModal) {
	youtubeModal.addEventListener('hidden.bs.modal', () => {
		ytPlayer.innerHTML = '';
		console.log('youtubeModal cleared');
	});
}
//youtubeModal關閉後清掉player(jquery)
/*$('#youtubeModal').on('hidden.bs.modal', function () {
    $('#ytPlayer').html('');
});*/

//節目表頁: 商品影片modal(js)
var btnDataYoutube = document.querySelectorAll('button[data-youtube]');
if (btnDataYoutube) {
	[].forEach.call(btnDataYoutube, el => {
		el.addEventListener('click', () => {
			var productVideo_ID = el.getAttribute('data-youtube');
			console.log('productVideo_ID: '+ productVideo_ID);
			ytPlayer.innerHTML = '<iframe src="https://www.youtube.com/embed/'+ productVideo_ID +'?playsinline=1&controls=1&showinfo=1&rel=0&modestbranding=1&enablejsapi=0&autoplay=1&mute=1" allow="autoplay" allowfullscreen frameborder="0"></iframe>';
		});
	});
}

//節目表頁: 商品影片modal(jquery)
/*$('button[data-youtube]').click(function() {
    var productVideo_ID = $(this).attr('data-youtube');
    $('#ytPlayer').html('<iframe src="https://www.youtube.com/embed/'+ productVideo_ID +'?playsinline=1&controls=1&showinfo=1&rel=0&modestbranding=1&enablejsapi=0&autoplay=1&mute=1" allow="autoplay" allowfullscreen frameborder="0"></iframe>');
});*/


//檢查目標內所有radio button是否有checked(js)
function isRadioChecked (target) {
	var check = true;
	var t = document.querySelector(target);
	var inputRadioTarget = t.querySelectorAll('input[type="radio"]');

	[].forEach.call(inputRadioTarget, el => {

		var name = el.getAttribute('name');
		var inputRadioWithNameChecked = document.querySelector("input[name=" + name + "]:checked");

		if ( inputRadioWithNameChecked ) {
			check = true;
		} else {
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
//檢查目標內所有radio button是否有checked(jquery)
/*function isRadioChecked (target) {
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
}*/


//檢查「多規格&數量」是否已選齊(js)
function isMultiSpecAllSelected() {

	var check = false;

	if (ttlMSQty == maxMSQty) {
		check = true;
	}


	var targetBtn = document.querySelectorAll('#addToCart, #buyNow, #btnOKCart, #btnOKBuy');

	if (check) {
		[].forEach.call(targetBtn, el => {
			// el.setAttribute('disabled', false);
			el.disabled = false;
			console.log('已選齊, button解鎖');
		});	
	} else {
		[].forEach.call(targetBtn, el => {
			// el.setAttribute('disabled', true);
			el.disabled = true;
			console.log('尚未選齊');
		});	
	}
	


	/*if (check) {
		$('#addToCart, #buyNow, #btnOKCart, #btnOKBuy').attr('disabled', false);
	} else {
		$('#addToCart, #buyNow, #btnOKCart, #btnOKBuy').attr('disabled', true);
	}*/
	
}


//檢查「多規格&數量」是否已選齊(jquery)
/*function isMultiSpecAllSelected() {
	var check = false;
	if (ttlMSQty == maxMSQty) {
		check = true;
	}

	if (check) {
		$('#addToCart, #buyNow, #btnOKCart, #btnOKBuy').attr('disabled', false);
	} else {
		$('#addToCart, #buyNow, #btnOKCart, #btnOKBuy').attr('disabled', true);
	}
	
}*/



//控制「加入購物車」、「直接購買」、「確定」按鈕的enable/disable狀態(開啟規格/數量視窗時檢查)(js)
if (specAndAmount) {
	specAndAmount.addEventListener('show.bs.collapse', () => {
		
		var targetBtn = document.querySelectorAll('#addToCart, #buyNow, #btnOKCart, #btnOKBuy, #btnadditionalPurchaseBuy');
		var mobileMultiSpec = document.querySelector('#mobileMultiSpec');

		[].forEach.call(targetBtn, el => {
			el.disabled = true;
		});

		if (mobileMultiSpec) {

			console.log('#mobileMultiSpec exists!');
			isMultiSpecAllSelected();

		} else if ( isRadioChecked('#specAndAmount') ) {

			[].forEach.call(targetBtn, el => {
				el.disabled = false;
			});

		} else {
			//do nothing
		}


	});
}


//控制「加入購物車」、「直接購買」、「確定」按鈕的enable/disable狀態(開啟規格/數量視窗時檢查)(jquery)
/*$('#specAndAmount').on('show.bs.collapse', function(){
	
	$('#addToCart, #buyNow, #btnOKCart, #btnOKBuy, #btnadditionalPurchaseBuy').attr('disabled', true);

	if ($('#mobileMultiSpec')[0]) {
		console.log('#mobileMultiSpec exists!');
		isMultiSpecAllSelected();

	} else if(isRadioChecked('#specAndAmount')) {
		$('#addToCart, #buyNow, #btnOKCart, #btnOKBuy, #btnadditionalPurchaseBuy').attr('disabled', false);
	} else {
		//do nothing
	}

});*/


//控制「加入購物車」、「直接購買」、「確定」按鈕的enable/disable狀態(點選radio button時檢查)(js)
if (specAndAmount) {
	var inputRadioInSpecAndAmount = specAndAmount.querySelectorAll('input[type="radio"]');
	if (inputRadioInSpecAndAmount) {
		var targetBtn = document.querySelectorAll('#addToCart, #buyNow, #btnOKCart, #btnOKBuy, #btnadditionalPurchaseBuy');

		[].forEach.call(inputRadioInSpecAndAmount, el => {
			el.addEventListener('change', () => {
				if ( isRadioChecked('#specAndAmount') ) {
					[].forEach.call(targetBtn, ele => {
						ele.disabled = false;
					});
				}
			});
		});

	}	
}


//控制「加入購物車」、「直接購買」、「確定」按鈕的enable/disable狀態(點選radio button時檢查)(jquery)
// $("#specAndAmount input:radio").change(function(e){
// 	if(isRadioChecked('#specAndAmount')) {
// 		$('#addToCart, #buyNow, #btnOKCart, #btnOKBuy, #btnadditionalPurchaseBuy').attr('disabled', false);
// 	}
// });

//預設「加入購物車」、「直接購買」、「確定」按鈕為隱藏(js)
var defaultBtnToHide = document.querySelectorAll('#CartAndBuy, #OKCart, #OKBuy');
if (defaultBtnToHide) {
	[].forEach.call(defaultBtnToHide, el => {
		el.style.display = 'none';
		console.log('defaultBtnToHide done');
	});	
}
//預設「加入購物車」、「直接購買」、「確定」按鈕為隱藏(jquery)
// $('#CartAndBuy, #OKCart, #OKBuy').hide();




//點擊「選擇商品規格」則顯示「加入購物車」及「直接購買」 (js)
/*var toggleSpec = document.querySelector('#toggleSpec');
if (toggleSpec) {
	toggleSpec.addEventListener('click', () => {

	});
}*/

//點擊「選擇商品規格」則顯示「加入購物車」及「直接購買」 (jquery)
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

//加價購商品, 加入購物車動作之demo
var toggleSpecFromCartForDemoOnly = document.querySelector('#toggleSpecFromCartForDemoOnly');
if (toggleSpecFromCartForDemoOnly) {
	toggleSpecFromCartForDemoOnly.addEventListener('click', () => {
		setTimeout( () => {
			document.querySelector('#CartAndBuy').style.display = 'none';
			document.querySelector('#OKCart').style.display = 'block';
			document.querySelector('#btnOKCart').removeAttribute('onclick');
			document.querySelector('#btnOKCart').onclick = addToCartMobileForAdditionalBuy;
			document.querySelector('#OKBuy').style.display = 'none';
			document.querySelector('#specImg').innerHTML = '<img src="https://www.vivatv.com.tw/common/images/product/3008302021/1.jpg" class="img-fluid">';
			document.querySelector('#specName').innerText = '【亞緻餐飲】天香小食-精釀蝦肉燒賣 (25g*6) 1入';
			document.querySelector('#specPrice').innerHTML = '<div class="p-price lh-1 pe-2">435</div>';

			testItem = {
				id: '3008302021',
				name: '【亞緻餐飲】天香小食-精釀蝦肉燒賣 (25g*6) 1入',
				price: '435',
				quantity: 1,
				maxqty: 5,
				spec: '無',
				class: 'additional-purchase'
			};
		}, 100);
	});
}

var toggleSpecFromCart = document.querySelector('#toggleSpecFromCart');
if (toggleSpecFromCart) {
	toggleSpecFromCart.addEventListener('click', () => {
		setTimeout( () => {
			document.querySelector('#CartAndBuy').style.display = 'none';
			document.querySelector('#OKCart').style.display = 'block';
			document.querySelector('#OKBuy').style.display = 'none';
			document.querySelector('#specImg').innerHTML = '<img src="https://www.vivatv.com.tw/common/images/product/2986202021/1.jpg" class="img-fluid">';
			// document.querySelector('#specName').innerText = '【可夫萊精品堅果】雙活菌堅果穀粉(550g/罐)X1+雙活菌什錦堅果(200g/罐)X2';
			// document.querySelector('#specPrice').innerHTML = '<div class="p-price lh-1 pe-2">1040</div><div class="bg-discount lh-1 pe-2 px-2 py-2 text-white fs-7">85折</div><div class="px-2 py-1 m-1 rounded border fs-7">第二件起79折($968)</div>';
			testItem = {
				id: '2986202021',
				name: '【可夫萊精品堅果】雙活菌堅果穀粉(550g/罐)X1+雙活菌什錦堅果(200g/罐)X2',
				price: '1040',
				quantity: 1,
				maxqty: 5,
				spec: '無',
				class: ''
			};
		}, 100);
	});
}

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

//提示訊息(snackBar)(javascript)
function snackBar(id) {
	var target = document.querySelector(id);
	target.classList.add('show');

	setTimeout(function(){
		target.classList.remove('show');
	}, 2000);
}

//提示訊息(snackBar)(jquery)
// function snackBar(id) {
//   $(id).addClass('show');

//   setTimeout(function(){
//   	$(id).removeClass('show');
//   }, 2000);
// }



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
	$('html, body').animate({
	   scrollTop: 0
	}, function(){
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

function removeAdditionalPurchase(t) {
	var additionalPurchase = t.closest('.cart-item');
	// console.log(additionalPurchase);
	var aPID = additionalPurchase.getAttribute('item-id')
	console.log('aPID:'+aPID)

	let r = document.querySelector('#additionalBuy [item-id="'+aPID+'"]')

	r.classList.remove('limit-reached')
	r.style.opacity = 1
	r.querySelector('button').innerText = '加購'
	r.querySelector('button').style.pointerEvents = 'auto'
	r.querySelector('select').style.pointerEvents = 'auto'

	
	additionalPurchase.remove();
	snackBar('#cartRemoved'); //提示訊息

	updateCart();
}

//購物車刪除商品
function removeFromCart(t) {
	var cartItem = $(t).parents('.cart-item');
	// var cartItem = t.closest('.cart-item');
	console.log('cartItem:' + cartItem);

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

	
	$('main').css('min-height', minHeight);
	
}

$('#shoppingCart').on('shown.bs.modal', function(){
	updateCart();
	console.log('購物車開啟');
	updateTotal();
});



function updateCart() {
	
	var cartItemAmount = 0;
	var soldOutItemAmount = 0;

	if ( $('#shoppingCart .cart-item .form-select')[0] ) {
		$('#shoppingCart .cart-item .form-select').each(function(){			
				var n = $(this).val();
				cartItemAmount += parseInt(n);
		});
	} else {
		// cartItemAmount = $('#shoppingCart').find('.cart-item input[checked]').length;

	}

	if( $('#shoppingCart .soldout-item .form-select')[0] ) {
		$('#shoppingCart .soldout-item .form-select').each(function(){
			var m = $(this).val();
			soldOutItemAmount += parseInt(m);
		});
	}

	// console.log('cartItemAmount: '+cartItemAmount);

	
	

	

	updateTotal();
	
	

	if(cartItemAmount == 0) {
		// $('#topNav .cart-badge').html('');
		// $('#shoppingCart .modal-body, #shoppingCartList').html('<div id="cartEmpty" class="d-flex flex-column justify-content-center p-3 text-center mx-auto"><span class="feather icon-meh fs-1"></span><span class="fs-6">購物車是空的</span></div>');
		// $('#shoppingCart .modal-footer').html('<div class="d-flex flex-column w-100"><div class="d-flex"><button type="button" class="btn btn-danger rounded-pill w-100 m-1" data-bs-dismiss="modal">快去逛逛吧！</button></div></div>');
		
	} else {
		$('#cartEmpty').remove();
		var cartNotEmpty = 
					'<div class="d-flex flex-column w-100">'+
            '<div class="d-flex justify-content-between align-items-center p-2 fs-6">'+
            	'<div class="d-flex">'+
	              '<div class="d-flex align-items-center">'+
	                '<span>共</span>'+
	                '<span class="text-danger mx-2 fs-5" id="cartItemAmount"></span>'+
	                '<span>件商品</span>'+
	              '</div>'+
	              '<div id="ifSoldOut">'+
		              '<div class="d-flex align-items-center">'+
		                '<span>，</span>'+
		                '<span class="text-danger mx-2 fs-5" id="soldOutItemAmount"></span>'+
		                '<span>件已售完</span>'+
		              '</div>'+
	              '</div>'+
	            '</div>'+
              '<div class="d-flex align-items-center">'+
                '<span>合計</span>'+
                '<span class="p-price mx-1 fs-5" id="Total"></span>'+
              '</div>'+
            '</div>'+
            '<div class="d-flex justify-content-between flex-column">'+
              '<button type="button" class="btn btn-danger rounded-pill m-1" onclick="location.href=&quot;checkOut1.html&quot;">下一步</button>'+
              '<button type="button" class="btn btn-outline-secondary rounded-pill m-1" data-bs-dismiss="modal">繼續購物</button>'+
            '</div>'+
            '<div class="d-flex justify-content-center align-items-center p-1">提醒您：購物車資料保留15天</div>'+
          '</div>'
		$('#shoppingCart .modal-footer').html(cartNotEmpty);
	}

	var ifSoldOut = document.querySelector('#ifSoldOut');

	
	if (ifSoldOut) {
		if (soldOutItemAmount == 0) {
			ifSoldOut.style.display = 'none';
		} else {
			ifSoldOut.style.display = 'block';
		}	
	}
	

	$('#shoppingCart #cartItemAmount').html(cartItemAmount);
	$('#shoppingCart #soldOutItemAmount').html(soldOutItemAmount);
	
	(cartItemAmount != 0) ? $('#topNav .cart-badge').html(cartItemAmount) : '';
	
	// console.log('cartItemAmount: ' + cartItemAmount);
	updateTotal();


	console.log('cartItemAmount:'+ cartItemAmount)

	var mains = document.querySelectorAll('#shoppingCartList > .cart-item')
	var subs = document.querySelectorAll('.additional-purchase-wrapper .cart-item')
	var quota = document.querySelector('#additionalBuyQuota')

	if (mains && subs && quota) {
		quota.innerText = mains.length * 3 - subs.length

		if (quota.innerText == 0) {
			// document.querySelector('#swpAdditionalBuyInCheckout').style.opacity = 0.5
		}
	}
	


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


function ifHasChild() {

	var additionalPurchaseWrapper = document.querySelectorAll('.additional-purchase-wrapper');

	[].forEach.call(additionalPurchaseWrapper, (el) => {
		if (el.querySelector('.additional-purchase')) {
			el.closest('.cart-item').classList.add('has-child');
		} else {
			el.closest('.cart-item').classList.remove('has-child');
		}
	});
	
	
}

function updateTotal() {

	updateCoupon();
	var total = 0;

	// $('#shoppingCart .cart-item .p-isprice').each(function(){
	// 	total += parseInt($(this).html());
	// });

	

	var $checkedCheckBox = $('#shoppingCart .cart-item input[name="selectProductForCheckOut"]:checked');



	if ($checkedCheckBox.length) {



		ifHasChild();

		$checkedCheckBox.each(function(){
			// console.log('$checkedCheckBox.checked:'+ $checkedCheckBox.checked);
			
				if ($(this).closest('.cart-item').attr('data-second-discount') == 'true') {
					var subtotal = $(this).closest('.cart-item').find('.subtotal-second-discount').html();
				} else {
					var subtotal = $(this).closest('.cart-item').find('.subtotal').html();
				}

				
				



				// console.log('subtotal:'+subtotal);
				total += parseInt(subtotal);
			

			
		});
	} else {
		$('#shoppingCart .cart-item .subtotal').each(function(){
			total += parseInt($(this).html());
			// console.log('total:' + total);
		});
	}
	
	// console.log('$checkedCheckBox.length:'+$checkedCheckBox.length);
	
	if ($checkedCheckBox) {
		$('#cartItemAmount, #cartItemAmountTop').html($checkedCheckBox.length);
	}
	
	if ($checkedCheckBox.length == 0) {
		total = 0;
		$('#selectAllProduct').attr('checked', false);
	}


	$('#shoppingCart #Total, #Total2').html(total);

	var c = parseInt($('#couponSelectAmount').html());
	$('#Total3').html( total - c );

	checkIfSameProductExists();

	// console.log('total updated');
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
	class: ''
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

//加價購加入購物車(結帳流程中)
function addToCartMobileForAdditionalBuy(t) {
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
  '<div class="d-flex flex-column flex-xl-row px-3 py-0 p-xl-3 cart-item col additional-purchase item-visible">'+
    '<div class="d-flex align-items-start align-items-xl-center ps-1 pe-3">'+
      '<input class="form-check-input large-checkbox" type="checkbox" name="selectProductForCheckOut" id="selectProductForCheckOut-2-1" checked>'+
    '</div>'+
    '<div class="d-flex flex-column flex-xl-row justify-content-between flex-fill">'+
      '<div class="d-flex">'+
        '<div class="col-2 col-xl-1"><a href="productPage.html"><img src="https://www.vivatv.com.tw/common/images/product/3008302021/1.jpg" class="img-fluid"></a></div>'+
        '<div class="d-flex ps-md-2 col-9 col-xl-11">'+
          '<div class="d-flex flex-column justify-content-between">'+
            '<div class="px-2 pb-1 p-name-1">【亞緻餐飲】天香小食-精釀蝦肉燒賣 (25g*6) 1入</div>'+
            '<div class="d-flex px-2">規格：<span>無</span></div>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div class="d-flex flex-wrap justify-content-between align-items-center col-xl-6">'+
        '<div class="d-flex align-items-center select-quantity" data-price="435">'+
          '<div class="d-flex me-2 me-xl-4">'+
            '<div class="input-group">'+
              '<label class="input-group-text fs-7">數量</label>'+
              '<select class="form-select fs-7">'+
                '<option value="1" selected>1</option>'+
              '</select>'+
            '</div>'+
          '</div>'+
          '<div class="d-flex"><span class="me-1">小計</span><span class="fs-6 p-price lh-1 pe-2 subtotal">435</span></div>'+
        '</div>'+
        '<div class="d-flex me-xl-2">'+
          '<div class="input-group">'+
            '<button class="btn pe-0" type="button" onclick="removeAdditionalPurchase(this);"><span class="feather icon-trash-2"></span></button>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>'+
  '</div>';

	

	$('#2948862020 .additional-purchase-wrapper').append(testItemDOM);

	updateCart();

	setTimeout(function(){
		$('.cart-item.item-invisible').toggleClass('item-invisible item-visible');
	}, 250);

	snackBar('#cartAdded');
	console.log('已加入購物車(Mobile)');

	return true;
}

//館長推薦加入購物車(結帳流程中)
function addToCartMobileForAdditionalPurchase(t) {
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
	'<div class="d-flex flex-column cart-item col">'+
    '<div class="d-flex flex-column p-3 flex-xl-row">'+
      '<div class="d-flex align-items-start align-items-xl-center ps-1 pe-3 mb-3 mb-xl-0">'+
        '<input class="form-check-input large-checkbox" type="checkbox" name="selectProductForCheckOut" id="selectProductForCheckOut-'+ testItem.id +'" checked>'+
      '</div>'+
      '<div class="d-flex flex-column flex-xl-row justify-content-between flex-fill">'+
        '<div class="d-flex mb-2 mb-xl-0">'+
          '<div class="col-3 col-xl-2"><a href="productPage.html"><img src="https://www.vivatv.com.tw/common/images/product/'+ testItem.id +'/1.jpg" class="img-fluid"></a></div>'+
          '<div class="d-flex ps-md-2">'+
            '<div class="d-flex flex-column justify-content-between">'+
              '<div class="px-2 pb-1 p-name-1">'+ testItem.name +'</div>'+
              '<div class="d-flex px-2">規格：<span>無</span></div>'+
              '<div class="d-flex flex-wrap align-items-center p-1 fs-6">'+
                '<div class="px-2 py-1 m-1 rounded border fs-7 text-danger border-danger">*本商品不適用任何購物優惠金</div>'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>'+
        '<div class="d-flex flex-wrap justify-content-between align-items-center col-xl-6 ps-xl-4">'+
          '<div class="d-flex align-items-center select-quantity" data-price="'+ testItem.price +'">'+
            '<div class="d-flex me-2 me-xl-4">'+
              '<div class="input-group">'+
                '<label class="input-group-text fs-7">數量</label>'+
                '<select class="form-select fs-7">'+
                  '<option value="1" selected>1</option>'+
                  '<option value="2">2</option>'+
                  '<option value="3">3</option>'+
                '</select>'+
              '</div>'+
            '</div>'+
            '<div class="d-flex"><span class="me-1">小計</span><span class="fs-6 p-price lh-1 pe-2 subtotal">'+ parseInt(testItem.quantity) * parseInt(testItem.price) +'</span></div>'+
          '</div>'+
          '<div class="d-flex me-xl-2">'+
            '<div class="input-group">'+
              '<button class="btn" type="button" onclick="toggleFav(this);"><span class="feather icon-heart"></span></button>'+
              '<button class="btn pe-0" type="button" onclick="removeFromCart(this);"><span class="feather icon-trash-2"></span></button>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>'+
    
    '<div class="d-flex flex-column ps-xl-5 additional-purchase-wrapper position-relative">'+
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

function findUnselected() {
	var invalidSelect = document.querySelector('#additionalBuy select:invalid').closest('.swiper-slide');
	
	var invalidSelectIndex = invalidSelect.getAttribute('aria-label').split(' / ')[0]
	invalidSelectIndex = parseInt(invalidSelectIndex) - 1
	console.log(invalidSelectIndex)
	swpAdditionalBuy.slideTo(invalidSelectIndex, 500, false)
}


//pc版加入購物車(一般商品)
function addToCartDesktop(t) {

	var addBuyForm = document.querySelector('#addBuyForm');
	
	if (!addBuyForm.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
        alert('請選擇加購商品規格')
        
        findUnselected()
        // alertIndex = findUnselected();
        // swpAdditionalBuy.slideTo(alertIndex, 500, false);
    } 
	else if ( !isRadioChecked('#desktopSpec') ) {
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

	addBuyForm.classList.add('was-validated')
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




//線上留言(訪客模式): 檢查所有欄位是否填寫 (js)
function guestMessageCheck() {
	var returnTextarea = document.querySelector('#returnTextarea');
	var guestName = document.querySelector('#guestName');
	var guestPhone = document.querySelector('#guestPhone');
	var guestEmail = document.querySelector('#guestEmail');
	
	var textareaReminderModal = new bootstrap.Modal(document.querySelector('#textareaReminderModal'));
	var submitSuccessModal = new bootstrap.Modal(document.querySelector('#submitSuccessModal'));

	if (returnTextarea.value.trim().length < 1 ||
		guestName.value.trim().length < 1 ||
		guestPhone.value.trim().length < 1 ||
		guestEmail.value.trim().length < 1 ||
		guestEmail.validity.valid == false ) {

		textareaReminderModal.show();
	} else {
		submitSuccessModal.show();
	}
}

//線上留言(會員模式): 檢查問題內容是否填寫 (js)
function memberMessageCheck() {
	var returnTextarea = document.querySelector('#returnTextarea');
	
	var textareaReminderModal = new bootstrap.Modal(document.querySelector('#textareaReminderModal'));
	var submitSuccessModal = new bootstrap.Modal(document.querySelector('#submitSuccessModal'));

	if (returnTextarea.value.trim().length < 1) {
		textareaReminderModal.show();
	} else {
		submitSuccessModal.show();
	}
}





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
$('#orderAccordion input[data-second-target]').on('change', function(){
	var v = $(this).attr('data-second-target');
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
	var nuAreaNum = $('input[name=recentAddressRadio]:checked').attr('data-area-num');
	var nuTel = $('input[name=recentAddressRadio]:checked').attr('data-tel');
	var nuPhone = $('input[name=recentAddressRadio]:checked').attr('data-phone');
	var nuCity1 = $('input[name=recentAddressRadio]:checked').attr('data-city-1');
	var nuCity2 = $('input[name=recentAddressRadio]:checked').attr('data-city-2');
	var nuAddress = $('input[name=recentAddressRadio]:checked').attr('data-address');

	var dataFrom = $('#recentAddressList').attr('data-from');

	if (dataFrom == 'goods') {
		$('#selectedName').html(nuName);
		$('#selectedPhone').html(nuPhone);
		$('#selectedTel').html(nuAreaNum + nuTel);
		$('#selectedAddress').html(nuCity1 + nuCity2 + nuAddress);	
	} else if (dataFrom == 'invoice') {
		$('#selectedInvoiceName').html(nuName);
		$('#selectedInvoicePhone').html(nuPhone);
		$('#selectedInvoiceTel').html(nuAreaNum + nuTel);
		$('#selectedInvoiceAddress').html(nuCity1 + nuCity2 + nuAddress);
	} else {
		//do nothing
	}

	
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

	var nuName = $('input[name=recentAddressRadio]:checked').attr('data-name');
	var nuAreaNum = $('input[name=recentAddressRadio]:checked').attr('data-area-num');
	var nuTel = $('input[name=recentAddressRadio]:checked').attr('data-tel');
	var nuPhone = $('input[name=recentAddressRadio]:checked').attr('data-phone');
	var nuCity1 = $('input[name=recentAddressRadio]:checked').attr('data-city-1');
	var nuCity2 = $('input[name=recentAddressRadio]:checked').attr('data-city-2');
	var nuAddress = $('input[name=recentAddressRadio]:checked').attr('data-address');

	$('#selectedInvoiceName').html(nuName);
	$('#selectedInvoicePhone').html(nuPhone);
	$('#selectedInvoiceTel').html(nuAreaNum + nuTel);
	$('#selectedInvoiceAddress').html(nuCity1 + nuCity2 + nuAddress);

	// var nuName = $('input[name=invoiceAddressRadio]:checked').attr('data-name');
	// var nuTel = $('input[name=invoiceAddressRadio]:checked').attr('data-tel');
	// var nuPhone = $('input[name=invoiceAddressRadio]:checked').attr('data-phone');
	// var nuAddress = $('input[name=invoiceAddressRadio]:checked').attr('data-address');

	// $('#selectedInvoiceName').html(nuName);
	// $('#selectedInvoicePhone').html(nuPhone);
	// $('#selectedInvoiceTel').html(nuTel);
	// $('#selectedInvoiceAddress').html(nuAddress);
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

$('#messagePolicyCheckbox').on('change', function(){
	if ( !$(this).is(":checked") ) {
		$('#disagreePolicyModal').modal('show');
		// $(this).prop('checked', true);
	}
});

$('#disagreePolicyModal').on('hide.bs.modal', function() {
	$('#messagePolicyCheckbox').prop('checked', true);
});







// $('#defaultNote').on('change', function(){
// 	var value = $(this).val();
// 	if ( value == '4' ) {
// 		$('#defaultNoteInput').attr('disabled', false);
// 	} else {
// 		$('#defaultNoteInput').attr('disabled', true);
// 	}
// });

// $('#newNote').on('change', function(){
// 	var value = $(this).val();
// 	if ( value == '其他' ) {
// 		$('#newNoteInput').attr('disabled', false);
// 	} else {
// 		$('#newNoteInput').attr('disabled', true);
// 	}
// });

// $('#specifiedNote').on('change', function(){
// 	var value = $(this).val();
// 	if ( value == '4' ) {
// 		$('#specifiedNoteInput').attr('disabled', false);
// 	} else {
// 		$('#specifiedNoteInput').attr('disabled', true);
// 	}
// });

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
                	console.log('image loaded');
                }
            } else {

            	let child = entry.target.children[0];
            	console.log('child: '+ child);
            	child.src = src;

            	console.log('data-src: ' + src);
            	console.log(entry.target.children);
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
const options2 = {
	rootMargin: '-95px 0px -50% 0px',
	// rootMargin: '0px',
	threshold: [0, 1]
}



const observer2 = new IntersectionObserver(changeNav, options2);

// target the elements to be observed
const flagships = document.querySelectorAll('.flagship-type');
flagships.forEach((flagship) => {
	observer2.observe(flagship);
});






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
  }

  var scrollto = top - offset;
  scrollto = scrollto - offset2;

  var vw = window.innerWidth;

  if (vw >= 1200) {
  	scrollto = scrollto - 57;
  	
  }

  //一定要有body, 否則舊版ios不會有作用
  $('html, body').animate({scrollTop: scrollto}, 'fast');

});





var stickyObserver = new IntersectionObserver(function(entries) {
	if(entries[0].intersectionRatio === 0)
		document.querySelector("#stickyTarget").classList.add("stuck");
	else if(entries[0].intersectionRatio === 1)
		document.querySelector("#stickyTarget").classList.remove("stuck");
}, { threshold: [0,1] });

if ($('.sticky-observer-top').length) {
	stickyObserver.observe(document.querySelector(".sticky-observer-top"));
}