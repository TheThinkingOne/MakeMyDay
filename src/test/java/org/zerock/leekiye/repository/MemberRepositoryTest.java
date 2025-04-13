package org.zerock.leekiye.repository;

import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.zerock.leekiye.domain.Member;
import org.zerock.leekiye.domain.MemberRole;
import org.zerock.leekiye.dto.MemberRegisterDTO;
import org.zerock.leekiye.service.MemberService;

import java.util.Optional;

@SpringBootTest
@Log4j2
public class MemberRepositoryTest {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MemberService memberService;

    @Autowired
    private PasswordEncoder passwordEncoder;

//    @Test
//    public void testInsetMember() {
//        // 근데 아래처럼 하면 서비스 로직 검증이 안 들어가서 보안 쌩까고 하는거임
//        Member member = Member.builder()
//                .userID("testUser0413")
//                .userName("testUser0413")
//                .password(passwordEncoder.encode("testPassword0413"))
//                .isSocial(false)
//
//                .build();
//
//        member.addRole(MemberRole.USER);
//
//        memberRepository.save(member);
//    } // end of this test

    @Test
    // 아래처럼 해야 서비스 로직 통과하는 거
    public void testRegisterMemberThroughService() {
        MemberRegisterDTO dto = new MemberRegisterDTO();
        dto.setUserID("testUser0413");
        dto.setUserName("테스트0413");
        dto.setPassword("testPassword0413");

        // 중복 확인
        Assertions.assertFalse(memberService.existsByUserID(dto.getUserID()));

        // 회원가입
        Member member = memberService.register(dto);

        // 검증
        Assertions.assertNotNull(member.getId());
        log.info("✅ 회원 ID 존재 확인 통과: {}", member.getId());

        Assertions.assertEquals(dto.getUserID(), member.getUserID());
        log.info("✅ userID 일치 확인 통과");

        Assertions.assertEquals(dto.getUserName(), member.getUserName());
        log.info("✅ userName 일치 확인 통과");

        Assertions.assertTrue(passwordEncoder.matches(dto.getPassword(), member.getPassword()));
        log.info("✅ 비밀번호 매칭 확인 통과");
    }

    // 이게 지금 안되는데 뭐가 안되는지 나중에 보자
    @Test
    public void testDeleteMember() {

        Long memberId = 1L; // 삭제할 대상 member.id 값

        // 존재 여부 먼저 체크 (Optional 사용)
        Optional<Member> result = memberRepository.findById(memberId);

        if (result.isPresent()) {
            Member member = result.get();
            memberRepository.delete(member); // 연관된 todo, wallpaper도 자동 삭제됨
        }
    }




}
