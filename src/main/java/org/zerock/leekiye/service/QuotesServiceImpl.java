package org.zerock.leekiye.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.catalina.LifecycleState;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.zerock.leekiye.domain.Quotes;
import org.zerock.leekiye.domain.Todo;
import org.zerock.leekiye.dto.PageRequestDTO;
import org.zerock.leekiye.dto.PageResponseDTO;
import org.zerock.leekiye.dto.QuotesDTO;
import org.zerock.leekiye.repository.QuotesRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
public class QuotesServiceImpl implements QuotesService {

    private final QuotesRepository quotesRepository;

    // 해당 인용구가 뭔지 보긴 해야하니 get 이 필요할듯
    @Override
    public QuotesDTO get(Long qno) {
        Optional<Quotes> result = quotesRepository.findById(qno);

        Quotes quotes = result.orElseThrow();

        return entityToDTO(quotes);
    }

    //
    @Override
    public PageResponseDTO<QuotesDTO> getList(PageRequestDTO pageRequestDTO) {

        Page<Quotes> result = quotesRepository.quotesSearch(pageRequestDTO);

        List<QuotesDTO> dtoList = result
                .get()
                .map(this::entityToDTO)
                .collect(Collectors.toList());

        PageResponseDTO<QuotesDTO> responseDTO =
                PageResponseDTO
                        .<QuotesDTO>withAll()
                        .dtoList(dtoList)
                        .pageRequestDTO(pageRequestDTO)
                        .totalCount(result.getTotalElements())
                        .build();

        log.info("Quotes 의 ResponseDTO : " + responseDTO);
        return responseDTO;
    }

    @Override
    public void remove(Long qno) {
        quotesRepository.deleteById(qno);
    }

    @Override
    public Quotes dtoToEntity(QuotesDTO quotesDTO) {
        return QuotesService.super.dtoToEntity(quotesDTO);
    }

    @Override
    public QuotesDTO entityToDTO(Quotes quotes) {
        return QuotesService.super.entityToDTO(quotes);
    }
}
