package sysu.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import sysu.service.ClusterService;
import sysu.service.RelatedWordsService;

@Controller
public class ClusterController {
	
	@Autowired
	@Qualifier("relatedWordsService")
	private RelatedWordsService rws;
	
	@Autowired
	@Qualifier("clusterService")
	private ClusterService cs;

	@RequestMapping("/tocluster")
	public void toCluster(HttpServletRequest resq,HttpServletResponse resp) throws ServletException, IOException{
		
		resq.getRequestDispatcher("/WEB-INF/views/cluster.jsp").forward(resq, resp);
	}
	
	@RequestMapping("/toVideo")
	public void toVideo(HttpServletRequest resq,HttpServletResponse resp) throws ServletException, IOException{
		System.out.println("tovideo");
		resq.getRequestDispatcher("/WEB-INF/views/video.jsp").forward(resq, resp);
	}
	
	@RequestMapping(value="/getRelatedWords",produces="text/plain;charset=UTF-8")
	public @ResponseBody String getRelatedWords(String key){
		System.out.println(key);
		String cluster = rws.getRelatedWords(key);
		System.out.println(cluster);
		return cluster;
	}
	
	@RequestMapping(value="/cluster",produces="text/plain;charset=UTF-8")
	public @ResponseBody String cluster(String key){
		String cluster = cs.cluster(key);
		System.out.println("cluster");
		return cluster;
	}
	
	
}
