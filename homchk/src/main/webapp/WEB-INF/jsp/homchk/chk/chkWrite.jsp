<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="ckeditor" uri="http://ckeditor.com"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<c:import url="/EgovPageLink.do?link=homchk/inc/header" />

<script type="text/javascript" src="<c:url value='/html/egovframework/com/cmm/utl/ckeditor/ckeditor.js'/>"></script>
<div class="conwrap">
	<form name="frm" method="post">
		<table class="tablewrite" id="chkList">
			<colgroup>
				<col class="width100">
				<col class="width50">
				<col>
				<col class="width210">
			</colgroup>
			<tbody>
				<!-- <tr>
					<th>
						필수내용<i class="fa fa-check" aria-hidden="true"></i>
					</th>
					<td colspan="10">
						<textarea class="width100p height250" id="ckeditor" name="psCn"></textarea>
					</td>
				</tr> -->
				<c:choose>
					<c:when test="${empty result}">
						<tr>
							<th>체크리스트</th>
							<td style="text-align:center">1</td>
							<td>
								<input type="hidden" name="" class="chkSeq" value="0">
								<input type="text" name="" class="itext width100p chkList">
							</td>
							<td>
								<button type="button" class="btn" onClick="addChkList()"><i class="fa fa-plus" aria-hidden="true"></i>&nbsp;추가</button>
							</td>
						</tr>
					</c:when>
					<c:otherwise>
						<c:forEach var="r" items="${result}" varStatus="status">
							<tr>
								<th>체크리스트</th>
								<td style="text-align:center">${status.count }</td>
								<td>
									<input type="hidden" class="chkSeq" value="${r.seq }">
									<input type="text" name="" class="itext width100p chkList" value="${r.chkCn }">
								</td>
								<td>
									<c:choose>
										<c:when test="${status.count eq 1}">
											<button type="button" class="btn" onClick="addChkList()"><i class="fa fa-plus" aria-hidden="true"></i>&nbsp;추가</button>
										</c:when>
										<c:otherwise>
											<button type="button" class="btn" onClick="deleteChkList(this, ${r.seq})"><i class="fa fa-minus" aria-hidden="true"></i>&nbsp;삭제</button>
										</c:otherwise>
									</c:choose>
									&nbsp;&nbsp;&nbsp;
									<button type="button" class="btn" onclick="moveUp(this)">▲</button>
									<button type="button" class="btn" onclick="moveDown(this)">▼</button>
								</td>
							</tr>
						</c:forEach>
					</c:otherwise>
				</c:choose>
			</tbody>
		</table>
	</form>
	<div class="btngroup fr">
<!-- 		<button type="button" class="btn" onClick="javascript:history.go(-1);">취소</button> -->
		<button type="button" class="btn" onClick="javascript:fn_egov_regist();">저장</button>
	</div>
</div>


<script type="text/javascript">
<!--
/* $(function() {

	CKEDITOR.replace('ckeditor', {//해당 이름으로 된 textarea에 에디터를 적용
		width : '100%',
		height : '400px',
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

}); */

function addChkList() {
	var template = "<tr>";
	template += "	<th>체크리스트</th>";
	template += "	<td style=\"text-align:center\">"+($("#chkList tr").size()+1)+"</td>";
	template += "	<td>";
	template += "       <input type=\"hidden\" name=\"\" class=\"chkSeq\" value=\"0\">";
	template += "		<input type=\"text\" name=\"\" class=\"itext width100p chkList\">";
	template += "	</td>";
	template += "	<td>";
	template += "		<button type=\"button\" class=\"btn\" onClick=\"deleteChkList(this, 0)\"><i class=\"fa fa-minus\" aria-hidden=\"true\"></i>&nbsp;삭제</button>";
	template += "	</td>";
	template += "</tr>";
	$("#chkList").append(template);
}

function deleteChkList(obj, seq) {
	if(seq == 0)
	{
		$(obj).parent().parent().remove();
	}else{
		location.href="<c:url value='/chk/chkDelete.do?seq='/>"+seq;
	}

}

//파일 업로드 하기 전 이름 변경
function reNameChkList() {
	for (i = 0; i < $(".chkList").length; i++) {
		$(".chkList:eq(" + i + ")").attr("name", "chkList["+i+"].chkCn");
		$(".chkSeq:eq(" + i + ")").attr("name", "chkList["+i+"].seq");
	}
}

function fn_egov_regist() {
	reNameChkList();
	document.frm.action = "<c:url value='/chk/chkInsert.do'/>";
	document.frm.submit();
}

function moveUp(el){
	var $tr = $(el).parent().parent(); // 클릭한 버튼이 속한 tr 요소
	$tr.prev().before($tr); // 현재 tr 의 이전 tr 앞에 선택한 tr 넣기
}

function moveDown(el){
	var $tr = $(el).parent().parent(); // 클릭한 버튼이 속한 tr 요소
	$tr.next().after($tr); // 현재 tr 의 다음 tr 뒤에 선택한 tr 넣기
}
//-->
</script>

</body>
</html>