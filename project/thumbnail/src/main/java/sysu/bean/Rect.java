package sysu.bean;

public class Rect implements Comparable<Rect>{
	public int x;
	public int y;
	public int w;
	public int h;
	
	public Rect(int x, int y, int w, int h) {
		super();
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
	
	public void update(int x, int y, int w, int h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	public int compareTo(Rect o) {
		return w*h>o.w*o.h?-1:1;
	}	
}