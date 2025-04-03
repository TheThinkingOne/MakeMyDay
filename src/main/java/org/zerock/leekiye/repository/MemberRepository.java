package org.zerock.leekiye.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.zerock.leekiye.domain.Member;

public interface MemberRepository extends JpaRepository<Member, String> {

    // Role(권한)도 이메일이랑 같이 가져올것
    @EntityGraph(attributePaths = {"memberRoleList"}) // 여기 attributePaths 는 뭐지
    @Query("select m from Member m where m.userID = :userID")
    Member getWithRoles(@Param("userID") String userID);
}
