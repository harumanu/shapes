require.config({
    paths: {
        'jquery': 'libs/jquery/jquery',
        'raphael': 'libs/raphael/raphael',
        'spin': 'libs/spin/spin',
        'handlebars': 'libs/handlebars/handlebars'
    },
    shim: {
        'raphael': {
            exports: 'Raphael'
        },
        'handlebars': {
            exports: 'Handlebars'
        }
    }
});

require([
    'jquery',
    'handlebars',
    'spin',
    'shapes/Circle',
    'shapes/Square',
    'shapes/Rectangle',
    'shapes/Triangle',
    'View',
    'StatModel'
], function ( $, Handlebars, Spinner, Circle, Square, Rectangle, Triangle, View, StatModel ) {

    'use strict';
    var board = document.getElementById('board');
    var viewport = document.getElementById('viewport');
    var Controller;
    var shapes;

    /*
    * Shape configuration object. Each shape should have a name, an id and a constructor
    * that extends from Shape. The shape config acts as a single entry point for adding
    * shapes to the system, just add a new shape and the app will handle models/views,
    * event binding and rendering.
    */
    shapes = {
        'square': {
            name: 'Square',
            id: 'square',
            ShapeConstructor: Square
        },
        'rectangle': {
            name: 'Rectangle',
            id: 'rectangle',
            ShapeConstructor: Rectangle
        },
        'circle': {
            name: 'Circle',
            id: 'circle',
            ShapeConstructor: Circle
        },
        'triangle': {
            name: 'Triangle',
            id: 'triangle',
            ShapeConstructor: Triangle
        }
    };

    Controller = {
        canvas: board,

        /**
         * Show a loading indicator at the center of the viewport
         */
        showLoader: function () {
            // Just show the loader if it has already been initialized
            if ( this.spinner ) {
                this.spinner.spin(viewport);
                return;
            }

            //If we don't already have a spinner we create one
            this.spinner = new Spinner({
                lines: 10,
                length: 11,
                width: 4,
                radius: 12,
                color: '#CCC',
                speed: 2,
                trail: 90
            }).spin(viewport);
        },

        /**
         * Remove the loading indicator from the main canvas
         */
        hideLoader: function () {
            this.spinner.stop();
        },

        /**
         * The main shape rendering method. Asks the API for the appropriate number
         * of sizes for the requested shape type and creates a new shape when
         * the data is returned.
         * @param type {string} The type of shape to generate, any string that matches
         * a key in the shape config object.
         */
        generateShape: function ( type ) {
            var _this = this;
            var shape;
            var ShapeConstructor;
            // Don't allow re-rendering while waiting for the API;
            if ( !this.generating ) {

                // Reset the canvas
                this.canvas.innerHTML = '';
                this.generating = true;
                this.showLoader();

                // Get the config for this shape
                shape = shapes[type];
                ShapeConstructor = shape.ShapeConstructor;

                // Make an API call and defer rendering until we have the size
                // The number of size inputs required is stored on the ShapeConstructor
                $.when.apply($, this.getSize(ShapeConstructor.prototype.sizeRequestAmount))
                    .then(function () {

                        // We have the sizes that we need, just create the shape and call
                        // the render method with our canvas as the render target. Since
                        // the number of sizes we need varies depending on the shape, we send
                        // them in to the constructor as an array and handle them there.
                        var gen = new ShapeConstructor(Array.prototype.slice.call(arguments))
                            .render(_this.canvas);

                        // Update the stats model for this shape
                        shapes[type].statModel.update(gen.area);

                        _this.hideLoader();
                        _this.generating = false;
                    });
            }

        },

        /**
         * Makes an arbitrary amount of API calls to get random size integers
         *
         * @param amount {Number} The number of sizes to get from the API
         * @returns {Array} An array of deferred objects which are resolved in turn when the API
         * callback is called
         */
        getSize: function ( amount ) {
            var deferreds = [];
            var i = 0;

            // Since the API call is async we create a promise object for each
            // call which is pushed to an array and resolved whenever the API
            // callback function is executed. This way we can use $.when to
            // get a single callback once all sizes have been fetched.
            function makeAPICall () {
                var deferred = $.Deferred();
                var promise = deferred.promise();
                deferreds.push(promise);
                getDistanceAPI(function ( response ) {
                    deferred.resolve(response.distance);
                });
            }

            for ( ; i < amount; ++i ) {
                makeAPICall();
            }

            return deferreds;
        }
    };

    // Initialize the app on DOM ready
    $(function () {

        // Create a menu view and set up event handlers to trigger shape generation
        // when clicking menu items.
        var menu = new View({
            template: '#menuTemplate',
            eventHandlers: {
                'click li': function ( event ) {
                    //Don't attempt to switch shapes while generating
                    if(Controller.generating) {
                        return;
                    }
                    var $target = $(event.currentTarget);
                    $('li', this.$el).removeClass('active');
                    $target.addClass('active');
                    Controller.generateShape($target.data('shape'));
                }
            }
        });

        // Loop through the shape config and do the setup
        (function () {
            for ( var s in shapes ) {
                if ( shapes.hasOwnProperty(s) ) {
                    var shape = shapes[s];

                    // Create a stats model for this shape and store it
                    // on the config.
                    shape.statModel = new StatModel(shape.name);

                    // Create a stats view and bind it to the model.
                    var statView = new View({
                        template: '#statViewTemplate',
                        className: 'stat',
                        model: shape.statModel
                    });

                    // Render the view, re-rendering will be handled automatically
                    // when the model updates from here on.
                    statView.render().$el.appendTo('#stats');
                }
            }
        }());

        // Render the menu view and instantiate an initial shape to start things off.
        menu.render({items: shapes}).$el.appendTo('#shape-selector');
        Controller.generateShape('square');
    });


});