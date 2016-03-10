/*!

The MIT License (MIT)

Copyright (c) 2016 Tom Schmieder

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

// Version 0.2.0

var AppLocalStorage = function(namespace) {
  // namespace have to be a string, false or undefined
  if ((typeof namespace === 'undefined') ||
      (typeof namespace !== 'string') ||
      (namespace === '')) {
    namespace = false;
  }
  this._namespace = namespace;
  this._namespacePrefix = "";
  if (this._namespace) {
    this._namespacePrefix = namespace+'/';
  }
  this._storage = window.localStorage;
};
AppLocalStorage.prototype.setDefault = function(name, value) {
  if (this._storage.getItem(this._namespacePrefix+name) === null) {
    this.setItem(name, value);
  }
};
AppLocalStorage.prototype.setItem = function(name, value) {
  this._storage.setItem(this._namespacePrefix+name, JSON.stringify(value));
};
AppLocalStorage.prototype.getItem = function(name) {
  var x = this._storage.getItem(this._namespacePrefix+name);
  try {
    return $.parseJSON(x);
  } catch(e) {
  }
  return undefined;
};
AppLocalStorage.prototype.removeItem = function(name) {
  this._storage.removeItem(this._namespacePrefix+name);
};
AppLocalStorage.prototype.clear = function() {
  if (!this._namespace) {
    this._storage.clear();
  } else {
    var keys = this.getKeys();
    for (var i = 0; i < keys.length; i++) {
      this.removeItem(keys[i]);
    }
  }
};
AppLocalStorage.prototype.getKeys = function() {
  if (!this._namespace) {
    return Object.keys(this._storage);
  } else {
    var keys = Object.keys(this._storage);
    var result = [];
    var namespacePrefixLength = this._namespacePrefix.length;
    for (var i = 0; i < keys.length; i++) {
      if (keys[i].substring(0, namespacePrefixLength) === this._namespacePrefix) {
        result.push(keys[i].substring(namespacePrefixLength));
      }
    }
    return result;
  }
};
AppLocalStorage.prototype.getAllItems = function() {
  var keys = this.getKeys();
  var result = {};
  for (var i = 0; i < keys.length; i++) {
    result[keys[i]] = this.getItem(keys[i]);
  }

  return result;
};