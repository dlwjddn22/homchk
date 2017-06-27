function makeFileAttachment() {
	var maxFileNum = document.board.posblAtchFileNumber.value;
	if (maxFileNum == null || maxFileNum == "") {
		maxFileNum = 3;
	}
	var multi_selector = new MultiSelector(document.getElementById('egovComFileList'), maxFileNum);
	multi_selector.addElement(document.getElementById('egovComFileUploader'));
}

// 파일 업로드 하기 전 이름 변경
function reNameAtchFile() {
	for (i = 0; i < $(".atchFile").length; i++) {
		$(".atchFile:eq(" + i + ")").attr("name", "file_" + i);
	}
}

// 첨부파일 추가
function addAtchFile() {
	var template = "<tr>";
	template += "<th>첨부파일</th>";
	template += "		<td>";
	template += "			<input name=\"\" class=\"width300 atchFile\" type=\"file\">";
	template += "			<button type=\"button\" class=\"btn\" onclick=\"deleteAtchFile(this)\"><i class=\"fa fa-minus\" aria-hidden=\"true\"></i>&nbsp;파일 삭제</button>";
	template += "		</td>";
	template += "</tr>";
	$("#atchFile").append(template);
	if($("#atchFile tr").length-1 == 10){
		$("#addFile").hide();
	}
}

function addAtchFileScollMove() {
	var template = "<tr>";
	template += "<th>첨부파일</th>";
	template += "		<td>";
	template += "			<input name=\"\" class=\"width300 atchFile\" type=\"file\">";
	template += "			<button type=\"button\" class=\"btn\" onclick=\"deleteAtchFile(this)\"><i class=\"fa fa-minus\" aria-hidden=\"true\"></i>&nbsp;삭제</button>";
	template += "		</td>";
	template += "</tr>";
	$("#atchFile").append(template);
	$('.subcontents').animate({scrollTop : $("#atchFile td").last().offset().top}, 400);
}

// 추가된 첨부파일 삭제
function deleteAtchFile(obj) {
	$(obj).parent().parent().remove();
	if($("#atchFile tr").length-1 != 10){
		$("#addFile").show();
	}
}