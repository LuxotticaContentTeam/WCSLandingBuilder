var opsm = window.opsm || {};

opsm.MyAccount = opsm.MyAccount || {};

/*autoexecute*/
(function (window, document, $, opsm) {

	$(document).ready(function () {

		if($('#myaccount-area #comm-pref-contents').length) {
			opsm.MyAccount.CommPref.init();
		}

		if($('#myaccount-area #addressBookContents').length>0) {
			opsm.MyAccount.AddressBook.initData();
			opsm.MyAccount.AddressBook.initUI();
		}
		if($('#myaccount-area #payment-contents').length>0) {
			opsm.MyAccount.Payments.initData();
			opsm.MyAccount.Payments.initUI();
		}
		if($('#purchase-list').length>0) {
			opsm.MyAccount.Purchases.initData();
			opsm.MyAccount.Purchases.initUI();
		}
		if($('#myaccount-area #fav-stores-contents').length>0) {

//			setTimeout(function(){
				opsm.MyAccount.FavStores.init();
//			}, 120);
		}

		if($('.my-account-eye-tests').length > 0){
			opsm.MyAccount.EyeTestHistory.initData();
			opsm.MyAccount.EyeTestHistory.initUI();
		}

		if($('.my-account-prescriptions').length > 0){
			opsm.MyAccount.Prescriptions.initData();
			opsm.MyAccount.Prescriptions.initUI();
		}

		if($('#myaccount-area #my-account-details-personal').length > 0){
			opsm.MyAccount.addValidators();
			opsm.MyAccount.Details.init();
		}


	});

}(window, document, jQuery, opsm));

opsm.MyAccount = {
		addValidators: function(){
			$.validator.addMethod("dateValid", function(value, element) {
				var tmpdate = $('#dob').val();
				tmpdate = tmpdate.split("/");
				tmpdate = tmpdate[2] + "-" + tmpdate[1] + "-" + tmpdate[0];
				var timestamp = Date.parse(tmpdate);

				if (isNaN(timestamp) == true) {
					return false;
				} else{
					return true;
				}
			}, "Please enter a valid date." );

			$.validator.addMethod("datePast", function(value, element) {
				var tmpdate = $('#dob').val();
				tmpdate = tmpdate.split("/");
				tmpdate = tmpdate[2] + "-" + tmpdate[1] + "-" + tmpdate[0];
				var timestamp = Date.parse(tmpdate);
				var datenow = Date.parse(new Date());
				return  (timestamp <= datenow);

			}, "Please enter a Past date." );


			$.validator.addMethod("dateRange", function(value, element) {
				var tmpdate = $('#dob').val();
				tmpdate = tmpdate.split("/");
				return tmpdate[2] >= new Date().getFullYear() - 114;

			}, "Please enter a date between " + (new Date().getFullYear() - 114) + " and " + new Date().getFullYear());
			jQuery.validator.addMethod(
					"mobileAustralia",
					function(value, element) {

						if (this.optional(element) && value === "") {
							return true;
						}
						var country=$('#mobile').data('country');
						var pattern = '';
						var patternTrue = false;
						if(country != ''){
							if(country==='AU'){
								pattern = /^04[0-9]{2}\s?[0-9]{3}\s?[0-9]{3}$/;
								if(pattern.test(value) == true){
									patternTrue = true;
								}
							}else if(country==='NZ'){
								pattern1 = /^0[0-9]{1}\s?[0-9]{3}\s?[0-9]{4}$/;
								pattern2 = /^0[0-9]{2}\s?[0-9]{3}\s?[0-9]{4}$/;
								pattern3 = /^0[0-9]{3}\s?[0-9]{3}\s?[0-9]{3}$/;
								pattern4 = /^0[0-9]{2}\s?[0-9]{4}\s?[0-9]{4}$/;
								pattern5 = /^0[0-9]{2}\s?[0-9]{3}\s?[0-9]{3}$/;
								if(pattern1.test(value) == true || pattern2.test(value) == true || pattern3.test(value) == true || pattern4.test(value) == true || pattern5.test(value) == true){
									patternTrue = true;
								}
							}
						}
						return patternTrue;
					},
					$("#mobile").length>0 ? $("#mobile").data("errors").required : ''
			);

		}
}

opsm.MyAccount.Details = {

		init: function() {

			$( "#dob" ).datepicker( "option", "disabled", true );

			$("form#data-confirmation").validate({
				rules : {
					"mobilePhone1" : {
						mobileAustralia : true
					},
					"dob" : {
						dateValid: true,
						datePast: true,
						dateRange : true
					},
//					"details-flybuys" : {
//						validateFlybuy:true
//					}
				},
				messages : {
					"firstName" : {required: $("#first-name").data("errors").required},
					"lastName" : {required: $("#last-name").data("errors").required},
					"dob" : {required: "Please enter a valid date of birth."}
				},

				onfocusout : function(element) {
					setByValidator = false;
					$(element).valid();
					//OOC-2910 start
//					if($('.input-date .is-error').length == 0){
//						$('.input-date-error').addClass('hide');
//					}
					//OOC-2910 end
				},
				onkeyup : false,
				errorClass : "error invalid-feedback",
				errorPlacement: function(error, element) {
					error.appendTo(element.closest(".opsm-form-group"));
					setByValidator = true;
				},
//				errorPlacement: function(error, element) {
//
//					//console.log(error);
//
//					if(error[0].htmlFor==="birth_date"){
//						$('.input-date-error').removeClass('hide');
//						$('.input-date-error label:eq(0)').removeClass('hide');
//						setByValidator = true;
//
//					}else if(error[0].htmlFor==="birth_month"){
//						$('.input-date-error').removeClass('hide');
//						$('.input-date-error label:eq(1)').removeClass('hide');
//						setByValidator = true;
//
//					}else if(error[0].htmlFor==="birth_year"){
//						$('.input-date-error').removeClass('hide');
//						$('.input-date-error label:eq(2)').removeClass('hide').html( "Please enter a value between " +(new Date().getFullYear() - 114) + " and " + (new Date().getFullYear())+" for the year.");
//						setByValidator = true;
//
//					}
//					else{
//						error.appendTo(element.closest(".input-group"));
//					}
//				},
				invalidHandler: function(event, validator) {
					AjaxOverlay.triggerOverlay('hide');
					$(this).find('.opsm-form-group.error:first').find('input[required="required"]').select();
					$(this).find('.opsm-form-group.error:first').find('input[required="required"]').focus();
				},
				highlight : function(element) {
					jQuery(element).closest('.opsm-form-group').addClass('error');
				},
				unhighlight : function(element) {
					jQuery(element).closest('.opsm-form-group').removeClass('error');
				},
				submitHandler: function(form) {
					var tmpdate = $('#dob').val();
					tmpdate = tmpdate.split("/");
					$('#dateOfBirth').val(tmpdate[2] + "-" + tmpdate[1] + "-" + tmpdate[0]);
					AjaxOverlay.triggerOverlay('show');
					form.submit();
				}
			});

		}
}

