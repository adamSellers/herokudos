import { HerokudosPage } from './app.po';

describe('herokudos App', function() {
  let page: HerokudosPage;

  beforeEach(() => {
    page = new HerokudosPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
