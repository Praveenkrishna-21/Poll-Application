package com.example.voting_app.repositories;

import com.example.voting_app.model.Poll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Pollrepository extends JpaRepository<Poll,Long> {

}
