import {  Pet, calculateRequiredBox } from './index';

describe('Pets2U', () => {
    it('should return correct boxes for given pets', () => {
        expect(calculateRequiredBox([Pet.R])).toEqual("B1");
        expect(calculateRequiredBox([Pet.H])).toEqual("B1");
        expect(calculateRequiredBox([Pet.M])).toEqual("B2");
        expect(calculateRequiredBox([Pet.S])).toEqual("B3");
        expect(calculateRequiredBox([Pet.R, Pet.H, Pet.H])).toEqual("B3");
        expect(calculateRequiredBox([Pet.S, Pet.M])).toEqual("B2,B3");
        expect(calculateRequiredBox([Pet.S, Pet.H, Pet.R, Pet.M])).toEqual("B3,B3");
        expect(calculateRequiredBox([Pet.R, Pet.H, Pet.S])).toEqual("B1,B3");
    });
});