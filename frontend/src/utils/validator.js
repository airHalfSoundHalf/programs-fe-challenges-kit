(function (root, factory) {
  if (typeof exports === "object") {
    module.exports = factory();
  } else {
    root.validator = factory();
  }
}(this, function () {
  const validator = {
    isNumber(a) {
      return typeof a === 'number'
    }
  };

  return validator
}));