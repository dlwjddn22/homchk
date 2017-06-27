package homchk.chk.service;

import java.io.Serializable;
import java.util.List;

import egovframework.com.cmm.service.CmmnDetailCode;


/**
 *
 * 공통상세코드 VO 클래스
 * @author 공통서비스 개발팀 이중호
 * @since 2009.04.01
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일      수정자           수정내용
 *  -------    --------    ---------------------------
 *   2009.04.01  이중호          최초 생성
 *
 * </pre>
 */
public class ChkVO implements Serializable {

	private static final long serialVersionUID = 9137280036724974467L;

    private int seq;

    private String chkCn = "";

    private int sortNo;

    private List<ChkVO> chkList;

	public int getSeq() {
		return seq;
	}

	public void setSeq(int seq) {
		this.seq = seq;
	}

	public String getChkCn() {
		return chkCn;
	}

	public void setChkCn(String chkCn) {
		this.chkCn = chkCn;
	}

	public int getSortNo() {
		return sortNo;
	}

	public void setSortNo(int sortNo) {
		this.sortNo = sortNo;
	}

	public List<ChkVO> getChkList() {
		return chkList;
	}

	public void setChkList(List<ChkVO> chkList) {
		this.chkList = chkList;
	}

}
