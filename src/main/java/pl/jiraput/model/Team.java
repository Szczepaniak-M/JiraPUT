package pl.jiraput.model;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "zespol")
public class Team {
	@Id
	@Column(name = "nazwa", unique = true, nullable = false)	
	private String name;
	
	@Column(name = "liczba_czlonkow", unique = true, nullable = false)
	private int numberOfMembers;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "team")
	private Set<Employee> members;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "teamStory")
	private Set<Story> stories;
	
	public Team() {
		
	}
	
	public Team(String name, int numberOfMembers, Set<Employee> members) {
		this.name = name;
		this.numberOfMembers = numberOfMembers;
		this.members = members;
	}
	
	public Team(String name) {
		this.name = name;
	}
	
	public String getName() {
		return name;
	}
	
	public int getNumberOfMembers() {
		return numberOfMembers;
	}
	
	public Set<Employee> getMembers() {
		return members;
	}
	
	public void setName(String name) {
		this.name = name;
	}

	public Set<Story> getStories() {
		return stories;
	}

	public void setStories(Set<Story> stories) {
		this.stories = stories;
	}
}
