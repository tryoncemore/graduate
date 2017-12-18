package sysu;

import java.io.File;

import org.apache.commons.io.FileUtils;
import org.junit.Test;

public class BatchRename {
	@Test
	public void Rename() {
		int i=0;
		String destDir = "E:\\videovis\\videocover\\re\\xMj_P_6H69g\\rename\\";
		File dest=new File(destDir);
		if(!dest.exists()) {
			dest.mkdirs();
		}
		for(File file:new File("E:\\videovis\\videocover\\re\\xMj_P_6H69g\\SBD").listFiles()) {
			file.renameTo(new File(destDir+i+".jpg"));
			i++;
		}
	}
}
