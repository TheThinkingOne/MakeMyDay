package org.zerock.leekiye.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;
import org.zerock.leekiye.dto.PageRequestDTO;
import org.zerock.leekiye.dto.PageResponseDTO;
import org.zerock.leekiye.dto.WallPaperDTO;
import org.zerock.leekiye.service.WallPaperService;

import java.util.Map;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/makemyday/wallpaper")
public class WallpaperController {

    private final WallPaperService wallPaperService;

    // 해당 월페이퍼 불러오기
    @GetMapping("/{ord}")
    public WallPaperDTO get(@PathVariable(name = "ord") Long ord) {
        return wallPaperService.get(ord);
    }

    @GetMapping("/list")
    public PageResponseDTO<WallPaperDTO> list(PageRequestDTO pageRequestDTO) {
        log.info("list ====== " + pageRequestDTO);

        // 리스트 불러오기
        return wallPaperService.getList(pageRequestDTO);
    }

    // queryString
    // /list?page=3 => 매번 다른 컨텐츠가 된다
    // 매번 바뀌는경우 pathVariable 로 설계하는게 아닌 queryString 사용 권장

    // 게시글 수정
    @PostMapping("/")
    public Map<String, Long> register(@RequestBody WallPaperDTO dto) {
        log.info("todoDTO: " + dto);

        Long ord = wallPaperService.register(dto);

        return Map.of("ord", ord);
    }

    // 월페이퍼 게시글 수정
    @PutMapping("/{ord}")
    public Map<String, String> modify(@PathVariable("ord") Long ord, @RequestBody WallPaperDTO dto,
                                      @RequestBody WallPaperDTO wallPaperDTO) {
        // /{tno} 와 todoDTO 안의 tno가 일치하는지 확인
        wallPaperDTO.setOrd(ord);

        log.info("Modify: " + wallPaperDTO);
        wallPaperService.modify(wallPaperDTO);

        return Map.of("RESULT", "SUCCESS");

    }

    // 게시글 삭제
    @DeleteMapping("/{ord}")
    public Map<String, String> remove( @PathVariable(name="ord") Long ord ){

        log.info("Remove:  " + ord);

        wallPaperService.remove(ord);

        return Map.of("RESULT", "SUCCESS");
    }




}
