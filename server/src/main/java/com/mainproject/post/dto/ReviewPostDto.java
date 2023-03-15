package com.mainproject.post.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewPostDto {

    @NotBlank(message = "제목은 공백이 아니어야 합니다.")
    private String title;

    @NotBlank(message = "내용은 공백이 아니어야 합니다.")
    private String content;

    @NotBlank(message = "영수증 사진을 첨부해야합니다.")
    private String receipt;

    private String medicalTagTitle;

    private String regionName;

    private String hospitalName;
}