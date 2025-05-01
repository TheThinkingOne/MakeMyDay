package org.zerock.leekiye.util;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import net.coobird.thumbnailator.Thumbnailator;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
@Log4j2
@RequiredArgsConstructor
public class CustomFileUtil {

    @Value("upload")
    private String uploadPath;

    @PostConstruct // 생성자 대신 많이 씀
    public void init() {
        // 프로젝트 시작 시에 폴더 생성
        File tempFolder = new File(uploadPath);
        if(tempFolder.exists() == false) {

            tempFolder.mkdirs(); // 폴더가 없으면 생성

        }

        uploadPath = tempFolder.getAbsolutePath();
        log.info("--------------------");
        log.info("uploadPath: " + uploadPath);
    }

    // 파일 저장 관련 메소드
    public List<String> saveFiles(List<MultipartFile> files) throws RuntimeException {
        if (files == null || files.isEmpty()) return List.of();

        List<String> supportedFormats = List.of("jpg", "jpeg", "png", "bmp", "gif");  // Thumbnailator 기본 지원 확장자
        List<String> uploadNames = new ArrayList<>();

        for (MultipartFile file : files) {
            String originalName = file.getOriginalFilename();
            String extension = originalName.substring(originalName.lastIndexOf('.') + 1).toLowerCase();

            if (!supportedFormats.contains(extension)) {
                throw new RuntimeException("지원하지 않는 이미지 형식입니다: " + extension);
            }

            // 파일 이름이 같은 경우를 방지하기 위한 UUID 사용
            String savedName = UUID.randomUUID() + "_" + originalName;
            Path savePath = Paths.get(uploadPath, savedName);

            try {
                Files.copy(file.getInputStream(), savePath);

                // 이미지면 썸네일 생성
                Path thumbNailPath = Paths.get(uploadPath, "s_" + savedName);
                Thumbnails.of(savePath.toFile()).size(200, 200).toFile(thumbNailPath.toFile());

                uploadNames.add(savedName);
            } catch (IOException e) {
                throw new RuntimeException("파일 저장 중 오류 발생", e);
            }
        }
        return uploadNames;
    }

    // 이건 무슨 메소드인가?
    public ResponseEntity<Resource> getFile(String fileName) {

        Resource resource = new FileSystemResource(uploadPath + File.separator + fileName);

        if (!resource.exists() || !resource.isReadable()) {
            // 🔹 기본 이미지 반환
            resource = new FileSystemResource(uploadPath + File.separator + "default.jpeg");
        }

        HttpHeaders headers = new HttpHeaders();
        try {
            headers.add("Content-Type", Files.probeContentType(resource.getFile().toPath()));
        } catch (IOException e) {
            throw new RuntimeException("Failed to determine file type", e);
        }

        return ResponseEntity.ok().headers(headers).body(resource);
    }



    // 파일 삭제 관련 메소드
    public void deleteFiles(List<String> fileNames) {
        if(fileNames == null || fileNames.isEmpty()) { return;}

        fileNames.forEach(fileName -> {
            // 썸네일 삭제
            String thumbnailFileName = "s_" + fileName;

            Path thumbnailPath = Paths.get(uploadPath, thumbnailFileName);
            Path filePath = Paths.get(uploadPath, fileName);

            try {
                Files.deleteIfExists(filePath);
                Files.deleteIfExists(thumbnailPath);
            } catch (IOException e) {
                throw new RuntimeException(e.getMessage());
            }


        });
    }

}

