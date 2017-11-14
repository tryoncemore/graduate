package sysu.unittest;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.junit.Test;

import sysu.controller.ThumbnailController;

public class ControllerTest {
	@Test
	public void testText() throws IOException {
		ThumbnailController thumbnailController = new ThumbnailController();
		String[] findRelativeWords = thumbnailController.findRelativeWords("artificial intelligence", FileUtils.readLines(new File("data/videoKeywords/plain/40riCqvRoMs.txt")));
		for(String s:findRelativeWords)
			System.out.println(s);
		System.out.println("-----------------------------");
		findRelativeWords = thumbnailController.findRelativeWords("big data", FileUtils.readLines(new File("data/videoKeywords/plain/40riCqvRoMs.txt")));
		for(String s:findRelativeWords)
			System.out.println(s);
	}
	
	@Test
	public void testThumbnail() {
		ThumbnailController thumbnailController = new ThumbnailController();
		//thumbnailController.getThumbnail("40riCqvRoMs", "artificial intelligence");
	}
}
