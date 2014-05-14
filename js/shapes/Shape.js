define(['jquery'], function ( $ ) {

    /**
     * A shape interface that uses Raphael to create a SVG canvas on which you can render
     * any SVG shape. Extend Shape with your own shape constructors and implement a
     * _createShape method that creates the shape you want.
     *
     * @constructor
     */
    var BaseShape = function () {

    };

    /*
    * Creates the SVG canvas on the DOM element sent to the render function.
    */
    BaseShape.prototype._createCanvas = function ( el ) {
        this.canvas = Raphael(el, $(el).outerWidth(), $(el).outerHeight());
    };

    /**
     * Public render function, this render function is shared by all shapes
     * and requires a custom _createShape method to have been implemented
     * on any shape that extends from BaseShape. The render method takes
     * a DOM element as an argument, which will be used for creating the
     * SVG context that we render on.
     */
    BaseShape.prototype.render = function ( el ) {
        this._createCanvas( el );
        this._createShape();
        this.shape.attr('stroke', '#F00');
        this.shape.attr('stroke-width', 3);
        return this;
    };

    /**
     * Get the center coordinates of the canvas your shape is being rendered on
     * @returns {{x: number, y: number}}
     * @private
     */
    BaseShape.prototype._getCanvasCenter = function () {
        return {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2
        };
    };

    /*
    * Renders SVG text anywhere on the canvas.
    */
    BaseShape.prototype.renderText = function (x, y, text, size) {
        this.canvas.text(x, y, text)
            .attr({
                'fill': '#EEE',
                'font-size': size + 'px'
            });
    };

    /*
    * Utility function for rendering the text at the exact center of the canvas.
    */
    BaseShape.prototype._renderCenterText = function ( text ) {
        var center = this._getCanvasCenter();
        this.renderText(center.x, center.y, text, 16);
    };


    /**
     * Extends base shape with any other shape constructor, letting them inherit
     * the common render and utility methods.
     */
    return {
        extend: function ( sizeRequestAmount ) {
            var Shape = function ( size ) {
                this.x = size[0];
                this.y = size[1];
                this.area = this._calculateArea();

                console.log('SHAPE', this);
            };
            Shape.prototype = new BaseShape();
            Shape.prototype.constructor = Shape;
            Shape.prototype.sizeRequestAmount = sizeRequestAmount;
            return Shape;
        }
    };
});