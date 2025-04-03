package org.zerock.leekiye.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.zerock.leekiye.domain.WallPaper;
import org.zerock.leekiye.repository.search.WallPaperSearch;

import java.util.Optional;

public interface WallPaperRepository extends JpaRepository<WallPaper, Long>, WallPaperSearch {
    // 상품 등록번호가 int 로 되어 있어서 extends JpaRepository<WallPaper, Integer> 가 맞나?

    @EntityGraph(attributePaths = "wallPaperImageList")
    @Query("SELECT w FROM WallPaper w WHERE w.ord = :ord")
    Optional<WallPaper> selectOne(@Param("ord") Long ord);

    @Query("SELECT w, wl FROM WallPaper w LEFT JOIN w.wallPaperImageList wl where wl.ord = 0")
    Page<Object[]> selectList(Pageable pageable);

}