opsm.MyAccount.CommPref = {

		init: function() {
			$(".select-all").off("click").on("click",'.select-all', function(e){
				$(this).parents('form').find('input[type="checkbox"]').attr("checked", "checked").trigger("change");
			});
			// phone and message checkbox toggle
			$("#email-option, #dm-option, #text-option, #call-option").on("change", function() {
				$("#no-promo").removeAttr("checked");
				if($(this).is(":checked")){
					$('.check_value').each(function(){
						$(this).val('1');
					});
				}
				else{
					var flag = false;
					$('.select-all').find('input[type="checkbox"]').each(function(){
						if($(this).is(':checked')){
							flag = true;
						}
					});
					if(flag == false){
						$('.check_value').each(function(){
							$(this).val('');
						});
					}
				}
			});
//			$("#promo-how-sms, #promo-how-phone").on("change", function() {
//				var phoneField = $(this).closest("form").find('input[type="tel"]').closest(".input-group");
//				if ($("#promo-how-sms").is(":checked") || $("#promo-how-phone").is(":checked")) {
//					phoneField.show();
//				} else {
//					phoneField.hide();
//				}
//			});
			$("#no-promo").on("change", function() {
				if ($("#no-promo").is(":checked")) {
					$(this).closest("form").find('.select-all input[type="checkbox"]').removeAttr("checked");
					//$(this).closest("form").find('input[type="tel"]').closest(".input-group").hide();
					$('.check_value').each(function(){
						$(this).val('');
					});
				}
			});

//			jQuery.validator.addMethod(
//					"mobileAustralia",
//					function(value, element) {
//
//						if (this.optional(element) && value === "") {
//							return true;
//						}
//						var country=$('.countryCode').val();
//						var pattern = '';
//						var patternTrue = false;
//						if(country != ''){
//							if(country==='AU'){
//								pattern = /^04[0-9]{2}\s?[0-9]{3}\s?[0-9]{3}$/;
//								if(pattern.test(value) == true){
//									patternTrue = true;
//								}
//							}else if(country==='NZ'){
//								pattern1 = /^0[0-9]{1}\s?[0-9]{3}\s?[0-9]{4}$/;
//								pattern2 = /^0[0-9]{2}\s?[0-9]{3}\s?[0-9]{4}$/;
//								pattern3 = /^0[0-9]{3}\s?[0-9]{3}\s?[0-9]{3}$/;
//								pattern4 = /^0[0-9]{2}\s?[0-9]{4}\s?[0-9]{4}$/;
//								pattern5 = /^0[0-9]{3}\s?[0-9]{3}\s?[0-9]{3}$/;
//								if(pattern1.test(value) == true || pattern2.test(value) == true || pattern3.test(value) == true || pattern4.test(value) == true || pattern5.test(value) == true ){
//									patternTrue = true;
//								}
//							}
//						}
//						return patternTrue;
//					},
//					$("#mobilePhone1").length>0 ? $("#mobilePhone1").data("errors").required : 0
//				 );
//
//			$('.my-account-details-promo form:visible').validate({
//				 rules : {
//				 	"mobilePhone1" : {
//						mobileAustralia : true
//			 		}
//				},
//				messages : {
//					"mobilePhone1" : $("#mobilePhone1").length>0 ? $("#mobilePhone1").data("errors").required : ''
//				},
//				onfocusout : function(element) {
//					$(element).valid();
//				},
//				onkeyup : false,
//				onkeydown : function(element) {
//					$(element).valid();
//				},
//				errorClass : "input-error",
//				errorPlacement: function(error, element) {
//					error.appendTo(element.closest(".input-group"));
//				},
//				invalidHandler: function(event, validator) {
//					$(this).find('.input-group.is-error:first').find('input[required="required"]').select();
//					$(this).find('.input-group.is-error:first').find('input[required="required"]').focus();
//				},
//				highlight : function(element) {
//					if ($(element).parents(".input-date").length) {
//						$(element).parent().addClass("is-error");
//						return;
//					}
//					$(element).closest(".input-group").addClass("is-error");
//				},
//				unhighlight : function(element) {
//					if ($(element).parents(".input-date").length) {
//						$(element).parent().removeClass("is-error");
//						return;
//					}
//					$(element).closest(".input-group").removeClass("is-error");
//				}
//			 });
		}
}
opsm.MyAccount.FavStores = {

		openDetailStore : function(ev,idx) {

		      let dataShow = window.favStoreList;
		      dataShow.forEach(function (store, index) {
		        if (store.id -1 === idx) {
		          $(".modal a.modal-bet").attr("href", favStoreList[idx].url);
		          $("#store-name").html(store.nameStreet);
		          $("#store-address").html(store.address);
		          $("#store-tel .value").html(store.tel);
		          $("#store-fax .value").html(store.fax);
		          $("#store-openGmap,#store-openGmapMob").attr("href", 'https://www.google.com/maps/search/?api=1&query=' + store.nameStreet + '+' + store.address);
		          const hours = store.openingHours.map(function (hour) {
		            return '<li><span class="label">' + hour.day + '</span><span class="value">' + hour.time + '</span></li>';
		          });
		          const slides = store.slidesStore.map(function (slide) {
		            return '<div class="opsm-slideshow--slide-item"><img src="' + slide.pic + '"/></div>';
		          });
		          $("#store-openinghours").html(hours);
		          $("#store-screenmap img").attr("src", 'https://maps.googleapis.com/maps/api/staticmap?center=' + store.lat + ',' + store.lng + '&zoom=15&size=640x300&key=' + opsm.core.getGoogleMapsApiKey() + '&maptype=roadmap&format=jpg&visual_refresh=true&markers=icon:' + absoluteURL + imageDirectoryPath + 'images/icons/icon_marker.png|' + store.lat + ',' + store.lng);
		          $("#store-slideshow .opsm-slideshow--slide").html(slides);
		          const slideshowSingle = $('.opsm-slideshow--slide[data-slide-type="storedetail"]');
		          slideshowSingle.not('.slick-initialized').slick({
		            slidesToShow: 1,
		            slidesToScroll: 1,
		            infinite: true,
		            dots: true
		          });
		          $("#opsm-modal-detailstore").modal();
		          $("#opsm-modal-detailstore").on("hidden.bs.modal", function () {
		            slideshowSingle.slick("unslick");
		          });
		        }
		      });

		  },

		init: function() {
//			if($('.store-entry-make-default .visit-at-store').length) {
//				$('.store-entry-make-default .visit-at-store').on('click', function(){
//					window.location.href = $(this).attr('href');
//				});
//			}

//			if($('.select-store--item [id^=openstoredetail]')) {
//				$('.select-store--item [id^=openstoredetail]').off("click")
//				.on("click", function(e, id){
//					openDetailStore(e, $(this).parents('.select-store--item').data('index'));
					//Utils.openDetailStore(e, window.favStoreList[id]);
//				});
//			}
//			$(document).off("click",".select-store--item [id^=openstoredetail]")
//				.on("click", ".select-store--item [id^=openstoredetail]",  function(e, id){
//					$this = $(e.target);
//					const idx = $this.parents('.select-store--item').data('index');
//					opsm.MyAccount.FavStores.openDetailStore(e, idx);
//
//				});




//			if($('.select-store--item')) {
//			$('.select-store--item').off("click")
//			.on("click", function(e){

			$(document).on("click", ".select-store--item [id^=openstoredetail]",  function(e, id){
				e.stopPropagation();
				e.stopImmediatePropagation();
				$this = $(e.target);
				const idx = $this.parents('.select-store--item').data('index');
				opsm.MyAccount.FavStores.openDetailStore(e, idx);

			});
			$(document).on("click touchstart",'a.fav-store-remove', function(e){
				e.preventDefault();
				e.stopPropagation();
				e.stopImmediatePropagation();
				$this = $(this);
				const URL = $this.attr("href");
				const idx = $this.closest('.select-store--item').data('index');

				var params = {};
				params['langId']=$('input#langId').val();
				params['catalogId']=$('input#catalogId').val();
				params['storeId']=$('input#storeId').val();
				params['forwardView']=$('input#forwardView').val();
				params['isDeleteStore']=true;
				params['isPreferredStore']=window.favStoreList[idx].isPref;
				params['storeLocId']=window.favStoreList[idx].storeId;

				AjaxOverlay.triggerOverlay('show');

				$.ajax({
					url: 'PreferredStoreUpdateCmd',
					type: "POST",
					data:params,
					success: function(e){
						AjaxOverlay.triggerOverlay('hide');
						favStoreList.splice(idx,1);
						favStoreList.forEach(function (store, index) {
							if(index>=idx){
								store.id = store.id-1;
							}
						});
						mapStore.handleFavoriteStore();
					    var firstName=$('#firstName').val();
						strMsg = "Thanks "+firstName+", your store has been removed successfully.";
						opsm.utils.showAlertSuccess(strMsg);
					},
					error: function(e){
						AjaxOverlay.triggerOverlay('hide');
						opsm.utils.showAlertError("Some problem occurred removing store. Try again later");
					}
				});

			});
			$(document).on("click",'.select-store--item', function(e){
				var $this = $(this);
				const idx = $this.data('index');
				const store = window.favStoreList[idx];
				//const storeLocId = window.favStoreList[idx].;
				const lngCur = $this.data('lng');
				const latCur = $this.data('lat');
				var disabled=$this.attr('disabled');

				if(disabled){
					//mapStore.mapInstance.panTo(new google.maps.LatLng(latCur, lngCur));
				    //mapStore.setMarkerColor(latCur,lngCur, idx);
				}
				//if(!disabled && actionType==="isUpdateStore"){
				else {
					AjaxOverlay.triggerOverlay('show');
					var params = {};
					params['langId']=$('input#langId').val();
					params['catalogId']=$('input#catalogId').val();
					params['storeId']=$('input#storeId').val();
					params['forwardView']=$('input#forwardView').val();
					params['isUpdateStore']=true;
					params['isPreferredStore']=window.favStoreList[idx].isPref;
					params['storeLocId']=window.favStoreList[idx].storeId;

					$.ajax({
						url:"PreferredStoreUpdateCmd",
						type: "POST",
						data: params,
						success: function(e){
							AjaxOverlay.triggerOverlay('hide');
//							$('.select-store--item[disabled]').removeClass('select-store--item--selected');
//							$('.select-store--item[disabled]').removeAttr('disabled');
							$('.select-store--item').removeClass('select-store--item--selected');
							$('.select-store--item').removeAttr('disabled');
							$this.addClass("select-store--item--selected");
							$this.attr('disabled','');

							//riordinare l'array
//							var current = $(".my-account-stores button.store-entry-make-default[disabled]");
//							.attr('data-number')
//
//							//strMsg = $('input#updatedFavStore').val();
							var firstName=$('#firstName').val();
							strMsg = "Thanks "+firstName+", we have saved your default store successfully.";
							opsm.utils.showAlertSuccess(strMsg);
//							$('html,body').animate({ scrollTop:0 });
						},
						error: function(e){
							AjaxOverlay.triggerOverlay('hide');
//							const that = $('.select-store--item[disabled]');
							//reset view
//							$this.removeClass('select-store--item--selected');
//							$this.removeAttr('disabled');

					        //restore favourite
//					        that.addClass("select-store--item--selected");
//							that.attr('disabled');
//					        mapStore.setMarkerColor(that.data('lat'), that.data('lng'), that.data('index'));
//					        mapStore.initMarker(store, idx);
					        opsm.utils.showAlertError("Some problem occurred saving your default store. Try again later");
						}
					});

				}

			});



//			$(".my-account-stores").on("click", "button.store-entry-make-default", function() {
//				var title = $(this).attr("title");
//				var $this = $(this);
//				var actionType=$(this).data('attribute');
//
//				var params = {};
//				params['langId']=$this.closest('section').find('#langId').val();
//				params['storeLocId']=$this.closest('section').find('#storeLocId').val();
//				params['catalogId']=$this.closest('section').find('#catalogId').val();
//				params['storeId']=$this.closest('section').find('#storeId').val();
//				params['isPreferredStore']=$this.closest('section').find('#isPreferredStore').val();
//				params['forwardView']=$this.closest('section').find('#forwardView').val();
//				params['isUpdateStore']=true;
//
//
//				if(actionType==="isUpdateStore"){
//					$.ajax({
//						url:"PreferredStoreUpdateCmd",
//						type: "POST",
//						data: params,
//						success: function(e){
//
//							var current = $(".my-account-stores button.store-entry-make-default[disabled]");
//							if(typeof current === 'undefined'){
//								current = $('.area section').not($this.parents('.flip-container-inner').find('section')).get(0);
//								if(typeof current === 'undefined'){
//									current = current.find(".my-account-stores button.store-entry-make-default[disabled]");
//								}
//							}
//							$('.is-fav').removeClass('is-fav');
//							$this.siblings('h3').addClass('is-fav');
//							if(typeof current.siblings('h3').attr('data-number') === 'undefined' ){
//								current.siblings('h3').attr('data-number','1');
//							}
//							$this.attr({
//								"disabled" : "disabled",
//								"title" : current.attr("title")
//							});
//							current.attr("title", title).removeAttr("disabled");
//							var firstName=$('#firstName').val();
//							strMsg = "Thanks "+firstName+", we have saved your default store successfully.";
//							$('#global-message').find("h2").html(strMsg);
//							//$('#global-message').attr("class", type);
//							$('#global-message').css("display","");
//							$('#global-message .inner').css("top","0");
//							opsm.utils.initGlobalMessageRemovalOld();
//							$('html,body').animate({ scrollTop:0 });
//						},
//						error: function(e){
//
//						}
//					});
//
//				}
//
//
//
//
//			});

		}
}

