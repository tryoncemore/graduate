package sysu.utils;

import java.io.File;
import java.io.IOException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.TreeSet;
import java.util.regex.Pattern;

import org.apache.commons.io.FileUtils;
import org.junit.Test;

public class ProcessW2V {
	@Test
	public void process() throws IOException {
		List<String> list=FileUtils.readLines(new File("E:\\videovis\\resource\\glove.6B.50d.txt"));
		Set<String> set=new HashSet<String>();
		set.addAll(FileUtils.readLines(new File("E:\\videovis\\resource\\stopwords.txt")));
		Pattern p=Pattern.compile("\\p{Alpha}{4,}");
		List<String> res=new ArrayList<String>();
		for(String s:list) {
			String word=s.split(" ")[0];
			if(p.matcher(word).matches()) {
				res.add(s);
			}
		}
		FileUtils.writeLines(new File("E:\\videovis\\resource\\w2v.txt"), res);
 	}
	
	@Test
	public void testRegex() {
		Pattern p=Pattern.compile("\\p{Alpha}{4,}");
		String[] words=new String[]{"good","fos,","1sfsf","our's","!efe"}; 
		for(String s:words) {
			System.out.println(s+":"+p.matcher(s).matches());
		}
	}
	
	@Test
	public void testCompute() {
		double a=0.66749;
		double b=-1.12972;
		DecimalFormat df = new DecimalFormat("######0.000");   
		double c=Double.parseDouble(df.format(a));
		double d=Double.parseDouble(df.format(b));
		System.out.println(c);
		System.out.println(d);
		
		String e="-1.12972";
		String f="0.88724";
		String result = e.format("%.3f");
		a=Double.parseDouble(result);
		System.out.println(a);
	}
	
	@Test
	public void mergeStopWords() throws IOException {
		Set<String> set=new HashSet<String>();
		set.addAll(FileUtils.readLines(new File("E:\\videovis\\resource\\stopwords\\ENstopwords.txt")));
		set.addAll(FileUtils.readLines(new File("E:\\videovis\\resource\\stopwords\\ENstopwords891.txt")));
		set.addAll(FileUtils.readLines(new File("E:\\videovis\\resource\\stopwords\\stop_words_eng.txt")));
		set.addAll(FileUtils.readLines(new File("E:\\videovis\\resource\\SmartStoplist.txt")));
		System.out.println(set.size());
		FileUtils.writeLines(new File("E:\\videovis\\resource\\stopwords.txt"), set);
	}
	
	@Test
	public void findSimilarWord() throws IOException {
		String[] words=new String[] {"computer","learning","toxicity","research","network"};
		Map<String,double[]> map=new HashMap<String,double[]>(450000);
		List<String> w2v=FileUtils.readLines(new File("E:\\videovis\\resource\\w2v.txt"));
		for(String s:w2v) {
			String[] str=s.split(" ");
			double[] vector=new double[50];
			for(int i=0;i<vector.length;i++) {
				vector[i]=Double.parseDouble(str[i+1]);
			}
			map.put(str[0], vector);
		}
		for(String s:words) {
			if(map.containsKey(s)) {
				System.out.print(s+":");
				double[] d1 = map.get(s);
				TreeSet<WordNode> set=new TreeSet<WordNode>();
				for(Entry<String, double[]> entry:map.entrySet()) {
					double[] d2=entry.getValue();
					double similarity=computeSimilarity(d1,d2);
					set.add(new WordNode(entry.getKey(), similarity));
				}
				for(int i=0;i<10;i++) {
					System.out.print(set.pollFirst().word+",");
				}
				System.out.println();
			}else {
				System.out.println("not found!");
			}
			
		}
	}
	
	private double computeSimilarity(double[] d1, double[] d2) {
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

	
	class WordNode implements Comparable<WordNode>{
		public String word;
		double similarity;
		public WordNode(String word, double similarity) {
			super();
			this.word = word;
			this.similarity = similarity;
		}
		@Override
		public int compareTo(WordNode o) {
			if(this.similarity>o.similarity)
				return -1;
			else if(this.similarity<o.similarity)
				return 1;
			return 0;
		}
		
	}
	

}
