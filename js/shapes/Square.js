define(['jquery', 'shapes/Shape', 'raphael'], function ( $, Shape, Raphael ) {

    var Square = Shape.extend( 1 );

    Square.prototype._createShape = function () {
        var displayWidth = this.x * 100;
        var center = this._getCanvasCenter();
        var xPosition = center.x - displayWidth / 2;
        var yPosition = center.y - displayWidth / 2;

        this.renderText(center.x, center.y, this.area.toFixed(2), 16);
        this.renderText(xPosition + displayWidth / 2, yPosition - 20, this.x.toFixed(2), 12);
        this.renderText(xPosition - 30, yPosition + displayWidth / 2, this.x.toFixed(2), 12);

        this.shape = this.canvas.rect(xPosition, yPosition, displayWidth, displayWidth);
    };

    Square.prototype._calculateArea = function () {
        return this.x * 2;
    };

    return Square;
});