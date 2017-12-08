package sysu.bean;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL) 
public class VideoInfo {
	private String videoId;
	private List<Word> subtitles;
	private List<String> ocr;
	private List<MainImage> mainImages;
	private List<SubImage> subImages;
	public String getVideoId() {
		return videoId;
	}
	public void setVideoId(String videoId) {
		this.videoId = videoId;
	}
	
	public List<Word> getSubtitles() {
		return subtitles;
	}
	public void setSubtitles(List<Word> subtitles) {
		this.subtitles = subtitles;
	}
	public List<String> getOcr() {
		return ocr;
	}
	public void setOcr(List<String> ocr) {
		this.ocr = ocr;
	}
	public List<MainImage> getMainImages() {
		return mainImages;
	}
	public void setMainImages(List<MainImage> mainImages) {
		this.mainImages = mainImages;
	}
	public List<SubImage> getSubImages() {
		return subImages;
	}
	public void setSubImages(List<SubImage> subImages) {
		this.subImages = subImages;
	}
	
}
