if (window.console == undefined) {console={log:function(){} };}

var samyang = {

	init : function(){
		samyang.selectBox();
		samyang.scrollLoad();
		samyang.common.init();
		samyang.quick.init();
		samyang.header.init();
		samyang.footer.init();
		samyang.main.init();
		samyang.familyPage.init();
		samyang.media.init();
		samyang.faq.init();
		samyang.company.init();
		samyang.board.init();
		samyang.history.init();
		samyang.recruit.init();

		$(window).on('load', function(){
			var browser = navigator.userAgent;
			if (browser.indexOf( 'MSIE 8' ) !== -1){
			 	$('body').addClass('ie8-sapari');
			 }
		});
	}

	,scrollLoad : function(){
		var win = $(window),
			section = $(".loadFadein");
		
		win.on('load scroll', function(){
			var scrollPosition = win.scrollTop();
			var winTop = $(this).scrollTop(),
				winH = $(this).height();

			// image loader
			section.each(function(){
				var tg = $(this),
					tgTop = tg.offset().top + 150;

				if(tgTop <= winTop+winH){
					tg.addClass('loadFadeinActive');
				}

			});			
		});
	}

	,selectBox : function(){
		var sel = $('.sel-list'),
			selBtn = sel.find('> a');

		selBtn.on('click', function(){
			var $this = $(this),
				next = $this.next('ul'),
				list = next.find('a');

			$this.parent().toggleClass('on');
			next.slideToggle(100, 'easeInOutExpo');

			// 바로 소팅하지 않을 경우
			if ($this.parent().hasClass('change')) {

				list.on('click', function(){
					var text = $(this).text();
					
					$this.find('input').val(text);
					$this.find('span').text(text);
					next.hide();

					return false;
				});
			}
			


			return false;
		});

		sel.on('mouseleave', function(){
			var $this = $(this),
				ul = $this.find('ul');

			ul.slideUp(350, 'easeInOutExpo', function(){
				$this.removeClass('on');
			});
			return false;
		});
	}


	,common : {
		init : function(){
			samyang.common.designSelect();
			samyang.common.checkBox();
			samyang.common.popupMain();
			samyang.common.popup();
			samyang.common.tabmenu();
		}

		,designSelect : function(){
			$('.design-select').each(function(){

				if ( $(this).parent('.designSelectW').find('.select-content').length > 0 ) return;

				/*reset*/
				var _that = $(this);
				var _thatTitle = _that.attr('title');
				$(this).hide();
				$(this).wrap('<div class="designSelectW" />');
				var selectW = $(this).parent('.designSelectW');
				selectW.append('<div class="select-content" />');
				var selectC = selectW.find('.select-content');
				selectC.append('<div class="select-title"><a href="#"></a></div>');
				selectC.append('<ul class="select-list" />');
				var selectT = selectW.find('.select-title > a');
				if (_thatTitle){
					selectT.attr('title',_thatTitle);
				}
				var selectL = selectW.find('.select-list');
				if ($(this).find(' option:selected')){
					selectT.text($(this).find('option:selected').text());
				}else{
					selectT.text($(this).find('option').eq(0).text());
				}
				var selectOption = $(this).find('option');
				selectOption.each(function(){
					var optionText = $(this).text();
					selectL.append('<li><a href="#">' + optionText + '</a></li>')
				});
				selectL.find('li').eq(0).addClass('first');
				selectL.find('li').last().addClass('last');
				selectL.hide();

				/*event handler*/
				selectT.on('click',function(e){
					e.preventDefault();
					e.stopPropagation();
					var selectBox = $(this).parent().parent().parent().parent('.design-select-box');
					if ($(this).parent().next().is(':visible')){
						$(this).parent().next().hide();
						selectBox.css('z-index',5);
					}else{
						$('.select-list').hide();
						$(this).parent().next().show();
						$('.design-select-box').css('z-index',5);
						selectBox.css('z-index',10);
					}
					$(window).click(function(){
						selectL.hide();
						$(window).unbind('click');
						selectBox.css('z-index',5);
					})
				});
				selectT.on('keydown',function(e){
					if (e.keyCode == 9 && $(this).next().parent().is(':visible')){
						$(this).parent().next().find('a').eq(0).focus();
						return false;
					}else if (e.keyCode == 27){
						$(this).parent().next().hide();
						$(this).focus();
					}else{
						return true;
					}
				});
				selectW.find('.select-list a').on('click',function(e){
					e.preventDefault();
					var $text = $(this).text();
					var $index =$(this).parent().parent().find('li').index($(this).parent());
					_that.find('option').removeAttr('selected');
					_that.find('option').eq($index).prop('selected','selected');
					$(this).parent().parent().parent().find('.select-title').find('a').text($text).focus();
					$(this).parent().parent().hide();
					$(this).parent().parent().parent().parent().parent().next().addClass('on');
					if (_that.attr('onchange')){
						_that.trigger('onchange');
					}else{
						_that.trigger('change');
					}
				});
				$('.select-list').find('a').on('keydown',function(e){
					if (e.shiftKey && e.keyCode == 9) {
						if ($(this).parent().attr('class') == 'first'){
							$(this).parent().parent().find('li').last().find('a').focus();
							return false;
						}
					}else if (e.keyCode == 9){
						if ($(this).parent().attr('class') == 'last'){
							//$(this).parent().parent().find('li').eq(0).find('a').focus();
							$(this).parent().parent().hide();
							$(this).parent().parent().prev().find('a').focus();
							return false;
						}
					}else if (e.keyCode == 27){
						$(this).parent().parent().hide();
						$(this).parent().parent().parent().find('.select-title').find('a').focus();
						return false;
					}else{
						return true;
					}
				});
			});
		}

		,checkBox : function(){
			var chkDiv = $(".check-type01"),
				chkLabel = chkDiv.find("label");
						
			chkLabel.click(function(){
				if($(this).parent("div").find("input").is(":checked")){
					$(this).removeClass("on");
				} else {
					$(this).addClass("on");
				}
			});
		}

		,popupMain : function(){
			var popup = $("#main"),
				popupClose = $(".pop-close");

			popupClose.on("click", function(){
				$(this).parent().hide();

				return false;
			})
		}

		,popup : function(){
			var popupLayer = $(".layer-popup"),
				popupWrap = $(".layer-wrap"),
				popBtn = $(".popup-btn"),
				popBtn2 = $(".pop-video"),
				popBtn3 = $(".pop-media"),
				popBtn4 = $(".pop-family"),
				popBtn5 = $(".pop-factory"),
				popClose = popupLayer.find(".close,.close-btn"),
				iframeSrc = popupWrap.find("iframe").attr("src"),
				dim = $(".dim");

			popBtn.click(function(){
				popupTop = $(window).scrollTop();

				popupLayer.css({top:200,marginLeft:-(popupLayer.width()/2)});
				popupLayer.fadeIn(500);
				dim.fadeIn(300);
				$("body,html").animate({scrollTop:550}, 300);

				return false;
			});

			popBtn2.click(function(){
				popupTop = $(window).scrollTop();

				popupLayer.css({top:2650, marginLeft:-(popupWrap.width()/2)});
				popupLayer.fadeIn(500);
				dim.fadeIn(300);
				$("body,html").animate({scrollTop:2420}, 300);
				popupWrap.find("iframe").attr("src",iframeSrc);

				return false;
			});

			popBtn3.click(function(){
				popupTop = $(window).scrollTop();
				popupLayer.width();
				popupLayer.css({top:popupTop+($(window).height()/3), marginLeft:-(popupWrap.width()/2)});
				
				popupLayer.fadeIn(500);
				dim.fadeIn(300);
				$("body,html").animate({scrollTop:popupTop}, 0);

				return false;
			});

			popBtn4.click(function(){
				// 추후 링크받아서 수정. 2016-09-02
				// var btnIdx = $(this).parent().index();
				// popupTop = $(window).scrollTop();

				// popupLayer.css({top:2817, marginLeft:-(popupWrap.width()/2)});
				// popupLayer.fadeIn(500);
				// dim.fadeIn(300);
				// $("body,html").animate({scrollTop:2520}, 300);
				// switch(btnIdx){
				// 	case 0 : 
				// 		popupWrap.find("iframe").attr("src","https://www.youtube.com/embed/vdflx98dDjI?rel=0");
				// 		break;
				// 	case 1 :
				// 		popupWrap.find("iframe").attr("src","https://www.youtube.com/embed/nIx-fo89GSk?rel=0");
				// 		break;
				// }

				return false;
			});

			popBtn5.click(function(){
				popupTop = $(window).scrollTop();

				popupLayer.css({top:1650, marginLeft:-(popupWrap.width()/2)});
				popupLayer.fadeIn(500);
				dim.fadeIn(300);
				$("body,html").animate({scrollTop:1430}, 300)
				popupWrap.find("iframe").attr("src",iframeSrc);

				return false;
			});

			popClose.click(function(){
				popupLayer.fadeOut();
				dim.fadeOut();
				$("body,html").animate({scrollTop:popupTop}, 300);
				popupWrap.find("iframe").attr("src","");

				return false;
			});

			$(".dim").click(function(){
				popupLayer.fadeOut();
				dim.fadeOut();
				$("body,html").animate({scrollTop:popupTop}, 300);
				popupWrap.find("iframe").attr("src","");


				return false;
			});
		}

		,tabmenu : function(){
			var tabMenu = $(".tab-menu"),
				tabList = $(".tab-list");
				
			tabMenu.find("> ul > li").click(function(){
				var tabIdx = $(this).index();

				tabMenu.find("> ul > li").eq(tabIdx).addClass("on").siblings().removeClass("on");
				tabList.find("> li").eq(tabIdx).addClass("on").siblings().removeClass("on");

				affiliateSlide();
			});

			function affiliateSlide(){
				var tabOn = $(".tab-list > li.on"),
					slideWrap = tabOn.find(".aff-slide"),
					slideUl = slideWrap.find("> ul"),
					slideLi = slideUl.find("> li"),
					slideLen = slideLi.length,
					ctrl = slideWrap.find('> .control > a'),
					num = 0;

				ctrl.on("click", function(){
					var _this = $(this),
						slideIdx = _this.index();
					
					num = slideIdx;

					ctrl.removeClass("on");
					_this.addClass("on");
					slideLi.stop().removeClass("on");
					slideLi.eq(num).addClass("on")

					return false;
				});
			}

			affiliateSlide();
		}
	}

	,quick : {
		init : function(){
			samyang.quick.quickMenu();
		},

		quickMenu : function(){
			var win = $(window),
				winHei = win.height(),
				qM = $("#quickMenu"),
				tAnchor = qM.find(".move-top");

			win.scroll(function(){

				winTop = $(this).scrollTop();

				if(winTop>=570){
					qM.stop().animate({top:(winHei/3)+winTop}, {duration : 500, easing : 'easeOutExpo', complete : function(){}});
				} else {
					qM.stop().animate({top:570}, {duration : 500, easing : 'easeOutExpo', complete : function(){}});
				};
			})

			tAnchor.click(function(){
				$("body,html").animate({scrollTop:0}, 300);

				return false;
			})
		}
	}

	,header : {
		init : function(){
			samyang.header.topLang();
			samyang.header.gnbMenu();
		}

		,topLang : function(){
			var head = $('#dHead'),
				lang = head.find('.lang'),
				btn = lang.find('> a'),
				list = lang.find('> ul');

			btn.on('click' , function(){
				list.stop().slideToggle(350, 'easeInOutExpo');
				return false;
			});

			list.on('mouseleave', function(){
				list.stop().slideToggle(350, 'easeInOutExpo');
				return false;
			});
		}

		,gnbMenu : function(){
			var head = $("#dHead"),
				gnb = head.find(".gnb"),
				gnbLi = gnb.find("li"),
				sub = head.find(".submenu-wrap"),
				subUl = sub.find("ul");

			gnb.on("mouseover", function(){
				sub.stop().slideDown(300);
			});

			gnbLi.on("mouseover", function(){
				gnb.find("a").removeClass("on");
				$(this).find("a").addClass("on");
			})

			head.on("mouseleave", function(){
				sub.stop().slideUp(300);
				gnb.find("a").removeClass("on");
			});

			subUl.on("mouseover", function(){
				menuIdx = $(this).index();
				gnb.find("a").removeClass("on");
				gnb.find("li").eq(menuIdx).find("a").addClass("on");
			});

		}

	}

	,footer : {
		init : function(){
			samyang.footer.family();
		}

		,family : function(){
			var family = $('#dFoot .family'),
				familyBtn = family.find('> a'),
				familyList = family.find('> ul');

			familyBtn.on('click', function(){
				familyList.stop().slideToggle(450, 'easeInOutExpo');
				return false;
			});

			family.on('mouseleave', function(){
				familyList.stop().slideUp(450, 'easeInOutExpo');
				return false;
			});
		}
	}

	,main : {
		init : function(){
			samyang.main.mainSlide();
			samyang.main.newSlide();
			samyang.main.prodTab();
			samyang.main.commSns();
		}

		,mainSlide : function(){
			var slideWrap = $(".visual-banner"),
				slideUl = slideWrap.find(".slide-contents"),
				slideLi = slideUl.find("> li"),
				slideLen = slideLi.length,
				ctrl = slideWrap.find('.control > a');
				btnPrev = slideWrap.find('.control-arrows > a.prev'),
				btnNext = slideWrap.find('.control-arrows > a.next'),
				num = 0;

				var timer = setInterval(autoRoll, 3000);

			ctrl.on("click", function(){
				var _this = $(this),
					slideIdx = _this.index();
				
				num = slideIdx;

				ctrl.removeClass("on");
				_this.addClass("on");
				slideLi.removeClass("on").eq(num).addClass("on");
				clearInterval(timer);
				timer = setInterval(autoRoll, 3000);

				return false;
			});

			btnPrev.on("click", function(){
				var _this = $(this);

				(num > 0) ? num-- : num=slideLen-1;

				ctrl.removeClass("on");
				ctrl.eq(num).addClass("on");
				slideLi.removeClass("on").eq(num).addClass("on");
				clearInterval(timer);
				timer = setInterval(autoRoll, 3000);

				return false;
			});

			btnNext.on("click", function(){
				var _this = $(this);
				(num < slideLen-1) ? num++ : num=0;

				ctrl.removeClass("on");
				ctrl.eq(num).addClass("on");
				slideLi.removeClass("on").eq(num).addClass("on");
				clearInterval(timer);
				timer = setInterval(autoRoll, 3000);

				return false;
			});

			function autoRoll(){
				(num == slideLen-1) ? num = 0 : num++ ;
				ctrl.eq(num).trigger('click');
			};
		}

		,newSlide : function(){
			var slideWrap = $(".product-new"),
				slideUl = slideWrap.find("ul"),
				slideLi = slideUl.find("> li"),
				slideLen = slideLi.length,
				ctrl = slideWrap.find('.control > a'),
				num = 0;

			var ntimer = setInterval(autoRolling, 5000);

			ctrl.on("click", function(){
				var _this = $(this),
					slideIdx = _this.index();
				
				num = slideIdx;

				ctrl.removeClass("on");
				_this.addClass("on");
				slideUl.animate({marginLeft:-(250*num)}, 500, "easeInOutQuint");
				clearInterval(ntimer);
				ntimer = setInterval(autoRolling, 5000);

				return false;
			});

			function autoRolling(){
				(num == slideLen-1) ? num = 0 : num++ ;
				ctrl.eq(num).trigger('click');
			};
		}

		,prodTab : function(){
			var productTab = $(".tab-type03"),
				productUl = productTab.children("ul"),
				productLi = productUl.children("li"),
				tabLen = productLi.length,
				tabBtn = productLi.children("a"),
				dept2 = $(".tab-category"),
				total=0;

			productUl.css("width",95*tabLen);

			for(num=0; tabLen > num; num++){
				var dept2Wid = productLi.eq(num).find(".tab-category").width();

				productLi.eq(num).find(".tab-category").css("marginLeft",-(dept2Wid-74)/2)
			}

			tabBtn.on("click", function(){
				dept2.hide();
				$(this).next(dept2).show();
				$(this).addClass("on").parent("li").siblings().children("a").removeClass("on");
				
				return false;
			});
			
		}

		,commSns : function(){
			var snsBlock = $(".block-sns"),
				snsOpen = snsBlock.find(".open-sns"),
				snsUl = snsBlock.find(".sns-list");

			snsOpen.on("click", function(){
				snsUl.slideToggle();

				return false;
			});
		}
	}

	,familyPage : {
		init : function(){
			samyang.familyPage.brandSelector();
			samyang.familyPage.branchSelector();
			samyang.familyPage.branchPhoto();
			samyang.familyPage.familyTab();
		}

		,brandSelector : function(){
			var brandSelect = $(".family-brand-tab"),
				brandLi = brandSelect.find("li"),
				brandWrap = $(".family-brand-warp"),
				brandList = brandWrap.find("> ul > li");

			brandLi.on("click", function(){
				var _this = $(this),
					tabIdx = _this.index();

				_this.addClass("on").siblings().removeClass("on");
				brandList.eq(tabIdx).addClass("active").siblings().removeClass("active");
			});
		}

		,branchSelector : function(){
			var branch = $(".family-branch"),
				branchTab = branch.find(".branch-tab > li > a");

			branchTab.on("click", function(){
				var _this = $(this),
					tabIdx = _this.parent("li").index();

				_this.parent("li").addClass("on").siblings().removeClass("on");
				_this.parents(".branch-tab").next().children().eq(tabIdx).addClass("active").siblings().removeClass("active");

				return false;
			})
		}

		,branchPhoto : function(){
			var photo = $(".branch-box"),
				photoTab = photo.find(".branch-img > li > a"),
				viewList = photo.find(".branch-viewer > ul > li");

			photoTab.on("click", function(){
				var _this = $(this),
					tabIdx = _this.parent("li").index();

				_this.addClass("on").parent("li").siblings().find("a").removeClass("on");
				_this.parents(".branch-box").find(".branch-viewer > ul > li").stop().fadeOut(200).eq(tabIdx).fadeIn(500);

				return false;
			})
		}

		,familyTab :function(){
			var tabBox = $(".tab-type05"),
				tabBoxLi = tabBox.find("li"),
				tabBtn = tabBoxLi.children("a"),
				conBox = $(".tab-con > li");

			tabBoxLi.on("click", function(){
				var _this = $(this),
					tabIdx = _this.index();

				_this.addClass("on").siblings().removeClass("on");
				conBox.eq(tabIdx).addClass("active").siblings().removeClass("active");
				
				return false;
			});
		}

	}

	,media : {
		init : function(){
			samyang.media.playVideo();
		}

		,playVideo : function(){
			var mediaWrap = $(".media-wrap"),
				mediaFrame = mediaWrap.find("iframe"),
				videoClose = mediaWrap.find(".btn-close"),
				videoBtn = $(".media-list li > a");
			
			videoBtn.click(function(){
				mediaWrap.slideDown(300).animate({opacity:1}, 300);

				return false;
			});

			videoClose.click(function(){
				mediaWrap.animate({opacity:0}, 300).slideUp(300);

				mediaFrame.delay(100).attr("src","");

				return false;
			});

			function winWidth(){
				var winWid = $(window).width();	
				if(winWid > 1140){
					mediaWrap.css({width:winWid, marginLeft:-(winWid/2)+570});
				}
			};

			winWidth();
			
			$(window).resize(function(){
				winWidth();
			});
		}
	}

	,faq : {
		init : function(){
			samyang.faq.toggleBox();
		}

		,toggleBox : function(){
			var faqBox = $(".faq-box > div"),
				faqUl = faqBox.find("ul"),
				faqLi = faqUl.find("li"),
				faqBtn = faqLi.find("a");

			faqBtn.click(function(){
				var $this = $(this);
				
				$this.parent().siblings().find("div").slideUp();
				$this.next().slideToggle();

				return false;
			})
		}
	}

	,company : {
		init : function(){
			samyang.company.companyTab();
			// samyang.company.companySlide();
		}

		,companyTab : function(){
			var companyTab = $(".company-tab"),
				companyLi = companyTab.find("li"),
				companyWrap = $(".company-list"),
				companyList = companyWrap.find("> ul > li");

			companyLi.on("click", function(){
				var _this = $(this),
					tabIdx = _this.index();

				_this.addClass("on").siblings().removeClass("on");
				companyList.eq(tabIdx).addClass("active").siblings().removeClass("active");

				return false;
			});
		}

		// ,companySlide : function(){
		// 	var tabOn = $(".tab-list > li.on"),
		// 		slideWrap = tabOn.find(".aff-slide"),
		// 		slideUl = slideWrap.find("> ul"),
		// 		slideLi = slideUl.find("> li"),
		// 		slideLen = slideLi.length,
		// 		ctrl = slideWrap.find('> .control > a'),
		// 		num = 0;

		// 	ctrl.on("click", function(){
		// 		var _this = $(this),
		// 			slideIdx = _this.index();
				
		// 		num = slideIdx;

		// 		ctrl.removeClass("on");
		// 		_this.addClass("on");
		// 		slideLi.stop().removeClass("on");
		// 		slideLi.eq(num).addClass("on")

		// 		return false;
		// 	});
		// }

	}

	,board : {
		init : function(){
			samyang.board.fileUpload();
			samyang.board.ggcon();
			samyang.board.downloadFile();
		}

		,fileUpload : function(){
			var fileLabel = $(".bo-file label");
			fileLabel.click(function(){
				var fileDiv = $(this).parent("div"),
					$fileField = fileDiv.find(".file-text"),
					$upLoad = fileDiv.find(".file-upload");

				$upLoad.on('change', function(){
					var fileName = $(this).val();
					$fileField.prop("disabled", "disabled").val(fileName);
				});
			})
		}

		,ggcon : function(){
			var ggconArea = $(".comment-area"),
				ggconBtn = ggconArea.find(".btn-ggcon"),
				ggconLayer = $(".ggcon-layer"),
				ggconLi = ggconLayer.find("ul > li > a"),
				ggconClose = ggconLayer.find(".btn-close");

			ggconBtn.click(function(){
				$(this).parents(".comm-write").find(".ggcon-layer").toggle();

				return false;
			})

			ggconLi.click(function(){
				var imgSrc = $(this).find("img").attr("src");
				
				ggconLayer.hide();
				$(this).parents(".comm-write").find(".ggcon > img").attr("src", imgSrc);

				return false;
			})

			ggconClose.click(function(){
				ggconLayer.hide();

				return false;	
			})
		}

		,downloadFile : function(){
			var btnView = $(".btn-file-view"),
				fileBox = $(".filebox");

			btnView.on("click", function(){
				fileBox.toggle();

				return false;
			})
		}
	}

	,history : {
		init :function(){
			samyang.history.popHead();
		}

		,popHead :function(){
			var menu = $(".history-menu"),
				menuLi = menu.find("> li"),
				slideBtn = $(".btn-slide-view");

			menuLi.on("click", function(){
				$(this).addClass("on").siblings().removeClass("on");
			});

			slideBtn.on("click", function(){
				menuLi.removeClass("on");
			});
		}
	}

	,recruit : {
		init :function(){
			samyang.recruit.hint();
			samyang.recruit.radioType();
			samyang.recruit.selectType();
		}

		,hint :function(){
			var hintBtn = $(".hint");
				
			hintBtn.on("click", function(){
				hintBox = $(this).find(".hint-box");
				hintBox.toggle();

				return false;
			});

		}

		,radioType : function(){

			$(window).on('load', function(){
				var resume = $(".resume");
					radio = resume.find("input[type=radio]"),
					checkbox = $("input[type=checkbox]"),
					radioLen = radio.length,
					checkboxLen = checkbox.length;

				for(num = 0 ; num < radioLen ; num ++){
					if(radio.eq(num).is(":checked")){
						radio.eq(num).next("label").addClass("selected");
					}
				}

				for(num = 0 ; num < checkboxLen ; num ++){
					if(checkbox.eq(num).is(":checked")){
						checkbox.eq(num).next("label").addClass("selected");
					}
				}
			});
				
			var resume = $(".resume");
				radio = resume.find("input[type=radio]"),
				radioLabel = radio.next("label"),
				checkLabel = $(".check-label");

			radioLabel.on("click", function(){
				$(this).addClass("selected").siblings().removeClass("selected");
			});

			checkLabel.on("click", function(){
				if ($(this).prev("input").is(":checked")){
					$(this).removeClass("selected");
				} else {
					$(this).addClass("selected");
				};
			});
		}

		// resume_write designSelect
		,selectType : function(){
			var resume = $(".resume");
			var selectWrap = resume.find(".designSelectW");
			var selectTit = selectWrap.find(".select-title > a");
			var selectLi = selectWrap.find(".select-list");

			/* event handler */
			selectTit.on("click", function(){
				selectLi.hide();
				$(this).parent().next(".select-list").show();
				$(window).click(function(){
					selectLi.hide();
					$(window).unbind("click");
				})
				return false;
			});
			selectWrap.find('.select-list a').on('click',function(){
				var $text = $(this).text();
				var $index = $(this).parent().index();
				var _that = $(this).parent().parent().parent().parent(".designSelectW");
				_that.find('option').removeAttr('selected');
				_that.find('option').eq($index).prop('selected','selected');
				$(this).parent().parent().parent().find('.select-title').find('a').text($text).focus();
				$(this).parent().parent().hide();
				$(this).parent().parent().parent().parent().parent().next().addClass('on');
				if (_that.attr('onchange')){
					_that.trigger('onchange');
				}else{
					_that.trigger('change');
				}
				
				return false;
			});
		}
	}
}

$(function(){
	samyang.init();
});

