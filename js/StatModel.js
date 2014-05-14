/**
 * A model responsible for handling the stats of a shape type
 * @module StateModel
 */
define(function () {
    'use strict';
    /**
     *
     * @param name {string} The name of the shape
     * @constructor
     */
    var StatModel = function ( name ) {
        this.data = {
            name: name,
            amountGenerated: 0,
            totalArea: 0,
            latestArea: 0,
            averageArea: 0
        };
        this.subscribers = [];
    };

    /**
     * Calculates and returns the average area for all shapes generate of this type.
     * @returns {Number}
     * @private
     */
    StatModel.prototype._getAverageArea = function () {
        if ( this.data.amountGenerated ) {
            return +(this.data.totalArea / this.data.amountGenerated).toFixed(2);
        }
        return 0.00;
    };

    /**
     * Updates the model whenever a new shape has been generated. Takes in the area
     * of the new shape and modifies all the data attributes with this information
     * before notifying any subscribers listening to the models change event that
     * the model has changed.
     * @param area {Number}
     */
    StatModel.prototype.update = function ( area ) {
        this.data.amountGenerated += 1;
        this.data.totalArea += area;
        this.data.latestArea = area.toFixed(2);
        this.data.averageArea = this._getAverageArea();
        this._triggerChange();
    };

    /**
     * Returns values from the model. If no attribute is specified, the entire
     * attributes hash will be returned.
     * @param attribute {string} - The key of an attribute you want to retreive.
     * @returns {*}
     */
    StatModel.prototype.get = function ( attribute ) {
        if ( attribute ) {
            return this.data[attribute];
        }
        return this.data;
    };

    /**
     * Subscribe to changes in the model
     * @callback fn - The function that will be executed whenever this model is updated.
     * @param ctx {Object} - If a ctx object is provided, it will be used as the execution context
     * of the callback function.
     */
    StatModel.prototype.onChange = function ( fn, ctx ) {
        this.subscribers.push({ fn: fn, ctx: ctx });
    };

    /**
     * Goes through all subscribers and executes their event handlers.
     * @private
     */
    StatModel.prototype._triggerChange = function () {
        for ( var i = 0; i < this.subscribers.length; ++i ) {
            this.subscribers[i].fn.call(this.subscribers[i].ctx);
        }
    };

    return StatModel;
});