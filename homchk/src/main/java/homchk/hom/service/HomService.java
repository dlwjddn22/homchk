package homchk.hom.service;

import java.util.List;


import egovframework.rte.psl.dataaccess.util.EgovMap;



public interface HomService {

	EgovMap selectHomeResult(HomVO vo);

	List<?> selectHomeList(String sortTp);

	int insertHom(HomVO vo);

	void updateHom(HomVO vo);



}
