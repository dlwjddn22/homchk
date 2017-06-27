/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	
	config.fontSize_sizes = '8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;';
	config.language = "ko";			//언어설정
	config.height = '300px';		//Editor 높이  
	config.width = '777px';			//Editor 넓이
	config.resize_enabled = false;
	config.enterMode = CKEDITOR.ENTER_BR;	//엔터키 입력시 br 태그 변경
	config.startupFocus = true;
	config.uiColor = '#EEEEEE';		//색상
	config.menu_subMenuDelay = 0;
	config.toolbarCanCollapse = true;		//툴바가 접히는 기능을 넣을때 사용합니다.
	config.image_previewText = CKEDITOR.tools.repeat( '이 화면에서 보이는 문구는 사용자가 업로드 한 이미지가 실제 화면에 어떻게 배치되는지를 보다 명확히 알 수 있도록 하기 위해 쓰여진 것입니다. 실제 화면에는 나타나지 않습니다', 1 );
	config.toolbar = [ [ 'Font', 'FontSize' ], [ 'BGColor', 'TextColor' ], [ 'Bold', 'Italic', 'Strike', 'Superscript', 'Subscript', 'Underline', 'RemoveFormat' ], [ 'BidiLtr', 'BidiRtl' ], '/',
			[ 'Image', 'SpecialChar', 'Smiley' ], [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ], [ 'Blockquote', 'NumberedList', 'BulletedList' ], [ 'Link', 'Unlink' ],
			[ 'Source' ], [ 'Undo', 'Redo' ] ];
	
	filebrowserImageUploadUrl: '<c:url value="/ckeditor/ckeditorImageUpload.do"/>'
};
