/**
 * A generic and barebones view implementation that handles template rendering, simple
 * event binding and data model bindings.
 * @module View
 */
define(['jquery', 'handlebars'], function ( $, Handlebars ) {
    /**
     *
     * @param options.template {String} A html ID string referring to a template on the page,
     * the template needs to exist on the page in a script tag with this ID as its ID attribute.
     *
     * @param options.eventHandlers {Object} An object mapping where keys are a string
     * containing the event type and target, mapped to the function to be called when this event
     * is triggered, e.g: {'click li': function () { //a li element in the views DOM element was clicked }}
     *
     * @param options.model {Object} If you supply a data model that implements get and onChange
     * methods, your data will automatically get bound to the view causing automatic render updates
     * whenever the data changes.
     *
     * @param options.className {string} - A className for the views DOM element
     *
     *
     *
     * @constructor
     */
    var View = function ( options ) {
        this._className = options.className || '';
        this.$el = $('<div class="' + this._className + '"/>');
        this.template = Handlebars.compile($(options.template).html());
        this.eventHandlers = options.eventHandlers || {};
        this.model = options.model || false;

        this._bindEvents();
        this.model && this.model.onChange(this.render, this);
    };

    /**
     * The render method is responsible for updating the content of the views DOM node
     * using Handlebars. If there is no data model bound to the view and no data is
     * sent to the render method, no data will go through to the template, but rendering
     * dataless views is still possible. If there is a data model bound, its data will be
     * sent to the view. Optionally, you can also pass in an object directly to the render
     * call and that object will be forwarded into the template.
     *
     * @param data
     * @returns {View}
     */
    View.prototype.render = function ( data ) {
        if ( this.model ) {
            if ( typeof this.model.get !== 'function' ) {
                throw new Error('Models bound to views need to implement a get method');
            }
            data = this.model.get();
        }
        this.$el.html(this.template(data));
        return this;
    };

    /**
     * Uses the views eventHandler hash to internally bind events to the views DOM node
     * @private
     */
    View.prototype._bindEvents = function () {
        if ( this.eventHandlers ) {
            for ( var event in this.eventHandlers ) {
                if ( this.eventHandlers.hasOwnProperty(event) ) {
                    var ev = event.split(' ');
                    $(this.$el).on(ev[0], ev[1], this.eventHandlers[event]);
                }
            }
        }
    };
    return View;
});