package org.zerock.leekiye.security.filter;

import com.google.gson.Gson;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import org.zerock.leekiye.dto.MemberDTO;
import org.zerock.leekiye.util.JWTUtil;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

// 이 클래스 부분 강의 다시 들어볼까
@Log4j2
// JWT 를 필터링 하기 위한 필터 클래스
public class JWTCheckFilter extends OncePerRequestFilter {

    @Override // 필터링을 안할 때의 조건을 설정한 메소드
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {

        String path = request.getRequestURI(); // 체크할 uri 경로

        log.info("check url--------" + path);

        if (path.startsWith("/makemyday/member/")) {
            // 회원쪽 로그인 할때는 jwt 체크 하지 않겠다(테스트용)
            return true;
        }

        //이미지 조회 경로는 체크하지 않는다면
        if (path.startsWith("/makemyday/wallpaper/view/")) {
            return true;
        }

//        // ✅ 로그인 요청은 필터 제외
//        if (path.equals("/api/member/login") || path.startsWith("/api/member/refresh")) {
//            return true;
//        }

        return false; // shouldNOtFilter 에서 false 리턴이면 체크한다는 뜻
    }

//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
//                                    FilterChain filterChain)
//            throws ServletException, IOException {
//
//        log.info("----------------------------");
//        log.info("----------------------------");
//        log.info("----------------------------");
//
//        // jwt 인증헤더
//        String authHeaderStr = request.getHeader("Authorization"); // 이 부분이 비었다고 뜹니다.. 대체 왜?
//        log.info("Authorization 헤더 값: " + authHeaderStr);
//        // Bearer //7 JWT 문자열로 구성되어 있음
//
//        if (authHeaderStr == null || !authHeaderStr.startsWith("Bearer ")) {
//            log.info("Authorization 헤더가 없음 또는 잘못된 값입니다.");
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        try {
//            String accessToken = authHeaderStr.substring(7); // 앞 7문자를 떼어낸 것이 엑세스 토큰이다
//            Map<String, Object> claims = JWTUtil.validateToken(accessToken); // 유효성 검사
//
//            log.info("JWT claims: " + claims);
//
//            // Security Context Holder 에 사용자 정보 전달
//            // 사용자 정보 끄집어내기
//            // 여기에 혹시 빠진거 있나 체크
//            Long id = (Long) claims.get("id");
//            String userID = (String) claims.get("userID"); // 여길 어캐 해야하지...?
//            //
//            String password = (String) claims.get("password");
//            String userName = (String) claims.get("userName");
//            Boolean isSocial = (Boolean) claims.get("isSocial");
//            List<String> roleNames = (List<String>) claims.get("roleNames");
//
//            // MemberDTO 생성
//
//            // !!!!!!!!!!!!!!!!!!!!
//            // 나중에 이 부분에서 오류가 일어날 수도 있겠다 아마도
//
//            MemberDTO memberDTO = new MemberDTO(id ,userID, password, userName, isSocial.booleanValue(), roleNames);
//
//            // 로그 출력
//            log.info("-----------------------------------");
//            log.info(memberDTO);
//            log.info(memberDTO.getAuthorities());
//
//            // 인증 토큰 설정
//            UsernamePasswordAuthenticationToken authenticationToken = // 스프링 시큐리티가 사용하는 토큰
//                    new UsernamePasswordAuthenticationToken(memberDTO, password, memberDTO.getAuthorities());
//            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//            // 무상태라서 매번 호출해서 인증한다는 리소스 적인 단점이 있다.
//
//            // 다음 목적지로 가게 하는 거
//            filterChain.doFilter(request, response); // 필터 등록 필요 여기서 Product 들어가면 AccessDeniedException 발생
//        } catch (Exception e) {
//            log.error("JWT CHECK ERROR ㅠㅅㅠ----------");
//            log.error(e.getMessage());
//            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "토큰이 유효하지 않음");
//
//            // 상태코드 여기서 지정할 수 있음
//            Gson gson = new Gson();
//            String msg = gson.toJson(Map.of("error", "ERROR WITH ACCESS TOKEN LUL"));
//            // 이 부분이 에러 메세지 적은것과 리액트에 적은게 똑같아야 함
//
//            response.setContentType("application/json");
//            PrintWriter printWriter = response.getWriter();
//            printWriter.println(msg);
//            printWriter.close();
//
//        }
//    }

    ///

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        log.info("----------------------------");
        log.info("----------------------------");
        log.info("----------------------------");

        // jwt 인증헤더
        String authHeaderStr = request.getHeader("Authorization"); // 이 부분이 비었다고 뜹니다.. 대체 왜?
        log.info("Authorization 헤더 값: " + authHeaderStr);
        // Bearer //7 JWT 문자열로 구성되어 있음

        if (authHeaderStr == null || !authHeaderStr.startsWith("Bearer ")) {
            log.info("Authorization 헤더가 없음 또는 잘못된 값입니다.");
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String accessToken = authHeaderStr.substring(7); // 앞 7문자를 떼어낸 것이 엑세스 토큰이다
            Map<String, Object> claims = JWTUtil.validateToken(accessToken); // 유효성 검사

            log.info("JWT claims: " + claims);

            // Security Context Holder 에 사용자 정보 전달
            // 사용자 정보 끄집어내기
            // 여기에 혹시 빠진거 있나 체크

            // 👉 이 부분에서 에러 발생함: Integer cannot be cast to Long
            // 그러므로 안전하게 Number 타입으로 받아서 longValue()로 변환함
            Long id = ((Number) claims.get("id")).longValue();

            String userID = (String) claims.get("userID"); // 여길 어캐 해야하지...?
            String password = (String) claims.get("password");
            String userName = (String) claims.get("userName");
            Boolean isSocial = (Boolean) claims.get("isSocial");
            List<String> roleNames = (List<String>) claims.get("roleNames");

            // MemberDTO 생성

            // !!!!!!!!!!!!!!!!!!!!
            // 나중에 이 부분에서 오류가 일어날 수도 있겠다 아마도

            MemberDTO memberDTO = new MemberDTO(id, userID, password, userName, isSocial.booleanValue(), roleNames);

            // 로그 출력
            log.info("-----------------------------------");
            log.info(memberDTO);
            log.info(memberDTO.getAuthorities());

            // 인증 토큰 설정
            UsernamePasswordAuthenticationToken authenticationToken = // 스프링 시큐리티가 사용하는 토큰
                    new UsernamePasswordAuthenticationToken(memberDTO, password, memberDTO.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            // 무상태라서 매번 호출해서 인증한다는 리소스 적인 단점이 있다.

            // 다음 목적지로 가게 하는 거
            filterChain.doFilter(request, response); // 필터 등록 필요 여기서 Product 들어가면 AccessDeniedException 발생
        } catch (Exception e) {
            log.error("JWT CHECK ERROR ㅠㅅㅠ----------");
            log.error(e.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "토큰이 유효하지 않음");

            // 상태코드 여기서 지정할 수 있음
            Gson gson = new Gson();
            String msg = gson.toJson(Map.of("error", "ERROR WITH ACCESS TOKEN LUL"));
            // 이 부분이 에러 메세지 적은것과 리액트에 적은게 똑같아야 함

            response.setContentType("application/json");
            PrintWriter printWriter = response.getWriter();
            printWriter.println(msg);
            printWriter.close();
        }
    }

    // end of this class

}
