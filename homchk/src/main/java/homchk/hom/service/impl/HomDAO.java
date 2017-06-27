package homchk.hom.service.impl;

import homchk.chk.service.ChkVO;
import homchk.hom.service.HomVO;

import java.util.List;

import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import egovframework.com.sym.ccm.zip.service.Zip;
import egovframework.com.sym.ccm.zip.service.ZipVO;
import egovframework.rte.psl.dataaccess.util.EgovMap;

import org.springframework.stereotype.Repository;


@Repository("HomDAO")
public class HomDAO extends EgovComAbstractDAO {

	public EgovMap selectHomeResult(HomVO vo) {
		return (EgovMap) select("HomDAO.selectHomeResult", vo);
	}

	public List<?> selectHomeList(String sortTp) {
		return list("HomDAO.selectHomeList", sortTp);
	}

	public int insertHom(HomVO vo) {
		return (int)insert("HomDAO.insertHom", vo);

	}

	public void updateHom(HomVO vo) {
		insert("HomDAO.updateHom", vo);

	}
}