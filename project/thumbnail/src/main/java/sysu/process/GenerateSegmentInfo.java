package sysu.process;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.junit.Test;
import org.apache.commons.io.FileUtils;

import sysu.bean.SegmentInfo;
import sysu.bean.Word;
import sysu.utils.JsonUtils;
import sysu.utils.Seacher;

public class GenerateSegmentInfo {
	@Test
	public void generate() throws IOException {
		String videos[]=new String[] {"40riCqvRoMs","F7Id9caYw-Y","xMj_P_6H69g"};
		Pattern pattern = Pattern.compile("sub(\\d+)\\.jpg");
		Random random = new Random();
		
		for(String videoId:videos) {
			List<SegmentInfo> res = new ArrayList<SegmentInfo>();
			String sbdDir="E:\\videovis\\videocover\\backup\\re\\"+videoId+"\\SBD\\";
			String subImgDir="data/videoframes/"+videoId+"/";
			String destPath="data/videoinfos/segmentInfos/"+videoId+".json";
			int endTime=0;
			
			for(File file:new File(subImgDir).listFiles()) {
				if(file.getName().startsWith("sub")) {
					SegmentInfo si=new SegmentInfo();
					Matcher matcher = pattern.matcher(file.getName());
					matcher.find();
					endTime=Integer.parseInt(matcher.group(1));
					si.setEndTime(endTime);
					res.add(si);
				}
				
			}
			Collections.sort(res);
			int startTime=0;
			int sum=0;
			for(SegmentInfo segmentInfo:res) {
				segmentInfo.setStartTime(startTime);
				startTime=segmentInfo.getEndTime();
				sum+=(startTime-segmentInfo.getStartTime());
				String context = new Seacher().searchVideoContext(videoId, segmentInfo.getStartTime(),segmentInfo.getEndTime());
				List<Word> words=new ArrayList<Word>();
				int i=0;
				Set<String> set=new HashSet<String>();
				for(String s:context.split(" ")) {
					if(i>30)
						break;
					if(set.contains(s))
						continue;
					Word word=new Word();
					word.setText(s);
					word.setWeight(random.nextInt(10)+1);
					words.add(word);
					set.add(s);
					i++;
				}
				segmentInfo.setKeywords(words);
			}
			for(SegmentInfo segmentInfo:res) {
				segmentInfo.setImgPath("data/videoframes/"+videoId+"/sbd/"+segmentInfo.getEndTime()+".jpg");
				segmentInfo.setWeight((segmentInfo.getEndTime()-segmentInfo.getStartTime())/(double)sum);
			}
			
			FileUtils.writeStringToFile(new File(destPath), JsonUtils.objectToJson(res));
		}
	}
	
	@Test
	public void copySubImgs() throws IOException {
		String videos[]=new String[] {"40riCqvRoMs","F7Id9caYw-Y","xMj_P_6H69g"};
		for(String videoId:videos) {
			String srcPath="data/videoframes/"+videoId+"/sbd/";
			String destPath="E:\\videovis\\videocover\\backup\\re\\"+videoId+"\\SBD\\";
			String destDir="data/videoframes/"+videoId+"/sbd2/";
			File dest=new File(destDir);
			if(!dest.exists())
				dest.mkdirs();
			for(File file:new File(srcPath).listFiles()) {
				String time=file.getName().split("\\.")[0];
				for(File f:new File(destPath).listFiles()) {
					String time2=f.getName().substring(f.getName().lastIndexOf("\\")+1).split("_")[0];
					
					if(time2.equals(time)) {
						System.out.println(time2+":"+time);
						FileUtils.copyFile(f, new File(destDir+time+".jpg"));
					}
				}
			}
		}
		
	}
}
