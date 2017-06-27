package homchk.chk.service;

import java.util.List;


public interface ChkService {

	List<?> selectChkList() throws Exception;

	void insertChkList(ChkVO vo);

	void deleteChkList(int seq);

}
