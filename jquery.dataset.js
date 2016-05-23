/**
 * jQuery $.fn.dataset / $.fn.removeDataset
 * jQuery approach ist to use $.fn.data but this does not update dom only memory
 * this script makes use of native js element.dataset
 *
 * @author: Stefan Benicke <stefan.benicke@gmail.com>
 * @version 1.0.1
 */
(function ($, undefined) {

    var _native = 'dataset' in HTMLElement.prototype;
    var _prefix = 'data-';
    var _camelCaseRegex = /[A-Z]/g;
    var _keysRegex = / +/g;

    $.fn.dataset = function (key, value) {
        if ($.isPlainObject(key)) {
            $.each(key, $.proxy(passIndividual, this));
            return this;
        } else if ($.type(key) !== 'string') {
            throw new TypeError('Invalid parameter "key"!');
        }
        if (value === undefined) {
            var elements = this;
            if (_native) {
                if ((elements = elements.get(0)) && typeof elements.dataset === 'object') {
                    return elements.dataset[key];
                }
            } else {
                return elements.attr(unCamelCase(key));
            }
        } else {
            return this.each(function () {
                var element = this;
                if (_native) {
                    if (element && typeof element.dataset === 'object') {
                        element.dataset[key] = value;
                    }
                } else {
                    $(element).attr(unCamelCase(key), value);
                }
            });
        }
    };

    $.fn.removeDataset = function (keys) {
        if ($.type(keys) !== 'string') {
            throw new TypeError('Invalid parameter "keys"!');
        }
        var keyList = keys.replace(_keysRegex, ' ').split(' ');
        if (!_native) {
            keys = $.map(keyList, unCamelCase).join(' ');
            return this.removeAttr(keys);
        }
        return this.each($.proxy(removeDataset, null, keyList));
    };

    function removeDataset(keyList, i, element) {
        var n, key;
        for (i = 0, n = keyList.length; i < n; i++) {
            key = keyList[i];
            if (element.dataset && element.dataset[key] !== undefined) {
                delete element.dataset[key];
            }
        }
    }

    function passIndividual(key, value) {
        this.dataset(key, value);
    }

    function unCamelCase(string) {
        return _prefix + string.replace(_camelCaseRegex, unCamelCaseChar);
    }

    function unCamelCaseChar(char) {
        return '-' + char.toLowerCase();
    }

})(jQuery);
