package sysu.bean;

import java.util.List;

public class SubImage implements Comparable<SubImage>{
	private String imageName;
	private List<String> description;
	private int time;
	private String path;
	private double score;
	
	public double getScore() {
		return score;
	}
	public void setScore(double score) {
		this.score = score;
	}
	public String getImageName() {
		return imageName;
	}
	public void setImageName(String imageName) {
		this.imageName = imageName;
	}
	public List<String> getDescription() {
		return description;
	}
	public void setDescription(List<String> description) {
		this.description = description;
	}
	public int getTime() {
		return time;
	}
	public void setTime(int time) {
		this.time = time;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	@Override
	public int compareTo(SubImage s) {
		if(this.score>s.getScore())
			return -1;
		else
			return 1;
	}
	
}
