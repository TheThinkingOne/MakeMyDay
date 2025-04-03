package org.zerock.leekiye.service;

import org.springframework.transaction.annotation.Transactional;
import org.zerock.leekiye.domain.Quotes;
import org.zerock.leekiye.dto.PageRequestDTO;
import org.zerock.leekiye.dto.PageResponseDTO;
import org.zerock.leekiye.dto.QuotesDTO;

@Transactional
public interface QuotesService {

    QuotesDTO get (Long qno);

    PageResponseDTO<QuotesDTO> getList(PageRequestDTO pageRequestDTO);

    // 제거는 어드민이 그냥 이상하거면 할거라 상관없음
    void remove(Long qno);

    default Quotes dtoToEntity(QuotesDTO quotesDTO) {
        return Quotes.builder()
                .qno(quotesDTO.getQno())
                .author(quotesDTO.getAuthor())
                .quotes(quotesDTO.getQuotes())
                .build();
    }

    default QuotesDTO entityToDTO(Quotes quotes) {
        QuotesDTO quotesDTO =
                QuotesDTO.builder()
                        .qno(quotes.getQno())
                        .author(quotes.getAuthor())
                        .quotes(quotes.getQuotes())
                        .build();

        return quotesDTO;
    }


}
