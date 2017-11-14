package sysu.utils;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.junit.Test;

public class ProcessKeyword {
	@Test
	public void json2plain() throws IOException {
		for(File file:new File("data/videoKeywords/json").listFiles()) {
			List<Word> list=JsonUtils.jsonToList(FileUtils.readFileToString(file), Word.class);
			List<String> words=new ArrayList<String>();
			for(Word word:list) {
				words.add(word.getText());
			}
			FileUtils.writeLines(new File("data/videoKeywords/plain/"+file.getName().substring(0, 11)+".txt"), words);
		}
//		Word word1=new Word("potentially revolutionary technologies", 9);
//		Word word2=new Word("potentially revolutionary technologies", 9);
//		List<Word> list=new ArrayList<Word>();
//		list.add(word1);
//		list.add(word2);
//		
//		//System.out.println(JsonUtils.objectToJson(list));
//		List<Word> jsonToList = JsonUtils.jsonToList(JsonUtils.objectToJson(list), Word.class);
//		System.out.println(jsonToList.size());
	}
	

}
