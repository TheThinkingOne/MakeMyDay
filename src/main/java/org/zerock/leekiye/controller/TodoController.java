package org.zerock.leekiye.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;
import org.zerock.leekiye.dto.PageRequestDTO;
import org.zerock.leekiye.dto.PageResponseDTO;
import org.zerock.leekiye.dto.TodoDTO;
import org.zerock.leekiye.service.TodoService;

import java.util.Map;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/makemyday/todo")
public class TodoController {

    private final TodoService todoService;

    // 해당 게시글 조회
    @GetMapping("/{tno}")
    public TodoDTO get(@PathVariable(name = "tno") Long tno) {
        return todoService.get(tno);
    }

    // Todo 리스트 불러오기
    @GetMapping("/list")
    public PageResponseDTO<TodoDTO> list(PageRequestDTO pageRequestDTO) {
        log.info("list ====== " + pageRequestDTO);

        // 리스트 불러오기
        return todoService.getList(pageRequestDTO);
    }

    // Todo 등록
    @PostMapping("/")
    public Map<String, Long> register(@RequestBody TodoDTO dto) {
        log.info("todoDTO: " + dto);

        Long tno = todoService.register(dto);

        return Map.of("TNO", tno);
    }

    // Todo 수정
    @PutMapping("/{tno}")
    public Map<String, String> modify(@PathVariable("tno") Long tno,
                                      @RequestBody TodoDTO todoDTO) {
        // /{tno} 와 todoDTO 안의 tno가 일치하는지 확인
        todoDTO.setTno(tno);

        log.info("Modify: " + todoDTO);
        todoService.modify(todoDTO);

        return Map.of("RESULT", "SUCCESS");

    }

    // Todo 삭제
    @DeleteMapping("/{tno}")
    public Map<String, String> remove(@PathVariable(name="tno") Long tno) {
        log.info(tno + "번 게시글 삭제");

        todoService.remove(tno);

        return Map.of("RESULT", "SUCCESS");
    }




}
