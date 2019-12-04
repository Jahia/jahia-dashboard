import tf from './testFunctions';

const {toMatchImageSnapshot} = require('jest-image-snapshot');
expect.extend({toMatchImageSnapshot});

beforeEach(async () => {
    await page.goto(tf.testURL, {waitUntil: 'domcontentloaded'});
});


describe('Navigation - Dashboard tests', () => {

    let dashboardBtn = '//ul[@class="flexFluid"]/li[2]';

    test('Dashboard exists in collapsed nav bar', async () => {

        await page.reload({waitUntil: 'domcontentloaded'});
        //await tf.clickOnElem('button');
        await tf.assertVisibilityOfElementByXpath(dashboardBtn, true);
        await page.$x(dashboardBtn).then(element => expect(element[0].screenshot({"encoding":"base64"})).resolves.toMatchImageSnapshot());
    }, tf.timeout);

    test('Dashboard exists in expanded nav bar', async () => {

        await page.reload({waitUntil: 'domcontentloaded'});
        await tf.clickOnElem('button');
        await tf.assertVisibilityOfElementByXpath(dashboardBtn, true);
        await page.$x(dashboardBtn).then(element => expect(element[0].screenshot({"encoding":"base64"})).resolves.toMatchImageSnapshot());
     }, tf.timeout);
});
