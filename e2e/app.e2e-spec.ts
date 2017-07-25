import { VouperPage } from './app.po';

describe('vouper App', () => {
  let page: VouperPage;

  beforeEach(() => {
    page = new VouperPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
