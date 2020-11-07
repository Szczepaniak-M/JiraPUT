package pl.put.projectdb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import pl.put.projectdb.model.Employee;

@Repository
@Transactional(readOnly = true)
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
	public Employee findByLogin(String login);
//	public Employee findById(String id);
}
