"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,o){return t&&_defineProperties(e.prototype,t),o&&_defineProperties(e,o),e}function _possibleConstructorReturn(e,t){return!t||"object"!==_typeof(t)&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var Sequelize=require("sequelize"),moment=require("moment");module.exports=function(e){var t=function(){function e(){return _classCallCheck(this,e),_possibleConstructorReturn(this,_getPrototypeOf(e).apply(this,arguments))}return _inherits(e,Sequelize.Model),_createClass(e,[{key:"publishedAt",value:function(){return moment(this.createdAt).format("MMMM D, YYYY, h:mma")}}]),e}();return t.init({title:{type:Sequelize.STRING,allowNull:!1,defaultValue:!1,validate:{notIn:[["0","false"]],notEmpty:{msg:"please provide a title"}}},author:{type:Sequelize.STRING,allowNull:!1,defaultValue:!1,validate:{notEmpty:{msg:"please provide the author name"}}},genre:{type:Sequelize.STRING,defaultValue:!1},year:{type:Sequelize.INTEGER,defaultValue:!1,validate:{min:{args:1700,msg:"please provide a year that is greater than 1700"}}}},{timestamps:!0,sequelize:e}),t};