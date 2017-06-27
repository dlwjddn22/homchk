<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<!-- link href="<c:url value='/css/egovframework/com/com.css' />" rel="stylesheet" type="text/css"-->

<script type="text/javascript">

	function fn_egov_downFile(atchFileId, fileSn){
		window.open("<c:url value='/cmm/fms/FileDown.do?atchFileId="+atchFileId+"&fileSn="+fileSn+"'/>");
	}

	function fn_egov_deleteFile(atchFileId, fileSn) {
		forms = document.getElementsByTagName("form");

		for (var i = 0; i < forms.length; i++) {
			if (typeof(forms[i].atchFileId) != "undefined" &&
					typeof(forms[i].fileSn) != "undefined" &&
					typeof(forms[i].fileListCnt) != "undefined") {
				form = forms[i];
			}
		}

		//form = document.forms[0];
		form.atchFileId.value = atchFileId;
		form.fileSn.value = fileSn;
		if(confirm("정말로 파일을 삭제 하시겠습니까?") == true){
		form.action = "<c:url value='/cmm/fms/deleteFiles.do'/>?id="+atchFileId+"&sn="+fileSn;
		form.submit();
		}else{
			return;
		}
	}

	function fn_egov_check_file(flag) {
		if (flag=="Y") {
			document.getElementById('file_upload_posbl').style.display = "block";
			document.getElementById('file_upload_imposbl').style.display = "none";
		} else {
			document.getElementById('file_upload_posbl').style.display = "none";
			document.getElementById('file_upload_imposbl').style.display = "block";
		}
	}
</script>

<!-- <form name="fileForm" action="" method="post" >  -->
<input type="hidden" name="atchFileId" value="${atchFileId}">
<input type="hidden" name="fileSn" >
<input type="hidden" name="fileListCnt" id="fileListCnt" value="${fileListCnt}">

<!-- </form>  -->

<!--<title>파일목록</title> -->

		<c:forEach var="fileVO" items="${fileList}" varStatus="status">
			<c:set var="totCnt" value="${status.count}" />
			 <tr>
	          <th><c:out value="${title}"/></th>
	          <td colspan="${colspan}">
		          <c:choose>
					<c:when test="${updateFlag=='Y'}">
						<a href="javascript:fn_egov_downFile('<c:out value="${fileVO.atchFileId}"/>','<c:out value="${fileVO.fileSn}"/>')">		      
	          				<c:out value="${fileVO.orignlFileNm}"/>&nbsp;[<c:out value="${fileVO.fileMg}"/>&nbsp;byte]
	          			</a>
		          		<a href="#" onClick="fn_egov_deleteFile('<c:out value="${fileVO.atchFileId}"/>','<c:out value="${fileVO.fileSn}"/>');" title="파일삭제"><i class="fa fa-times" aria-hidden="true" style="color:#ff0000; cursor:pointer"></i></a>
		          			
	          		</c:when>
		          	<c:otherwise>
		          		<a href="javascript:fn_egov_downFile('<c:out value="${fileVO.atchFileId}"/>','<c:out value="${fileVO.fileSn}"/>')">    	
	          				<c:out value="${fileVO.orignlFileNm}"/>
	          			</a>&nbsp;[<c:out value="${fileVO.fileMg}"/>&nbsp;byte]
		     		</c:otherwise>
		     	  </c:choose>   	
	          </td>
	        </tr>
		</c:forEach>
		<c:if test='${totCnt == null && updateFlag=="N"}'>
			<tr>
        		<th>첨부파일 </th>
        		<td colspan="${colspan}">&nbsp;</td>
	        </tr>    
		</c:if>
		
