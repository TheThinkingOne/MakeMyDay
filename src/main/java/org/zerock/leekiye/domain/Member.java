package org.zerock.leekiye.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString(exclude = "memberRoleList") // 연관관계 뺀 이유가 무엇일까
public class Member {

    // 카카오 로그인은 이메을 안됨
    // 카카오는 닉네임이랑 프사만 불러올 수 있음
    @Id
    private String userID;

    private String userName;

    private String password;

    private boolean isSocial;

    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    private List<MemberRole> memberRoleList = new ArrayList<>();

    @OneToMany(mappedBy = "writer", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Todo> todoList = new ArrayList<>();

    @OneToMany(mappedBy = "writer", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<WallPaper> wallPaperList = new ArrayList<>();



    // 새로운 회원의 권한 추가
    public void addRole(MemberRole memberRole) {
        memberRoleList.add(memberRole);
    }

    // 권한 삭제/초기화
    public void clearRole() {
        memberRoleList.clear();
    }

    public void changeNickname(String userName) {
        this.userName = userName;
    }

    public void changePw(String password) {
        this.password = password;
    }

    public void changeSocial(boolean isSocial) {
        this.isSocial = isSocial;
    }

}
