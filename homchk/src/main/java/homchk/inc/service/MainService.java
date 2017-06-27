package homchk.inc.service;

import egovframework.rte.psl.dataaccess.util.EgovMap;



public interface MainService {

	EgovMap selectEssResult();

	void insertEss(String memo);

}
