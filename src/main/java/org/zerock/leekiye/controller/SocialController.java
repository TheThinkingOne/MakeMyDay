package org.zerock.leekiye.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.zerock.leekiye.domain.Member;
import org.zerock.leekiye.dto.MemberDTO;
import org.zerock.leekiye.dto.MemberLoginDTO;
import org.zerock.leekiye.dto.MemberModifyDTO;
import org.zerock.leekiye.dto.MemberRegisterDTO;
import org.zerock.leekiye.service.MemberService;
import org.zerock.leekiye.util.JWTUtil;

import java.util.Map;

@RestController
@Log4j2
@RequiredArgsConstructor
public class SocialController {

    // 여길 안하고 있었네 ㅁㅊ
    private final MemberService memberService;

    private final PasswordEncoder passwordEncoder;

    @GetMapping("/makemyday/member/kakao")
    public Map<String, Object> getMemberFromKakao(String accessToken) {

        log.info("[DEBUG] React 에서 가져온 Access Token: " + accessToken);

//        MemberDTO memberDTO = memberService.getKakaoMember(accessToken);
//
//        log.info("카카오 사용자 정보 :" + memberDTO);
        if (accessToken == null || accessToken.isEmpty()) {
            log.error("[ERROR] accessToken이 null 또는 비어 있음");
            return null;
        }

        // 리액트에서 가져온 액세스 토큰을 여기로 가져옴
        MemberDTO memberDTO = memberService.getKakaoMember(accessToken);
        Map<String, Object> claims = memberDTO.getClaims();

        String jwtAccessToken = JWTUtil.generateToken(claims, 10);
        String jwtRefreshToken = JWTUtil.generateToken(claims, 60*24);

        claims.put("accessToken", jwtAccessToken);
        claims.put("refreshToken", jwtRefreshToken);

        return claims;

        // return new String[]{"AAA","BBB","CCC"};
    }

    // 일반 회원가입 메소드
    @PostMapping("/makemyday/member/register")
    public Map<String, Object> register(@RequestBody MemberRegisterDTO memberRegisterDTO) {
        if (memberService.existsByUserID(memberRegisterDTO.getUserID())) {
            return Map.of("RESULT", "FAIL","MESSAGE","이미 사용중인 아이디 입니다. 다른 아이디를 사용해주세요.");
        }

        Member member = memberService.register(memberRegisterDTO); // 등록
        MemberDTO memberDTO = memberService.entityToDTO(member);

        Map<String, Object> claims = memberDTO.getClaims();
        String accessToken = JWTUtil.generateToken(claims, 10);
        String refreshToken = JWTUtil.generateToken(claims, 60 * 24);

        // memberService.register(memberRegisterDTO);

        return Map.of(
                "RESULT", "SUCCESS",
                "accessToken", accessToken,
                "refreshToken", refreshToken
        );
    }

    // 이런 씨2팔 일반 로그인 관련 메소드가 없잖아\
    @PostMapping("/makemyday/member/login")
    public Map<String, Object> login(@RequestBody MemberLoginDTO loginDTO) {

        // 로그인 시도
        MemberDTO memberDTO = (MemberDTO) memberService.loadByUserName(loginDTO.getUserID());

        // 비밀번호 비교
        if (!passwordEncoder.matches(loginDTO.getPassword(), memberDTO.getPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        // 토큰 생성
        Map<String, Object> claims = memberDTO.getClaims();
        String accessToken = JWTUtil.generateToken(claims, 10);
        String refreshToken = JWTUtil.generateToken(claims, 60 * 24);

        return Map.of(
                "accessToken", accessToken,
                "refreshToken", refreshToken,
                "userID", memberDTO.getUserID(),
                "userName", memberDTO.getUserName()
        );
    }

    // 회원정보 수정하는 PutMapping 메소드
    @PutMapping("/makemyday/member/modify")
    public Map<String, String> modify(@RequestBody MemberModifyDTO memberModifyDTO) {
        log.info("member modify(회원정보 변경)-----------------------" + memberModifyDTO);

        memberService.modifyMember(memberModifyDTO);

        return Map.of("result", "modified");

    }

    // jwt 리프래시 토큰 관련 메소드
    @GetMapping("/makemyday/member/refresh")
    public Map<String, String> refreshAccessToken(@RequestHeader("Authorization") String accessToken,
                                                  @RequestParam("refreshToken") String refreshToken) {

        log.info("🔄 리프레시 토큰 요청 처리 중...");
        log.info("AccessToken: " + accessToken);
        log.info("RefreshToken: " + refreshToken);

        // 1️⃣ 리프레시 토큰 검증
        Map<String, Object> claims = JWTUtil.validateToken(refreshToken);

        // 2️⃣ 새 AccessToken 발급
        String newAccessToken = JWTUtil.generateToken(claims, 10);  // 10분 유효

        return Map.of(
                "accessToken", newAccessToken,
                "refreshToken", refreshToken  // 보통 리프레시는 그대로 반환
        );
    }




}
