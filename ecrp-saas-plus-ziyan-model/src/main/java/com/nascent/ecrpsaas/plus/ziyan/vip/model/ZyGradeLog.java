package com.nascent.ecrpsaas.plus.ziyan.vip.model;

import com.nascent.ecrpsaas.vip.model.GradeLog;
import com.nascent.plugins.sqlinxml.annotation.Param;
import com.nascent.plugins.sqlinxml.annotation.Select;
@Select()
public class ZyGradeLog extends GradeLog {
	private static ZyGradeLog gradeLog =  new ZyGradeLog();

    public static ZyGradeLog dao() {
        return gradeLog;
    }

	@Select()
	public GradeLog loadGradeLogByGrade(@Param("sys_customer_id") long customeId,@Param("old_grade") long oldGrade,@Param("new_grade") long newGrade){
		return null;
	}

}