opsm.MyAccount.Payments =  {
		placeholder : "e.g. 0000 0000 0000 0000",
		placeholderAmex : "e.g. 0000 000000 00000",
		initUI: function(){
			_this = this;
//			$("#cc_number").off('copy paste').on('copy paste',function(e){e.preventDefault();});

			$("#cc_number").off('input').on('input',function(e){
				e.preventDefault();
				$this=$(this); //input field
				//insert spaces
				cnum = $this.val().replace(/[^0-9]/g, "");
				cnum = cnum.replace(/ /g, "");
				switch ($('#cc_brand').val()) {
					case '001':
					case '002':
						cnum = cnum.replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/,'');
						$this.val(cnum);
						break;
					//amex
					case '003':
						cnum = cnum.replace(/(\d{10})/, '$1 ').replace(/(^\s+|\s+$)/,'');
						cnum = cnum.replace(/(\d{4})/, '$1 ').replace(/(^\s+|\s+$)/,'');
						$this.val(cnum);
						break;
				}
			});
		},
		initData: function(){
			const _this = this;
			$('#cc_default').change(function(){
				if($(this).is(':checked'))
					   $(this).val(1);
					else
					   $(this).val(0);
			});

			var selected = ""; //no valid option selected on load
			$('#cc_number').attr("disabled","disabled");

			$("#credit-card-type").on("change",function(){
//				selected = $(this).children("option:selected").val();
				selected = $(this).val();
				$('form#payment-options-form')[0].reset();
				if(selected!=="-") {
					$('#cc_number').removeAttr("disabled");
				}
				else {
					$('#cc_number').attr("disabled","disabled");
					$("#cc_number").attr('placeholder', '');
				}

				if(selected == 'mastercard'){
		    		$('#cc_brand').val('002');
		    		$("#cc_number").attr('placeholder', _this.placeholder);
		    		$("#cc_number").attr('maxlength', 19);
		    	}else if(selected == 'visa'){
		    		$('#cc_brand').val('001');
		    		$("#cc_number").attr('placeholder', _this.placeholder);
		    		$("#cc_number").attr('maxlength', 19);
		    	}else if(selected == 'amex'){
		    		$('#cc_brand').val('003');
		    		$("#cc_number").attr('placeholder', _this.placeholderAmex);
		    		$("#cc_number").attr('maxlength', 17);
		    	}
			});





//			$("#cc_number").on("keyup",function(){
//				$(this).validateCreditCard(ccf_validation, {
//			          accept: ["" + selected]
//			      });
//			});
			if($('#payment-options-form').length){
			$('#payment-options-form:visible').validate({
				rules : {
//					"credit-card-type":{
//					    required: true,
//					    notEqualTo: "-"
//					},
					"cc_number":{
					    creditcard: true
					},
					"cc_cvv" :{
					    minlength:(function () {
						//if($('#cc_cvv').closest('.input-cc').hasClass('is-amex'))
					    if(selected=='amex')
						{
						if (($('#cc_cvv').val().replace(/[^a-z0-9\s]/gi, '').length < 4)) {
										return 5;
									} else {
										return 0;
									}
						}else{
						if (($('#cc_cvv').val().replace(/[^a-z0-9\s]/gi, '').length < 3)) {
										return 5;
									} else {
										return 0;
									}
						}
						})

					}
				},
				messages : {
					"cc_name" : $("#cc_name").data("errors").required,
					"cc_number":$("#cc_number").data("errors").required,
//					"credit-card-type" : "Please select",
					//"card_expire_month":{required: $("#card_expire_month").data("errors").required, ccValidate: $("#card_expire_month").data("errors").invalid},
					"cc_cvv" : { required:$("#cc_cvv").data("errors").required, minlength:"Please fill credit card security code"},
//					"billingAddress":$("#billingAddress").length>0 ? $("#billingAddress").data("errors").required : "",
//					"user_first_name":$("#user_first_name").data("errors").required,
//					"user_last_name":$("#user_last_name").data("errors").required,
//					"bill_to_street1":$("#bill_to_street1").data("errors").required,
//					"bill_to_city":$("#bill_to_city").data("errors").required,
//					"bill_to_state":$("#bill_to_state").data("errors").required,
//					"bill_to_postal_code":$("#bill_to_postal_code").data("errors").required,
//					"ab_label":$("#ab_label").data("errors").required,
//					"addressSuggest1":$("#addressSuggest1").data("errors").required,
//					"addressSuggest_account":$("#addressSuggest_account").data("errors").required
				},
				onfocusout : function(element) {
					$(element).valid();
				},
				onkeyup : false,
				onkeydown : function(element) {
					$(element).valid();
				},
				errorClass : "error invalid-feedback",
				errorPlacement: function(error, element) {
					error.appendTo(element.closest(".opsm-form-group"));
					/** ooc-1481 **/
//					if(error[0].htmlFor==="bill_to_street1"){
//						$('#bill_to_street2').css('border','none');
//						$('#bill_to_street2').closest(".opsm-form-group").find('.input-error').css('top','-40px');
//					}
				},
				invalidHandler: function(event, validator) {
					AjaxOverlay.triggerOverlay('hide');
					$(this).find('.opsm-form-group.error:first').find('input[required="required"]').select();
					$(this).find('.opsm-form-group.error:first').find('input[required="required"]').focus();
				},
				highlight : function(element) {
					jQuery(element).closest('.opsm-form-group').addClass('error');
				},
				unhighlight : function(element) {
					jQuery(element).closest('.opsm-form-group').removeClass('error');
				}
			});
			}

			$('#payment-options-form').submit(function(e){
				e.preventDefault();


//				var country = $('#country').val() || '';
//				if(country == 'AU' || country == 'NZ'){
//					var town_str = $('#addressSuggest1').val();
//					var billingAddressCity = $('#addressSuggest_account').val();
//					var billingAddressState = $('#addressSuggest_state').val();
//					var billingAddressPostcode = $('#addressSuggest_postcode').val();
//					add_arr = town_str.split(',');
//					//console.log(add_arr);
//					$('#bill_to_city').val(billingAddressCity);
//					$('#bill_to_state').val(billingAddressState);
//					$('#bill_to_postal_code').val(billingAddressPostcode);
//				}
				// $('#payment-options-form .input-major-error').hide();
//				$('#payment-options-form:visible').validate();

				var isCaptchaInPage = !!window.grecaptcha;
				
				if(
						( $('#payment-options-form:visible').valid() && !isCaptchaInPage ) ||
						( $('#payment-options-form:visible').valid() && isCaptchaInPage && grecaptcha.getResponse() != '' )
				){

					 if (isCaptchaInPage) {
						 var usrToken = grecaptcha.getResponse();
						 $('#usrToken').val(usrToken);
					 }
					
					 var targetURL = $("#payment-options-form").attr("action");
					 var data=$(this).serialize();
					 AjaxOverlay.triggerOverlay('show');
							  $.ajax({
								  type: "POST",
								  url: targetURL,
								  data: data,
								  //dataType: "text/html;charset=UTF-8",
								  success: function(result){
									  //success can be for errors too, so hide overlay insude success callback
								  		var responseData = result;
													if(result.indexOf("ERROR_MESSAGE") != -1){
														AjaxOverlay.triggerOverlay('hide');
														var errorMsg,
															errObj = jQuery.parseJSON(result);
														$.each(errObj, function(key,val){
														    if(key == "RequestProperties"){
														    	errorMsg = val.ERROR_MESSAGE;
														    }
														});
														var errorHTML = "";
														if(errorMsg === '_ERR_NICKNAME_ALREDY_EXIST'){
															// $('#nicknameError').show();
															opsm.utils.showAlertError($('#myGeneralError').val());
														}else{
															opsm.utils.showAlertError($('#myGeneralError').val());
														}
														return false;
													} else {
														//don't remove overlay untill forward page has loaded
														window.location =$('#walletProcessURL').val()+"";
													}
								  	},
								  	error: function(){
								  		AjaxOverlay.triggerOverlay('hide');
								  		opsm.utils.showAlertError($('#myGeneralError').val());
								  	}
							  	});
				}else{

				}
			});

			if($('#cc_default').length) {
				$('#cc_default').change(function(){
					if($(this).is(':checked'))
						   $(this).val(1);
						else
						   $(this).val(0);
				});
			}

			if($(".my-account-payment-add-card #cc_number").length) {
				$("#cc_number").attr("type","tel");
			}
			if($(".my-account-payment-add-card #card_expire_month").length) {
				$("#card_expire_month").attr("type","tel");
			}
			if($(".my-account-payment-add-card #cc_cvv").length) {
				$("#cc_cvv").attr("type","tel");
			}

//			if($(".my-account-payment-add-card").length) {
//				$("#card_expire_month").focusout(function() {
//					var today = new Date();
//				    var startDate = new Date(today.getFullYear(),today.getMonth(),1,0,0,0,0);
//
//				    // Initialize End/Expiry date i.e. adding 10 years to expire
//				    var futureLimitDate= new Date(today.getFullYear()+20,today.getMonth(),1,0,0,0,0);
//				    var expDate = $("#card_expire_month").val();
//				    var expYearCheck='';
//				    var expDateArr=expDate.split('/');
//				});
//			}

			$('.open-deletecard').on("click", function(e){
				allFronts = $('.opsm-front-side:hidden');
				allBacks = $('.opsm-back-side:visible');
				allBacks.hide();
				allFronts.fadeIn();

				$delete = $(this);
				front = $delete.closest('.opsm-front-side');
				back = $delete.closest('.single-card').find('.opsm-back-side');

				front.hide();
				back.fadeIn();
				back.on('click', '.cancel-remove-address, .confirm-remove-address', function () {
			        back.hide();
			        front.fadeIn();
			    });
			});

			if($(".opsm-back-side").length){
				$(".confirm-remove-address").on("click", function(e) {
					e.preventDefault();
					if (typeof ($(this).data("removeurl")) !== "undefined") {
						$this = $(this);
						AjaxOverlay.triggerOverlay('show');
	                    $.ajax({
	                        url: $(this).data("removeurl"),
	                        success: function(result) {
	                        	AjaxOverlay.triggerOverlay('hide');
	                            if ($.parseJSON(result)) {
	                                if ($.parseJSON(result).RequestProperties.IS_SUCCESS == true) {
	                                	$this.parents(".single-card").remove();
	                                	opsm.utils.showAlertSuccess($.parseJSON(result).RequestProperties.STATUS_MESSAGE);

	                                } else {
	                                	opsm.utils.showAlertError($.parseJSON(result).RequestProperties.ERROR_MESSAGE);

	                                }
	                            }
	                        },
	                        error: function(xhr, ajaxOptions, thrownError) {
	                        	AjaxOverlay.triggerOverlay('hide');
	                        }
	                    });
	                }
				});
			}

			//class disable is to show the logo not default
			if($('a.opsm-def-card.disabled:not(".expired")').length){
				$('a.opsm-def-card.disabled').not('.expired').on("click", function(e) {
					e.preventDefault();
					AjaxOverlay.triggerOverlay('show');
					var dataUrl=$(this).data('url');
					var title = $(this).attr("title");
					var status="";
					$this=$(this);
					$.getJSON(dataUrl,function(responseData){
						var responseObj =(responseData);
						AjaxOverlay.triggerOverlay('hide');
						if( typeof responseObj.RequestProperties != 'undefined' && typeof responseObj.RequestProperties.STATUS_MESSAGE !== 'undefined'){
							opsm.utils.showAlertSuccess(responseObj.RequestProperties.STATUS_MESSAGE);
							$('a.opsm-def-card').addClass('disabled').closest('div.opsm-bordered-active').removeClass('opsm-bordered-active');
							$this.removeClass("disabled");
							$this.closest('.single-card').find('.opsm-bordered-fluid-div').addClass('opsm-bordered-active');
						}
						if( typeof responseObj.RequestProperties != 'undefined' && typeof responseObj.RequestProperties.ERROR_MESSAGE !== 'undefined'){
							opsm.utils.showAlertError(responseObj.RequestProperties.ERROR_MESSAGE);
						}
	    		  	});
				});
			}
		}
}

opsm.MyAccount.Purchases = {
		initUI: function() {

		},
		initData: function() {
			if ($('#purchase-list').length > 0) {
				$('#purchase-list').on('click', '.re-order-btn', function(evt){
					evt.preventDefault();
					if($(this).data('type')=='RX'){
						$('#re-order-modal #cl-ro').addClass('d-none');
						$('#re-order-modal #rx-ro').removeClass('d-none');
					} else if($(this).data('type')=='CL'){
						$('#re-order-modal #rx-ro').addClass('d-none');
						$('#re-order-modal #cl-ro').removeClass('d-none');
					}
				});

				resetPage('allTime');

				$('#btn-show-more-purch').on('click', function(){
					$('.hidden-purchase-row').not('.filtered').removeClass('d-none');
					$('.showmore').addClass('d-none');
				});

				$('.order-button').on('click', function(){
					$('#date-option-text').html($(this).html());
					resetPage($(this).attr('id'));
				})


				function resetPage(toRange) {

					var counter = 0;

					$('.order-date').each(function(){

							var parsedDate = $(this).val().split("/");
							var orderDate = new Date(parsedDate[2], parsedDate[1]-1, parsedDate[0]);

							var limitDate = new Date(0);

							switch (toRange) {
								case 'button30Days':
										limitDate = new Date();
										limitDate.setDate(limitDate.getDate() - 30);
										break;
								case 'button60Days':
										limitDate = new Date();
										limitDate.setDate(limitDate.getDate() - 60);
										break;
								case 'button180Days':
										limitDate = new Date();
										limitDate.setDate(limitDate.getDate() - 180);
										break;
								case 'button365Days':
										limitDate = new Date();
										limitDate.setDate(limitDate.getDate() - 365);
										break;
								case 'allTime':
										limitDate = new Date(0);
										break;
							}

							if (orderDate < limitDate) {
								$(this).parents('.per-order-row').addClass('filtered');
							}
							else {
								$(this).parents('.per-order-row').removeClass('filtered');
								counter += 1;
							}

						});

					$('#orderNumber').html(counter + " " + (counter == 1 ? 'order': 'orders'));

					resetShowMore();
				}

				function resetShowMore() {
					$('.per-order-row').addClass('d-none');
					var counter = 0;
					$('.per-order-row').each(function() {
							if ($(this).hasClass('filtered') == false) {
								counter += 1;
								if (counter > 5) {
									$(this).addClass('hidden-purchase-row')
								}
								else {
									$(this).removeClass('d-none');
								}
							}
					});

					if (counter > 5) {
							$('.showmore').removeClass('d-none');
					}
					else {
							$('.showmore').addClass('d-none');
					}
				}

			};
		}
}



