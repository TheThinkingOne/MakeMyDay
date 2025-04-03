package org.zerock.leekiye.service;

import org.springframework.transaction.annotation.Transactional;
import org.zerock.leekiye.domain.WallPaper;
import org.zerock.leekiye.dto.PageRequestDTO;
import org.zerock.leekiye.dto.PageResponseDTO;
import org.zerock.leekiye.dto.WallPaperDTO;

@Transactional
public interface WallPaperService {

    WallPaperDTO get(Long ord);

    PageResponseDTO<WallPaperDTO> getList(PageRequestDTO pageRequestDTO);

    Long register(WallPaperDTO wallPaperDTO);

    void modify(WallPaperDTO wallPaperDTO);

    void remove(Long ord);

}
