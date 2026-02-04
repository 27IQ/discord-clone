import { PageView } from '../enums/page-view';
import { PageHolder } from './page-holder';

describe('PageHolder', () => {
  it('should create an instance', () => {
    expect(new PageHolder(PageView.HOMEPAGE, null)).toBeTruthy();
  });
});