opsm.MyAccount.EyeTestHistory = {
		initUI: function() {
		},
		initData: function() {
			
			if($(this).data('item-id')===""){
				
				$('#data-content-form').html($('#no-data-content').html());
				$('#eye-test-details-modal').show();
				
			} else {
				$(".details-btn").on("click", function(e) {
					
					var recordId = $(this).data('item-id');
					
					$('#details-body').html();
					// Set store name
					var storeNameText = $('#overviewStoreName-'+recordId).val();
					$('#storeNameText').html(storeNameText);
					// Set optometrist name
					var optometristName = $('#overviewOptometrist-'+recordId).val();
					$('#optometristName').html(optometristName);
					// Set appt date
					var apptDate =  $('#overviewDate-'+recordId).val();
					$('#apptDate').html(apptDate);
					// Set appt time
					var apptTime =  $('#overviewTime-'+recordId).val();
					$('#apptTime').html(apptTime);
					
					
					$("#storeNameText-modal .value").html(storeNameText);
	        		$("#optometristName-modal .value").html(optometristName);
	        		$("#apptDate-modal .value").html(apptDate);
	        		$("#apptTime-modal .value").html(apptTime);
	        		
					$("#eye-test-details-modal").show();
					
					//$('.eye-test-list').children('.is-open').removeClass('is-open').addClass('is-closed').find('.eye-test-details').slideUp('fast');
//					var params = {};
//					params['orderId']=$(this).data('item-id');
//					params['storeId']=$('#storeId').val();
//					params['catalogId']=$('#catalogId').val();
//					params['langId']=$('#langId').val();
//					params['recordId']=$(this).closest('.eyerecord').children('#recordId').val();
//					params['frompage']=$('#frompage').val();
	
//					if($(this).data('item-id')===""){
//						$('#data-content-form').html($('#no-data-content').html());
//						$('#eye-test-details-modal').show();
//					}else{
	
//						$.ajax({
//							type: "POST",
//							url: "OPSMOrderDetailsCmd",
//							data: params,
//							cache:false,
//							async:false,
//							success: function(data){
//								/** on success * */
//								$('#details-body').html(data);
//								/*opsm.eyeTests.init(); ?? not me event?*/
	
//								// Set store name
//								var storeNameText = $('overview-storeName').html();
//								$('#storeNameText').html(storeNameText);
	
//								// Set optometrist name
//								var optometristName = $('overview-optometrist').html();
//								$('#optometristName').html(optometristName);
	
//								// Set appt date
//								var apptDate = $('overview-date').html();
//								$('#apptDate').html(apptDate);
	
//								// Set appt time
//								var apptTime = $('overview-time').html();
//								$('#apptTime').html(apptTime);
	
	
//								$("#eye-test-details-modal").show();
//							}
//						});
//					};
				});
			}
         $(".save-changes").on("click", function(e) {
				e.preventDefault();
                $("#eye-test-details-modal").hide();
         });
        }

}



