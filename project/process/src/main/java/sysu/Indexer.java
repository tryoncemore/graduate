package sysu;

import java.beans.beancontext.BeanContext;
import java.io.File;
import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;

import org.apache.commons.io.FileUtils;
import org.apache.lucene.analysis.TokenStream;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.analysis.tokenattributes.CharTermAttribute;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.NumericField;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.apache.lucene.util.Version;
import org.junit.Test;

public class Indexer {
	private static Directory directory = null;
	static{
		try {
			directory = FSDirectory.open(new File("data/lucene/vtts/"));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static Directory getDirectory() {
		return directory;
	}
	
	@Test
	public static void index() {
		IndexWriter writer = null;
		try {
			writer = new IndexWriter(directory, new IndexWriterConfig(Version.LUCENE_35, new StandardAnalyzer(Version.LUCENE_35)));
			writer.deleteAll();
			for(File file:new File("data/vtts/").listFiles()) {
				String videoId=file.getName();
				ArrayList<String> lines = (ArrayList<String>) FileUtils.readLines(file);
				for(int i=0;i<4;i++)
					lines.remove(0);
				int pretime=0;
				for(int i=0;i<lines.size();i++) {
					String str=lines.get(i);
					int time = parseTime(str.substring(0, 30));
					
					String content = analyzer(str.substring(30));
					if(i+1<lines.size())
						content+=analyzer(lines.get(i+1).substring(30));
					if(i-1>-1)
						content+=analyzer(lines.get(i-1).substring(30));
					Document doc=new Document();
					doc.add(new Field("videoId",videoId,Field.Store.YES,Field.Index.NOT_ANALYZED));
					doc.add(new NumericField("begintime",Field.Store.YES,true).setIntValue(pretime));
					doc.add(new NumericField("endtime",Field.Store.YES,true).setIntValue(time));
					doc.add(new Field("context",content,Field.Store.YES,Field.Index.NOT_ANALYZED));
					System.out.println(pretime+" "+time+" "+content);
					writer.addDocument(doc);
					pretime=time;
				}
			}
			writer.commit();
		} catch (Exception e) {
			
		}
	}

	private static int parseTime(String time) {
		String[] split = time.split("-->");
		char[] endtime = split[1].trim().toCharArray();
		return (endtime[0]-'0')*10*3600+(endtime[1]-'0')*3600+(endtime[3]-'0')*10*60+(endtime[4]-'0')*60+(endtime[6]-'0')*10+(endtime[7]-'0');
	}
	
	private static String analyzer(String str) {
		StandardAnalyzer analyzer=new StandardAnalyzer(Version.LUCENE_35);
		TokenStream stream = analyzer.tokenStream("content", new StringReader(str));
		CharTermAttribute attribute=stream.addAttribute(CharTermAttribute.class);
		StringBuilder sb=new StringBuilder();
		try {
			while(stream.incrementToken()) {
				if(!Stopwords.isStopword(attribute.toString())&&attribute.toString().length()>3)
					sb.append(attribute.toString()+" ");
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		return sb.toString();
	}
	
	public static void main(String[] args) {
		//System.out.println(parseTime("00:17:53.394 --> 00:17:57.179"));
		index();
	}
}
