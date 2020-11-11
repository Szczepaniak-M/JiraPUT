package pl.jiraput.controller;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import pl.jiraput.model.Team;
import pl.jiraput.repository.TeamRepository;

@RestController
@RequestMapping("/api/team")
public class TeamController {
	
	@Autowired
	private TeamRepository teamRepository;
	
	@PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(value = HttpStatus.CREATED)
	public Map<String, String> createTeam(@RequestBody Team team) {
		Map<String, String> response = new HashMap<>();
		if(teamRepository.findByName(team.getName()) == null) {
	    	teamRepository.save(team);
	    	response.put("status", "team.created");
	    	return response;
		} else {
			response.put("status", "team.name.duplicated");
			return response;
		}
	}
	
	@GetMapping(value = "/{name}", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(value = HttpStatus.CREATED)
	public Map<String, Object> getTeamInfo(@PathVariable String name) {	
		Team team = teamRepository.findByName(name);
		Map<String, Object> response = new HashMap<>();
		if(team != null) {
			response.put("name", team.getName());
			response.put("numberOfMembers", team.getNumberOfMembers());
			Set<String> members = new HashSet<>();
			team.getMembers().forEach(m -> members.add(m.getLogin()));
			response.put("members", members);
			return response;
		} else {
			response.put("name", null);
			return response;
		}
	}
}