opsm.MyAccount.AddressBook =  {
		updateBillingAddressCountryDD: function(){
		  if ($("select#country").length) {
			$("select#country").change(function() {
				if ($(this).val() === "AU" || $(this).val() === "NZ") {
					$("#addressSuggest1").closest(".opsm-form-group").show();
					$("#addressSuggest-updateAddress,#addressSuggest_state_updateAddress,#addressSuggest_postcode_updateAddress").closest(".opsm-form-group").show();
					$("#bill_to_city, #bill_to_state, #bill_to_postal_code").closest(".opsm-form-group").hide();
					$('#addressSuggest-updateAddress').val("");
					$('#addressSuggest_state_updateAddress').val("");
					$('#addressSuggest_postcode_updateAddress').val("");
					$('#city').val("");
					$('#state').val("");
					$('#zipCode').val("");
					$("#countryAddressSuggest").val($(this).val());
				} else {
					$("#addressSuggest1").closest(".opsm-form-group").hide();
					$("#addressSuggest-updateAddress,#addressSuggest_state_updateAddress,#addressSuggest_postcode_updateAddress").closest(".opsm-form-group").hide();
					$("#bill_to_city, #bill_to_state, #bill_to_postal_code").closest(".opsm-form-group").show();
					$('#bill_to_city').val("");
					$('#bill_to_state').val("");
					$('#bill_to_postal_code').val("");
				}
			});
		  }
		},
//		autocompl: function(el) {
//			el.autocomplete({
//				//fetch the address data
//				source: getAddressDataBilling,
//				// This function is executed when a suggestion is selected
//				select: setSelectedValue,
//				// This function is executed when the users focuses on a item with the mouse
//				// or keyboard
//				focus: setSelectedValue,
//
//				open : function(){
//					$(".ui-autocomplete:visible").css({top:"+=1",left:"+=20",width:"-=40"});
//					$(".ui-autocomplete").css({"max-height":"14.5em","overflow-y":"auto"});
//		    	}
//
//			}).data("uiAutocomplete")._renderItem = renderAddressValue;
//		},
		initUI: function(){

		},
		initData: function(){

			if ($(".my-account-details-address-book-edit").length) {
//				if($('.ie8').length == 0){
//					if($('#addressSuggest1').length > 0){
//						if($('#addressSuggest1').val().indexOf('  ') > -1){
//							$('#addressSuggest1').val($('#addressSuggest1').val().replace(/  /g, ' '));
//						}
//					}
//				}
				var autoCom = $('#addressSuggest1').val();
				if(typeof(autoCom) != "undefined"){
					$('#addressSuggest1').autocomplete({

						//fetch the address data
						source: getAddressDataBilling,

						// This function is executed when a suggestion is selected
						select: setSelectedAccountValue,
						// This function is executed when the users focuses on a item with the mouse
						// or keyboard
						focus: setSelectedAccountValue,

						open : function(){
							$(".ui-autocomplete:visible").css({top:"+=1",left:"+=20",width:"-=40"});
							$(".ui-autocomplete").css({"max-height":"14.5em","overflow-y":"auto"});
				    	}

					}).data("uiAutocomplete")._renderItem = renderAddressValue;
				}

				if($('#addressSuggest-updateAddress').length){
					  $("#addressSuggest-updateAddress").autocomplete({
				        source: getAddressData,
				        select: setSelectedUpdateAccountValue, //AU or NZ distinguish
				        focus: setSelectedUpdateAccountValue,
				        open: function() {
				            $(".ui-autocomplete:visible").css({
				                top: "+=1",
				                width: "-=20"
				            });
				            $(".ui-autocomplete").css({
				                "max-height": "14.5em",
				                "overflow-y": "auto"
				            });
				        }
				      }).data("uiAutocomplete")._renderItem = renderAccountAddressValue;
				}

				//fix can be a billing address(different country)
				//shown inputs bill_to_city, bill_to...
				$(".my-account-details-address-book-edit form").validate({
					/*rules : {
		    		"addressSuggest-Account":{
						regex: /^[^,]{1,50},\s?(.)*,\s?\d{2,6}$/
		    		}
					},*/
					messages : {
						"user_first_name" : $("#first-name").data("errors").required,
						"user_last_name" : $("#last-name").data("errors").required,
						"bill_to_street1" : $("#address").data("errors").required,
						"addressSuggest1": {
							required: $("#addressSuggest1").data("errors").required,
							regex: $("#addressSuggest1").data("errors").regex
						},
						"ab-label": $("#name-of-address").data("errors").required,
						"addressSuggest-updateAddress" : $("#addressSuggest1").data("errors").required
					},
					onfocusout : function(element) {
						$(element).valid();
					},
					onkeyup : false,
					onkeydown : function(element) {
						$(element).valid();
					},
					errorClass : "error invalid-feedback",
					errorPlacement: function(error, element) {
						error.appendTo(element.closest(".opsm-form-group"));
					},
					invalidHandler: function(event, validator) {
						AjaxOverlay.triggerOverlay('hide');
						$(this).find('.opsm-form-group.error:first').find('input[required="required"]').select();
						$(this).find('.opsm-form-group.error:first').find('input[required="required"]').focus();
					},
					highlight : function(element) {
						jQuery(element).closest('.opsm-form-group').addClass('error');
					},
					unhighlight : function(element) {
						jQuery(element).closest('.opsm-form-group').removeClass('error');
					},
					submitHandler: function(form) {
						if($('#city').val().length && $('#state').val().length && $('#zipCode').val().length){
							nick = $('input#name-of-address');
							if(!nick.val().length){
								nick.val($('input#address').val());
							}
							$('input[name="addressSuggest-updateAddress"]').val(opsm.utils.getContent($('#addressSuggest-updateAddress')));
							AjaxOverlay.triggerOverlay('show');
							form.submit();
						} else {
							$('input#addressSuggest1').val("");
						}
					}
				});
			}

			if($(".my-account-details-address-book-add").length > 0){
				//add address
				var autoCom = $('#addressSuggest1').val();
				if(typeof(autoCom) != "undefined"){
					$('#addressSuggest1').autocomplete({

						//fetch the address data
						source: getAddressDataBilling,

						// This function is executed when a suggestion is selected
						select: setSelectedValue,
						// This function is executed when the users focuses on a item with the mouse
						// or keyboard
						focus: setSelectedValue,

						open : function(){
							$(".ui-autocomplete:visible").css({top:"+=1",left:"+=20",width:"-=40"});
							$(".ui-autocomplete").css({"max-height":"14.5em","overflow-y":"auto"});
				    	}

					}).data("uiAutocomplete")._renderItem = renderAddressValue;
				}

				if($('#addressSuggest-Account').length){
					  $("#addressSuggest-Account").autocomplete({
				        source: getAddressData,
				        select: setSelectedAccountValue, //AU or NZ distinguish
				        focus: setSelectedAccountValue,
				        open: function() {
				            $(".ui-autocomplete:visible").css({
				                top: "+=1",
				                width: "-=20"
				            });
				            $(".ui-autocomplete").css({
				                "max-height": "14.5em",
				                "overflow-y": "auto"
				            });
				        }
				      }).data("uiAutocomplete")._renderItem = renderAccountAddressValue;
				}

// defined in autocomplete.js

//				if($('#addressSuggest').length){
//					$('#addressSuggest').autocomplete({
//
//						//fetch the address data
//						source: getAddressData,
//
//						// This function is executed when a suggestion is selected
//						select: setSelectedValue,
//						// This function is executed when the users focuses on a item with the mouse
//						// or keyboard
//						focus: setSelectedValue,
//
//						open : function(){
//							$(".ui-autocomplete:visible").css({top:"+=1",left:"+=20",width:"-=40"});
//							$(".ui-autocomplete").css({"max-height":"14.5em","overflow-y":"auto"});
//				    	}
//
//					}).data("uiAutocomplete")._renderItem = renderAddressValue;
//				}

				$(".make-delivery").each(function(){
					if(typeof($(this).attr("disabled")) == "undefined"){
						// $(this).attr("title", "Make this your default delivery address");
					}
					else{
						// $(this).attr("title", "This address is your default delivery address");
						// $('#delivery_add_hidden').val($(this).parents('section').attr('id'));
					}
				});
				$(".default-home").each(function(){
					if(typeof($(this).attr("disabled")) == "undefined"){
						// $(this).attr("title", "Make this your default contact address");
					}
					else{
						// $(this).attr("title", "This address is your default contact address");
						// $('#contact_add_hidden').val($(this).parents('section').attr('id'));
					}
				});

				$('#default-home').click(function(){
					if($(this).is(':checked')){
						$('.user_first_name').val($('#profileFirstName').val()).attr('disabled','disabled');
						$('.hidden_user_first_name').val($('#profileFirstName').val());
						$('.user_last_name').val($('#profileLastName').val()).attr('disabled','disabled');
						$('.hidden_user_last_name').val($('#profileLastName').val());
						//OOC-2699 start
						$("#first-name").valid();
						$("#last-name").valid();
						// $("label.input-error[for='user_first_name']").hide();
						// $("label.input-error[for='user_last_name']").hide();
						// $('.user_first_name').parents('.opsm-form-group required').removeClass('is-error');
						// $('.user_last_name').parents('.opsm-form-group required').removeClass('is-error');
						//OOC-2699 end
					}else{
						$('.user_first_name').val($('#profileFirstName').val()).removeAttr('disabled','disabled').focus();
						$('.user_last_name').val($('#profileLastName').val()).removeAttr('disabled','disabled');
					}
				});
				//OOC-2698 start
				if($('#default-home').prop("checked") == true){
					$('.user_first_name').attr("disabled", "disabled");
					$('.user_last_name').attr("disabled", "disabled");

					$("#first-name").valid();
					$("#last-name").valid();
					// $("label.input-error[for='user_first_name']").hide();
					// $("label.input-error[for='user_last_name']").hide();
					// $('.user_first_name').parents('.opsm-form-group required').removeClass('is-error');
					// $('.user_last_name').parents('.opsm-form-group required').removeClass('is-error');
				}
				//OOC-2698 end

				$.validator.addMethod(
				        "regex",
				        function(value, element, regexp) {
				            var re = new RegExp(regexp);
				            return this.optional(element) || re.test(value);
				        },
				        "Please check your input."
				);
				$(".my-account-details-address-book-add form").validate({
					/*rules : {
			    		"addressSuggest-Account":{
							regex: /^[^,]{1,50},\s?(.)*,\s?\d{2,6}$/
			    		}
					},*/
					messages : {
						"user_first_name" : $("#first-name").data("errors").required,
						"user_last_name" : $("#last-name").data("errors").required,
						"bill_to_street1" : $("#address").data("errors").required,
						"addressSuggest1": {
							required: $("#addressSuggest1").data("errors").required,
							regex: $("#addressSuggest1").data("errors").regex
						},
						"ab-label": $("#name-of-address").data("errors").required,
						"addressSuggest-Account" : $("#addressSuggest1").data("errors").required
					},
					onfocusout : function(element) {
						$(element).valid();
					},
					onkeyup : false,
					onkeydown : function(element) {
						$(element).valid();
					},
					errorClass : "error invalid-feedback",
					errorPlacement: function(error, element) {
						error.appendTo(element.closest(".opsm-form-group"));
					},
					invalidHandler: function(event, validator) {
						AjaxOverlay.triggerOverlay('hide');
						$(this).find('.opsm-form-group.error:first').find('input[required="required"]').select();
						$(this).find('.opsm-form-group.error:first').find('input[required="required"]').focus();
					},
					highlight : function(element) {
						jQuery(element).closest('.opsm-form-group').addClass('error');
					},
					unhighlight : function(element) {
						jQuery(element).closest('.opsm-form-group').removeClass('error');
					},
					submitHandler: function(form) {
						if($('#city').val().length && $('#state').val().length && $('#zipCode').val().length){
							nick = $('input#name-of-address');
							if(!nick.val().length){
								nick.val($('input#address').val());
							}
							$('input[name="addressSuggest-Account"]').val(opsm.utils.getContent($('#addressSuggest-Account')));
							AjaxOverlay.triggerOverlay('show');
							form.submit();
						} else {
							opsm.utils.setContent($('input#addressSuggest1'), "");
							form.valid();
						}
					}
				});
				$("#addressSave").off('click').on("click", function(e) {
					if($('#city').val().length && $('#state').val().length && $('#zipCode').val().length){
						e.preventDefault();
						$(".my-account-details-address-book-add form").submit();
					}else{
						opsm.utils.setContent($('input#addressSuggest1'), "");
						$('#addressSuggest-Account').focusout();
					}
				});
			}

			if($(".addBook-addCard").length){
//			  if($(".opsm-def-delivery")){
//				$(".opsm-def-delivery").on("click", function(){
//					if(typeof($(this).attr("disabled")) == "undefined"){
//						//Ajax call to set backend values
//						$.ajax({
//							url:$(this).attr("href"),
//							data: {user_type: 'R'},
//							success:function(result){
//								var responseObj;
//								try{
//									responseObj = $.parseJSON(result);
//								}
//								catch(exception){
//									responseObj = "";
//								}
//								if(typeof responseObj.RequestProperties !== 'undefined'){
//									if(typeof responseObj.RequestProperties.ERROR_MESSAGE !== 'undefined'){
//										if(typeof responseObj.RequestProperties.UPDATE_DELIVERY_ADDRESS_FAIL !== 'undefined'){
//											location.href=location.href + '&STATUS_MESSAGE=' + responseObj.RequestProperties.UPDATE_DELIVERY_ADDRESS_FAIL;
//										}
//									}
//									if(typeof responseObj.RequestProperties.UPDATE_DELIVERY_ADDRESS_SUCCESS!=='undefined'){
//										location.href=location.href + '&STATUS_MESSAGE=' + responseObj.RequestProperties.UPDATE_DELIVERY_ADDRESS_SUCCESS;
//									}
//								}else{
//
//								}
//							},
//							error: function (xhr, ajaxOptions, thrownError) {
//							}
//						});
//
//					}
//					else{
//					}
//				});
				$('.open-deleteaddress').on("click", function(e){
					allBacks = $('.opsm-back-side:visible');
					allFronts = $('.opsm-front-side:hidden');
					allBacks.hide();
					allFronts.fadeIn();

					$delete = $(this);
					front = $delete.closest('.opsm-front-side');
					back = $delete.closest('.addBook-addCard').find('.opsm-back-side')

					front.hide();
					back.fadeIn();
					back.on('click', '.cancel-remove-address, .confirm-remove-address', function () {
				        back.hide();
				        front.fadeIn();
				    });
				});

				$(".addBook-addCard").on("click", ".opsm-def-home, .opsm-def-delivery", function(e){
					e.preventDefault();
					$this = $(this);
					toUrl = $this.data("url");
					if(typeof($(this).attr("disabled")) == "undefined"){
						AjaxOverlay.triggerOverlay('show');
						//Ajax call to set backend values
						$.ajax({
							url: toUrl,
							data: {user_type: 'R'},
							success:function(result){
								AjaxOverlay.triggerOverlay('hide');
								//show message
								var responseObj;
								try{
									responseObj = $.parseJSON(result);
								}
								catch(exception){
									responseObj = "";
								}

								if(typeof responseObj.RequestProperties !== 'undefined'){
									if(typeof responseObj.RequestProperties.ERROR_MESSAGE !== 'undefined'){
										if(typeof responseObj.RequestProperties.UPDATE_CONTACT_ADDRESS_FAIL!=='undefined'){
											statusMsg = responseObj.RequestProperties.UPDATE_CONTACT_ADDRESS_FAIL;
											//location.href=location.href + '&STATUS_MESSAGE=' + responseObj.RequestProperties.UPDATE_CONTACT_ADDRESS_FAIL;
											opsm.utils.showAlertError(statusMsg);
										}
									}
									if(typeof responseObj.RequestProperties.UPDATE_DELIVERY_ADDRESS_SUCCESS !== 'undefined'){
										/*
										 * OPSMD Bug 3790 - Update the status for Addressbook in showAlertSuccess
										 */
										statusMsg = responseObj.RequestProperties.UPDATE_DELIVERY_ADDRESS_SUCCESS;

										//render action
										if($this.hasClass("opsm-def-home")) {
											$('.opsm-def-home').addClass("disabled").removeAttr("disabled");
											$this.removeClass("disabled").attr("disabled","");
											//manage existing div is-locked and add 'remove' cta
											addRemove = $this.closest('div.addBook-addCard>*').find(".opsm-front-side .opsm-bordered-body .open-deleteaddress");
											//addRemove = '<a class="open-deleteaddress strong pull-right"><span class="fa icon-close pr-2" style="font-size:.8rem"></span><span class="underline">Remove</span></a>';
											$('div.addBook-addCard .is-locked').removeClass("is-locked").parent()
											  .find(".opsm-front-side .opsm-bordered-body").append(addRemove);

											//set parent div is-locked and remove cta
											$this.closest('div.addBook-addCard>*').addClass("is-locked")
											  .find(".opsm-front-side .opsm-bordered-body .open-deleteaddress").remove();


										} else if($this.hasClass("opsm-def-delivery")) {
											$('.opsm-def-delivery').addClass("disabled").removeAttr("disabled");
											$this.removeClass("disabled").attr("disabled","");
										}
										opsm.utils.showAlertSuccess(statusMsg);
									}
								}
								else{
								}

							},
							error: function (xhr, ajaxOptions, thrownError) {
								AjaxOverlay.triggerOverlay('hide');
							}
						});
					}
					else{
					}
				});
			}

			if($(".opsm-back-card").length){
				$(".confirm-remove-address").on("click", function(e) {
					e.preventDefault();
					AjaxOverlay.triggerOverlay('show');
					//Ajax call to set backend values
					if(typeof($(this).data("url")) !== "undefined"){
						$this = $(this);
						$.ajax({
							url:$this.data("url"),
							success:function(result){
								AjaxOverlay.triggerOverlay('hide');
								var responseObj = $.parseJSON(result);
								if( typeof responseObj.RequestProperties != 'undefined' && typeof responseObj.RequestProperties.DEFAULT_ADDR !== 'undefined'){
								//	location.href=location.href + '&STATUS_MESSAGE=' + responseObj.RequestProperties.DEFAULT_ADDR;
								//	message = responseObj.RequestProperties.DEFAULT_ADDR; returns id of default address
								//	opsm.utils.showAlertInfo(message);
								}
								if(typeof responseObj.RequestProperties != 'undefined' && typeof responseObj.RequestProperties.REMOVE_ADDRESS_SUCCESS !== 'undefined'){
									$this.parents(".addBook-addCard").remove();
									//location.href=location.href + '&STATUS_MESSAGE=' + responseObj.RequestProperties.REMOVE_ADDRESS_SUCCESS;
									message = responseObj.RequestProperties.REMOVE_ADDRESS_SUCCESS;
									opsm.utils.showAlertSuccess(message);
								}
								if(typeof responseObj.RequestProperties != 'undefined' && typeof responseObj.RequestProperties.ERROR_MESSAGE !== 'undefined'){
									if( typeof responseObj.RequestProperties.REMOVE_ADDRESS_FAIL !== 'undefined'){
										// location.href=location.href + '&STATUS_MESSAGE=' + responseObj.RequestProperties.REMOVE_ADDRESS_FAIL;
										message = responseObj.RequestProperties.REMOVE_ADDRESS_FAIL;
										opsm.utils.showAlertError(message);
									}
								}
							},
							error: function (xhr, ajaxOptions, thrownError) {
								AjaxOverlay.triggerOverlay('hide');
							}
						});
					}
				});
				$('')
			  }
		}
}

