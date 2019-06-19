import { mainModule } from './main.module';

describe('mainModule', () => {
    let mainModule: mainModule;

    beforeEach(() => {
        mainModule = new mainModule();
    });

    it('should create an instance', () => {
        expect(mainModule).toBeTruthy();
    });
});
