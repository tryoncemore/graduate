package sysu.bean;

public class RelativeWord implements Comparable<RelativeWord>{
	public String text;
	public double relation;
	public RelativeWord(String text, double relation) {
		super();
		this.text = text;
		this.relation = relation;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public double getRelation() {
		return relation;
	}
	public void setRelation(double relation) {
		this.relation = relation;
	}
	@Override
	public int compareTo(RelativeWord o) {
		if(this.relation>o.relation)
			return -1;
		else if(this.relation<o.relation)
			return 1;
		return 0;
	}
	
}
