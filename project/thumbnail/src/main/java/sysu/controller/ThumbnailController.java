package sysu.controller;

import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import net.coobird.thumbnailator.Thumbnails;

import sysu.bean.ImgLocation;
import sysu.bean.Rect;
import sysu.bean.RelativeWord;
import sysu.utils.JsonUtils;

@Controller("thumbnail")
public class ThumbnailController {
	private static Map<String,double[]> word2vex;
	private static Map<String,List<String>> videoKeywords;
	private static Map<String,ImgLocation> imgLocations;
	static {
		word2vex=new HashMap<String,double[]>(450000);
		videoKeywords=new HashMap<String,List<String>>();
		imgLocations=new HashMap<String,ImgLocation>();
		List<String> w2v=null;

		try {
			w2v=FileUtils.readLines(new File("data/w2v.txt"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		for(String s:w2v) {
			String[] str=s.split(" ");
			double[] vector=new double[50];
			for(int i=0;i<vector.length;i++) {
				vector[i]=Double.parseDouble(str[i+1]);
			}
			word2vex.put(str[0], vector);
		}

		try {
			for (File file : new File("data/videoKeywords/plain").listFiles()) {
				List<String> list = FileUtils.readLines(file);
				videoKeywords.put(file.getName().substring(0, 11), list);
			} 
		} catch (Exception e) {
			e.printStackTrace();
		}

		try {
			List<ImgLocation> jsonToList = JsonUtils.jsonToList(FileUtils.readFileToString(new File("data/imgLocation.json")), ImgLocation.class);
			for(ImgLocation il:jsonToList) {
				imgLocations.put(il.getVideoid(), il);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

	}
	@RequestMapping(value="/getThumbnail/{videoid}/{query}",produces="text/plain;charset=UTF-8")
	public @ResponseBody String getThumbnail(@PathVariable("videoid")String videoid,@PathVariable("query")String query,HttpServletRequest request) {
		query=query.trim();
		if(validate(query)) {
			String[] texts = findRelativeWords(query,videoKeywords.get(videoid));
			String path=generateThumbnail(texts,videoid,query,request.getServletContext().getRealPath("/"));
			return path;
		}else {
			return "/data/thumbnail/"+videoid+"/default.jpg";
		}
		
	}

	private boolean validate(String query) {
		if(StringUtils.isNotBlank(query)) {
			String[] split = query.split(" ");
			for(String s:split) {
				if(word2vex.containsKey(s))
					return true;
			}
		}
		return false;
	}

	private String generateThumbnail(String[] texts, String videoid, String query, String realPath) {
		try {
			BufferedImage major = ImageIO.read(new File("data/videoframes/"+videoid+"/main.jpg"));
			ImgLocation il=imgLocations.get(videoid);
			int x1=il.getX1();
			int x2=il.getX2();
			int width=major.getWidth();
			int height=major.getHeight();
			int padding = 10;
			int lw = x1-2*padding;
			int rw = width-x2-2*padding;
			Font font = new Font("TimesRoman", Font.BOLD,80);
			Graphics2D g = major.createGraphics();
			Map<Integer,Rect> map=new HashMap<Integer,Rect>();
			int imageCount=0;
			for(char c:il.getPos().toCharArray()) {
				String s="data/videoframes/"+videoid+"/sub"+c+".jpg";
				BufferedImage sub=ImageIO.read(new File(s));

				if(c=='1') {	
					double scale = (double)lw/sub.getWidth();
					if(scale>=0) {
						sub = Thumbnails.of(s).scale(scale).asBufferedImage();
						g.drawImage(sub, padding, padding, sub.getWidth(), sub.getHeight(), null);		
						imageCount++;
						map.put(1, new Rect(padding, padding, sub.getWidth(), sub.getHeight()));
					}
				}else if(c=='2') {
					double scale = (double)rw/sub.getWidth();
					if(scale>=0) {
						sub = Thumbnails.of(s).scale(scale).asBufferedImage();
						g.drawImage(sub, x2+padding, padding, sub.getWidth(), sub.getHeight(), null);	
						imageCount++;
						map.put(2, new Rect(x2+padding, padding, sub.getWidth(), sub.getHeight()));
					}
				}else if(c=='3') {
					double scale = (double)lw/sub.getWidth();
					if(scale>=0) {
						sub = Thumbnails.of(s).scale(scale).asBufferedImage();
						g.drawImage(sub, padding, height-padding-sub.getHeight(), sub.getWidth(), sub.getHeight(), null);	
						imageCount++;
						map.put(3, new Rect( padding, height-padding-sub.getHeight(), sub.getWidth(), sub.getHeight()));
					}
				}else {
					double scale = (double)rw/sub.getWidth();
					if(scale>=0) {
						sub = Thumbnails.of(s).scale(scale).asBufferedImage();
						g.drawImage(sub, x2+padding, height-padding-sub.getHeight(), sub.getWidth(), sub.getHeight(), null);		
						imageCount++;
						map.put(4, new Rect(x2+padding, height-padding-sub.getHeight(), sub.getWidth(), sub.getHeight()));
					}
				}
			}
			DrawText(map,g,height,width,texts,x1,x2,font);
			g.dispose();	
			System.out.println(realPath+"/WEB-INF/data/thumbnail/"+videoid+"/"+query+".jpg");
			ImageIO.write(major, "jpg", new File(realPath+"/WEB-INF/data/thumbnail/"+videoid+"/"+query+".jpg"));

		} catch (IOException e) {
			e.printStackTrace();
		}
		return "/data/thumbnail/"+videoid+"/"+query+".jpg";
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

	public String[] findRelativeWords(String query, List<String> list) {
		String[] queries=query.split(" ");
		String[] res=new String[10];
		TreeSet<RelativeWord> set=new TreeSet<RelativeWord>();
		for(String s:list) {
			set.add(new RelativeWord(s, computerRelation(s.split(" "),queries)));
		}
		int count=Math.max(10, set.size());
		for(int i=0;i<10;i++)
			res[i]=set.pollFirst().getText();
		return res;
	}

	private double computerRelation(String[] videowords, String[] queries) {
		double sum=0d;
		//map videowords to queries
		for(String s1:videowords) {
			if(word2vex.containsKey(s1)) {
				double max=0d;
				for(String s2:queries) {
					if(word2vex.containsKey(s2)) {
						double score=computerRelationScore(s1,s2);
						if(score>max) {
							max=score;
						}
					}
				}
				sum+=max;
			}
		}

		//map queries to videowords
		for(String s1:queries) {
			if(word2vex.containsKey(s1)) {
				double max=0d;
				for(String s2:videowords) {
					if(word2vex.containsKey(s2)) {
						double score=computerRelationScore(s1,s2);
						if(score>max) {
							max=score;
						}
					}
				}
				sum+=max;
			}
		}
		return sum/(videowords.length+queries.length);
	}

	private double computerRelationScore(String s1, String s2) {
		double[] d1=word2vex.get(s1);
		double[] d2=word2vex.get(s2);
		double a=0d;
		double b=0d;
		double c=0d;
		for(int i=0;i<d1.length;i++) {
			a+=d1[i]*d2[i];
			b+=d1[i]*d1[i];
			c+=d2[i]*d2[i];
		}
		return a/Math.sqrt(b*c);
	}

}
