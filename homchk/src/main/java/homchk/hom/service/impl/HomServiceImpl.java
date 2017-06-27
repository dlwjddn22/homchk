package homchk.hom.service.impl;

import java.util.List;

import homchk.hom.service.HomService;
import homchk.hom.service.HomVO;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Service("HomService")
public class HomServiceImpl extends EgovAbstractServiceImpl implements HomService {

    @Resource(name="HomDAO")
    private HomDAO homDAO;

    @Override
	public EgovMap selectHomeResult(HomVO vo) {
		return homDAO.selectHomeResult(vo);
	}

	@Override
	public List<?> selectHomeList(String sortTp) {
		return homDAO.selectHomeList(sortTp);
	}

	@Override
	public int insertHom(HomVO vo) {
		return homDAO.insertHom(vo);
	}

	@Override
	public void updateHom(HomVO vo) {
		homDAO.updateHom(vo);

	}
}
