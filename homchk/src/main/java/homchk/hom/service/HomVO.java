package homchk.hom.service;

import java.io.Serializable;
import java.util.Date;
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
public class HomVO implements Serializable {

	private static final long serialVersionUID = 9137280036724974467L;

    private int seq = 0;
    private String bNm = "";
    private String tArea = "";
    private String oArea = "";
    private String gAmt = "";
    private String mAmt = "";
    private String room = "";
    private String toilet = "";
    private String memo = "";
    private String atchFileId = "";
    private String chkListId = "";
    private Date cDate;
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public String getbNm() {
		return bNm;
	}
	public void setbNm(String bNm) {
		this.bNm = bNm;
	}
	public String gettArea() {
		return tArea;
	}
	public void settArea(String tArea) {
		this.tArea = tArea;
	}
	public String getoArea() {
		return oArea;
	}
	public void setoArea(String oArea) {
		this.oArea = oArea;
	}
	public String getgAmt() {
		return gAmt;
	}
	public void setgAmt(String gAmt) {
		this.gAmt = gAmt;
	}
	public String getmAmt() {
		return mAmt;
	}
	public void setmAmt(String mAmt) {
		this.mAmt = mAmt;
	}
	public String getRoom() {
		return room;
	}
	public void setRoom(String room) {
		this.room = room;
	}
	public String getToilet() {
		return toilet;
	}
	public void setToilet(String toilet) {
		this.toilet = toilet;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public String getAtchFileId() {
		return atchFileId;
	}
	public void setAtchFileId(String atchFileId) {
		this.atchFileId = atchFileId;
	}
	public String getChkListId() {
		return chkListId;
	}
	public void setChkListId(String chkListId) {
		this.chkListId = chkListId;
	}
	public Date getcDate() {
		return cDate;
	}
	public void setcDate(Date cDate) {
		this.cDate = cDate;
	}


}
