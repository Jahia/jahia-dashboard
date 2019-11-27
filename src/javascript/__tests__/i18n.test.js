import tf from './testFunctions';

const {toMatchImageSnapshot} = require('jest-image-snapshot');
expect.extend({toMatchImageSnapshot});

beforeEach(async () => {
    await page.goto(tf.testURL, {waitUntil: 'domcontentloaded'});
    tf.sleep(200);
    //await tf.assertPageTitle(tf.getBaseUrl() + "modules/moonstone");
});


describe('Navigation - i18n tests', () => {

    let dashboardBtn = '//ul[@class="flexFluid"]/li[2]';

    test('switch to french', async () => {
        await tf.setPageLang('fr');
        await page.reload({waitUntil: 'domcontentloaded'});
        await tf.clickOnElem('button');
        await tf.assertVisibilityOfElementByXpath(dashboardBtn, true);
        await page.$x(dashboardBtn).then(element => expect(element[0].screenshot({"encoding":"base64"})).resolves.toMatchImageSnapshot());
     }, tf.timeout);
});
