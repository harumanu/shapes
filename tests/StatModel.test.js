define(['../js/StatModel'], function ( StatModel ) {
   'use strict';
    var init = function () {
        module('StatModel');

        test('StatModel constructor should return a new object with data and subsciber attributes', function () {
            var statModel = new StatModel('shapeName');
            strictEqual(typeof statModel, 'object', 'Object exists');
            strictEqual(typeof statModel.data, 'object', 'Data attribute exists');
            strictEqual(typeof statModel.subscribers, 'object', 'Subscribers exists');
            equal(statModel.data.name, 'shapeName', 'Name parameter matches');
        });

        test('The get method should return a specific attribute if it gets an attribute parameter', function () {
            var statModel = new StatModel('shapeName');
            equal(typeof statModel.get, 'function', 'Get method exists');
            strictEqual(statModel.get('name'), 'shapeName', 'Single attribute can be fetched');
            equal(typeof statModel.get(), 'object', 'Full attribute hash get works');
        });

        test('The average area method should return the average area for all shapes generated', function () {
            var statModel = new StatModel('shapeName');
            statModel.update(10);
            statModel.update(20);
            statModel.update(1);
            strictEqual(statModel._getAverageArea(), 10.33, 'Average area is correct');
        });

        test('Average area should return 0.00 if no shapes have been generated', function () {
            var statModel = new StatModel('shapeName');
            strictEqual(statModel._getAverageArea(), 0.00, 'Average area is 0.00')
        });

        test('The update method should update the models attributes', function () {
            var statModel = new StatModel('shapeName');
            statModel.update(20);
            statModel.update(10);
            strictEqual(statModel.data.amountGenerated, 2, 'Generated amount was updated');
            strictEqual(statModel.data.name, 'shapeName', 'Name hasn\'t changed');
            strictEqual(statModel.data.totalArea, 30, 'Total area was updated');
            strictEqual(statModel.data.latestArea, (10).toFixed(2), 'Latest area was updated and .toFixed(2)');
        });

        test('Change event subscribers should be called', function () {
            var statModel = new StatModel('shapeName');
            var spy = this.spy();
            var spy2 = this.spy();
            var ctx = { test: 'test' };
            var ctx2 = {test2: 'test2' };
            statModel.onChange(spy, ctx);
            statModel.onChange(spy2, ctx2);
            statModel.update(10);
            ok(spy.calledOnce, 'First subscriber was called');
            ok(spy2.calledOnce, 'Second subscriber was called');
            deepEqual(spy.thisValues[0], ctx, 'First subscriber called with correct context');
            deepEqual(spy2.thisValues[0], ctx2, 'Second subscriber called with correct context');
        });
    };

    return {
        init: init
    };
});