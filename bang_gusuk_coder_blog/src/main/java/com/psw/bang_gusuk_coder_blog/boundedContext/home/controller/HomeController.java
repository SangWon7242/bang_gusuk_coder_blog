package com.psw.bang_gusuk_coder_blog.boundedContext.home.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
  @GetMapping("/")
  public String showHome() {
    return "/";
  }
}

