define(['../js/View', '../js/StatModel', 'handlebars'], function ( View, StatModel, Handlebars ) {
    'use strict';
    var init = function () {
        module('View');

        test('View constructor should create view object with a model binding and events', function () {
            var $fixture = $('#qunit-fixture');
            var $scriptTag = $('<script type="text/html" id="testTemplate"><div class="clicker">test</div></script>');
            $fixture.append($scriptTag);
            var model = new StatModel();
            var view = new View({
                className: 'testClass',
                model: model,
                template: '#testTemplate'
            });

            view.render().$el.appendTo('#qunit-fixture');

            ok(view, 'Object exists');
            ok(view.$el instanceof jQuery, 'View $el was created');
            ok(view.$el.hasClass('testClass'), 'Classname was set');
            ok($('.testClass .clicker').length, 'Template was rendered');
        });

        test('View events should be bound and triggered', function () {
            var $fixture = $('#qunit-fixture');
            var $scriptTag = $('<script type="text/html" id="testTemplate"><div class="clicker">test</div></script>');
            $fixture.append($scriptTag);
            var eventSpy = this.spy();
            var eventSpy2 = this.spy();
            var view = new View({
                className: 'testClass',
                template: '#testTemplate',
                eventHandlers: {
                    'click .clicker': eventSpy,
                    'keydown .clicker': eventSpy2
                }
            });
            view.render().$el.appendTo('#qunit-fixture');
            $('.clicker').trigger('click');
            $('.clicker').trigger('keydown');
            ok(eventSpy.calledOnce, 'Click event handler was set and triggered');
            ok(eventSpy2.calledOnce, 'Keydown event handler was set and triggered');
        });

        test('Bound model change event should trigger re-render', function () {
            var $fixture = $('#qunit-fixture');
            var $scriptTag = $('<script type="text/html" id="testTemplate"><div class="clicker">test</div></script>');
            $fixture.append($scriptTag);
            this.spy(View.prototype, 'render');
            var model = new StatModel('patch');
            var view = new View({
                className: 'testClass',
                model: model,
                template: '#testTemplate'
            });

            model.update(20);

            ok(view.model, 'Model was bound');
            ok(view.render.calledOnce, 'Re-render was triggered');

        });

    };

    return {
        init: init
    };
});