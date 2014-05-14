require.config({
    baseUrl: './',
    paths: {
        'QUnit': '../js/libs/qunit/qunit',
        'sinon': '../js/libs/sinon/sinon',
        'sinon.qunit': '../js/libs/sinon/sinon.qunit',
        'jquery': '../js/libs/jquery/jquery',
        'handlebars': '../js/libs/handlebars/handlebars',
        'raphael': '../js/libs/raphael/raphael'
    },
    shim: {
        'QUnit': {
            exports: 'QUnit',
            init: function() {
                QUnit.config.autoload = false;
                QUnit.config.autostart = false;
            }
        },
        'sinon': {
            exports: 'sinon'
        },
        'sinon.qunit': {
            exports: 'sinon',
            deps: ['QUnit', 'sinon']
        },
        'handlebars': {
            exports: 'Handlebars'
        },
        'raphael': {
            exports: 'Raphael'
        }
    }
});

// require the unit tests.
require(
    ['QUnit', 'sinon', 'sinon.qunit', 'StatModel.test', 'View.test'],
    function(QUnit, sinon, sinonQunit, StatModelTest, ViewTest) {
        StatModelTest.init();
        ViewTest.init();
        QUnit.load();
        QUnit.start();
    }
);