package homchk.chk.service.impl;

import homchk.chk.service.ChkService;
import homchk.chk.service.ChkVO;

import java.io.InputStream;
import java.util.List;

import egovframework.com.sym.ccm.zip.service.EgovCcmZipManageService;
import egovframework.com.sym.ccm.zip.service.Zip;
import egovframework.com.sym.ccm.zip.service.ZipVO;
import egovframework.com.utl.fcc.service.EgovStringUtil;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.excel.EgovExcelService;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

@Service("ChkService")
public class ChkServiceImpl extends EgovAbstractServiceImpl implements ChkService {

    @Resource(name="ChkDAO")
    private ChkDAO chkDAO;

    @Override
	public List<?> selectChkList() throws Exception {
		return chkDAO.selectChkList();
	}

	@Override
	public void insertChkList(ChkVO vo) {
		List<ChkVO> list = vo.getChkList();
		int i = 1;
		for(ChkVO tmpVo : list)
		{
			tmpVo.setSortNo(i);
			if(tmpVo.getSeq() == 0)
			{
				chkDAO.insertChkList(tmpVo);
			}else{
				chkDAO.updateChkList(tmpVo);
			}
			i++;
		}

	}

	@Override
	public void deleteChkList(int seq) {
		chkDAO.deleteChkList(seq);
	}

}
