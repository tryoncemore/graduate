package sysu.process;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.io.FileUtils;
import org.junit.Test;

import sysu.bean.ImgLocation;
import sysu.bean.MainImage;
import sysu.bean.SubImage;
import sysu.bean.VideoInfo;
import sysu.bean.Word;
import sysu.utils.JsonUtils;
import sysu.utils.Seacher;

public class GenerateVideoInfos {
	List<VideoInfo> res=new ArrayList<VideoInfo>();
	Seacher seacher = new Seacher();
	@Test
	public void generate() throws IOException {
		Pattern pattern = Pattern.compile("sub(\\d+)\\.jpg");
		Pattern pattern1 = Pattern.compile("main(\\d+)\\.jpg");
		Map<String,ImgLocation> imgLocations = new HashMap<String,ImgLocation>();
		List<ImgLocation> jsonToList = JsonUtils.jsonToList(FileUtils.readFileToString(new File("data/imgLocation.json")), ImgLocation.class);
		for(ImgLocation il:jsonToList) {
			imgLocations.put(il.getVideoid(), il);
		}
		for(File f:new File("data/videoframes/").listFiles()) {
			String videoId=f.getName();
			
			VideoInfo videoInfo = new VideoInfo();
			//videoId
			videoInfo.setVideoId(videoId);
			//subimage 
			List<SubImage> subImages = new ArrayList<SubImage>();
			for(File image:f.listFiles()) {
				if(image.getName().startsWith("sub")) {
					SubImage subImage = new SubImage();
					subImage.setImageName(image.getName());
					Matcher matcher = pattern.matcher(image.getName());
					matcher.find();
					int time = Integer.parseInt(matcher.group(1));
					subImage.setTime(time);
					String context = seacher.searchVideoContext(videoId, time);
					List<String> description=new ArrayList<String>();
					for(String word:context.split(" ")) {
						description.add(word);
					}
					subImage.setDescription(description);
					subImage.setPath("data/videoframes/"+videoId+"/"+image.getName());
					subImages.add(subImage);
				}
			}
			videoInfo.setSubImages(subImages);
			//subtitles
			List<Word> subtitles=JsonUtils.jsonToList(FileUtils.readFileToString(new File("data/videoKeywords/json/"+videoId+".json")), Word.class);
			videoInfo.setSubtitles(subtitles);
			//mainimage
			List<MainImage> mainImages = new ArrayList<MainImage>();
			for(File image:f.listFiles()) {
				if(image.getName().startsWith("main")) {
					MainImage mainImage = new MainImage();
					
					Matcher matcher = pattern1.matcher(image.getName());
					matcher.find();
					int time = Integer.parseInt(matcher.group(1));
					mainImage.setPath("data/videoframes/"+videoId+"/"+image.getName());
					mainImage.setImageName(image.getName());
					ImgLocation imgLocation = imgLocations.get(videoId);
					mainImage.setFixedpos(imgLocation.getPos());
					mainImage.setX1(imgLocation.getX1());
					mainImage.setX2(imgLocation.getX2());
					String context = seacher.searchVideoContext(videoId, time);
					List<String> description=new ArrayList<String>();
					for(String word:context.split(" ")) {
						description.add(word);
					}
					mainImage.setTime(time);
					mainImage.setDescription(description);
					mainImages.add(mainImage);
				}
			}
			videoInfo.setMainImages(mainImages);
			FileUtils.writeStringToFile(new File("data/videoinfos/"+videoId+".json"), JsonUtils.objectToJson(videoInfo));

		}
	}
}
