package pl.jiraput.model;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "technologia")
public class Technology {

	@Id
	@Column(name = "nazwa", nullable = false, unique = true)
	private String name;
	
	@JsonIgnore
	@ManyToMany(targetEntity = Employee.class, mappedBy = "technologies", fetch = FetchType.LAZY)
	private Set<Employee> employees;
	
	public Technology() {}
	
	public Technology(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<Employee> getEmployees() {
		return employees;
	}

	public void setEmployees(Set<Employee> employees) {
		this.employees = employees;
	}
}
