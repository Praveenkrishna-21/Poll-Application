package com.example.voting_app.controller;

import com.example.voting_app.model.Poll;
import com.example.voting_app.request.Vote;
import com.example.voting_app.services.Pollservice;
import jakarta.persistence.GeneratedValue;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/polls")
@CrossOrigin(origins = "http://localhost:4200/")
public class Pollcontroller {

    private Pollservice service;

    public Pollcontroller(Pollservice service) {
        this.service = service;
    }

    @PostMapping
    public Poll create(@RequestBody Poll poll)
    {
        return service.create(poll);

    }
    @GetMapping
    public List<Poll> find()
    {
        return service.find();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Poll> findbyid(@PathVariable Long id)
    {
        return service.findbyid(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/vote")

    public void vote(@RequestBody Vote vote)
    {
        service.vote(vote.getPollid(),vote.getOptionindex());
    }

}
