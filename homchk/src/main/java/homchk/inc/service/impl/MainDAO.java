package homchk.inc.service.impl;

import org.springframework.stereotype.Repository;

import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import egovframework.rte.psl.dataaccess.util.EgovMap;


@Repository("MainDAO")
public class MainDAO extends EgovComAbstractDAO {

	public EgovMap selectEssResult() {
		return (EgovMap) select("MainDAO.selectEssResult");
	}

	public void insertEss(String memo) {
		insert("MainDAO.insertEss", memo);
	}

	public void updateEss(String memo) {
		update("MainDAO.updateEss", memo);
	}

}