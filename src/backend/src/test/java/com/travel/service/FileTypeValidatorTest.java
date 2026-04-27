package com.travel.service;

import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class FileTypeValidatorTest {

    private final FileTypeValidator validator = new FileTypeValidator();

    @Test
    void png_magic_bytes_pass() {
        byte[] png = new byte[]{(byte)0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A};
        MockMultipartFile file = new MockMultipartFile("img", "x.png", "image/png", png);
        assertThat(validator.detect(file)).isEqualTo("image/png");
    }

    @Test
    void exe_disguised_as_png_is_rejected() {
        byte[] exe = new byte[]{0x4D, 0x5A, 0x00, 0x00};
        MockMultipartFile file = new MockMultipartFile("img", "evil.png", "image/png", exe);
        assertThatThrownBy(() -> validator.requireImage(file))
                .isInstanceOf(UnsupportedFileTypeException.class);
    }
}
