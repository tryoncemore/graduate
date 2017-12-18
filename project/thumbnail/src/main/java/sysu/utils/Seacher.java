package sysu.utils;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.lucene.document.Document;
import org.apache.lucene.index.CorruptIndexException;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.index.Term;
import org.apache.lucene.search.BooleanClause.Occur;
import org.apache.lucene.search.BooleanQuery;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.NumericRangeQuery;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TermQuery;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.junit.Test;

public class Seacher {
	private Directory directory;
	private Directory wikiDirectory;
	private Directory videoInfoDirectory;
	private IndexReader reader;
	public Seacher() {
		try {
			directory = FSDirectory.open(new File("data/lucene/vtts/"));
			wikiDirectory = FSDirectory.open(new File("data/indexs/wikiIndexs"));
			videoInfoDirectory = FSDirectory.open(new File("data/indexs/videoIndexs_v3"));

		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public IndexSearcher getSearcher() {
		try {
			if(reader==null) {
				reader = IndexReader.open(directory);
			} else {
				IndexReader tr = IndexReader.openIfChanged(reader);
				if(tr!=null) {
					reader.close();
					reader = tr;
				}
			}
			return new IndexSearcher(reader);
		} catch (CorruptIndexException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public IndexSearcher getWikiSearcher() {
		try {
			if(reader==null) {
				reader = IndexReader.open(wikiDirectory);
			} else {
				IndexReader tr = IndexReader.openIfChanged(reader);
				if(tr!=null) {
					reader.close();
					reader = tr;
				}
			}
			return new IndexSearcher(reader);
		} catch (CorruptIndexException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public IndexSearcher getVideoInfoSearcher() {
		try {
			if(reader==null) {
				reader = IndexReader.open(videoInfoDirectory);
			} else {
				IndexReader tr = IndexReader.openIfChanged(reader);
				if(tr!=null) {
					reader.close();
					reader = tr;
				}
			}
			return new IndexSearcher(reader);
		} catch (CorruptIndexException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public IndexSearcher getSearcher(Directory directory) {
		try {
			if(reader==null) {
				reader = IndexReader.open(directory);
			} else {
				IndexReader tr = IndexReader.openIfChanged(reader);
				if(tr!=null) {
					reader.close();
					reader = tr;
				}
			}
			return new IndexSearcher(reader);
		} catch (CorruptIndexException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@Test
	public String searchVideoContext(String videoId,int time) throws IOException {
		IndexSearcher searcher=getSearcher();
		Query videoIdQuery=new TermQuery(new Term("videoId", videoId)) ;
		NumericRangeQuery<Integer> beginQuery = NumericRangeQuery.newIntRange("begintime",Integer.MIN_VALUE, time, true, true);
		NumericRangeQuery<Integer> endQuery = NumericRangeQuery.newIntRange("endtime", time, Integer.MAX_VALUE, true, true);
		
		BooleanQuery booleanQuery=new BooleanQuery();
		booleanQuery.add(videoIdQuery, Occur.MUST);
		booleanQuery.add(beginQuery, Occur.MUST);
		booleanQuery.add(endQuery, Occur.MUST);
		
		TopDocs topDocs = searcher.search(booleanQuery,null, 1); 
		List<String> res=new ArrayList<String>();
		for(ScoreDoc sd:topDocs.scoreDocs) {
			Document doc=searcher.doc(sd.doc);
			res.add(doc.get("context"));
		}
		if(res.size()>0) {
			String result="";
			for(String s:res) {
				s=s.trim()+" ";
				result+=s;
			}
			return result.trim();
		}
		else
			return "";
	}
	
	@Test
	public String searchVideoContext(String videoId,int startTime,int endTime) throws IOException {
		IndexSearcher searcher=getSearcher();
		Query videoIdQuery=new TermQuery(new Term("videoId", videoId)) ;
		NumericRangeQuery<Integer> beginQuery = NumericRangeQuery.newIntRange("begintime",startTime, endTime, true, true);
		NumericRangeQuery<Integer> endQuery = NumericRangeQuery.newIntRange("endtime", startTime, endTime, true, true);
		
		BooleanQuery booleanQuery=new BooleanQuery();
		booleanQuery.add(videoIdQuery, Occur.MUST);
		booleanQuery.add(beginQuery, Occur.MUST);
		booleanQuery.add(endQuery, Occur.MUST);
		
		TopDocs topDocs = searcher.search(booleanQuery,null, 10); 
		List<String> res=new ArrayList<String>();
		for(ScoreDoc sd:topDocs.scoreDocs) {
			Document doc=searcher.doc(sd.doc);
			res.add(doc.get("context"));
		}
		if(res.size()>0) {
			String result="";
			for(String s:res) {
				s=s.trim()+" ";
				result+=s;
			}
			return result.trim();
		}
		else
			return "";
	}
	
	public static void main(String[] args) {
		try {
			new Seacher().searchVideoContext("40riCqvRoMs", 706);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
