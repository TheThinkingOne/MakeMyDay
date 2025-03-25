package org.zerock.leekiye.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@ToString
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 키 생성 전략
    private Long tno;

    @Column(length = 500, nullable = false)
    private String title; // 제목

    private String contents; // 일정 상세 내용

    private LocalDate dueDate;

    private boolean isComplete;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Member writer; // 작성자 정보 추가
    // Todo 들어갔을 때 해당 유저가 쓴 글만 보이게 할것임

    public void changeTitle(String title) {
        this.title = title;
    }

    public void changeContent(String contents) {
        this.contents = contents;
    }

    public void changeDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public void changeComplete(boolean complete) {
        this.isComplete = complete;
    }
}
