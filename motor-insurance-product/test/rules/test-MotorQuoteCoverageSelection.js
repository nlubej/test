'use strict';

const { expect } = require('chai');
const { MotorQuoteCoverageSelection } = require('../../lib/MotorQuoteCoverageSelection');

describe('MotorQuoteCoverageSelection rules', function () {

    describe('Casco selection', function () {


        it(`Expected result is the same`, function () {
            const input = {
                coverageKey: 'mtplPlus'
            };

            const expectedResult = {
                tariffCode: 'MtplPlus',
                coverageCode: undefined
            };

            // Act
            const result = MotorQuoteCoverageSelection(input);

            // Assert
            expect(result).to.deep.equal(expectedResult);
        });

    });

    describe('Additional equipment selection', function () {

        it(`Expected result is the same`, function () {
            const input = {
                coverageKey: 'additionalEquipmentCoverages',
                parentCoverageKey: 'combinationB'
            };

            const expectedResult = {
                tariffCode: 'AdditionalEquipment',
                coverageCode: 'CombinationB'
            };

            // Act
            const result = MotorQuoteCoverageSelection(input);

            // Assert
            expect(result).to.deep.equal(expectedResult);
        });
    });

    describe('Coverage extension selection', function () {

        it(`Expected result is the same`, function () {
            const input = {
                coverageKey: 'outsideEuAreaExtension',
                parentCoverageKey: 'combinationB'
            };

            const expectedResult = {
                tariffCode: 'CoverageExtensions',
                coverageCode: 'OutsideEu'
            };

            // Act
            const result = MotorQuoteCoverageSelection(input);

            // Assert
            expect(result).to.deep.equal(expectedResult);
        });
    });

});
