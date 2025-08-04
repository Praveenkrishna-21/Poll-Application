package com.example.voting_app.services;

import com.example.voting_app.model.Optionvote;
import com.example.voting_app.model.Poll;
import com.example.voting_app.repositories.Pollrepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Pollservice {


    private Pollrepository repo;

    public Pollservice(Pollrepository repo) {
        this.repo = repo;
    }

    public Poll create(Poll poll) {
        return repo.save(poll);

    }

    public List<Poll> find() {
        return repo.findAll();
    }

    public Optional<Poll> findbyid(Long id) {
        return repo.findById(id);
    }

    public void vote(Long pollid, int optionindex) {

        // get poll from db
        Poll poll= repo.findById(pollid)
                .orElseThrow(()-> new RuntimeException("poll not found"));
        // get all options
        List<Optionvote> options=poll.getOptions();
        // if index for vote is not valid then  throw a error
        if(optionindex<0 || optionindex>=options.size())
        {
            throw new IllegalArgumentException("Invalid option index");
        }
        // get selected option
        Optionvote selectedoption=options.get(optionindex);
        // increment vote for selected option
        selectedoption.setVotecount(selectedoption.getVotecount()+1);

        // save incremented option into the db

        repo.save(poll);
    }
}
