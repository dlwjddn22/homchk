package homchk.chk.web;

import java.util.List;

import homchk.chk.service.ChkService;
import homchk.chk.service.ChkVO;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import egovframework.com.sym.ccm.zip.service.EgovCcmZipManageService;

@Controller
public class ChkController {

	@Resource(name = "ChkService")
	private ChkService chkService;

	/**
     * 체크리스트 등록
     *
     * @return
     * @throws Exception
     */
    @RequestMapping(value="/chk/chkWrite.do")
    public String chkWrite(Model model) throws Exception {

    	List<?> result = chkService.selectChkList();
    	model.addAttribute("result", result);


    	return "homchk/chk/chkWrite";
    }

    @RequestMapping(value="/chk/chkInsert.do")
    public String chkInsert(@ModelAttribute("chkVO") ChkVO chkVo ) throws Exception {

    	chkService.insertChkList(chkVo);

    	return "redirect:/chk/chkWrite.do";
    }

    @RequestMapping(value="/chk/chkDelete.do")
    public String chkDelete(@RequestParam("seq") int seq) throws Exception {

    	chkService.deleteChkList(seq);

    	return "redirect:/chk/chkWrite.do";
    }

}
