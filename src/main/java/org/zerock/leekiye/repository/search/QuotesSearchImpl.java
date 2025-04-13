package org.zerock.leekiye.repository.search;

import com.querydsl.jpa.JPQLQuery;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.zerock.leekiye.domain.QQuotes;
import org.zerock.leekiye.domain.Quotes;
import org.zerock.leekiye.dto.PageRequestDTO;

import java.util.List;

@Log4j2
public class QuotesSearchImpl extends QuerydslRepositorySupport implements QuotesSearch {

    public QuotesSearchImpl() {
        super(Quotes.class);
    }

    @Override
    public Page<Quotes> quotesSearch(PageRequestDTO pageRequestDTO) {

        log.info("Quotes Search Ongoing");

        QQuotes quotes = QQuotes.quotes1;
        JPQLQuery<Quotes> query = from(quotes);

        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() -1,
                pageRequestDTO.getSize(),
                Sort.by("ord").descending()
        );

        this.getQuerydsl().applyPagination(pageable, query);

        List<Quotes> quotesList = query.fetch();

        long total = query.fetchCount();

        return new PageImpl<>(quotesList, pageable, total);
    }


}
