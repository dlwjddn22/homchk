package homchk.chk.service.impl;

import homchk.chk.service.ChkVO;

import java.util.List;

import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import egovframework.com.sym.ccm.zip.service.Zip;
import egovframework.com.sym.ccm.zip.service.ZipVO;

import org.springframework.stereotype.Repository;


@Repository("ChkDAO")
public class ChkDAO extends EgovComAbstractDAO {

	public List<?> selectChkList() {
		return list("ChkDAO.selectChkList");
	}

	public void insertChkList(ChkVO vo){
		insert("ChkDAO.insertChkList", vo);
	}

	public void updateChkList(ChkVO vo) {
		update("ChkDAO.updateChkList", vo);

	}

	public void deleteAllChkList(){
		delete("ChkDAO.deleteAllChkList");
	}

	public void deleteChkList(int seq) {
		delete("ChkDAO.deleteChkList", seq);
	}
}