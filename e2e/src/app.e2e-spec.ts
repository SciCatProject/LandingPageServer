import {AppPage} from './app.po';

describe('landing page App', () => {
  let page: AppPage;


  beforeEach(async () => {
    page = new AppPage();
    await page.navigateTo();
  });


  it('should display message saying ESS Public Data Repository', async () => {
    console.log(page.getParagraphText());
    expect(page.getParagraphText()).toEqual('ESS Public Data Repository');
  });

});
