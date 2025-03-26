package org.zerock.leekiye.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.zerock.leekiye.domain.Todo;
import org.zerock.leekiye.repository.search.TodoSearch;

public interface TodoRepository extends JpaRepository<Todo, Long>, TodoSearch {

}
