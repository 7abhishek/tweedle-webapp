import { TrialTweedlePage } from './app.po';

describe('trial-tweedle App', function() {
  let page: TrialTweedlePage;

  beforeEach(() => {
    page = new TrialTweedlePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
