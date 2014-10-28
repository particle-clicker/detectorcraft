describe("Detector", function() {
  var detector;
  var components;

  beforeEach(function() {
    detector = new Craft.Detector();
    components = {
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
  });

  it("should work properly", function() {
    detector.insertComponent(0, components.tracker);
    detector.insertComponent(1, components.ecal);
    var meas = detector.measureParticle('electron');
    expect(meas.track).toBe(0.92);
    expect(meas.energy).toBe(0.9);
  });


});

var test_detector = function() {
  };
