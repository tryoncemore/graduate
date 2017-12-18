package sysu.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.lucene.document.Document;
import org.apache.lucene.index.CorruptIndexException;
import org.apache.lucene.index.Term;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TermQuery;
import org.apache.lucene.search.TopDocs;
import org.springframework.stereotype.Service;

import sysu.utils.JsonUtils;
import sysu.utils.Seacher;

@Service("relatedWordsService")
public class RelatedWordsService {
	public String getRelatedWords(String keyword){
		List<String> res=new ArrayList<String>();
		try {
			IndexSearcher searcher = new Seacher().getWikiSearcher();
			Query query = new TermQuery(new Term("name",keyword));
			TopDocs tds = searcher.search(query,6);
			for(ScoreDoc sd:tds.scoreDocs) {
				Document doc = searcher.doc(sd.doc);
				res.add(doc.get("name"));
			}
		}catch (CorruptIndexException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return JsonUtils.objectToJson(res);
	}

}
