package com.crashpad.springjwt.models;

import lombok.Builder;

@Builder
public record MailBody(String to, String subject, String text) {
}
