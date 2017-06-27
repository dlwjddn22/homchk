package homchk.inc.service.impl;

import homchk.inc.service.MainService;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Service("MainService")
public class MainServiceImpl extends EgovAbstractServiceImpl implements MainService {

    @Resource(name="MainDAO")
    private MainDAO mainDAO;

    @Resource(name = "MainService")
	private MainService mainService;

	@Override
	public EgovMap selectEssResult() {
		return mainDAO.selectEssResult();
	}

	@Override
	public void insertEss(String memo) {

		EgovMap result = mainService.selectEssResult();
		if(result == null)
		{
			mainDAO.insertEss(memo);
		}else{
			mainDAO.updateEss(memo);
		}
	}

}
