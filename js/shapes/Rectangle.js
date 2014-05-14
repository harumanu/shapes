define(['jquery', 'shapes/Shape', 'raphael'], function ( $, Shape, Raphael ) {

    var Rectangle = Shape.extend( 2 );
    /*
    var Rectangle = MakeShape(function ( size ) {
        this.width = size[0];
        this.height = size[1];
        this.area = this._calculateArea();
    });*/

    Rectangle.prototype._createShape = function () {
        var displayWidth = this.x * 80;
        var displayHeight = this.y * 80;
        var center = this._getCanvasCenter();
        var xPosition = center.x - displayWidth / 2;
        var yPosition = center.y - displayHeight / 2;

        this._renderCenterText(this.area.toFixed(2));
        this.renderText(xPosition + displayWidth / 2, yPosition - 20, this.x.toFixed(2), 12);
        this.renderText(xPosition - 30, yPosition + displayHeight / 2, this.y.toFixed(2), 12);

        this.shape = this.canvas.rect(xPosition, yPosition, displayWidth, displayHeight);
    };

    Rectangle.prototype._calculateArea = function () {
        return this.x * this.y;
    };

    return Rectangle;
});