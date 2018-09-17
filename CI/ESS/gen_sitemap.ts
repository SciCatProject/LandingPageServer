"use strict";

class GenerateSiteMap {
  header: string;
  footer: string;
  url_beginning: string;
  url_ending: string;
  main_body: string;
  urls: string[];
  tags: string[];
  url_frag: string;

  build_urls() {
    this.tags = ["NMX0001", "NMX0002", "NMX0003", "NMX0004", "NMX0005"];
    for (const tag of this.tags) {
      console.log(tag);
    }
  }

  constructor() {
    this.url_frag = "https://doi.esss.se/detail/10.17199%252FBRIGHTNESS%252F";
    this.urls = [
      "https://doi.esss.se/detail/10.17199%252FBRIGHTNESS%252FNMX0001",
      "https://doi.esss.se/detail/10.17199%252FBRIGHTNESS%252FNMX0002"
    ];
    this.header =
      "<?xml version='1.0' encoding='UTF-8'?>\n" +
      "<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'> \n";
    this.url_beginning = "  <url>\n" + "    <loc>";
    this.url_ending =
      "</loc>\n" + "    <lastmod>2018-06-04</lastmod>\n </url>\n";
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
