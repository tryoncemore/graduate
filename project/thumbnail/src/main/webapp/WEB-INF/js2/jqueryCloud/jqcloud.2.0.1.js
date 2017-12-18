/*!
 * jQCloud 2.0.1
 * Copyright 2011 Luca Ongaro (http://www.lucaongaro.eu)
 * Copyright 2013 Daniel White (http://www.developerdan.com)
 * Copyright 2014 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */
/*jshint -W055 *//* non standard constructor name */

/*
1. Word Options
    For each word object in your word array, you need to specify the following mandatory attributes:
1) text (string): the word(s) text
2) weight (number): a number (integer or float) defining the relative importance of the word (such as the number of occurrencies, etc.). The range of values is arbitrary, and they will be linearly mapped to a discrete scale from 1 to 10.
You can also specify the following options for each word:
3) html (object): an object specifying html attributes to be set on the word (e.g.: {class: "customclass", title: "A title"}). Any attribute can be set, except from "id", which is set by jQCloud.
4) link (string or object): if specified, the word will be wrapped in a HTML link (<a> tag). If link is a string, it is expected to be the URL to which the link will point, and will be used as the link's href attribute. Alternatively, link can be an object specifying html attributes for the <a> tag, like {href: "http://myurl.com", title: "A link"}
5) afterWordRender (function): a function to be called after this word is rendered. Within the function, this refers to the jQuery object for the <span> containing the word.
6) handlers (object): an object specifying event handlers that will bind to the word (e.g.: {click: function() { alert("it works!"); } })

2. Cloud Options:
    jQCloud accepts an object containing configurations for the whole cloud as the second argument:
	$("#example").jQCloud(word_list, {
	  width: 300,
	  height: 200
	});

    All cloud-wide configurations are optional, and the full list of available options is the following:
1) width (number): The width of the word cloud container element. Defaults to the original width.
2) height (number): The height of the word cloud container element. Defaults to the original height.
3) center (object): The x and y coordinates of the center of the word cloud, relative to the container element (e.g.: {x: 300, y: 150}). Defaults to the center of the container element.
4) afterCloudRender (function): A callback function to be called after the whole cloud is fully rendered.
5) delayedMode (boolean): If true, words are rendered one after another with a tiny delay between each one. This prevents freezing of the browser when there are many words to be rendered. If false, the cloud will be rendered in one single shot. By default, delayedMode is true when there are more than 50 words.
6) shape (string): the shape of the cloud. By default it is elliptic, but it can be set to "rectangular" to draw a rectangular-shaped cloud.
7) removeOverflowing (boolean): If true, it removes words that would overflow the container. Defaults to true.

3. Custom CSS guidelines
    The word cloud produced by jQCloud is made of pure HTML, so you can style it using CSS. 
	When you call $("#example").jQCloud(...), the containing element is given a CSS class of "jqcloud", allowing for easy CSS targeting. 
	The included CSS file jqcloud.css is intended as an example and as a base on which to develop your own custom style, defining dimensions and appearance of words in the cloud. 
	When writing your custom CSS, just follow these guidelines:
1) Always specify the dimensions of the container element (div.jqcloud in jqcloud.css).
2) The CSS attribute 'position' of the container element must be explicitly declared and different from 'static' (if it is 'static', jQCloud overwrites it to 'relative').
3) Specifying the style of the words (color, font, dimension, etc.) is super easy: words are wrapped in <span> tags with ten levels of importance corresponding to the following classes (in descending order of importance): w10, w9, w8, w7, w6, w5, w4, w3, w2, w1.
*/

