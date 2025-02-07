import { Page } from "playwright";
import { VariableString } from "../entities/variable-string";

export type Coordinates = {
  x: number;
  y: number;
};

export interface Browser {
  launch(url: string): Promise<void>;
  getPage(): Page;
  getPageUrl(): string;
  mouseClick(x: number, y: number): Promise<void>;
  fillInput(text: VariableString, coordinates: Coordinates): Promise<void>;
  scrollDown(): Promise<void>;
  scrollUp(): Promise<void>;
  goToUrl(url: string): Promise<void>;
}
