import { GhsearchPage } from './app.po';

describe('ghsearch App', () => {
  let page: GhsearchPage;

  beforeEach(() => {
    page = new GhsearchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
