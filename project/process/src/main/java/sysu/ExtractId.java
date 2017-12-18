package sysu;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.io.FileUtils;
import org.junit.Test;

public class ExtractId {
	@Test
	public void idExtractor() throws IOException {
		Pattern p=Pattern.compile(".*?/watch\\?v=\\p{ASCII}{11}");
		for(File f:new File("E:\\videovis\\video\\pages\\").listFiles()) {
			String str = FileUtils.readFileToString(f);
			Matcher matcher = p.matcher(str);
			
			List<String> res=new ArrayList<String>();
			while(matcher.find()) {
				String temp=matcher.group(0);
				res.add(temp.substring(temp.length()-11));
			}
			FileUtils.writeLines(new File("E:\\videovis\\video\\pages\\"+f.getName().substring(0, 3)), res);
		}
	}
	
	@Test
	public void testRegex() {
		boolean matches = Pattern.matches(".*/watch\\?v=\\p{ASCII}{11}.*", "fefq:/watch?v=zRQd9F5NLCk\\fasf");
		System.out.println(matches);
	}
	
	@Test
	public void quchong() throws IOException {
		List<String> list=FileUtils.readLines(new File("E:\\videovis\\video\\pages\\ted"));
		Set<String> set=new HashSet<String>();
		for(String s:list) {
			set.add(s);
		}
		FileUtils.writeLines(new File("E:\\videovis\\video\\pages\\TED"), set);
	}
}
