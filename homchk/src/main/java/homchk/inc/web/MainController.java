package homchk.inc.web;

import homchk.hom.service.HomService;
import homchk.inc.service.MainService;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import egovframework.rte.psl.dataaccess.util.EgovMap;

@Controller
public class MainController {

	@Resource(name = "MainService")
	private MainService mainService;

	/**
     * 메인 페이지
     *
     * @return
     * @throws Exception
     */
    @RequestMapping(value="/homchkMain.do")
    public String homechkMain(Model model) throws Exception {

    	EgovMap result = mainService.selectEssResult();
    	model.addAttribute("result", result);

    	return "homchk/inc/homchkMain";
    }

    @RequestMapping(value="/homchkMainInsert.do")
    public String homchkMainInsert( @RequestParam("memo") String memo
    							  , Model model) throws Exception {

    	mainService.insertEss(memo);

    	return "redirect:/homchkMain.do";
    }

}
