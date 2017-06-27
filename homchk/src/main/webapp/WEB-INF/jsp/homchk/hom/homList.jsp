<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<c:import url="/EgovPageLink.do?link=homchk/inc/header" />
<script type="text/javascript">
<!--
	function goSearch(obj)
	{
		document.frm.action = "<c:url value='/hom/homList.do'/>";
		document.frm.submit();
	}
//-->
</script>


<div class="conwrap">
<div class="btnsch fl">
	<form name="frm" method="post">
		<select class="select" name="sortTp" onchange="goSearch()">
			<option value="1" <c:if test="${sortTp eq '1'}">selected</c:if>>등록날짜</option>
			<option value="2" <c:if test="${sortTp eq '2'}">selected</c:if>>점수</option>
			<option value="3" <c:if test="${sortTp eq '3'}">selected</c:if>>등록날짜 + 점수</option>
		</select>
	</form>
</div>
	<table class="tablelist">
		<colgroup>
			<col class="width5p">
			<col>
			<col class="width5p">
			<col class="width5p">
			<col class="width5p">
			<col class="width5p">
			<col class="width5p">
			<col class="width5p">
			<col class="width13p">
		</colgroup>
		<thead>
			<tr>
				<th>번호</th>
				<th>건물명</th>
<!-- 				<th>총면적</th> -->
				<th>면적</th>
				<th>방</th>
				<th>욕실</th>
				<th>보증</th>
				<th>관리</th>
				<th>점수</th>
				<th>등록날짜</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach var="result" items="${selectHomList}" varStatus="status">
				<tr style="cursor:pointer" onclick="javascript:location.href='<c:url value='/hom/homWrite.do?seq=${result.seq}'/>'">
					<td>${status.count }</td>
					<td>${result.bNm}</td>
<%-- 					<td>${result.tArea}</td> --%>
					<td>${result.oArea}</td>
					<td>${result.room}</td>
					<td>${result.toilet}</td>
					<td>${result.gAmt}</td>
					<td>${result.mAmt}</td>
					<td>${result.point}</td>
					<td><fmt:formatDate value="${result.cDate}" pattern="yyyy-MM-dd HH시" /></td>
				</tr>
			</c:forEach>
		</tbody>
	</table>
</div>

</body>
</html>