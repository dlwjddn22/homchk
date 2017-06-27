package homchk.inc.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import egovframework.com.cmm.service.EgovFileMngService;
import egovframework.com.cmm.service.FileVO;
import egovframework.com.utl.fcc.service.EgovStringUtil;

/**
* @FileName : FileListController.java
* @Project : webzen
* @최초작성일 : 20161205
* @작성자 : "전한석"
* @변경이력 :
*
* @프로그램 설명: 게시판 첨부파일 관련 로직
*/


@Controller
public class FileListController {

	@Resource(name = "EgovFileMngService")
    private EgovFileMngService fileService;

    /**
     * 첨부파일에 대한 목록을 조회한다.
     *
     * @param fileVO
     * @param atchFileId
     * @param sessionVO
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/inc/selectFileInfs.do")
    public String selectFileInfs(@ModelAttribute("searchVO") FileVO fileVO, @RequestParam Map<String, Object> commandMap, ModelMap model) throws Exception {

    String atchFileId = (String)commandMap.get("param_atchFileId");
	String colspan = (String)commandMap.get("param_colspan");
	colspan = EgovStringUtil.isNullToString(colspan);

	fileVO.setAtchFileId(atchFileId);
	List<FileVO> result = fileService.selectFileInfs(fileVO);

	model.addAttribute("fileList", result);
	model.addAttribute("updateFlag", "N");
	model.addAttribute("fileListCnt", result.size());
	model.addAttribute("atchFileId", atchFileId);
	model.addAttribute("colspan", colspan);

	return "dgjob/inc/FileList";
    }

    /**
     * 첨부파일 변경을 위한 수정페이지로 이동한다.
     *
     * @param fileVO
     * @param atchFileId
     * @param sessionVO
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/inc/selectFileInfsForUpdate.do")
    public String selectFileInfsForUpdate(@ModelAttribute("searchVO") FileVO fileVO, @RequestParam Map<String, Object> commandMap,
	    //SessionVO sessionVO,
	    ModelMap model) throws Exception {

	String atchFileId = (String)commandMap.get("param_atchFileId");
	String colspan = (String)commandMap.get("param_colspan");
	colspan = EgovStringUtil.isNullToString(colspan);

	fileVO.setAtchFileId(atchFileId);

	List<FileVO> result = fileService.selectFileInfs(fileVO);

	model.addAttribute("fileList", result);
	model.addAttribute("updateFlag", "Y");
	model.addAttribute("fileListCnt", result.size());
	model.addAttribute("atchFileId", atchFileId);
	model.addAttribute("colspan", colspan);

	return "homchk/inc/FileList";
    }

    @RequestMapping("/inc/selectFileInfsAndTitle.do")
    public String selectFileInfsAndTitle(@ModelAttribute("searchVO") FileVO fileVO, @RequestParam Map<String, Object> commandMap,
	    //SessionVO sessionVO,
	    ModelMap model) throws Exception {

	String atchFileId = (String)commandMap.get("param_atchFileId");
	String colspan = (String)commandMap.get("param_colspan");
	String title = (String)commandMap.get("param_title");
	colspan = EgovStringUtil.isNullToString(colspan);

	fileVO.setAtchFileId(atchFileId);

	List<FileVO> result = fileService.selectFileInfs(fileVO);

	model.addAttribute("fileList", result);
	model.addAttribute("updateFlag", "Y");
	model.addAttribute("fileListCnt", result.size());
	model.addAttribute("atchFileId", atchFileId);
	model.addAttribute("colspan", colspan);
	model.addAttribute("title", title);

	return "dgjob/inc/FileListTitle";
    }


}
