/**
 */
var Craft = (function() {
  'use strict';

  // Temporary definitions of objects that will later be loaded dynamically
  // from JSON.
  var components = ['tracker', 'ecal', 'hcal', 'mcal'];
  var measurements = ['track', 'energy'];
  var particles = ['electron'];
  // --------------------------------------------------------------------------

  var Detector = function() {
    this.components = [];
  };

  Detector.prototype.insertComponent = function(index, component) {
    this.components.splice(index, 0, component);
  };

  Detector.prototype.removeComponent = function(index) {
    return this.components.splice(index, 1);
  };

  Detector.prototype.moveComponent = function(from, to) {
    this.insertComponent(to, this.removeComponent(from));
  };

  Detector.prototype.measureParticle = function(particleId) {
    var performance = {};
    measurements.forEach(function(m) {
      performance[m] = 1.0;
    });
    for (var i=0; i < this.components.length; i++) {
      var comp = this.components[i];
      var meas = comp.measurements[particleId];
      measurements.forEach(function(m) {
        performance[m] *= 1.0 - (meas[m] || 0.0);
      });
      if (comp.stops && comp.stops.indexOf(particleId) > -1) {
        break;
      };
    }
    measurements.forEach(function(m) {
      performance[m] = 1.0 - performance[m];
    });
    return performance;
  };

  return {
    Detector: Detector
  };
}) ();
