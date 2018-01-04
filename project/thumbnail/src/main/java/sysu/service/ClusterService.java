package sysu.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.io.FileUtils;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.index.CorruptIndexException;
import org.apache.lucene.queryParser.QueryParser;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.util.Version;
import org.carrot2.clustering.lingo.LingoClusteringAlgorithm;
import org.carrot2.clustering.lingo.LingoClusteringAlgorithmDescriptor;
import org.carrot2.core.Cluster;
import org.carrot2.core.Controller;
import org.carrot2.core.ControllerFactory;
import org.carrot2.core.ProcessingResult;
import org.carrot2.core.attribute.CommonAttributesDescriptor;
import org.springframework.stereotype.Service;

import sysu.bean.TreeNode;
import sysu.bean.Video;
import sysu.utils.JsonUtils;
import sysu.utils.Seacher;

@Service("clusterService")
public class ClusterService {
	private static Set<String> set=new HashSet<String>();
	private static Map<String,double[]> word2vex;
	static{
		set.add("Fall");
		set.add("LECTURE");
		set.add("Individual");
		set.add("Event");
		set.add("Introduction");
		set.add("Definitions");
		set.add("See also");
		set.add("References");
		set.add("Further reading");
		set.add("External links");
		set.add("Other");
		set.add("History");
		set.add("Characteristics");
		set.add("Notes");
		set.add("Years");
		set.add("TED");
		set.add("Interpretations");
		set.add("Khan");
		set.add("concepts");
		set.add("Computer Science");
		set.add("Etymology");
		word2vex=new HashMap<String,double[]>(450000);
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
	}

	public String cluster(String keyword){
		List<TreeNode> res=new ArrayList<TreeNode>();
		try {
			//wiki cluster label
			IndexSearcher searcher = new Seacher().getWikiSearcher();
			QueryParser parser = new QueryParser(Version.LUCENE_35, "name", new StandardAnalyzer(Version.LUCENE_35));
			Query query = parser.parse(keyword);
			TopDocs tds = searcher.search(query, 5);
			
			for(ScoreDoc sd:tds.scoreDocs) {
				Document doc = searcher.doc(sd.doc);
				//System.out.println(doc.get("name"));
				if(doc.get("name").trim().equalsIgnoreCase(keyword)){
					
					String[] category=doc.get("category").split("#");
					
					int c = 0;
					//System.out.println(filter.size());
					for(String s:category){
						if(c>15)
							break;
						if(isLabel(s)) {
							TreeNode t=new TreeNode();
							t.setLabel(s);
							res.add(t);
							c++;
						}
					}
					break;
				}
			}
			searcher.close();
			
			//carrot cluster label
			searcher = new Seacher().getVideoInfoSearcher();
			parser = new QueryParser(Version.LUCENE_35, "index", new StandardAnalyzer(Version.LUCENE_35));
			query = parser.parse(keyword);
			tds = searcher.search(query, 500);
			List<Video> videos=new ArrayList<Video>();
 			for(ScoreDoc sd:tds.scoreDocs) {
				Document doc = searcher.doc(sd.doc);
				Video v=new Video();
				v.setVideoid(doc.get("id"));
				v.setTitle(doc.get("title"));
				v.setDescription(doc.get("description"));
				v.setWordnet(doc.get("wordnet"));
				videos.add(v);
			}
 			searcher.close();
 			
 			//begin carrot cluster
			final ArrayList<org.carrot2.core.Document> documents = new ArrayList<org.carrot2.core.Document>();
			for (Video v : videos)
			{       	
				documents.add(new org.carrot2.core.Document(v.getTitle(),v.getDescription()));
			}
			List<Cluster> cluster = carrot(documents);
			int count =res.size();
			System.out.println(count);
			for(Cluster c : cluster) {
				if(count>15)
					break;
				if(isLabel(c.getLabel())) {
					TreeNode t = new TreeNode();
					t.setLabel(c.getLabel());
					res.add(t);
					count++;
				}
			}

			//compute relationship
			for(TreeNode t :res) {
				t.setWeight(computerRelation(t.getLabel().split(" "), keyword.split(" ")));
			}
			
		}catch (CorruptIndexException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		String ret=JsonUtils.objectToJson(res);
		return ret;
	}
	
	


	public List<Cluster> carrot(List<org.carrot2.core.Document> documents){

		final Controller controller = ControllerFactory.createSimple();
		final Map<String, Object> attributes = new HashMap<String, Object>();
		CommonAttributesDescriptor
		.attributeBuilder(attributes)
		.query("data mining")
		.documents(documents);
		LingoClusteringAlgorithmDescriptor
		.attributeBuilder(attributes)
		.desiredClusterCountBase(5);
		final ProcessingResult byTopicClusters = controller.process(attributes,
				LingoClusteringAlgorithm.class);
		final List<Cluster> clustersByTopic = byTopicClusters.getClusters();
		return clustersByTopic;
	}
	
	private boolean isLabel(String s) {
		boolean flag = true;
		for(String str:set) {
			if(s.contains(str)) {
				flag=false;
				break;
			}
				
		}
		return flag;
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


