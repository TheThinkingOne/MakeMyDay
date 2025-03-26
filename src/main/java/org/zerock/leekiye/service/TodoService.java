package org.zerock.leekiye.service;

import org.springframework.transaction.annotation.Transactional;
import org.zerock.leekiye.domain.Todo;
import org.zerock.leekiye.dto.PageRequestDTO;
import org.zerock.leekiye.dto.PageResponseDTO;
import org.zerock.leekiye.dto.TodoDTO;

@Transactional
public interface TodoService {

    TodoDTO get (Long tno);

    PageResponseDTO<TodoDTO> getList(PageRequestDTO pageRequestDTO);

    Long register(TodoDTO dto);

    void modify(TodoDTO todoDTO);

    void remove(Long tno);

    //PageResponseDTO<TodoDTO> getList(PageRequestDTO pageRequestDTO)

    // dtoToEntity와 entityToDTO 공부해보기
    default Todo dtoToEntity(TodoDTO todoDTO) {
        return Todo.builder()
                .tno(todoDTO.getTno())
                .title(todoDTO.getTitle())
                .contents(todoDTO.getContents())
                .dueDate(todoDTO.getDueDate())
                .isComplete(todoDTO.isComplete())
                .savePeriod(todoDTO.getSavePeriod())
                .createdAt(todoDTO.getCreatedAt())
                .build();
    }

    default TodoDTO entityToDTO(Todo todo) {
        TodoDTO todoDTO =
                TodoDTO.builder()
                        .tno(todo.getTno())
                        .title(todo.getTitle())
                        .contents(todo.getContents())
                        .dueDate(todo.getDueDate())
                        .isComplete(todo.isComplete())
                        .savePeriod(todo.getSavePeriod())
                        .createdAt(todo.getCreatedAt())
                        .build();

        return todoDTO;
    }
}
