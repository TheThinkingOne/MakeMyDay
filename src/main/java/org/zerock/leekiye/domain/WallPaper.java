package org.zerock.leekiye.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@ToString
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WallPaper {

    // 월페이퍼에 사진에 관한건 월페이퍼이미지 라는 도메인 새로 파서 하자
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ord;

    private String paperTitle;

    @Builder.Default
    @ElementCollection
    private List<WallPaperImage> wallPaperImageList = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Member user; // 작성자 정보 추가
    // Todo 들어갔을 때 해당 유저가 쓴 글만 보이게 할것임

    public void changePaperTitle(String paperTitle) {

    }

    public void addWallPaperImage(WallPaperImage wallPaperImage) {
        wallPaperImage.setOrd(wallPaperImageList.size());
        wallPaperImageList.add(wallPaperImage);
    }

    public void clearWallPaperList() {
        this.wallPaperImageList.clear();
    }
}
