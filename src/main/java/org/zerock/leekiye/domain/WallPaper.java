package org.zerock.leekiye.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@ToString
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WallPaper {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ord;

    private String paperTitle;

    private String fileName;

//    public void setOrd(int ord) {
//        this.ord = ord;
//    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Member user; // 작성자 정보 추가
    // Todo 들어갔을 때 해당 유저가 쓴 글만 보이게 할것임

}