(function($) {
  "use strict";

  /*
   * Plugin class
   */
  var jQCloud = function (element, word_array, options) {
    this.$element = $(element);

    this.word_array = word_array || [];
    this.options = options;

    this.sizeGenerator = null;
    this.colorGenerator = null;

    // Data used internally
    this.data = {
      placed_words: [],
      timeouts: {},
      namespace: null,
      step: null,
      angle: null,
      aspect_ratio: null,
      max_weight: null,
      min_weight: null,
      sizes: [],
      colors: []
    };

    this.initialize();
  };

  jQCloud.DEFAULTS = {
    width: 100,
    height: 100,
    center: { x: 0.5, y: 0.5 },
    steps: 10,
    delay: null,
    shape: 'elliptic',
    classPattern: 'w{n}',
    encodeURI: true,
    removeOverflowing: true,
    afterCloudRender: null,
    autoResize: false,
    colors: null,
    fontSize: null,
    template: null
  };

  jQCloud.prototype = {
    initialize: function() {
      // Set/Get dimensions
      if (this.options.width) {
        this.$element.width(this.options.width);
      }
      else {
        this.options.width = this.$element.width();
      }
      if (this.options.height) {
        this.$element.height(this.options.height);
      }
      else {
        this.options.height = this.$element.height();
      }

      // Default options value
      this.options = $.extend(true, {}, jQCloud.DEFAULTS, this.options);

      // Ensure delay
      if (this.options.delay === null) {
        this.options.delay = this.word_array.length > 50 ? 10 : 0;
      }

      // Backward compatibility
      if (this.options.center.x > 1) {
        this.options.center.x = this.options.center.x / this.options.width;
        this.options.center.y = this.options.center.y / this.options.height;
      }

      // Create colorGenerator function from options
      // Direct function
      if (typeof this.options.colors == 'function') {
        this.colorGenerator = this.options.colors;
      }
      // Array of sizes
      else if ($.isArray(this.options.colors)) {
        var cl = this.options.colors.length;
        if (cl > 0) {
          // Fill the sizes array to X items
          if (cl < this.options.steps) {
            for (var i=cl; i<this.options.steps; i++) {
              this.options.colors[i] = this.options.colors[cl-1];
            }
          }

          this.colorGenerator = function(weight) {
            return this.options.colors[this.options.steps - weight];
          };
        }
      }

      // console.log(this.options.width);
      // console.log(this.options.height);
      // console.log(this.options.shape);

      // Create sizeGenerator function from options
      // Direct function
      if (typeof this.options.fontSize == 'function') {
        this.sizeGenerator = this.options.fontSize;
      }
      // Object with 'from' and 'to'
      else if ($.isPlainObject(this.options.fontSize)) {
        this.sizeGenerator = function(width, height, weight) {
          var max = width * this.options.fontSize.from,
              min = width * this.options.fontSize.to;
          return Math.round(min + (max - min) * 1.0 / (this.options.steps-1) * (weight - 1)) + 'px';
        };
      }
      // Array of sizes
      else if ($.isArray(this.options.fontSize)) {
        var sl = this.options.fontSize.length;
        if (sl > 0) {
          // Fill the sizes array to X items
          if (sl < this.options.steps) {
            for (var j=sl; j<this.options.steps; j++) {
              this.options.fontSize[j] = this.options.fontSize[sl-1];
            }
          }

          this.sizeGenerator = function(width, height, weight) {
            return this.options.fontSize[this.options.steps - weight];
          };
        }
      }

      this.data.angle = Math.random() * 6.28;
      this.data.step = (this.options.shape === 'rectangular') ? 18.0 : 2.0;
      this.data.aspect_ratio = this.options.width / this.options.height;
      this.clearTimeouts();

      // Namespace word ids to avoid collisions between multiple clouds
      this.data.namespace = (this.$element.attr('id') || Math.floor((Math.random()*1000000)).toString(36)) + '_word_';

      this.$element.addClass('jqcloud');

      // Container's CSS position cannot be 'static'
      if (this.$element.css('position') === 'static') {
        this.$element.css('position', 'relative');
      }

      // Delay execution so that the browser can render the page before the computatively intensive word cloud drawing
      this.createTimeout($.proxy(this.drawWordCloud, this), 10);

      // Attach window resize event
      if (this.options.autoResize) {
        $(window).on('resize', throttle(function() {
          var new_size = {
            width: this.$element.width(),
            height: this.$element.height()
          };

          if (new_size.width != this.options.width || new_size.height != this.options.height) {
            this.options.width = new_size.width;
            this.options.height = new_size.height;
            this.data.aspect_ratio = this.options.width / this.options.height;

            this.update(this.word_array);
          }
        }, 50, this));
      }
    },

    // Helper function to keep track of timeouts so they can be destroyed
    createTimeout: function(callback, time) {
      var timeout = setTimeout($.proxy(function(){
        delete this.data.timeouts[timeout];
        callback();
      }, this), time);
      this.data.timeouts[timeout] = true;
    },

    // Destroy all timeouts
    clearTimeouts: function() {
      $.each(this.data.timeouts, function(key){
        clearTimeout(key);
      });
      this.data.timeouts = {};
    },

    // Pairwise overlap detection
    overlapping: function(a, b) {
      if (Math.abs(2.0*a.left + a.width - 2.0*b.left - b.width) < a.width + b.width) {
        if (Math.abs(2.0*a.top + a.height - 2.0*b.top - b.height) < a.height + b.height) {
          return true;
        }
      }
      return false;
    },

    // Helper function to test if an element overlaps others
    hitTest: function(elem) {
      // Check elements for overlap one by one, stop and return false as soon as an overlap is found
      for(var i=0, l=this.data.placed_words.length; i<l; i++) {
        if (this.overlapping(elem, this.data.placed_words[i])) {
          return true;
        }
      }
      return false;
    },

    // Initialize the drawing of the whole cloud
    drawWordCloud: function() {
      var i, l;
      
      this.$element.children('[id^="' + this.data.namespace + '"]').remove();

      if (this.word_array.length === 0) {
        return;
      }

      // Make sure every weight is a number before sorting
      for (i=0, l=this.word_array.length; i<l; i++) {
        this.word_array[i].weight = parseFloat(this.word_array[i].weight, 10);
      }

      // Sort word_array from the word with the highest weight to the one with the lowest
      this.word_array.sort(function(a, b) {
        return b.weight - a.weight;
      });

      // Kepp trace of bounds
      this.data.max_weight = this.word_array[0].weight;
      this.data.min_weight = this.word_array[this.word_array.length - 1].weight;

      // Generate colors
      this.data.colors = [];
      if (this.colorGenerator) {
        for (i=0; i<this.options.steps; i++) {
          this.data.colors.push(this.colorGenerator(i+1));
        }
      }

      // Generate font sizes
      this.data.sizes = [];
      if (this.sizeGenerator) {
        for (i=0; i<this.options.steps; i++) {
          this.data.sizes.push(this.sizeGenerator(this.options.width, this.options.height, i+1));
        }
      }

      // Iterate drawOneWord on every word, immediately or with delay
      if (this.options.delay > 0){
        this.drawOneWordDelayed();
      }
      else {
        for (i=0, l=this.word_array.length; i<l; i++) {
          this.drawOneWord(i, this.word_array[i]);
        }

        if (typeof this.options.afterCloudRender === 'function') {
          this.options.afterCloudRender.call(this.$element);
        }
      }
    },

    // Function to draw a word, by moving it in spiral until it finds a suitable empty place
    drawOneWord: function(index, word) {
      var word_id = this.data.namespace + index,
          word_selector = '#' + word_id,

          // option.shape == 'elliptic'
          angle = this.data.angle,
          radius = 0.0,

          // option.shape == 'rectangular'
          steps_in_direction = 0.0,
          quarter_turns = 0.0,

          weight = Math.floor(this.options.steps / 2),
          word_span,
          word_size,
          word_style;

      // Create word attr object
      word.attr = $.extend({}, word.html, { id: word_id });

      // Linearly map the original weight to a discrete scale from 1 to 10
      // Only if weights are different
      if (this.data.max_weight != this.data.min_weight) {
        weight = Math.round((word.weight - this.data.min_weight) * 1.0 * (this.options.steps-1) / (this.data.max_weight - this.data.min_weight)) + 1;
      }
      word_span = $('<span>').attr(word.attr);

      // Apply class
      if (this.options.classPattern) {
        word_span.addClass(this.options.classPattern.replace('{n}', weight));
      }

      // Apply color
      if (this.data.colors.length) {
        word_span.css('color', this.data.colors[weight-1]);
      }

      // Apply size
      if (this.data.sizes.length) {
        word_span.css('font-size', this.data.sizes[weight-1]);
      }

      //Render using template function if provided.
      if (this.options.template) {
        word_span.html(this.options.template(word));
      } else if (word.link) {
        // Append link if word.link attribute was set
        // If link is a string, then use it as the link href
        if (typeof word.link === 'string') {
          word.link = { href: word.link };
        }

        if (this.options.encodeURI) {
          word.link.href = encodeURI(word.link.href).replace(/'/g, '%27');
        }

        word_span.append($('<a>').attr(word.link).text(word.text));
      }
      else {
        word_span.text(word.text);
      }

      // Bind handlers to words
      if (word.handlers) {
        word_span.on(word.handlers);
      }

      this.$element.append(word_span);

      word_size = {
        width: word_span.width(),
        height: word_span.height()
      };
      word_size.left = this.options.center.x*this.options.width - word_size.width / 2.0;
      word_size.top = this.options.center.y*this.options.height - word_size.height / 2.0;

      // Save a reference to the style property, for better performance
      word_style = word_span[0].style;
      word_style.position = 'absolute';
      word_style.left = word_size.left + 'px';
      word_style.top = word_size.top + 'px';

      while(this.hitTest(word_size)) {
        // option shape is 'rectangular' so move the word in a rectangular spiral
        if (this.options.shape === 'rectangular') {
          steps_in_direction++;

          if (steps_in_direction * this.data.step > (1 + Math.floor(quarter_turns / 2.0)) * this.data.step * ((quarter_turns % 4 % 2) === 0 ? 1 : this.data.aspect_ratio)) {
            steps_in_direction = 0.0;
            quarter_turns++;
          }

          switch(quarter_turns % 4) {
            case 1:
              word_size.left += this.data.step * this.data.aspect_ratio + Math.random() * 2.0;
              break;
            case 2:
              word_size.top -= this.data.step + Math.random() * 2.0;
              break;
            case 3:
              word_size.left -= this.data.step * this.data.aspect_ratio + Math.random() * 2.0;
              break;
            case 0:
              word_size.top += this.data.step + Math.random() * 2.0;
              break;
          }
        }
        // Default settings: elliptic spiral shape
        else {
          radius += this.data.step;
          angle += (index % 2 === 0 ? 1 : -1) * this.data.step;

          word_size.left = this.options.center.x*this.options.width - (word_size.width / 2.0) + (radius*Math.cos(angle)) * this.data.aspect_ratio;
          word_size.top = this.options.center.y*this.options.height + radius*Math.sin(angle) - (word_size.height / 2.0);
        }
        word_style.left = word_size.left + 'px';
        word_style.top = word_size.top + 'px';
      }

      // Don't render word if part of it would be outside the container
      if (this.options.removeOverflowing && (
          // word_size.left < 0 || word_size.top < 0 ||
          // (word_size.left + word_size.width) > this.options.width ||
          // (word_size.top + word_size.height) > this.options.height
          word_size.left-30 < (2*this.options.center.x*this.options.width-this.options.width) || 
          word_size.top-30 < (2*this.options.center.y*this.options.height-this.options.height) ||
          (word_size.left + word_size.width) > this.options.width ||
          (word_size.top + word_size.height) > this.options.height
        )
      ) {
        word_span.remove();
        return;
      }

      // Save position for further usage
      this.data.placed_words.push(word_size);

      if (typeof word.afterWordRender === 'function') {
        word.afterWordRender.call(word_span);
      }
    },

    // Draw one word then recall the function after a delay
    drawOneWordDelayed: function(index) {
      index = index || 0;

      // if not visible then do not attempt to draw
      if (!this.$element.is(':visible')) {
        this.createTimeout($.proxy(function(){
          this.drawOneWordDelayed(index);
        }, this), 10);

        return;
      }

      if (index < this.word_array.length) {
        this.drawOneWord(index, this.word_array[index]);

        this.createTimeout($.proxy(function(){
          this.drawOneWordDelayed(index + 1);
        }, this), this.options.delay);
      }
      else {
        if (typeof this.options.afterCloudRender == 'function') {
          this.options.afterCloudRender.call(this.$element);
        }
      }
    },

    // Destroy any data and objects added by the plugin
    destroy: function() {
      this.clearTimeouts();
      this.$element.removeClass('jqcloud');
      this.$element.removeData('jqcloud');
      this.$element.children('[id^="' + this.namespace + '"]').remove();
    },

    // Update the list of words
    update: function(word_array) {
      this.word_array = word_array;
      this.data.placed_words = [];

      this.clearTimeouts();
      this.drawWordCloud();
    }
  };

  /*
   * Apply throttling to a callback
   * @param callback {function}
   * @param delay {int} milliseconds
   * @param context {object|null}
   * @return {function}
   */
  function throttle(callback, delay, context) {
    var state = {
      pid: null,
      last: 0
    };

    return function() {
      var elapsed = new Date().getTime() - state.last,
          args = arguments,
          that = this;

      function exec() {
        state.last = new Date().getTime();
        return callback.apply(context || that, Array.prototype.slice.call(args));
      }

      if (elapsed > delay) {
        return exec();
      }
      else {
        clearTimeout(state.pid);
        state.pid = setTimeout(exec, delay - elapsed);
      }
    };
  }

  /*
   * jQuery plugin
   */
  $.fn.jQCloud = function(word_array, option) {
    var args = arguments;

    return this.each(function () {
      var $this = $(this),
          data = $this.data('jqcloud');

      if (!data && word_array === 'destroy') {
        // Don't even try to initialize when called with 'destroy'
        return;
      }
      if (!data) {
        var options = typeof option === 'object' ? option : {};
        $this.data('jqcloud', (data = new jQCloud(this, word_array, options)));
      }
      else if (typeof word_array === 'string') {
        data[word_array].apply(data, Array.prototype.slice.call(args, 1));
      }
    });
  };

  $.fn.jQCloud.defaults = {
    set: function(options) {
      $.extend(true, jQCloud.DEFAULTS, options);
    },
    get: function(key) {
      var options = jQCloud.DEFAULTS;
      if (key) {
        options = options[key];
      }
      return $.extend(true, {}, options);
    }
  };
})(jQuery);
