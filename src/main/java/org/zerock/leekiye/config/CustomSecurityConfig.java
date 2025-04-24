package org.zerock.leekiye.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.zerock.leekiye.security.filter.JWTCheckFilter;
import org.zerock.leekiye.security.handler.APILoginFailHandler;
import org.zerock.leekiye.security.handler.APILoginSuccessHandler;
import org.zerock.leekiye.security.handler.CustomAccessDeniedHandler;

import java.util.Arrays;

@Configuration
@Log4j2
@RequiredArgsConstructor
@EnableMethodSecurity
public class CustomSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        log.info("===== Spring Security Config Loaded =====");

        http.cors(cors -> cors.configurationSource(corsConfigurationSource()));

        http.csrf(csrf -> csrf.disable());

        // 세션 사용 안 함 (JWT 기반이므로)
        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // 접근권한 설정
        // 로그인 관련 요청은 모두 허용
        // 이미지 접근은 로그인 사용자만 (컨트롤러에서 본인 확인)
        // Quotes는 등록은 누구나, list/delete는 ADMIN만
        // Todo, Wallpaper는 로그인 사용자만
        http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/makemyday/member/**", "/makemyday/member/refresh").permitAll()
                .requestMatchers("/makemyday/wallpaper/view/**").authenticated()
                .requestMatchers("/makemyday/wallpapers/**", "/makemyday/wallpaper/**").authenticated()  // 여기 s 오타있었음
                .requestMatchers(HttpMethod.POST, "/makemyday/quotes/register").permitAll()
                .requestMatchers(HttpMethod.GET, "/makemyday/quotes/list", "/makemyday/quotes/{qno}").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/makemyday/quotes/{qno}").hasRole("ADMIN")
                .requestMatchers("/makemyday/todo/**").authenticated()
                .anyRequest().denyAll()
        );


        // 🔹 로그인 성공/실패 핸들러 (현재 사용 안해도 문제 없음)
        http.formLogin(form -> {
            form.disable();
            form.loginPage("/makemyday/member/login")
                    .loginProcessingUrl("/makemyday/member/login") // 로그인 요청 허용
                    .successHandler(new APILoginSuccessHandler())
                    .failureHandler(new APILoginFailHandler());
        });

        // 🔹 JWT 필터 등록
        http.addFilterBefore(new JWTCheckFilter(), UsernamePasswordAuthenticationFilter.class);

        // 🔹 예외 처리 핸들러 등록
        http.exceptionHandling(ex -> ex.accessDeniedHandler(new CustomAccessDeniedHandler()));

        return http.build();
    }

    // 비밀번호 암호화
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // CORS 설정
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOriginPatterns(Arrays.asList("*")); // 모든 origin 허용 (개발 환경 기준)
        config.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        config.setExposedHeaders(Arrays.asList("Authorization", "Content-Type")); // 헤더 노출
        config.setAllowCredentials(true); // 쿠키 등 자격정보 포함 허용

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}
