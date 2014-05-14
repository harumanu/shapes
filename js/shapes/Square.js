define(['jquery', 'shapes/Shape', 'raphael'], function ( $, Shape, Raphael ) {
    'use strict';
    var Square = Shape.extend( 1 );

    Square.prototype._renderShape = function () {
        var displayWidth = this.x * 100;
        var center = this._getCanvasCenter();
        var xPosition = center.x - displayWidth / 2;
        var yPosition = center.y - displayWidth / 2;

        this._renderText(center.x, center.y, this.area.toFixed(2), 16);
        this._renderText(xPosition + displayWidth / 2, yPosition - 20, this.x.toFixed(2), 12);
        this._renderText(xPosition - 30, yPosition + displayWidth / 2, this.x.toFixed(2), 12);

        this.shape = this.canvas.rect(xPosition, yPosition, displayWidth, displayWidth);
    };

    Square.prototype._calculateArea = function () {
        return this.x * 2;
    };

    return Square;
});