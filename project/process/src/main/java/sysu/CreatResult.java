package sysu;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.junit.Test;

public class CreatResult {
	@Test
	public void creat() throws IOException {
		List<String> lines = FileUtils.readLines(new File("data/data.txt"));
		List<String> res = new ArrayList<String>();
		int count =1 ;
		for(String str:lines) {
			res.add(count+"&"+str.replaceAll(" ", "&")+"\\cr\\hline");
			count++;
		}
		FileUtils.writeLines(new File("data/res.txt"), res);
	}
}
