<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>


<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="cache-control" content="no-store">
<title>::::: HomeChk :::::</title>
<!-- js -->
<script type="text/javascript" src="<c:url value='/js/homchk/jquery-1.11.1.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/homchk/bootstrap.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/homchk/jquery.bxslider.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/homchk/jquery.simplemodal-1.4.4.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/multiFile.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/homchk/jquery-accordion-menu.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/homchk/front_js.js'/>"></script>

<!-- css -->
<link rel="stylesheet" type="text/css" href="<c:url value='/css/homchk/common.css'/>">
<link rel="stylesheet" type="text/css" href="<c:url value='/css/homchk/jquery.bxslider.css'/>">
<link rel="stylesheet" type="text/css" href="<c:url value='/css/homchk/font-awesome.min.css'/>">
<link rel="stylesheet" type="text/css" href="<c:url value='/css/homchk/board.css'/>">
<link rel="stylesheet" type="text/css" href="<c:url value='/css/homchk/layout.css'/>">

<script type="text/javascript">
$(document).ready(function () {
	var filter = "win16|win32|win64|mac|macintel";
	if ( navigator.platform ) {
		if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) { //mobile
			var currZoom = 2.2;
			$("body").css("zoom", currZoom);
			$("body").css("-moz-transform", "Scale(" + currZoom + ")");
			$("body").css("-moz-transform-origin", "0 0");

		} else { //pc

		}
	}
})
</script>

</head>
<body>
<div id="dHead">
    <div id="gnbWrap">
		<div class="header">
			<h1 class="logo">
				<a href="<c:url value='/'/>">HomeChk</a>
			</h1>
	    	<ul class="gnb">
		      <li><a href="<c:url value='/chk/chkWrite.do'/>">체크리스트</a></li>
		      <li><a href="<c:url value='/hom/homList.do'/>">방목록</a></li>
		      <li><a href="<c:url value='/hom/homWrite.do'/>">방등록</a></li>
		    </ul>
  		</div>
	</div>
</div>