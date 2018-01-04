package sysu.unittest;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeSet;

import org.apache.commons.io.FileUtils;
import org.junit.Test;

import sysu.bean.RelativeWord;

public class Word2VexTest {
	@Test
	public void showRelatedWords() {
		String[] texts=new String[] {"computer","frog","human","apple","movie"
				,"network","smile","music","history","language"};	
		
		Map<String,double[]> word2vex=new HashMap<String,double[]>(450000);
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
		
		for(String s:texts) {
			System.out.print(s+":");
			double[] d1 = word2vex.get(s);
			TreeSet<RelativeWord> set=new TreeSet<RelativeWord>();
			for(Entry<String, double[]> entry:word2vex.entrySet()) {
				String word=entry.getKey();
				double[] d2 = entry.getValue();
				double a=0d;
				double b=0d;
				double c=0d;
				for(int i=0;i<d1.length;i++) {
					a+=d1[i]*d2[i];
					b+=d1[i]*d1[i];
					c+=d2[i]*d2[i];
				}
				set.add(new RelativeWord(word,a/Math.sqrt(b*c)));
			}
			Iterator<RelativeWord> iterator = set.iterator();
			int i=0;
			while(iterator.hasNext()) {
				if(i>10)
					break;
				System.out.print(iterator.next().getText()+",");
				i++;
			}
			System.out.println();
		}
	}
}
