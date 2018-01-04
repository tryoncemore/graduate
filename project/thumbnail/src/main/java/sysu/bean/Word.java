package sysu.bean;

public class Word implements Comparable<Word>{
	public String text;
	public int weight;
	
	public Word() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Word(String text, int weight) {
		super();
		this.text = text;
		this.weight = weight;
	}

	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public int getWeight() {
		return weight;
	}
	public void setWeight(int weight) {
		this.weight = weight;
	}

	@Override
	public int compareTo(Word o) {
		if(this.weight>o.getWeight())
			return 1;
		else
			return -1;
	}

	
	
}
