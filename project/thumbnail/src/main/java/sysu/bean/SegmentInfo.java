package sysu.bean;

import java.util.Comparator;
import java.util.List;

public class SegmentInfo implements Comparable<SegmentInfo>{
	private String ImgPath;
	private List<Word> keywords;
	public List<Word> getKeywords() {
		return keywords;
	}
	public void setKeywords(List<Word> keywords) {
		this.keywords = keywords;
	}
	private double weight;
	private int startTime;
	public double getWeight() {
		return weight;
	}
	public void setWeight(double weight) {
		this.weight = weight;
	}
	public int getStartTime() {
		return startTime;
	}
	public void setStartTime(int startTime) {
		this.startTime = startTime;
	}
	public int getEndTime() {
		return endTime;
	}
	public void setEndTime(int endTime) {
		this.endTime = endTime;
	}
	private int endTime;
	public String getImgPath() {
		return ImgPath;
	}
	public void setImgPath(String imgPath) {
		ImgPath = imgPath;
	}

	@Override
	public int compareTo(SegmentInfo b) {
		if(this.getEndTime()>b.getEndTime())
			return 1;
		else
			return -1;
	}
}
