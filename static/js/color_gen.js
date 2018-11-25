// Generate colors (as Chroma.js objects)
var colors = paletteGenerator.generate(
  12, // Colors
  function(color){ // This function filters valid colors
    var hcl = color.hcl();
    return hcl[0]>=0 && hcl[0]<=360
      && hcl[1]>=30 && hcl[1]<=87.01
      && hcl[2]>=25 && hcl[2]<=70;
  },
  false, // Using Force Vector instead of k-Means
  50, // Steps (quality)
  false, // Ultra precision
  'Default' // Color distance type (colorblindness)
);
// Sort colors by differenciation first
colors = paletteGenerator.diffSort(colors, 'Default');