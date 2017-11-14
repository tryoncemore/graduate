package sysu.unittest;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.junit.Test;

import sysu.bean.ImgLocation;
import sysu.utils.JsonUtils;

public class CommenTest {
	@Test
	public void testPath() throws IOException {
		File file = new File("CommenTest.txt");
		List<String> readLines = FileUtils.readLines(file);
		System.out.println(readLines.size());
	}
	
	@Test
	public void generateImgLocation() throws IOException {
		List<ImgLocation> list=new ArrayList<ImgLocation>();
		ImgLocation il=new ImgLocation();
		il.videoid="40riCqvRoMs";
		il.pos="1234";
		il.x1=420;
		il.x2=920;
		list.add(il);
		ImgLocation il1=new ImgLocation();
		il1.videoid="F7Id9caYw-Y";
		il1.pos="23";
		il1.x1=490;
		il1.x2=840;
		list.add(il1);
		ImgLocation il2=new ImgLocation();
		il2.videoid="xMj_P_6H69g";
		il2.pos="";
		il2.x1=480;
		il2.x2=1020;
		list.add(il2);
		FileUtils.writeStringToFile(new File("data/imgLocation.json"), JsonUtils.objectToJson(list));
	}
	
	@Test
	public void testImgLocation() throws IOException {
		List<ImgLocation> jsonToList = JsonUtils.jsonToList(FileUtils.readFileToString(new File("data/imgLocation.json")), ImgLocation.class);
		System.out.println(jsonToList.size());
	}
}
