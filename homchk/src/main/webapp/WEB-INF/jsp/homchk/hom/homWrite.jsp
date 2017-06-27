<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="ckeditor" uri="http://ckeditor.com"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<c:import url="/EgovPageLink.do?link=homchk/inc/header" />

<script type="text/javascript" src="<c:url value='/html/egovframework/com/cmm/utl/ckeditor/ckeditor.js'/>"></script>
<div class="conwrap">
	<form name="frm" method="post" enctype="multipart/form-data">
		<input type="hidden" name="seq" value="${empty homeResult.seq ? '0' :  homeResult.seq}">
		<input type="hidden" name="chkListId">
		<input type="hidden" name="returnUrl" value="<c:url value='/hom/homWrite.do'/>" />
		<table class="tablewrite" id="atchFile">
			<colgroup>
					<col class="width120">
					<col class="width580">
			</colgroup>
			<tbody>
				<tr>
					<th>
						건물이름<i class="fa fa-check" aria-hidden="true">
					</th>
					<td>
						<input type="text" name="bNm" class="itext width100p" value="${homeResult.bNm }">
					</td>
				</tr>
				<tr>
					<th>
						총 / 전용<br>면적
					</th>
					<td>
						<input type="number" name="tArea" style="height: 36px !important;" class="itext width200" value="${homeResult.tArea }">
						&nbsp;/&nbsp;
						<input type="number" name="oArea" style="height: 36px !important;" class="itext width200" value="${homeResult.oArea }">
					</td>
				</tr>
				<tr>
					<th>
						보증금 /<br>관리비
					</th>
					<td>
						<input type="number" name="gAmt" style="height: 36px !important;" class="itext width200" value="${homeResult.gAmt }">
						&nbsp;/&nbsp;
						<input type="number" name="mAmt" style="height: 36px !important;" class="itext width200" value="${homeResult.mAmt }">
					</td>
				</tr>
				<tr>
					<th>
						방 / 욕실
					</th>
					<td>
						<input type="number" name="room" style="height: 36px !important;" class="itext width200" value="${homeResult.room }">
						&nbsp;/&nbsp;
						<input type="number" name="toilet" style="height: 36px !important;" class="itext width200" value="${homeResult.toilet }">
					</td>
				</tr>
				<tr>
					<th>
						메모
					</th>
					<td>
						<textarea class="width100p height250" id="ckeditor" name="memo">${homeResult.memo }</textarea>
					</td>
				</tr>
				<c:forEach var="chk" items="${chkList }" varStatus="status">
					<tr>
						<c:if test="${status.count eq 1}">
							<th rowspan="${chkList.size() }">
								체크리스트
							</th>
						</c:if>
						<td>
							<label><input type="checkbox" name="chkList" class="chkList" value="${chk.seq }"> ${chk.chkCn}</label>
						</td>
					</tr>
				</c:forEach>
				<!-- 첨부파일 여러개일 경우 tr태그 반복 -->
				<c:import url="/inc/selectFileInfsForUpdate.do" charEncoding="utf-8">
					<c:param name="param_atchFileId" value="${homeResult.atchFileId}" />
				</c:import>
				<tr>
					<th>첨부파일</th>
					<td colspan="3">
						<input type="file" name="" class="width300 atchFile">
						<button type="button" class="btn" onClick="addAtchFile()"><i class="fa fa-plus" aria-hidden="true"></i>&nbsp;파일 추가</button>
					</td>
				</tr>
			</tbody>
		</table>
	</form>
	<c:if test="${not empty homeResult.atchFileId}">
		<div class="marketsearch_img">
	      <ul class="bxslider">
	        <c:import url="/cmm/fms/selectImageFilePhotoList.do" charEncoding="utf-8">
	      	   <c:param name="atchFileId" value="${homeResult.atchFileId}" />
	         </c:import>
	      </ul>
	      <div id="bx-pager">
	      	<c:import url="/cmm/fms/selectImageFilePhotoList.do" charEncoding="utf-8">
	      	   <c:param name="atchFileId" value="${homeResult.atchFileId}" />
	           <c:param name="callTp" value="1" />
	         </c:import>
	      </div>
	      <script>
	        $('.bxslider').bxSlider({
			  pagerCustom: '#bx-pager',
			  slideMargin: 10
			});
	      </script>
	    </div>
    </c:if>
    <div class="space01"></div>
    <div class="btngroup fr">
<!-- 		<button type="button" class="btn" onClick="javascript:history.go(-1);">취소</button> -->
	<button type="button" class="btn" onClick="javascript:fn_egov_regist();">저장</button>
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

	var checkListId="${homeResult.chkListId}";
	if(checkListId != "")
	{
		var arrId = checkListId.split("^");
		$(".chkList").each(function(){
			for(i=0; i<arrId.length; i++)
			{
				if($(this).val() == arrId[i])
				{
					$(this).attr("checked", true);
				}
			}
		})
	}


});

function fn_egov_regist() {
	if($("input[name=bNm]").val() == "")
	{
		alert("건물이름을 입력해 주세요.");
		$("input[name=bNm]").focus();
		return;
	}
	setChkListId();
	reNameAtchFile();
	document.frm.action = "<c:url value='/hom/homInsert.do'/>";
	document.frm.submit();
}
function setChkListId()
{
	var tmpId = "";

	$(".chkList:checked").each(function(){
		tmpId += $(this).val() + "^"
	})

	if(tmpId.length > 0)
	{
		tmpId = tmpId.substring(0, tmpId.length-1);
	}

	$("input[name=chkListId]").val(tmpId);
}
//-->
</script>

</body>
</html>