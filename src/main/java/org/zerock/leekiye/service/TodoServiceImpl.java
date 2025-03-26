package org.zerock.leekiye.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.zerock.leekiye.domain.Todo;
import org.zerock.leekiye.dto.PageRequestDTO;
import org.zerock.leekiye.dto.PageResponseDTO;
import org.zerock.leekiye.dto.TodoDTO;
import org.zerock.leekiye.repository.TodoRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;

    // ServiceImpl 이 비즈니스 로직 구현해놓는 곳

    // 해당 번호의 Todo 게시글 조회
    @Override
    public TodoDTO get(Long tno) {
        Optional<Todo> result = todoRepository.findById(tno);

        Todo todo = result.orElseThrow();

        return entityToDTO(todo);
    }

    // Todo 게시글 리스트 불러오기
    @Override
    public PageResponseDTO<TodoDTO> getList(PageRequestDTO pageRequestDTO) {

        Page<Todo> result = todoRepository.todoSearch(pageRequestDTO);

        List<TodoDTO> dtoList = result
                .get()
                .map(this::entityToDTO)
                .collect(Collectors.toList());

        PageResponseDTO<TodoDTO> responseDTO =
                PageResponseDTO
                        .<TodoDTO>withAll()
                        .dtoList(dtoList)
                        .pageRequestDTO(pageRequestDTO)
                        .totalCount(result.getTotalElements())
                        .build();

        return responseDTO;
    }

    @Override
    public Long register(TodoDTO dto) {
        Todo todo = dtoToEntity(dto);

        Todo result = todoRepository.save(todo);

        return result.getTno();
    }

    // Todo 게시글 수정
    @Override
    public void modify(TodoDTO todoDTO) {

        Optional<Todo> result = todoRepository.findById(todoDTO.getTno());

        Todo todo = result.orElseThrow();

        todo.changeTitle(todoDTO.getTitle()); // good
        todo.changeContent(todoDTO.getContents()); // good
        todo.changeComplete(todoDTO.isComplete()); // good
        todo.changeDueDate(todoDTO.getDueDate()); // good
        todo.changeSavePeriod(todoDTO.getSavePeriod()); // good

        todoRepository.save(todo);
    }

    // 게시글 삭제
    @Override
    public void remove(Long tno) {
        todoRepository.deleteById(tno);
    }

    @Override
    public Todo dtoToEntity(TodoDTO todoDTO) {
        return TodoService.super.dtoToEntity(todoDTO);
    }

    @Override
    public TodoDTO entityToDTO(Todo todo) {
        return TodoService.super.entityToDTO(todo);
    }


    // Repository 먼저 작성하자
}
