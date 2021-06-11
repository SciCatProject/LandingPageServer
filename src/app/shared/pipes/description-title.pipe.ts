import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "descriptionTitle",
})
export class DescriptionTitlePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    const rawDescriptionTitle = value.split("/").pop();
    const descriptionTitle = rawDescriptionTitle
      ? rawDescriptionTitle.replace("-", " ")
      : value;
    return descriptionTitle;
  }
}
