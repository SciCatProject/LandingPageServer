"use strict";

import { range } from "rxjs";
import { stringify } from "querystring";

class GenerateSiteMap {
  header: string;
  footer: string;
  url_beginning: string;
  url_ending: string;
  main_body: string;
  urls: string[];
  tags: string[];
  url_frag: string;

  pad(num: number, size: number): string {
    let s = num + "";
    while (s.length < size) {
      s = "0" + s;
    }
    return s;
  }

  build_urls() {
    this.urls = [];
    this.extracted(43, "NMX");
    this.extracted(15, "MG");
    this.extracted(47, "MB");
    this.extracted(15, "SONDE");
    this.extracted(30, "V20");
  }

  private extracted(num: number, prefix: string) {
    for (let _i = 1; _i < num; _i++) {
      if (_i) {
        const tag = prefix + this.pad(_i, 4);
        this.urls.push(this.url_frag + tag);
      }
    }
  }

  constructor() {
    this.url_frag = "https://doi.esss.se/detail/10.17199%252FBRIGHTNESS%252F";
    this.build_urls();
    this.header =
      "<?xml version='1.0' encoding='UTF-8'?>\n" +
      "<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'> \n";
    this.url_beginning = "  <url>\n" + "    <loc>";
    const today = new Date();
    const year = today.getFullYear();
    const month = this.pad(today.getMonth(), 2);
    const date = this.pad(today.getDate(), 2);
    const formatted_date = year + "-" + month + "-" + date;
    this.url_ending =
      "</loc>\n" + "    <lastmod>" + formatted_date + "</lastmod>\n </url>\n";
    this.footer = "</urlset>";
  }

  main_loop() {
    this.main_body = this.header;
    for (const url of this.urls) {
      if (url) {
        this.main_body += this.url_beginning + url + this.url_ending;
      }
    }
    this.main_body += this.footer;
  }

  print_method() {
    console.log(this.main_body);
  }

  main() {
    this.main_loop();
    this.print_method();
  }
}

const gen = new GenerateSiteMap();
gen.main();