opsm.MyAccount.Prescriptions = {
	initUI : function() {

	},
	initData: function() {
		if($('form#prescription-update').length){
			$('form#prescription-update').validate({
				ignore: '.d-none',
				onfocusout: function(element) { $(element).valid(); },
				rules: {
					'prescription-doe': {
						required: true,
						DateFormatByMYExpiryDate: true
					}
				},
				errorPlacement: function(error, element) {
					error.addClass('invalid-feedback');
					error.insertAfter(element.closest('.form-group'));
				},
				highlight: function(element, errorClass, validClass) {
					$(element).closest('.form-group').addClass(errorClass).removeClass(validClass);
				},
				unhighlight: function(element, errorClass, validClass) {
					$(element).closest('.form-group').removeClass(errorClass).addClass(validClass);
				},
				submitHandler: function(form, ev)  {
	                ev.preventDefault();
	                //split date
	                var monthYear = $("#prescription-doe", form).val().split("/");
					if (monthYear.length === 2) {
						var month = monthYear[0];
						var year = monthYear[1];
						if (!month || ! year) return false;
						$('#prescription-doe-month').val(month);
						$('#prescription-doe-year').val(year);
						form.submit();
					}
	                
	            }
			});
			
		}
		
		// Validation and functionality for prescription addition/options in Your Account section
		if($('.my-account-prescriptions-list').length > 0){
			if ($('#start-message').length > 0) {
				opsm.utils.showAlertInfo($('#start-message').html());
			}
			else if ($('#start-error').length > 0) {
				opsm.utils.showAlertInfo($('#start-error').html());
			}

			$('.prescription-wrapper .delete').on('click', function(e){
				e.preventDefault();

				var wrapperDiv = $(e.target).parents('.prescription-wrapper');
				var recordId = $(e.target).parents('.prescription-wrapper').find('#recordId').val();
				var articleType = $(e.target).parents('.prescription-wrapper').find('#articleType').val();

				var params = {};

				params['recordId'] = recordId;
				params['articleType'] = articleType;
				params['actionType'] = "DELETE";
				params['authToken'] = $('#WC_User_authToken').val();

				$.ajax({
					type: 'POST',
					url: 'PrescriptionManageCmd',
					data: params,
					dataType: 'json',
					success: function(data) {
						var err_code = data.ERROR_MESSAGE;

						if (err_code != undefined) {
							opsm.utils.showAlertError(err_code);
						}
						else {
							opsm.utils.showAlertInfo("Prescription deleted successfully");
							wrapperDiv.addClass('d-none');
						}
					},
					error: function(xhr, ajaxOptions, thrownError) {
						showAlertError("An error has occurred, please try again later.");
						console.log(thrownError);
					}
				});
			});

			$('.prescription-wrapper .notme').on('click', function(e){
				var params = {};
				var wrapperDiv = $(e.target).parents('.prescription-wrapper');

				params["MEMBER_ID"] = $(this).parents('.prescription-wrapper').find('.memberId').val();
				params["bpId"] = $(this).parents('.prescription-wrapper').find('.bpId').val();
				params["RECTYPE"] = $(this).parents('.prescription-wrapper').find('.recType').val();
				params["NOT_ME_BPID"] = $(this).parents('.prescription-wrapper').find('.notMeBpId').val();
				params["NOT_ME_NOTME_TYPE"] = $(this).parents('.prescription-wrapper').find('.dataType').val();
				params["ORD_PRES_VALUE"] = $(this).parents('.prescription-wrapper').find('.notMeRecord').val();
				params["NOT_ME_RECORDID"] = $(this).parents('.prescription-wrapper').find('.notMeRecord').val();


				$.ajax({
					type: "POST",
					url: "OPSMMarkOrder",
					data: params,
					cache:false,
					async:false,
					dataType: 'json',
					success: function(data){

							var err_code = data.ERROR_MESSAGE;
							if (err_code != undefined) {
								opsm.utils.showAlertError(err_code);

							} else if (data.RequestProperties.notMe == "Success") {
								opsm.utils.showAlertInfo("Prescription deleted successfully");
								wrapperDiv.addClass('d-none');
							}

					},
						error: function (xhr, ajaxOptions, thrownError) {
							showAlertError("An error has occurred, please try again later.");
							console.log(thrownError);
					}

				});

			});


		}

		if($('.my-account-prescriptions-add').length > 0){
			$(document).ready(function(){
				$('#glasses-od-sphere, #glasses-os-sphere, #glasses-od-cyl, #glasses-os-cyl').each(function(){
					//*
					Utils.moveDefaultOptionBefore($(this), '0.00');
					Utils.scrollToSelectedOptionOnOpen($(this));
					}, this);
				//showSelectOrDropdownOnly();
			});
			$('.input-prescription-type-option button').on('click', function(e){
				e.preventDefault();
				resetStep2Elements();
				if ($(e.target).is('#add_glasses')) {
					moveToStepAddGlasses();
				}
				else if ($(e.target).is('#add_cl')) {
					moveToStepAddContactLenses();
				}
			});

			$('.my-account-prescriptions-add .step2 .step-edit').on('click', function(){
				resetStep2Elements();
				moveToStep1();
			});

			var moveToStep2 = function() {
				$('.step1').addClass('d-none');
				$('.step2').removeClass('d-none');
				$('.final-step').removeClass('d-none');
			}

			var moveToStepAddGlasses = function() {
				$('#pr_type').val("glasses");
				$('.rx_form_cl').addClass('d-none');
				$('.rx_form_glasses').removeClass('d-none');
				$('.rx_form_glasses').find('select').removeClass('d-none');

				$('select#cl-brand').addClass('d-none');
				moveToStep2();
			}

			var moveToStepAddContactLenses = function() {
				$('#pr_type').val("cl");
				$('.rx_form_glasses').addClass('d-none');
				$('.rx_form_glasses').find('select').addClass('d-none');
				$('.rx_form_cl').removeClass('d-none');

				$('select#cl-brand').removeClass('d-none');
				moveToStep2();
			}

			var moveToStep1 = function() {
				$('.step2').addClass('d-none');
				$('.final-step').addClass('d-none');
				$('.step1').removeClass('d-none');
				resetStep2Elements();
				$(".my-account-prescriptions-add-eyes select").change();
			}

			var resetStep2Elements=function(){
				// CL
				$('#cl-product-same').val("yes");
				$(".my-account-prescriptions-add-eyes").removeClass("row");
				$(".right-section-CL").removeClass("col-sm-5");
				$(".left-section-CL").removeClass("col-sm-5");
				$('.different-cl-brand1').addClass('d-none');
				$('.different-cl-brand2').addClass('d-none');
				$('select#cl-brand2').addClass('d-none');

				$('select#cl-brand').addClass('d-none');
				$('.my-account-prescriptions-add-eyes .right-section-CL').html('');
				$('.my-account-prescriptions-add-eyes .left-section-CL').html('');

				$('#product-1').hide();
				$('#product-2').hide();
				$('#product-1-name').hide();
				$('#product-2-name').hide();
				$('#brand-2').hide();
				$('#cl-product-same-yes').prop('checked', true);
				$('.my-account-prescriptions-add-eyes .right-section-CL').html('');
				$('.my-account-prescriptions-add-eyes .left-section-CL').html('');
				$('.my-account-prescriptions-add-eyes .input-matrix-od').html('');
				$('.my-account-prescriptions-add-eyes .input-matrix-os').html('');
				$('#cl-product-1-name').val('');
				$('#cl-product-2-name').val('');
				$("#cl-product").val("0");
				$("#cl-brand").val("0");
				$("#cl-brand2").val("0");
				$('#product-1').val("0");
				$('#product-2').val("0");
				$("#cl-product").siblings('span.input-select').children().text('Please select your product');
				$("#cl-brand").siblings('span.input-select').children().text('Please select your brand');
				$("#cl-brand2").siblings('span.input-select').children().text('Please select your brand');

				// Glasses
				$('#glasses-od-sphere').val('0');
				$('#glasses-os-sphere').val('0');
				$('#glasses-od-cyl').val('0');
				$("#glasses-od-cyl option[value='0']").attr("selected", true);
				$('#glasses-os-cyl').val('0');
				$('#glasses-od-axis').val('0');
				$('#glasses-os-axis').val('0');
				$('#glasses-od-udprism').val('0');
				$('#glasses-od-udprism-dir').val('0');
				$('#glasses-os-udprism').val('0');
				$('#glasses-os-udprism-dir').val('0');
				$('#glasses-od-ioprism').val('0');
				$('#glasses-od-ioprism-dir').val('0');
				$('#glasses-os-ioprism').val('0');
				$('#glasses-os-ioprism-dir').val('0');
				$('#glasses-od-add').val('0');


			}

			/** * Radio button to select SAME and DIFFRENT products ** */
			$("#cl-product-same-yes").on("click", function() {
				if($("#cl-product-same-yes").is(':checked'))
				{
					$('#cl-product-same').val("yes");
					$('#right-product-no').val("");
					$('#left-product-no').val("");
					$('.my-account-prescriptions-add-eyes .input-matrix-od legend').show();
					$('.my-account-prescriptions-add-eyes .input-matrix-os legend').show();
					$('.different-cl-brand1').addClass('d-none');
					$('.different-cl-brand2').addClass('d-none');
					$('select#cl-brand2').addClass('d-none');
					$('select#cl-brand2').validate();
					$("#brand-2").hide();
					//OOC-2718
					$("label.input-error[for=cl-brand2]").hide();
					$("#product-1").hide();
					$("#product-2").hide();
					$("#product-1-name").hide();
					$("#product-2-name").hide();
					$(".my-account-prescriptions-add-eyes").hide();
					$(".input-matrix-od").hide();
					$(".input-matrix-os").hide();
					$("#cl-brand").val("0");
					$("#cl-brand2").val("0");
					$("#cl-brand").next('span.input-select').children().text('Please select your brand');
					$("#cl-brand2").siblings('span.input-select').children().text('Please select your brand');


					$(".my-account-prescriptions-add-eyes").removeClass("row");
					$(".right-section-CL").removeClass("col-sm-5");
					$(".left-section-CL").removeClass("col-sm-5");

				}
				else
				{
					$("#brand-2").show();
				}
			});
			$("#cl-product-same-no").on("click", function() {
				if($("#cl-product-same-no").is(':checked'))
				{
					$('#cl-product-same').val("no");
					$('#right-product-no').val("");
					$('#left-product-no').val("");
					$('.my-account-prescriptions-add-eyes .input-matrix-od legend').hide();
					$('.my-account-prescriptions-add-eyes .input-matrix-os legend').hide();
					$('.different-cl-brand1').removeClass('d-none');
					$('.different-cl-brand2').removeClass('d-none');
					$('select#cl-brand2').removeClass('d-none');
					$('.my-account-prescriptions-add-eyes').html("").append('<div class="right-section-CL"></div><div class="left-section-CL"></div>');
					$('.my-account-prescriptions-add-eyes .right-section-CL').html("");
					$('.my-account-prescriptions-add-eyes .left-section-CL').html("");
					$("#brand-2").show();
					$("#product-1").hide();
					$("#product-2").hide();
					$("#product-1-name").hide();
					$("#product-2-name").hide();
					$(".input-matrix-od").hide();
					$(".input-matrix-os").hide();
					$("#cl-product").val("0");
					$("#cl-product").siblings('span.input-select').children().text('Please select your product');
					$("#cl-brand").val("0");
					$("#cl-brand2").val("0");
					$("#cl-brand").siblings('span.input-select').children().text('Please select your brand');
					$("#cl-brand2").siblings('span.input-select').children().text('Please select your brand');


					$(".my-account-prescriptions-add-eyes").addClass("row");
					$(".right-section-CL").addClass("col-sm-5");
					$(".left-section-CL").addClass("col-sm-5");
				}
				else
				{
					$("#brand-2").hide();
				}
			});
			/** * End Radio button to select SAME and DIFFRENT ** */

			function SameProductBothEyesBrand(currentElement,selectionOption){
				//resetBrandProductErrors
				$('.rx_form_cl .left-wrapper .error.invalid-feedback').remove();
				showOverlay();
				$("#rx-next").attr("disabled", true);
				if($("#cl-product-same-yes").is(':checked')){
					if(selectionOption==="Ebrand"){
						$.ajax({
							url: "CLBrandsView",
							async: true,
							type: "POST",
							data: "manufacturer="+$("#cl-brand").val()+"&clCategoryId="+$('#clCategoryId').val(),
							success: function (responseData) {
								$("#product-1-name").hide();
								$('#cl-product').hide();
								$('#cl-product').html(responseData);
								$(".my-account-prescriptions-add-eyes select").hybridSelect();
								$("#cl-product").change();
								$("#rx-next").attr("disabled", false);
								$('select.hybridSelect').hybridSelect();
								$('#cl-product').show();
								$("#product-1").show();

								hideOverlay();

							},
							error: function (xhr, ajaxOptions, thrownError) {
								//showAlertError
								Genericcallbackerror();
								hideOverlay();
							}
						});
					}else if(selectionOption==="others"){
						$("#product-1").hide();
						$("#product-1-name").show();
						$.ajax({
							url: "OtherCLAttributesView",
							async: true,
							type: "POST",
							data: "CL=both",
							success: function (responseData) {
								$(".my-account-prescriptions-add-eyes").show();
								$(".input-matrix-od").show();
								$(".input-matrix-os").show();
								$('.my-account-prescriptions-add-eyes').html(responseData);

								$(".my-account-prescriptions-add-eyes select").hybridSelect();
								$("#rx-next").attr("disabled", false);
								hideOverlay();
								handleParticularSelect();

							},
							error: function (xhr, ajaxOptions, thrownError) {
								Genericcallbackerror();
								hideOverlay();
							}
						});
					}
				}
			}
			
			function handleParticularSelect() {
				$('#cl-od-power, #cl-os-power').each(function(){
					//*
					Utils.moveDefaultOptionBefore($(this), '0.00');
					Utils.scrollToSelectedOptionOnOpen($(this));
					}, this);
				//showSelectOrDropdownOnly();
			}

			function SameProductBothEyesProduct(currentElement,selectionOption){
				//resetBrandProductErrors
				$('.rx_form_cl .left-wrapper .error.invalid-feedback').remove();
				showOverlay();
				$("#rx-next").attr("disabled", true);
				if($("#cl-product-same-yes").is(':checked')){
					if(selectionOption==="Eproduct"){

						var productId=$('option:selected', currentElement).attr('data-productid');
						var partNumber=$('option:selected', currentElement).attr('data-partnumber');

						$.ajax({
							url: "CLAttributesView",
							async: true,
							type: "POST",
							data: "productId="+productId+"&partNumber="+partNumber+"&CL=both",
							success: function (responseData) {
								$(".my-account-prescriptions-add-eyes").show();
								$(".input-matrix-od").show();
								$(".input-matrix-os").show();
								$("#product-1-name").hide();
								$("#rx-next").attr("disabled", false);
								$('.my-account-prescriptions-add-eyes').html(responseData);
								$(".my-account-prescriptions-add-eyes select").hybridSelect();
								handleParticularSelect();
								hideOverlay();
							},
							error: function (xhr, ajaxOptions, thrownError) {
								Genericcallbackerror();
								hideOverlay();
							}
						});

					}else{
						$.ajax({
							url: "OtherCLAttributesView",
							async: true,
							type: "POST",
							data: "CL=both",
							success: function (responseData) {
								$("#product-1").show();
								$("#product-1-name").show();
								$('.my-account-prescriptions-add-eyes').show();
								$('.my-account-prescriptions-add-eyes').html(responseData);
								$(".my-account-prescriptions-add-eyes select").hybridSelect();
								$("#rx-next").attr("disabled", false);
								$('select.hybridSelect').hybridSelect();

								hideOverlay();
							},
							error: function (xhr, ajaxOptions, thrownError) {
								Genericcallbackerror();
								hideOverlay();
							}
						});
					}
				}

			}
			
			function resetHybridSelect (productIdName) {
				$(productIdName + ' > .input-input > .dropdown > button').remove();
				$(productIdName + ' > .input-input > .dropdown > div').remove();
				$(productIdName + ' > .input-input > .dropdown').removeClass('hybrid-select');
				var htmlSelect = $(productIdName + ' > .input-input > .dropdown').html();
				$(productIdName + ' > .input-input > .dropdown').remove();
				$(productIdName + ' > .input-input').html(htmlSelect);
				$(productIdName + ' > .input-input > .hybridSelect').removeAttr('aria-invalid');
				$(productIdName + ' > .input-input > .hybridSelect').html('');
			}

			function differentProductLeftNRightBrand(currentElement,selectionOption,selectionArea){
				showOverlay();
				if($("#cl-product-same-no").is(':checked')){
					if(selectionArea==='right'){
						//resetBrandProductErrors
						$('.rx_form_cl .left-wrapper .error.invalid-feedback').remove();
					} else {
						//resetBrandProductErrors
						$('.rx_form_cl .right-wrapper .error.invalid-feedback').remove();
					}

					if(selectionOption==="Ebrand"){
						$.ajax({
							url: "CLBrandsView",
							async: true,
							type: "POST",
							data: "manufacturer="+$(currentElement).val()+"&clCategoryId="+$('#clCategoryId').val(),
							success: function (responseData) {

								if(selectionArea==='right'){
									resetHybridSelect('#product-1');
									$('#cl-product').html(responseData);
									$('#cl-product').trigger('render.customSelect');
									$('#cl-product.hybridSelect').hybridSelect();
									$('#product-1-name').hide();
									$('#product-1').show();
									hideOverlay();
								}else{
									resetHybridSelect('#product-2');
									$('#cl-product2').html(responseData);
									$('#cl-product2').trigger('render.customSelect');
									$('#cl-product2.hybridSelect').hybridSelect();
									$('#product-2-name').hide();
									$('#product-2').show();
									hideOverlay();
								}

								$('.my-account-prescriptions-add-eyes .right-section-CL legend').hide();
								$('.my-account-prescriptions-add-eyes .left-section-CL legend').hide();
							},
							error: function (xhr, ajaxOptions, thrownError) {
								Genericcallbackerror();
								hideOverlay();
							}
						});

					}else if(selectionOption==="others"){
						$.ajax({
							url: "OtherCLAttributesView",
							async: true,
							type: "POST",
							data: "CL="+selectionArea,
							success: function (responseData) {
								$(".my-account-prescriptions-add-eyes").show();
								if(selectionArea==="right"){
									$("#product-1").hide();
									$("#product-1-name").show();
									$('.my-account-prescriptions-add-eyes .right-section-CL').html(responseData);
									hideOverlay();

									$(".my-account-prescriptions-add-eyes select").hybridSelect();
								}else{
									$("#product-2").hide();
									$("#product-2-name").show();
									$('.my-account-prescriptions-add-eyes .left-section-CL').html(responseData);
									hideOverlay();

									$(".my-account-prescriptions-add-eyes select").hybridSelect();
								}
								handleParticularSelect();
								$('.my-account-prescriptions-add-eyes .right-section-CL legend').hide();
								$('.my-account-prescriptions-add-eyes .left-section-CL legend').hide();
							},
							error: function (xhr, ajaxOptions, thrownError) {
								Genericcallbackerror();

							}
						});

					}
				}

			}


			function differentProductLeftNRightProduct(currentElement,selectionOption,selectionArea){
				showOverlay();
				if($("#cl-product-same-no").is(':checked')){
					if(selectionArea==='right'){
						//resetBrandProductErrors
						$('.rx_form_cl .left-wrapper .error.invalid-feedback').remove();
					} else {
						//resetBrandProductErrors
						$('.rx_form_cl .right-wrapper .error.invalid-feedback').remove();
					}

					if(selectionOption==="Eproduct"){
						var productId=$('option:selected', currentElement).attr('data-productid');
						var partNumber=$('option:selected', currentElement).attr('data-partnumber');

						$.ajax({
							url: "CLAttributesView",
							async: true,
							type: "POST",
							data: "productId="+productId+"&partNumber="+partNumber+"&CL="+selectionArea,
							success: function (responseData) {
								$(".my-account-prescriptions-add-eyes").show();
								if(selectionArea==="right"){
									$("#product-1-name").hide();
								$('.my-account-prescriptions-add-eyes .right-section-CL').html(responseData);
								$('#right-product-no').val(currentElement.find('option:selected').data('partnumber'));

								hideOverlay();
								}else{
									$("#product-2-name").hide();
									$('.my-account-prescriptions-add-eyes .left-section-CL').html(responseData);
									$('#left-product-no').val(currentElement.find('option:selected').data('partnumber'));

									hideOverlay();
								}

								$(".my-account-prescriptions-add-eyes select").hybridSelect();
								$('.my-account-prescriptions-add-eyes .right-section-CL legend').hide();
								$('.my-account-prescriptions-add-eyes .left-section-CL legend').hide();
								handleParticularSelect();
							},
							error: function (xhr, ajaxOptions, thrownError) {
								Genericcallbackerror();
							}
						});
					}else{
						$.ajax({
							url: "OtherCLAttributesView",
							async: true,
							type: "POST",
							data: "CL="+selectionArea,
							success: function (responseData) {
								$(".my-account-prescriptions-add-eyes").show();
								if(selectionArea==="right"){
									$("#product-1").show();
									$("#product-1-name").show();
									$('.my-account-prescriptions-add-eyes .right-section-CL').html(responseData);
									$('select.hybridSelect').hybridSelect();
								hideOverlay();
								}else{
									$("#product-2").show();
									$("#product-2-name").show();
									$('.my-account-prescriptions-add-eyes .left-section-CL').html(responseData);
									$('select.hybridSelect').hybridSelect();
									hideOverlay();
								}
								$(".my-account-prescriptions-add-eyes select").hybridSelect();
								handleParticularSelect();
								$('.my-account-prescriptions-add-eyes .right-section-CL legend').hide();
								$('.my-account-prescriptions-add-eyes .left-section-CL legend').hide();

							},
							error: function (xhr, ajaxOptions, thrownError) {
								Genericcallbackerror();
							}
						});

					}
				}
			}

			/** ** same product call function *** */

			/** brand selection * */
			$("#cl-brand").on("change", function() {
			if($("#cl-product-same-yes").is(':checked')){
				var SelectedOption=$(this).val();
				$('.cl_step2 .my-account-prescriptions-add-eyes .input-matrix-od').html("");
				$('.cl_step2 .my-account-prescriptions-add-eyes .input-matrix-os').html("");
				if(SelectedOption==="0"){
					$("#product-1-name").hide();
					$("#product-1").hide();
					$(".input-matrix-od").hide();
					$(".input-matrix-os").hide();
				}else{
					if(SelectedOption==="others"){
						SameProductBothEyesBrand($(this),"others");
					}else{
						SameProductBothEyesBrand($(this),"Ebrand");
					}
				}
			}
			});

			/** product selection * */
			$("#cl-product").on("change", function() {
				if($("#cl-product-same-yes").is(':checked')){
					var SelectedOption=$(this).val();
					if(SelectedOption==="0"){
						$("#product-1-name").hide();
							$('.cl_step2 .my-account-prescriptions-add-eyes .input-matrix-od').hide();
							$('.cl_step2 .my-account-prescriptions-add-eyes .input-matrix-os').hide();
					}else{
						if(SelectedOption==="others"){
							SameProductBothEyesProduct($(this),"others");
							$('#right-product-no').val('');
						}else{
							SameProductBothEyesProduct($(this),"Eproduct");
							$('#right-product-no').val($(this).find('option:selected').data('partnumber'));
						}
					}
				}
			});

			/** ** End of same product call function *** */

			/** ** Diffrent product call function *** */

			/** brand1 selection * */
			$("#cl-brand").on("change", function() {
				if($("#cl-product-same-no").is(':checked')){
					$(".my-account-prescriptions-add-eyes .right-section-CL").html("");
					var SelectedOption=$(this).val();
					if(SelectedOption==="0"){
						$("#product-1").hide();
						$("#product-1-name").hide();
						$(".my-account-prescriptions-add-eyes .right-section-CL").hide();
					}else{
						if(SelectedOption==="others"){
							differentProductLeftNRightBrand($(this),"others","right");
						}else{
							differentProductLeftNRightBrand($(this),"Ebrand","right");
						}
					}
				}
			});
			/** brand2 selection * */
			$("#cl-brand2").on("change", function() {
				if($("#cl-product-same-no").is(':checked')){
					$(".my-account-prescriptions-add-eyes .left-section-CL").html("");
					var SelectedOption=$(this).val();
					if(SelectedOption==="0"){
						$("#product-2").hide();
						$("#product-2-name").hide();
						$(".my-account-prescriptions-add-eyes .left-section-CL").hide();
					}else{
						if(SelectedOption==="others"){
							$(".my-account-prescriptions-add-eyes .left-section-CL").show();
							differentProductLeftNRightBrand($(this),"others","left");
						}else{
							$(".my-account-prescriptions-add-eyes .left-section-CL").show();
							differentProductLeftNRightBrand($(this),"Ebrand","left");
						}
					}
				}
			});



			/** product1 selection * */
//			$("#cl-product").on("change", function() {
			$("#product-1").on("change", "#cl-product", function() {
				if($("#cl-product-same-no").is(':checked')){
					$(".my-account-prescriptions-add-eyes .right-section-CL").html("");
					var SelectedOption=$(this).val();
					if(SelectedOption==="0"){
						$('.cl_step2 .my-account-prescriptions-add-eyes .right-section-CL').hide();
						$("#product-1-name").hide();
						//$("#product-1").hide();
					}else{
						if(SelectedOption==="others"){
							$('.cl_step2 .my-account-prescriptions-add-eyes .right-section-CL').show();
							$('#right-product-no').val('');
							differentProductLeftNRightProduct($(this),"others","right");

						}else{
							$('.cl_step2 .my-account-prescriptions-add-eyes .right-section-CL').show();
							differentProductLeftNRightProduct($(this),"Eproduct","right");

						}
					}
				}

			});

//			$("#cl-product2").on("change", function() {
			$("#product-2").on("change", "#cl-product2", function() {
				if($("#cl-product-same-no").is(':checked')){
					$(".my-account-prescriptions-add-eyes .left-section-CL").html("");
					var SelectedOption=$(this).val();
					if(SelectedOption==="0"){
						$("#product-2-name").hide();
						$('.cl_step2 .my-account-prescriptions-add-eyes .left-section-CL').hide();
					}else{
						if(SelectedOption==="others"){
							$('.cl_step2 .my-account-prescriptions-add-eyes .left-section-CL').show();
							differentProductLeftNRightProduct($(this),"others","left");
							$('#left-product-no').val('');
						}else{
							$('.cl_step2 .my-account-prescriptions-add-eyes .left-section-CL').show();
							differentProductLeftNRightProduct($(this),"Eproduct","left")
						}
					}
				}
			});
			/** ** End of diffrent product call function *** */

			

/*
 * not needed, validator method for this function already exists
 *
 			$.validator.addMethod("futureExpiryDate", function(value, element) {
				if (this.optional(element) && value === "") {
					return true;
				}

				var today = new Date();
				var todayMonth = new Date(today.getFullYear(),today.getMonth(),1,0,0,0,0);

				var expiry = $('#prescription-doe').val();
				var expiryDateAtomic = expiry.split('/');

				try {
					var expiryDateObject = new Date(expiryDateAtomic[1],parseInt(expiryDateAtomic[0]) - 1,1,0,0,0,0);
					if (expiryDateObject >= todayMonth) {
						return true;
					}
				} catch(err) {
					console.log(err.message);
					return false;
				}

				return false;
			}, 'Please enter a future date');
*
*/
			$.validator.addMethod("pastIssueDate", function(value, element) {
				if (this.optional(element) && value === "") {
					return true;
				}

				var today = new Date();
				var todayMonth = new Date(today.getFullYear(),today.getMonth(),1,0,0,0,0);

				var issue = $('#prescription-doi').val();
				var issueDateAtomic = issue.split('/');

				try {
					var issueDateObject = new Date(issueDateAtomic[1],parseInt(issueDateAtomic[0]) - 1,1,0,0,0,0);
					if (issueDateObject <= todayMonth) {
						return true;
					}
				} catch(err) {
					console.log(err.message);
					return false;
				}

				return false;
			}, 'Please enter a past date');

			$.validator.addMethod('powerRequired', function(value) {
				return (value != '0')
			}, 'A Power value is required.');

			// Glasses
			$.validator.addMethod('axisValidateRight', function (value) {
				if($('#glasses-od-cyl').val()!='0'){
					 	return (value != '0');
				}else{
						return true;
				}
		    }, "As Cylinder is selected, Axis is required");
			$.validator.addMethod('axisValidateLeft', function (value) {
				if($('#glasses-os-cyl').val()!='0'){
					 	return (value != '0');
				}else{
						return true;
				}
		    }, "As Cylinder is selected, Axis is required");

			// Contact Lenses
			$.validator.addMethod('clAxisValidateRight', function (value) {
				if($('#cl-od-cyl').val()!='0'){
					 	return (value != '0');
				}else{
						return true;
				}
		    }, "As Cylinder is selected, Axis is required");
			$.validator.addMethod('clAxisValidateLeft', function (value) {
				if($('#cl-os-cyl').val()!='0'){
					 	return (value != '0');
				}else{
						return true;
				}
		    }, "As Cylinder is selected, Axis is required");



			$.validator.addMethod('odUdprism', function (value) {
				if($('#glasses-od-udprism').val()!='0'){
					    return (value != '0');
				}else{
						return true;
				}

		    }, "As Prism is selected, Direction is required");

			$.validator.addMethod('osUdprism', function (value) {
				if($('#glasses-os-udprism').val()!='0'){
					return (value != '0');
				}else{
					return true;
				}
		    }, "As Prism is selected, Direction is required");

			$.validator.addMethod('odIoprism', function (value) {
				if($('#glasses-od-ioprism').val()!='0'){
						return (value != '0');
				}else{
						return true;
				}
		    }, "As Prism is selected, Direction is required");

			$.validator.addMethod('osIoprism', function (value) {
				if($('#glasses-os-ioprism').val()!='0'){
					 	return (value != '0');
				}else{
						return true;
				}
		    }, "As Prism is selected, Direction is required");

			$.validator.addMethod('checkBrand', function (value) {
		        return (value != '0');
		    }, "Required");

			$.validator.addMethod('validateProduct', function (value, el) {
				return ($(el).is(':visible') && value != '0');
		    }, "Required");

			$('form#prescriptionsForm').validate({
				ignore: '.d-none, :not(:visible)',
				groups: {
					'od-udprism-group' : 'glasses-od-udprism glasses-od-udprism-dir'
				},
				rules: {
					// General
					'prescription-doe': {
						required: false,
						DateFormatByMYExpiryDate: true
					},
					'prescription-doi': {
						required:true,
						DateFormatByMY: true,
						pastIssueDate: true
					},
					'check-details': {
						required: true
					},

					// Glasses
					'glasses-od-sphere': {
						powerRequired: true
					},
					'glasses-os-sphere': {
						powerRequired: true
					},

					// Contact Lenses
					'cl-od-sphere': {
						powerRequired: true
					},
					'cl-os-sphere': {
						powerRequired: true
					},
					"cl-od-axis":{
			        	clAxisValidateRight: true
			        },
			        "cl-os-axis":{
			        	clAxisValidateLeft: true
			        },
					"glasses-od-axis":{
			        	axisValidateRight: true
			        },
			        "glasses-os-axis":{
			        	axisValidateLeft: true
			        },
			        "glasses-od-udprism-dir":{
			        	odUdprism:true
			        },
			        "glasses-os-udprism-dir":{
			        	osUdprism:true
			        },
			        "glasses-od-ioprism-dir":{
			        	odIoprism:true
			        },
			        "glasses-os-ioprism-dir":{
			        	osIoprism:true
					},
					"cl-brand":{
			        	checkBrand: true
			        },
			        "cl-brand2":{
			        	checkBrand: true
			        },
			        "cl-product":{
			        	validateProduct:true
			        },
			        "cl-product2":{
			        	validateProduct:true
			        },
			        "cl-1-product-name":{
			        	required:function(el){return $(el).is(':visible') && $('#cl-product').val() != 'other';}
			        },
			        "cl-product-2-name":{
			        	required:function(el){return $(el).is(':visible') && $('#cl-product2').val() != 'other';}
			        }

				},
				messages: {
					"check-details":"Please confirm your details are correct",
					"cl-1-product-name":"Please specify your product name.",
					"cl-product-2-name":"Please specify your product name.",
					"cl-product":"Please specify your product name.",
					"cl-product2":"Please specify your product name.",
					"cl-brand":"Please specify your brand name.",
					"cl-brand2":"Please specify your brand name.",
					"glasses-od-udprism-dir":"As Prism is selected, Direction is required",
					"glasses-os-udprism-dir":"As Prism is selected, Direction is required",
					"glasses-od-ioprism-dir":"As Prism is selected, Direction is required",
					"glasses-os-ioprism-dir":"As Prism is selected, Direction is required",
				},
				errorPlacement: function(error, element) {
					error.addClass('invalid-feedback');
					error.insertAfter(element.closest('.form-group'));
				},
				highlight: function(element, errorClass, validClass) {
					$(element).closest('.form-group').addClass(errorClass).removeClass(validClass);
				},
				unhighlight: function(element, errorClass, validClass) {
					$(element).closest('.form-group').removeClass(errorClass).addClass(validClass);
				}
				//,
				//submitHandler: function(form, ev)  {
			//		debugSubmitCheck(form, ev);
				//}
			});

			var debugSubmitCheck = function (form, ev) {
				console.log(ev.url);
				ev.preventDefault();
			}
		}
	}
}

function showOverlay() {
	AjaxOverlay.triggerOverlay("show");
}

function hideOverlay() {
	AjaxOverlay.triggerOverlay("hide");
}


function urlParam(name){
	var withValue = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (withValue!=null){
		return decodeURI(withValue[1]) || 0;
	} else{
		var noValue = new RegExp('[\?&]' + name).exec(window.location.href);
		if (noValue!=null){
			return null;
		} else {
			return undefined;
		}
	}
}
