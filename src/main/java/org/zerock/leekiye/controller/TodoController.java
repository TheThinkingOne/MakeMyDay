package org.zerock.leekiye.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zerock.leekiye.service.TodoService;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/makemyday/todo")
public class TodoController {

    private final TodoService todoService;

}
