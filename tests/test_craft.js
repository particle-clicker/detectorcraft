var test_detector = function() {
  var cs = {
    "tracker": {
      "name": "Tracker",
      "measurements": {
        "electron": {
          "track": 0.9
        }
      },
      "stops": [],
    },
    "ecal": {
      "name": "ECal",
      "measurements": {
        "electron": {
          "energy": 0.9,
          "track": 0.2
        }
      },
      "stops": ["electron"]
    }
  };
  var d = new Craft.Detector();

  d.insertComponent(0, cs.tracker);
  d.insertComponent(1, cs.ecal);

  var meas = d.measureParticle('electron');

  return meas.track === 0.92 && meas.energy === 0.9;
};
