package egovframework.com.cmm;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.Serializable;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.ibm.icu.text.SimpleDateFormat;

import egovframework.com.cmm.service.EgovProperties;
import egovframework.com.cop.bbs.service.EgovBBSCommentService;
import egovframework.com.utl.fcc.service.EgovFileUploadUtil;
import egovframework.com.utl.fcc.service.EgovFormBasedFileVo;


/**
  * @FileName : FileUpload.java
  * @Project : gbict
  * @Date : 2016. 6. 29. 
  * @작성자 : 전한석
  * @변경이력 :
  * @프로그램 설명 : ckeditor 의 이미지 업로드를 하기 위한 기능구현
  * 		   
  */
@SuppressWarnings("serial")
@Controller
public class FileUploadController implements Serializable {


	/**
	  * @Method Name : ckeditorImageUpload
	  * @작성자 : 전한석
	  * @작성일 : 2016. 6. 29.
	  * @변경이력 : 
	  * @Method 설명 :ckeditor 의 이미지 업로드를 하기 위한 기능구현
	  * @param request
	  * @param response
	  * @param upload
	  * @throws Exception
	  */
	@RequestMapping(value = "/ckeditor/ckeditorImageUpload.do", method = RequestMethod.POST)
	public void ckeditorImageUpload(HttpServletRequest request, HttpServletResponse response, @RequestParam MultipartFile upload) throws Exception {

		OutputStream out = null;
		PrintWriter printWriter = null;
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		String url = null;

		try {
			//프로퍼티의 이미지 경로 지정
			final String uploadDir = EgovProperties.getProperty("Globals.fileStorePath");
			//CommonsMultipartResolver 에서 자동으로 잡아줌
			final long maxFileSize = 1024 * 1024 * 600;
			//전자정부 프레임워크에서 제공되는 메서드에서 maxFileSize 파라메터만 받고, 사용되지는 않음
			List<EgovFormBasedFileVo> list = EgovFileUploadUtil.uploadFiles(request, uploadDir, maxFileSize);

			if (list.size() > 0) {
				EgovFormBasedFileVo vo = list.get(0); // 첫번째 이미지

				url = request.getContextPath() + "/utl/web/imageSrc.do?" + "path=" + vo.getServerSubPath() + "&physical=" + vo.getPhysicalName() + "&contentType=" + vo.getContentType();

			}

			//저장된 이미지는 'CKEditorFuncNum'의 이름으로 콜백된다
			String callback = request.getParameter("CKEditorFuncNum");

			printWriter = response.getWriter();
			String fileUrl = url; // url경로

			printWriter.println("<script type='text/javascript'>window.parent.CKEDITOR.tools.callFunction(" + callback + ",'" + fileUrl + "','이미지를 업로드 하였습니다.'" + ")</script>");
			printWriter.flush();

		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (out != null) {
					out.close();
				}
				if (printWriter != null) {
					printWriter.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		return;
	}
	
	//다중파일업로드
	@RequestMapping("/multiplePhotoUpload.do")
	public void multiplePhotoUpload(HttpServletRequest request, HttpServletResponse response){
	    try {
	         //파일정보
	         String sFileInfo = "";
	         //파일명을 받는다 - 일반 원본파일명
	         String filename = request.getHeader("file-name");
	         //파일 확장자
	         String filename_ext = filename.substring(filename.lastIndexOf(".")+1);
	         //확장자를소문자로 변경
	         filename_ext = filename_ext.toLowerCase();
	         //파일 기본경로
	         String dftFilePath = request.getSession().getServletContext().getRealPath("/");
	         //파일 기본경로 _ 상세경로
	         String filePath = dftFilePath + "resource" + File.separator + "photo_upload" + File.separator;
	         File file = new File(filePath);
	         if(!file.exists()) {
	            file.mkdirs();
	         }
	         String realFileNm = "";
	         SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
	         String today= formatter.format(new java.util.Date());
	         realFileNm = today+UUID.randomUUID().toString() + filename.substring(filename.lastIndexOf("."));
	         String rlFileNm = filePath + realFileNm;
	         ///////////////// 서버에 파일쓰기 ///////////////// 
	         InputStream is = request.getInputStream();
	         OutputStream os=new FileOutputStream(rlFileNm);
	         int numRead;
	         byte b[] = new byte[Integer.parseInt(request.getHeader("file-size"))];
	         while((numRead = is.read(b,0,b.length)) != -1){
	            os.write(b,0,numRead);
	         }
	         if(is != null) {
	            is.close();
	         }
	         os.flush();
	         os.close();
	         ///////////////// 서버에 파일쓰기 /////////////////
	         // 정보 출력
	         sFileInfo += "&bNewLine=true";
	         // img 태그의 title 속성을 원본파일명으로 적용시켜주기 위함
	         sFileInfo += "&sFileName="+ filename;;
	         sFileInfo += "&sFileURL="+ request.getContextPath() + "/resource/photo_upload/"+realFileNm;
	         PrintWriter print = response.getWriter();
	         print.print(sFileInfo);
	         print.flush();
	         print.close();
	    } catch (Exception e) {
	        e.printStackTrace();
	    }
	}

}
