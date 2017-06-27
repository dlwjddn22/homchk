package homchk.hom.web;

import java.util.List;
import java.util.Map;

import homchk.chk.service.ChkService;
import homchk.hom.service.HomService;
import homchk.hom.service.HomVO;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import egovframework.com.cmm.service.EgovFileMngService;
import egovframework.com.cmm.service.EgovFileMngUtil;
import egovframework.com.cmm.service.FileVO;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Controller
public class HomController {

	@Resource(name = "HomService")
	private HomService homService;

	@Resource(name = "ChkService")
	private ChkService chkService;

	@Resource(name = "EgovFileMngService")
	private EgovFileMngService fileService;

	@Resource(name = "EgovFileMngService")
	private EgovFileMngService fileMngService;

	@Resource(name = "EgovFileMngUtil")
	private EgovFileMngUtil fileUtil;

	/**
     * 메인 페이지
     *
     * @return
     * @throws Exception
     */
	@RequestMapping(value="/hom/homList.do")
    public String homList( @RequestParam(value="sortTp", defaultValue="1", required=false) String sortTp
    						 , Model model) throws Exception {
    	List<?> selectHomList = homService.selectHomeList(sortTp);
    	model.addAttribute("selectHomList", selectHomList);
    	model.addAttribute("sortTp", sortTp);
	return "homchk/hom/homList";
    }

    @RequestMapping(value="/hom/homWrite.do")
    public String homWrite(@ModelAttribute("homeVo") HomVO homeVo, Model model) throws Exception {


    	List<?> chkList = chkService.selectChkList();
    	model.addAttribute("chkList", chkList);

    	EgovMap homeResult = homService.selectHomeResult(homeVo);
    	model.addAttribute("homeResult", homeResult);

    	return "homchk/hom/homWrite";
    }

    @RequestMapping(value="/hom/homInsert.do")
    public String homInsert( final MultipartHttpServletRequest multiRequest
    					   , @ModelAttribute("homeVo") HomVO homeVo
    					   , Model model) throws Exception {

    	List<FileVO> result = null;
		String atchFileId = "";

    	if(homeVo.getSeq() == 0)
    	{
    		final Map<String, MultipartFile> files = multiRequest.getFileMap();
    		if (!files.isEmpty()) {
    			result = fileUtil.parseFileInf(files, "HOM_", 0, "", "");
    			atchFileId = fileMngService.insertFileInfs(result);
    		}
    		homeVo.setAtchFileId(atchFileId);

    		int seq = homService.insertHom(homeVo);
    		homeVo.setSeq(seq);
    	}else{

    		atchFileId = homeVo.getAtchFileId();
        	final Map<String, MultipartFile> files = multiRequest.getFileMap();
    		if (!files.isEmpty()) {
    			if ("".equals(atchFileId)) {
    				result = fileUtil.parseFileInf(files, "HOM_", 0, atchFileId, "");
    				atchFileId = fileMngService.insertFileInfs(result);
    				homeVo.setAtchFileId(atchFileId);
    			} else {
    				FileVO fvo = new FileVO();
    				fvo.setAtchFileId(atchFileId);
    				int cnt = fileMngService.getMaxFileSN(fvo);
    				result = fileUtil.parseFileInf(files, "HOM_", cnt, atchFileId, "");
    				fileMngService.updateFileInfs(result);
    			}
    		}
    		homService.updateHom(homeVo);
    	}



    	return "redirect:/hom/homWrite.do?seq="+homeVo.getSeq();
    }

}
