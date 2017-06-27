<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<c:import url="/EgovPageLink.do?link=homchk/inc/header" />
<script type="text/javascript" src="<c:url value='/html/egovframework/com/cmm/utl/ckeditor/ckeditor.js'/>"></script>
<link rel="stylesheet" type="text/css" href="<c:url value='/css/homchk/contents.css'/>">

<div class="conwrap">
	<div class="cke_contents_ltr">
		<c:out value="${result.memo}" escapeXml="false" />
	</div>

	<div class="btngroup fr">
		<button type="button" class="btn" onClick="javascript:toggleEssDiv();">메모 입력</button>
	</div>
	<div id="essDiv">
		<form name="frm" method="post">
			<table class="tablewrite" >
				<tr>
					<th>
						메모
					</th>
					<td>
						<textarea class="width100p height250" id="ckeditor" name="memo">${result.memo }</textarea>
					</td>
				</tr>
			</table>
		</form>
	    <div class="btngroup fr">
			<button type="button" class="btn" onClick="javascript:fn_egov_regist();">저장</button>
		</div>
	</div>
</div>


<script type="text/javascript">
<!--
$(function() {

	CKEDITOR.replace('ckeditor', {//해당 이름으로 된 textarea에 에디터를 적용
		width : '100%',
		height : '300px',
		filebrowserImageUploadUrl : '${pageContext.request.contextPath}/ckeditor/ckeditorImageUpload.do' //여기 경로로 파일을 전달하여 업로드 시킨다.
	});

	CKEDITOR.on('dialogDefinition', function(ev) {
		var dialogName = ev.data.name;
		var dialogDefinition = ev.data.definition;

		switch (dialogName) {
		case 'image': //Image Properties dialog
			//dialogDefinition.removeContents('info');
			dialogDefinition.removeContents('Link');
			dialogDefinition.removeContents('advanced');
			break;
		}
	});

	$("#essDiv").css("display", "none")
});

function fn_egov_regist() {
	document.frm.action = "<c:url value='/homchkMainInsert.do'/>";
	document.frm.submit();
}

function toggleEssDiv() {
	$('#essDiv').toggle();
}
//-->
</script>
</body>
</html>