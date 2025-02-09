import { VariableString } from "@/core/entities/variable-string";
import { Browser } from "@/core/interfaces/browser.interface";
import { BrowserContext, Page, chromium } from "playwright";

export type Coordinates = {
  x: number;
  y: number;
};

export class ChromiumBrowser implements Browser {
  private page: Page | null = null;
  private context: BrowserContext | null = null;

  private minimumPageLoadTime: number = 600;

  constructor() {}

  async launch(url: string) {
    const browser = await chromium.launch({
      headless: false,
    });
    this.context = await browser.newContext({
      viewport: {
        width: 1440,
        height: 900,
      },
    });

    this.page = await this.context.newPage();
    await this.getPage()!.goto(url);
  }

  private async waitForDomContentLoaded() {
    await this.getPage().waitForLoadState("domcontentloaded");
  }

  private async waitMinimumPageLoadTime() {
    return new Promise((resolve) =>
      setTimeout(resolve, this.minimumPageLoadTime),
    );
  }

  private async waitForStability() {
    return Promise.all([
      this.waitForDomContentLoaded(),
      this.waitMinimumPageLoadTime(),
    ]);
  }

  async getStablePage(): Promise<Page> {
    await this.waitForStability();

    return this.getPage();
  }

  getPage(): Page {
    if (!this.page) {
      throw new Error("The page is not initialized or has been detroyed.");
    }
    return this.page;
  }

  getPageUrl() {
    return this.getPage().url();
  }

  mouseClick(x: number, y: number) {
    return this.getPage().mouse.click(x, y);
  }

  async fillInput(text: VariableString, coordinates: Coordinates) {
    await this.getPage().mouse.click(coordinates.x, coordinates.y);
    await this.getPage().keyboard.type(text.dangerousValue(), { delay: 100 });
  }

  async scrollDown() {
    await this.getPage().mouse.wheel(0, 500);
    await this.getPage().waitForTimeout(300);
  }

  async scrollUp() {
    await this.getPage().mouse.wheel(0, -500);
    await this.getPage().waitForTimeout(300);
  }

  async goToUrl(url: string) {
    await this.getPage().goto(url);
  }
}
