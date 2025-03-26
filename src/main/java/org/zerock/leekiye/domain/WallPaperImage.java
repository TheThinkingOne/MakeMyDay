package org.zerock.leekiye.domain;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@ToString
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WallPaperImage {

    private String fileName;

    // 월페이퍼의 순번(근데 한개라서)
    private int ord;

    // 월페이퍼 상세 등록 수정시에 사용할 메소드

    public void setOrd(int ord) {
        this.ord = ord;
    }

}
