package sysu.bean;

import java.util.List;

public class TreeNode {
	public String label;
	public List<TreeNode> groups;
	public double weight;
	public List<String> indexs;

	public List<String> getIndexs() {
		return indexs;
	}
	public void setIndexs(List<String> indexs) {
		this.indexs = indexs;
	}
	public double getWeight() {
		return weight;
	}
	public void setWeight(double weight) {
		this.weight = weight;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public List<TreeNode> getGroups() {
		return groups;
	}
	public void setGroups(List<TreeNode> groups) {
		this.groups = groups;
	}
}
