<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<c:choose>
	<c:when test="${callTp eq '1' }">
		<c:forEach var="fileVO" items="${fileList}" varStatus="status">
			<a data-slide-index="${status.index}" href=""><img src="<c:url value='/cmm/fms/getImage.do'/>?atchFileId=<c:out value="${fileVO.atchFileId}"/>&fileSn=<c:out value="${fileVO.fileSn}"/>" alt=""></a>
		</c:forEach>
	</c:when>
	<c:otherwise>
		<c:forEach var="fileVO" items="${fileList}" varStatus="status">
			<li><img src='<c:url value='/cmm/fms/getImage.do'/>?atchFileId=<c:out value="${fileVO.atchFileId}"/>&fileSn=<c:out value="${fileVO.fileSn}"/>' alt=""/></li>
		</c:forEach>
	</c:otherwise>

</c:choose>