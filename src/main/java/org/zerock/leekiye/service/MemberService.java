package org.zerock.leekiye.service;

import org.springframework.transaction.annotation.Transactional;
import org.zerock.leekiye.domain.Member;
import org.zerock.leekiye.dto.MemberDTO;
import org.zerock.leekiye.dto.MemberModifyDTO;

import java.util.stream.Collectors;

@Transactional
public interface MemberService {

    MemberDTO getKakaoMember(String accessToken); // 카카오계정 로그인한사람 정보 가져오기

    default MemberDTO entityToDTO(Member member) {
        MemberDTO dto = new MemberDTO(
                member.getId(),
                member.getUserID(),
                member.getPassword(),
                member.getUserName(),
                member.isSocial(),
                member.getMemberRoleList().stream().map(memberRole -> memberRole.name()).collect(Collectors.toList()));

        return dto;
    }

    // 회원정보 변경을 위한 DTO 메소드
    void modifyMember(MemberModifyDTO memberModifyDTO);
}
