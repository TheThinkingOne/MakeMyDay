package org.zerock.leekiye.repository.search;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.zerock.leekiye.domain.Todo;

public interface TodoSearch {
    Page<Todo> todoSearch(PageRequest pageRequest);
}
