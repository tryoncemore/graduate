package sysu.unittest;

import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.TreeSet;

import javax.imageio.ImageIO;

import org.apache.commons.io.FileUtils;
import org.junit.Test;

import net.coobird.thumbnailator.Thumbnails;
import sysu.bean.ImgLocation;
import sysu.bean.Rect;
import sysu.utils.JsonUtils;

public class ThumbnailTest {
	private static Map<String,ImgLocation> imgLocations;
	private static String[] text=new String[] {"14","23","123","234","134","124","1234"};
	static {
		imgLocations=new HashMap<String,ImgLocation>();

		try {
			List<ImgLocation> jsonToList = JsonUtils.jsonToList(FileUtils.readFileToString(new File("data/imgLocation.json")), ImgLocation.class);
			for(ImgLocation il:jsonToList) {
				imgLocations.put(il.getVideoid(), il);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	@Test
	public void testThumbnail() {
		generateThumbnail(new String[] {"qixin","computer science","cellphone mobile","video games","coffee tea water","yinxin computer","40riCqvRoMs"}, "F7Id9caYw-Y");
	}

	private String generateThumbnail(String[] texts, String videoid) {
		try {
			BufferedImage major = ImageIO.read(new File("data/videoframes/"+videoid+"/main.jpg"));
			ImgLocation il=imgLocations.get(videoid);
			int x1=il.getX1();
			int x2=il.getX2();
			int width=major.getWidth();
			int height=major.getHeight();
			int padding = 10;
			Font font = new Font("TimesRoman", Font.BOLD,80);
			Graphics2D g = major.createGraphics();
			Map<Integer,Rect> map=new HashMap<Integer,Rect>();
			Random random=new Random();
			String layout=text[random.nextInt(7)];
			String randomSubs=getRandomSubs(6,layout.length());
			int subpos[][]=new int[4][2];
			subpos[0][0]=x1-2*padding;subpos[0][1]=height;
			subpos[1][0]=width-x2-2*padding;subpos[1][1]=height;
			subpos[2][0]=x1-2*padding;subpos[2][1]=height;
			subpos[3][0]=width-x2-2*padding;subpos[3][1]=height;

			for(int i=0;i<layout.length();i++) {
				char c=layout.charAt(i);
				String s="data/videoframes/"+videoid+"/sub"+randomSubs.charAt(i)+".jpg";
				BufferedImage sub=ImageIO.read(new File(s));

				if(c=='1') {	
					double scalex = (double)subpos[0][0]/sub.getWidth();
					double scaley = (double)subpos[0][1]/sub.getHeight();
					double scale=Math.min(scalex, scaley);
					if(scale>0.1&&scale<1.7) {
						sub = Thumbnails.of(s).scale(scale).asBufferedImage();
						subpos[2][1]=height-sub.getHeight()-3*padding;
						g.drawImage(sub, padding, padding, sub.getWidth(), sub.getHeight(), null);		
						map.put(1, new Rect(padding, padding, sub.getWidth(), sub.getHeight()));
					}


				}else if(c=='2') {
					double scalex = (double)subpos[1][0]/sub.getWidth();
					double scaley = (double)subpos[1][1]/sub.getHeight();
					double scale=Math.min(scalex, scaley);
					if(scale>0.1&&scale<1.7) {
						sub = Thumbnails.of(s).scale(scale).asBufferedImage();
						subpos[3][1]=height-sub.getHeight()-3*padding;
						g.drawImage(sub, x2+padding, padding, sub.getWidth(), sub.getHeight(), null);	
						map.put(2, new Rect(x2+padding, padding, sub.getWidth(), sub.getHeight()));
					}


				}else if(c=='3') {
					double scalex = (double)subpos[2][0]/sub.getWidth();
					double scaley = (double)subpos[2][1]/sub.getHeight();
					double scale=Math.min(scalex, scaley);
					if(scale>0.1&&scale<1.7) {
						sub = Thumbnails.of(s).scale(scale).asBufferedImage();
						subpos[0][1]=height-sub.getHeight()-3*padding;
						g.drawImage(sub, padding, height-padding-sub.getHeight(), sub.getWidth(), sub.getHeight(), null);	
						map.put(3, new Rect( padding, height-padding-sub.getHeight(), sub.getWidth(), sub.getHeight()));
					}


				}else {
					double scalex = (double)subpos[3][0]/sub.getWidth();
					double scaley = (double)subpos[3][1]/sub.getHeight();
					double scale=Math.min(scalex, scaley);
					if(scale>0.1&&scale<1.7) {
						sub = Thumbnails.of(s).scale(scale).asBufferedImage();
						subpos[1][1]=height-sub.getHeight()-3*padding;
						g.drawImage(sub, x2+padding, height-padding-sub.getHeight(), sub.getWidth(), sub.getHeight(), null);		
						map.put(4, new Rect(x2+padding, height-padding-sub.getHeight(), sub.getWidth(), sub.getHeight()));
					}


				}
			}
			DrawText(map,g,height,width,texts,x1,x2,font);
			g.dispose();	
			ImageIO.write(major, "jpg", new File("E://test.jpg"));

		} catch (IOException e) {
			e.printStackTrace();
		}
		return "success";
	}

	private String getRandomSubs(int subbum,int num) {
		Set<Integer> set=new HashSet<Integer>();
		Random random=new Random();
		StringBuilder sb=new StringBuilder();
		while(num>0) {
			int r;
			while(true) {
				r=random.nextInt(subbum);
				if(set.contains(r))
					continue;
				else {
					set.add(r);
					break;
				}
					
			}
			sb.append(r+"");
			num--;
		}
		return sb.toString();
	}
	
	@Test
	public void testRandomSubs() {
		System.out.println(getRandomSubs(9, 5));
	}

	private void DrawText(Map<Integer, Rect> map, Graphics2D g, int height, int width, String[] texts, int x1, int x2, Font font) {
		int h1=0;
		int h2=0;
		int h3=0;
		int h4=0;
		int y1=0;
		int y2=0;
		int lcp=0;
		int rcp=0;
		int padding=10;
		if(map.containsKey(1)) {
			h1=map.get(1).h;
			y1=h1+padding;
			lcp++;
		}
		if(map.containsKey(2)) {
			h2=map.get(2).h;
			y2=h2+padding;
			rcp++;
		}
		if(map.containsKey(3)) {
			h3=map.get(3).h;
			lcp++;
		}
		if(map.containsKey(4)) {
			h4=map.get(4).h;
			rcp++;
		}
		int lh =height-h1-h3-lcp*padding;
		int rh =height-h2-h4-rcp*padding;
		//g.drawRect(0, y1, x1-padding, lh);
		//g.drawRect(x2,y2,width-x2,rh);
		Set<Rect> rects = new TreeSet<Rect>();
		rects.add(new Rect(0, y1, x1-padding, lh));
		rects.add(new Rect(x2,y2,width-x2,rh));
		int fontsize=80;
		int colorCount = 0;

		for(String s:texts) {
			for(Rect r:rects) {
				g.setColor(Color.WHITE);
				if(DrawString(g,r,s,fontsize,font)) {
					//colorCount=(colorCount+1)%harmonyColors.length;
					fontsize = fontsize-2;
					break;
				}					
			}
		}

	}

	private boolean DrawString(Graphics2D g, Rect r, String s,int fontsize, Font font) {
		if(r.h<22)
			return false;

		//g.setColor(RandomColorUtil.randomColor());
		while(fontsize>=1) {
			font = font.deriveFont(Font.BOLD, fontsize);
			g.setFont(font);
			FontMetrics fm = g.getFontMetrics();
			int tw=fm.stringWidth(s);
			int th=fm.getHeight();
			if(tw<=r.w&&th<=r.h) {
				g.drawString(s, r.x, r.y+fm.getAscent());
				r.update(r.x, r.y+fm.getHeight()+5, r.w, r.h-(fm.getHeight()+5));
				return true;
			}else {
				String[] strs = s.split(" ");
				if(strs.length==2) {
					tw=Math.max(fm.stringWidth(strs[0]), fm.stringWidth(strs[1]));
					th=2*(fm.getHeight()+5);
					if(tw<=r.w&&th<=r.h) {
						g.drawString(strs[0], r.x, r.y+fm.getAscent());
						g.drawString(strs[1], r.x, r.y+fm.getAscent()*2+5);
						r.update(r.x, r.y+2*(fm.getHeight()+5), r.w, r.h-(fm.getHeight()+5)*2);
						return true;
					}	
				}else if(strs.length==3) {
					//两行
					tw=Math.max(fm.stringWidth(strs[0]+" "+strs[1]), fm.stringWidth(strs[2]));
					th=2*(fm.getHeight()+5);
					if(tw<=r.w&&th<=r.h) {
						g.drawString(strs[0]+" "+strs[1], r.x, r.y+fm.getAscent());
						g.drawString(strs[2], r.x, r.y+fm.getAscent()*2+5);
						r.update(r.x, r.y+2*(fm.getHeight()+5), r.w, r.h-(fm.getHeight()+5)*2);
						return true;
					}else {
						//3行
						tw = Math.max(fm.stringWidth(strs[0]), fm.stringWidth(strs[1]));
						tw = Math.max(tw, fm.stringWidth(strs[2]));
						th=3*(fm.getHeight()+5);
						if(tw<=r.w&&th<=r.h) {
							g.drawString(strs[0], r.x, r.y+fm.getAscent());
							g.drawString(strs[1], r.x, r.y+fm.getAscent()*2+5);
							g.drawString(strs[2], r.x, r.y+fm.getAscent()*3+10);
							r.update(r.x, r.y+3*(fm.getHeight()+5), r.w, r.h-(fm.getHeight()+5)*3);
							return true;
						}		
					}
				}
			}
			fontsize = fontsize-2;
		}
		return false;
	}

}
