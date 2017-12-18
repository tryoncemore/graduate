package sysu.unittest;

import org.junit.Test;

import sysu.service.ClusterService;

public class LunceneTest {
	@Test
	public void testVideoInfo() {
		String kw="deep learning";
		ClusterService cs = new ClusterService();
		String cluster = cs.cluster(kw);
		System.out.println(cluster);
	}

}
