define(['jquery', 'shapes/Shape', 'raphael'], function ( $, Shape, Raphael ) {
    'use strict';
    var Rectangle = Shape.extend( 2 );

    Rectangle.prototype._renderShape = function () {
        var displayWidth = this.x * 80;
        var displayHeight = this.y * 80;
        var center = this._getCanvasCenter();
        var xPosition = center.x - displayWidth / 2;
        var yPosition = center.y - displayHeight / 2;

        this._renderCenterText(this.area.toFixed(2));
        this._renderText(xPosition + displayWidth / 2, yPosition - 20, this.x.toFixed(2), 12);
        this._renderText(xPosition - 30, yPosition + displayHeight / 2, this.y.toFixed(2), 12);

        this.shape = this.canvas.rect(xPosition, yPosition, displayWidth, displayHeight);
    };

    Rectangle.prototype._calculateArea = function () {
        return this.x * this.y;
    };

    return Rectangle;
});