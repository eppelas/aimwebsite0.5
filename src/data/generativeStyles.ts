export interface GenerativeCategory {
  id: string;
  name: string;
}

export interface GenerativeStyle {
  id: number;
  categoryId: string;
  name: string;
}

export const generativeCategories: GenerativeCategory[] = [
  {
    "id": "cat_1",
    "name": "\u0413\u0435\u043e\u043c\u0435\u0442\u0440\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u0438 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u0441\u0438\u0441\u0442\u0435\u043c\u044b"
  },
  {
    "id": "cat_2",
    "name": "\u0421\u0435\u0442\u043a\u0438, \u0440\u0430\u0437\u0431\u0438\u0435\u043d\u0438\u044f \u0438 \u0434\u0438\u0441\u043a\u0440\u0435\u0442\u043d\u0430\u044f \u0433\u0435\u043e\u043c\u0435\u0442\u0440\u0438\u044f"
  },
  {
    "id": "cat_3",
    "name": "\u041f\u043e\u043b\u044f, \u0448\u0443\u043c \u0438 \u0444\u0443\u043d\u043a\u0446\u0438\u0438"
  },
  {
    "id": "cat_4",
    "name": "\u041a\u043e\u043d\u0442\u0443\u0440\u043d\u044b\u0435 \u0438 marching-\u0430\u043b\u0433\u043e\u0440\u0438\u0442\u043c\u044b"
  },
  {
    "id": "cat_5",
    "name": "\u0424\u0440\u0430\u043a\u0442\u0430\u043b\u044b \u0438 \u0440\u0435\u043a\u0443\u0440\u0441\u0438\u044f"
  },
  {
    "id": "cat_6",
    "name": "L-systems \u0438 \u0431\u043e\u0442\u0430\u043d\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u0433\u0435\u043d\u0435\u0440\u0430\u0442\u043e\u0440\u044b"
  },
  {
    "id": "cat_7",
    "name": "\u041a\u043b\u0435\u0442\u043e\u0447\u043d\u044b\u0435 \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u044b \u0438 \u0434\u0438\u0441\u043a\u0440\u0435\u0442\u043d\u044b\u0435 \u043c\u0438\u0440\u044b"
  },
  {
    "id": "cat_8",
    "name": "\u0420\u0435\u0430\u043a\u0446\u0438\u044f-\u0434\u0438\u0444\u0444\u0443\u0437\u0438\u044f \u0438 \u043c\u043e\u0440\u0444\u043e\u0433\u0435\u043d\u0435\u0437"
  },
  {
    "id": "cat_9",
    "name": "\u0427\u0430\u0441\u0442\u0438\u0446\u044b, \u0430\u0433\u0435\u043d\u0442\u044b \u0438 \u043f\u043e\u0432\u0435\u0434\u0435\u043d\u0438\u0435 \u0440\u043e\u044f"
  },
  {
    "id": "cat_10",
    "name": "\u0424\u0438\u0437\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u0441\u0438\u043c\u0443\u043b\u044f\u0446\u0438\u0438 \u043a\u0430\u043a \u0438\u043b\u043b\u044e\u0441\u0442\u0440\u0430\u0446\u0438\u044f"
  },
  {
    "id": "cat_11",
    "name": "Shader-native \u0448\u0442\u0443\u043a\u0438"
  },
  {
    "id": "cat_12",
    "name": "\u0422\u0435\u043a\u0441\u0442\u0443\u0440\u043d\u044b\u0435 \u0438 \u043c\u0430\u0442\u0435\u0440\u0438\u0430\u043b\u044c\u043d\u044b\u0435 \u0441\u0438\u0441\u0442\u0435\u043c\u044b"
  },
  {
    "id": "cat_13",
    "name": "\u041c\u043e\u0437\u0430\u0438\u043a\u0438, \u043f\u0438\u043a\u0441\u0435\u043b\u044c\u043d\u044b\u0435 \u0438 \u0431\u043b\u043e\u0447\u043d\u044b\u0435 \u0441\u0438\u0441\u0442\u0435\u043c\u044b"
  },
  {
    "id": "cat_14",
    "name": "\u0422\u0438\u043f\u043e\u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u0438 \u0437\u043d\u0430\u043a\u043e\u0432\u044b\u0435 \u0441\u0438\u0441\u0442\u0435\u043c\u044b"
  },
  {
    "id": "cat_15",
    "name": "\u0414\u0438\u0430\u0433\u0440\u0430\u043c\u043c\u043d\u044b\u0435 \u0438 \u043a\u0430\u0440\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u0441\u0442\u0438\u043b\u0438"
  },
  {
    "id": "cat_16",
    "name": "\u0410\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u043d\u043e-\u043f\u0440\u043e\u0441\u0442\u0440\u0430\u043d\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u0435 \u0441\u0438\u0441\u0442\u0435\u043c\u044b"
  },
  {
    "id": "cat_17",
    "name": "\u041e\u043f\u0442\u0438\u0447\u0435\u0441\u043a\u0438\u0435, \u043f\u0430\u0442\u0442\u0435\u0440\u043d\u043d\u044b\u0435 \u0438 \u0438\u043b\u043b\u044e\u0437\u043e\u0440\u043d\u044b\u0435 \u0441\u0438\u0441\u0442\u0435\u043c\u044b"
  },
  {
    "id": "cat_18",
    "name": "\u041f\u0440\u0438\u0440\u043e\u0434\u043e\u043f\u043e\u0434\u043e\u0431\u043d\u044b\u0435 \u0433\u0435\u043d\u0435\u0440\u0430\u0442\u043e\u0440\u044b"
  },
  {
    "id": "cat_19",
    "name": "\u0421\u0442\u043e\u0445\u0430\u0441\u0442\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u0438 \u0432\u0435\u0440\u043e\u044f\u0442\u043d\u043e\u0441\u0442\u043d\u044b\u0435 \u0441\u0438\u0441\u0442\u0435\u043c\u044b"
  },
  {
    "id": "cat_20",
    "name": "\u0413\u0438\u0431\u0440\u0438\u0434\u044b, \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u043e\u0441\u043e\u0431\u0435\u043d\u043d\u043e \u0441\u0442\u043e\u0438\u0442 \u043f\u0440\u043e\u0431\u043e\u0432\u0430\u0442\u044c"
  }
];

export const generativeStyles: GenerativeStyle[] = [
  {
    "id": 1,
    "categoryId": "cat_1",
    "name": "Parametric curves"
  },
  {
    "id": 2,
    "categoryId": "cat_1",
    "name": "Parametric surfaces"
  },
  {
    "id": 3,
    "categoryId": "cat_1",
    "name": "Polar curves"
  },
  {
    "id": 4,
    "categoryId": "cat_1",
    "name": "Rose curves"
  },
  {
    "id": 5,
    "categoryId": "cat_1",
    "name": "Spirals"
  },
  {
    "id": 6,
    "categoryId": "cat_1",
    "name": "Logarithmic spirals"
  },
  {
    "id": 7,
    "categoryId": "cat_1",
    "name": "Archimedean spirals"
  },
  {
    "id": 8,
    "categoryId": "cat_1",
    "name": "Fermat spirals"
  },
  {
    "id": 9,
    "categoryId": "cat_1",
    "name": "Hypotrochoids"
  },
  {
    "id": 10,
    "categoryId": "cat_1",
    "name": "Epitrochoids"
  },
  {
    "id": 11,
    "categoryId": "cat_1",
    "name": "Spirograph forms"
  },
  {
    "id": 12,
    "categoryId": "cat_1",
    "name": "Lissajous curves"
  },
  {
    "id": 13,
    "categoryId": "cat_1",
    "name": "Bezier systems generated by rules"
  },
  {
    "id": 14,
    "categoryId": "cat_1",
    "name": "Splines with procedural control points"
  },
  {
    "id": 15,
    "categoryId": "cat_1",
    "name": "Fourier drawing / Fourier epicycles"
  },
  {
    "id": 16,
    "categoryId": "cat_1",
    "name": "Harmonograph"
  },
  {
    "id": 17,
    "categoryId": "cat_1",
    "name": "Cycloids"
  },
  {
    "id": 18,
    "categoryId": "cat_1",
    "name": "Epicycloids"
  },
  {
    "id": 19,
    "categoryId": "cat_1",
    "name": "Hypocycloids"
  },
  {
    "id": 20,
    "categoryId": "cat_1",
    "name": "Superellipses"
  },
  {
    "id": 21,
    "categoryId": "cat_1",
    "name": "Superformula shapes"
  },
  {
    "id": 22,
    "categoryId": "cat_1",
    "name": "Guilloch\u00e9 patterns"
  },
  {
    "id": 23,
    "categoryId": "cat_1",
    "name": "Radial line constructions"
  },
  {
    "id": 24,
    "categoryId": "cat_1",
    "name": "Concentric deformation systems"
  },
  {
    "id": 25,
    "categoryId": "cat_1",
    "name": "Ribbon curves"
  },
  {
    "id": 26,
    "categoryId": "cat_1",
    "name": "Offset contour systems"
  },
  {
    "id": 27,
    "categoryId": "cat_1",
    "name": "Procedural rosettes"
  },
  {
    "id": 28,
    "categoryId": "cat_1",
    "name": "Star polygons"
  },
  {
    "id": 29,
    "categoryId": "cat_1",
    "name": "Recursive polygon subdivision"
  },
  {
    "id": 30,
    "categoryId": "cat_1",
    "name": "Geometric lace patterns"
  },
  {
    "id": 31,
    "categoryId": "cat_2",
    "name": "Regular grids"
  },
  {
    "id": 32,
    "categoryId": "cat_2",
    "name": "Isometric grids"
  },
  {
    "id": 33,
    "categoryId": "cat_2",
    "name": "Hex grids"
  },
  {
    "id": 34,
    "categoryId": "cat_2",
    "name": "Triangular grids"
  },
  {
    "id": 35,
    "categoryId": "cat_2",
    "name": "Diamond grids"
  },
  {
    "id": 36,
    "categoryId": "cat_2",
    "name": "Voronoi diagrams"
  },
  {
    "id": 37,
    "categoryId": "cat_2",
    "name": "Weighted Voronoi"
  },
  {
    "id": 38,
    "categoryId": "cat_2",
    "name": "Centroidal Voronoi"
  },
  {
    "id": 39,
    "categoryId": "cat_2",
    "name": "Delaunay triangulation"
  },
  {
    "id": 40,
    "categoryId": "cat_2",
    "name": "Convex hull based graphics"
  },
  {
    "id": 41,
    "categoryId": "cat_2",
    "name": "Nearest-neighbor graphs"
  },
  {
    "id": 42,
    "categoryId": "cat_2",
    "name": "Gabriel graphs"
  },
  {
    "id": 43,
    "categoryId": "cat_2",
    "name": "Relative neighborhood graphs"
  },
  {
    "id": 44,
    "categoryId": "cat_2",
    "name": "Quadtrees"
  },
  {
    "id": 45,
    "categoryId": "cat_2",
    "name": "Octree-like 2D projections"
  },
  {
    "id": 46,
    "categoryId": "cat_2",
    "name": "BSP partition visuals"
  },
  {
    "id": 47,
    "categoryId": "cat_2",
    "name": "Mosaic tessellation"
  },
  {
    "id": 48,
    "categoryId": "cat_2",
    "name": "Irregular tilings"
  },
  {
    "id": 49,
    "categoryId": "cat_2",
    "name": "Penrose tilings"
  },
  {
    "id": 50,
    "categoryId": "cat_2",
    "name": "Wang tiles"
  },
  {
    "id": 51,
    "categoryId": "cat_2",
    "name": "Truchet tiles"
  },
  {
    "id": 52,
    "categoryId": "cat_2",
    "name": "Islamic geometric tilings"
  },
  {
    "id": 53,
    "categoryId": "cat_2",
    "name": "Quasicrystal tilings"
  },
  {
    "id": 54,
    "categoryId": "cat_2",
    "name": "Circle packing"
  },
  {
    "id": 55,
    "categoryId": "cat_2",
    "name": "Rectangle packing"
  },
  {
    "id": 56,
    "categoryId": "cat_2",
    "name": "Treemap aesthetics"
  },
  {
    "id": 57,
    "categoryId": "cat_2",
    "name": "Hexbin compositions"
  },
  {
    "id": 58,
    "categoryId": "cat_2",
    "name": "Triangulated mesh art"
  },
  {
    "id": 59,
    "categoryId": "cat_2",
    "name": "Low-poly fields"
  },
  {
    "id": 60,
    "categoryId": "cat_2",
    "name": "Voronoi cell shading"
  },
  {
    "id": 61,
    "categoryId": "cat_3",
    "name": "Value noise"
  },
  {
    "id": 62,
    "categoryId": "cat_3",
    "name": "Perlin noise"
  },
  {
    "id": 63,
    "categoryId": "cat_3",
    "name": "Simplex noise"
  },
  {
    "id": 64,
    "categoryId": "cat_3",
    "name": "OpenSimplex noise"
  },
  {
    "id": 65,
    "categoryId": "cat_3",
    "name": "Cellular noise / Worley noise"
  },
  {
    "id": 66,
    "categoryId": "cat_3",
    "name": "Fractal Brownian motion"
  },
  {
    "id": 67,
    "categoryId": "cat_3",
    "name": "Turbulence fields"
  },
  {
    "id": 68,
    "categoryId": "cat_3",
    "name": "Ridged noise"
  },
  {
    "id": 69,
    "categoryId": "cat_3",
    "name": "Curl noise"
  },
  {
    "id": 70,
    "categoryId": "cat_3",
    "name": "Flow fields"
  },
  {
    "id": 71,
    "categoryId": "cat_3",
    "name": "Vector fields"
  },
  {
    "id": 72,
    "categoryId": "cat_3",
    "name": "Divergence fields"
  },
  {
    "id": 73,
    "categoryId": "cat_3",
    "name": "Gradient fields"
  },
  {
    "id": 74,
    "categoryId": "cat_3",
    "name": "Potential fields"
  },
  {
    "id": 75,
    "categoryId": "cat_3",
    "name": "Distance fields"
  },
  {
    "id": 76,
    "categoryId": "cat_3",
    "name": "Signed distance fields"
  },
  {
    "id": 77,
    "categoryId": "cat_3",
    "name": "Domain warping"
  },
  {
    "id": 78,
    "categoryId": "cat_3",
    "name": "Noise displacement maps"
  },
  {
    "id": 79,
    "categoryId": "cat_3",
    "name": "Height fields"
  },
  {
    "id": 80,
    "categoryId": "cat_3",
    "name": "Scalar field visualization"
  },
  {
    "id": 81,
    "categoryId": "cat_3",
    "name": "Interference fields"
  },
  {
    "id": 82,
    "categoryId": "cat_3",
    "name": "Sinusoidal fields"
  },
  {
    "id": 83,
    "categoryId": "cat_3",
    "name": "Wave superposition patterns"
  },
  {
    "id": 84,
    "categoryId": "cat_3",
    "name": "Distance-to-shape fields"
  },
  {
    "id": 85,
    "categoryId": "cat_3",
    "name": "Metaball fields"
  },
  {
    "id": 86,
    "categoryId": "cat_3",
    "name": "Iso-lines"
  },
  {
    "id": 87,
    "categoryId": "cat_3",
    "name": "Iso-bands"
  },
  {
    "id": 88,
    "categoryId": "cat_3",
    "name": "Contour maps"
  },
  {
    "id": 89,
    "categoryId": "cat_3",
    "name": "Heatmap aesthetics"
  },
  {
    "id": 90,
    "categoryId": "cat_3",
    "name": "Topographic line art"
  },
  {
    "id": 91,
    "categoryId": "cat_4",
    "name": "Marching squares"
  },
  {
    "id": 92,
    "categoryId": "cat_4",
    "name": "Marching triangles"
  },
  {
    "id": 93,
    "categoryId": "cat_4",
    "name": "Marching cubes"
  },
  {
    "id": 94,
    "categoryId": "cat_4",
    "name": "Iso-surface extraction"
  },
  {
    "id": 95,
    "categoryId": "cat_4",
    "name": "Blob contours"
  },
  {
    "id": 96,
    "categoryId": "cat_4",
    "name": "Metaball contour extraction"
  },
  {
    "id": 97,
    "categoryId": "cat_4",
    "name": "Topographic isolines"
  },
  {
    "id": 98,
    "categoryId": "cat_4",
    "name": "Threshold contour art"
  },
  {
    "id": 99,
    "categoryId": "cat_4",
    "name": "Posterization contours"
  },
  {
    "id": 100,
    "categoryId": "cat_4",
    "name": "Contour typography effects"
  },
  {
    "id": 101,
    "categoryId": "cat_4",
    "name": "Line integral convolution lookalikes"
  },
  {
    "id": 102,
    "categoryId": "cat_4",
    "name": "Edge-traced field graphics"
  },
  {
    "id": 103,
    "categoryId": "cat_4",
    "name": "Contour stacking"
  },
  {
    "id": 104,
    "categoryId": "cat_4",
    "name": "Nested contour fills"
  },
  {
    "id": 105,
    "categoryId": "cat_4",
    "name": "Cut-paper contour style"
  },
  {
    "id": 106,
    "categoryId": "cat_4",
    "name": "Terrain contour rendering"
  },
  {
    "id": 107,
    "categoryId": "cat_4",
    "name": "Ink-like contour accumulation"
  },
  {
    "id": 108,
    "categoryId": "cat_4",
    "name": "Multi-threshold silhouette systems"
  },
  {
    "id": 109,
    "categoryId": "cat_4",
    "name": "Variable density contour maps"
  },
  {
    "id": 110,
    "categoryId": "cat_4",
    "name": "Reaction-diffusion contour capture"
  },
  {
    "id": 111,
    "categoryId": "cat_5",
    "name": "Mandelbrot"
  },
  {
    "id": 112,
    "categoryId": "cat_5",
    "name": "Julia sets"
  },
  {
    "id": 113,
    "categoryId": "cat_5",
    "name": "Burning Ship fractal"
  },
  {
    "id": 114,
    "categoryId": "cat_5",
    "name": "Newton fractals"
  },
  {
    "id": 115,
    "categoryId": "cat_5",
    "name": "Lyapunov fractals"
  },
  {
    "id": 116,
    "categoryId": "cat_5",
    "name": "Fractal flames"
  },
  {
    "id": 117,
    "categoryId": "cat_5",
    "name": "Barnsley fern"
  },
  {
    "id": 118,
    "categoryId": "cat_5",
    "name": "Sierpinski triangle"
  },
  {
    "id": 119,
    "categoryId": "cat_5",
    "name": "Sierpinski carpet"
  },
  {
    "id": 120,
    "categoryId": "cat_5",
    "name": "Koch snowflake"
  },
  {
    "id": 121,
    "categoryId": "cat_5",
    "name": "Dragon curve"
  },
  {
    "id": 122,
    "categoryId": "cat_5",
    "name": "Hilbert curve"
  },
  {
    "id": 123,
    "categoryId": "cat_5",
    "name": "Peano curve"
  },
  {
    "id": 124,
    "categoryId": "cat_5",
    "name": "Gosper curve"
  },
  {
    "id": 125,
    "categoryId": "cat_5",
    "name": "Levy C curve"
  },
  {
    "id": 126,
    "categoryId": "cat_5",
    "name": "Apollonian gasket"
  },
  {
    "id": 127,
    "categoryId": "cat_5",
    "name": "Fractal trees"
  },
  {
    "id": 128,
    "categoryId": "cat_5",
    "name": "Recursive branching"
  },
  {
    "id": 129,
    "categoryId": "cat_5",
    "name": "Escape-time fractals"
  },
  {
    "id": 130,
    "categoryId": "cat_5",
    "name": "IFS fractals"
  },
  {
    "id": 131,
    "categoryId": "cat_5",
    "name": "Kaleidoscopic recursion"
  },
  {
    "id": 132,
    "categoryId": "cat_5",
    "name": "Recursive subdivision art"
  },
  {
    "id": 133,
    "categoryId": "cat_5",
    "name": "Midpoint displacement"
  },
  {
    "id": 134,
    "categoryId": "cat_5",
    "name": "Fractal terrain"
  },
  {
    "id": 135,
    "categoryId": "cat_5",
    "name": "Recursive circle nesting"
  },
  {
    "id": 136,
    "categoryId": "cat_5",
    "name": "Recursive arc systems"
  },
  {
    "id": 137,
    "categoryId": "cat_5",
    "name": "Space-filling curves"
  },
  {
    "id": 138,
    "categoryId": "cat_5",
    "name": "Recursive labyrinths"
  },
  {
    "id": 139,
    "categoryId": "cat_5",
    "name": "Fractal lace"
  },
  {
    "id": 140,
    "categoryId": "cat_5",
    "name": "Self-similar ornamental systems"
  },
  {
    "id": 141,
    "categoryId": "cat_6",
    "name": "Classic L-systems"
  },
  {
    "id": 142,
    "categoryId": "cat_6",
    "name": "Stochastic L-systems"
  },
  {
    "id": 143,
    "categoryId": "cat_6",
    "name": "Parametric L-systems"
  },
  {
    "id": 144,
    "categoryId": "cat_6",
    "name": "Turtle graphics systems"
  },
  {
    "id": 145,
    "categoryId": "cat_6",
    "name": "Recursive botanical growth"
  },
  {
    "id": 146,
    "categoryId": "cat_6",
    "name": "Vine generators"
  },
  {
    "id": 147,
    "categoryId": "cat_6",
    "name": "Coral-like branching"
  },
  {
    "id": 148,
    "categoryId": "cat_6",
    "name": "Moss / lichen growth approximations"
  },
  {
    "id": 149,
    "categoryId": "cat_6",
    "name": "Procedural leaf venation"
  },
  {
    "id": 150,
    "categoryId": "cat_6",
    "name": "Branch attractor systems"
  },
  {
    "id": 151,
    "categoryId": "cat_6",
    "name": "Diffusion-limited aggregation trees"
  },
  {
    "id": 152,
    "categoryId": "cat_6",
    "name": "Root network graphics"
  },
  {
    "id": 153,
    "categoryId": "cat_6",
    "name": "Mycelium-style branching"
  },
  {
    "id": 154,
    "categoryId": "cat_6",
    "name": "River delta branching"
  },
  {
    "id": 155,
    "categoryId": "cat_6",
    "name": "Lightning branching"
  },
  {
    "id": 156,
    "categoryId": "cat_6",
    "name": "Cracked earth branching"
  },
  {
    "id": 157,
    "categoryId": "cat_6",
    "name": "Neuron-like branching"
  },
  {
    "id": 158,
    "categoryId": "cat_6",
    "name": "Vascular systems"
  },
  {
    "id": 159,
    "categoryId": "cat_6",
    "name": "Procedural floral symmetry"
  },
  {
    "id": 160,
    "categoryId": "cat_6",
    "name": "Petal phyllotaxis hybrids"
  },
  {
    "id": 161,
    "categoryId": "cat_7",
    "name": "Conway\u2019s Game of Life"
  },
  {
    "id": 162,
    "categoryId": "cat_7",
    "name": "Totalistic automata"
  },
  {
    "id": 163,
    "categoryId": "cat_7",
    "name": "Elementary cellular automata"
  },
  {
    "id": 164,
    "categoryId": "cat_7",
    "name": "Multi-state cellular automata"
  },
  {
    "id": 165,
    "categoryId": "cat_7",
    "name": "Cyclic cellular automata"
  },
  {
    "id": 166,
    "categoryId": "cat_7",
    "name": "Lenia-like systems"
  },
  {
    "id": 167,
    "categoryId": "cat_7",
    "name": "Falling sand automata"
  },
  {
    "id": 168,
    "categoryId": "cat_7",
    "name": "Crystal growth automata"
  },
  {
    "id": 169,
    "categoryId": "cat_7",
    "name": "Forest fire automata"
  },
  {
    "id": 170,
    "categoryId": "cat_7",
    "name": "Cave generation automata"
  },
  {
    "id": 171,
    "categoryId": "cat_7",
    "name": "Maze automata"
  },
  {
    "id": 172,
    "categoryId": "cat_7",
    "name": "Traffic automata"
  },
  {
    "id": 173,
    "categoryId": "cat_7",
    "name": "Stripe automata"
  },
  {
    "id": 174,
    "categoryId": "cat_7",
    "name": "Texture automata"
  },
  {
    "id": 175,
    "categoryId": "cat_7",
    "name": "Morphogenesis automata"
  },
  {
    "id": 176,
    "categoryId": "cat_7",
    "name": "Sandpile models"
  },
  {
    "id": 177,
    "categoryId": "cat_7",
    "name": "Grain growth automata"
  },
  {
    "id": 178,
    "categoryId": "cat_7",
    "name": "Pixel colony systems"
  },
  {
    "id": 179,
    "categoryId": "cat_7",
    "name": "Rule-based tiling automata"
  },
  {
    "id": 180,
    "categoryId": "cat_7",
    "name": "Hex cellular automata"
  },
  {
    "id": 181,
    "categoryId": "cat_8",
    "name": "Gray-Scott reaction-diffusion"
  },
  {
    "id": 182,
    "categoryId": "cat_8",
    "name": "Turing patterns"
  },
  {
    "id": 183,
    "categoryId": "cat_8",
    "name": "Activator-inhibitor systems"
  },
  {
    "id": 184,
    "categoryId": "cat_8",
    "name": "Stripe and spot morphogenesis"
  },
  {
    "id": 185,
    "categoryId": "cat_8",
    "name": "Coral / skin-like patterning"
  },
  {
    "id": 186,
    "categoryId": "cat_8",
    "name": "Leopard/giraffe-like patterning"
  },
  {
    "id": 187,
    "categoryId": "cat_8",
    "name": "Fingerprint-like diffusion fields"
  },
  {
    "id": 188,
    "categoryId": "cat_8",
    "name": "Chemical bloom visuals"
  },
  {
    "id": 189,
    "categoryId": "cat_8",
    "name": "Edge-emphasized reaction diffusion"
  },
  {
    "id": 190,
    "categoryId": "cat_8",
    "name": "Multi-chemical reaction systems"
  },
  {
    "id": 191,
    "categoryId": "cat_8",
    "name": "Reaction-diffusion on mesh"
  },
  {
    "id": 192,
    "categoryId": "cat_8",
    "name": "Reaction-diffusion with noise seeding"
  },
  {
    "id": 193,
    "categoryId": "cat_8",
    "name": "Flow-coupled reaction diffusion"
  },
  {
    "id": 194,
    "categoryId": "cat_8",
    "name": "Thresholded reaction-diffusion line art"
  },
  {
    "id": 195,
    "categoryId": "cat_8",
    "name": "Layered morphogen patterns"
  },
  {
    "id": 196,
    "categoryId": "cat_9",
    "name": "Particle systems"
  },
  {
    "id": 197,
    "categoryId": "cat_9",
    "name": "Particle trails"
  },
  {
    "id": 198,
    "categoryId": "cat_9",
    "name": "Particle advection in flow fields"
  },
  {
    "id": 199,
    "categoryId": "cat_9",
    "name": "Boids / flocking"
  },
  {
    "id": 200,
    "categoryId": "cat_9",
    "name": "Steering behavior systems"
  },
  {
    "id": 201,
    "categoryId": "cat_9",
    "name": "Swarm intelligence visuals"
  },
  {
    "id": 202,
    "categoryId": "cat_9",
    "name": "Agent-based drawing"
  },
  {
    "id": 203,
    "categoryId": "cat_9",
    "name": "Random walks"
  },
  {
    "id": 204,
    "categoryId": "cat_9",
    "name": "Self-avoiding walks"
  },
  {
    "id": 205,
    "categoryId": "cat_9",
    "name": "L\u00e9vy flights"
  },
  {
    "id": 206,
    "categoryId": "cat_9",
    "name": "Brownian motion"
  },
  {
    "id": 207,
    "categoryId": "cat_9",
    "name": "Diffusion-limited aggregation"
  },
  {
    "id": 208,
    "categoryId": "cat_9",
    "name": "Sand-like particle deposition"
  },
  {
    "id": 209,
    "categoryId": "cat_9",
    "name": "Magnetic particle fields"
  },
  {
    "id": 210,
    "categoryId": "cat_9",
    "name": "Orbiting particle systems"
  },
  {
    "id": 211,
    "categoryId": "cat_9",
    "name": "Attraction-repulsion agents"
  },
  {
    "id": 212,
    "categoryId": "cat_9",
    "name": "String / spring particles"
  },
  {
    "id": 213,
    "categoryId": "cat_9",
    "name": "Cloth particle meshes"
  },
  {
    "id": 214,
    "categoryId": "cat_9",
    "name": "Smoke-like advection particles"
  },
  {
    "id": 215,
    "categoryId": "cat_9",
    "name": "Ink-in-water particle visuals"
  },
  {
    "id": 216,
    "categoryId": "cat_10",
    "name": "Spring-mass systems"
  },
  {
    "id": 217,
    "categoryId": "cat_10",
    "name": "Cloth simulation visuals"
  },
  {
    "id": 218,
    "categoryId": "cat_10",
    "name": "Soft-body blobs"
  },
  {
    "id": 219,
    "categoryId": "cat_10",
    "name": "Verlet structures"
  },
  {
    "id": 220,
    "categoryId": "cat_10",
    "name": "Rope simulation"
  },
  {
    "id": 221,
    "categoryId": "cat_10",
    "name": "Pendulum drawings"
  },
  {
    "id": 222,
    "categoryId": "cat_10",
    "name": "Double pendulum traces"
  },
  {
    "id": 223,
    "categoryId": "cat_10",
    "name": "Wave equation surfaces"
  },
  {
    "id": 224,
    "categoryId": "cat_10",
    "name": "Ripple simulations"
  },
  {
    "id": 225,
    "categoryId": "cat_10",
    "name": "Fluid approximations"
  },
  {
    "id": 226,
    "categoryId": "cat_10",
    "name": "Smoke fields"
  },
  {
    "id": 227,
    "categoryId": "cat_10",
    "name": "Slime-mold approximations"
  },
  {
    "id": 228,
    "categoryId": "cat_10",
    "name": "Granular materials"
  },
  {
    "id": 229,
    "categoryId": "cat_10",
    "name": "Sand / powder visuals"
  },
  {
    "id": 230,
    "categoryId": "cat_10",
    "name": "Marbling simulations"
  },
  {
    "id": 231,
    "categoryId": "cat_10",
    "name": "Ink bleed approximations"
  },
  {
    "id": 232,
    "categoryId": "cat_10",
    "name": "Soap film / minimal surface approximations"
  },
  {
    "id": 233,
    "categoryId": "cat_10",
    "name": "Magnetic field line simulations"
  },
  {
    "id": 234,
    "categoryId": "cat_10",
    "name": "Gravity well distortions"
  },
  {
    "id": 235,
    "categoryId": "cat_10",
    "name": "Elastic mesh deformations"
  },
  {
    "id": 236,
    "categoryId": "cat_11",
    "name": "GLSL pattern shaders"
  },
  {
    "id": 237,
    "categoryId": "cat_11",
    "name": "SDF shape blending"
  },
  {
    "id": 238,
    "categoryId": "cat_11",
    "name": "Raymarching"
  },
  {
    "id": 239,
    "categoryId": "cat_11",
    "name": "Volumetric fog style shaders"
  },
  {
    "id": 240,
    "categoryId": "cat_11",
    "name": "Procedural marble"
  },
  {
    "id": 241,
    "categoryId": "cat_11",
    "name": "Procedural wood"
  },
  {
    "id": 242,
    "categoryId": "cat_11",
    "name": "Procedural metal scratches"
  },
  {
    "id": 243,
    "categoryId": "cat_11",
    "name": "Procedural fabric weave"
  },
  {
    "id": 244,
    "categoryId": "cat_11",
    "name": "Procedural clouds"
  },
  {
    "id": 245,
    "categoryId": "cat_11",
    "name": "Nebula shaders"
  },
  {
    "id": 246,
    "categoryId": "cat_11",
    "name": "Caustics-like shaders"
  },
  {
    "id": 247,
    "categoryId": "cat_11",
    "name": "Holographic interference shaders"
  },
  {
    "id": 248,
    "categoryId": "cat_11",
    "name": "Iridescence shaders"
  },
  {
    "id": 249,
    "categoryId": "cat_11",
    "name": "Glitch shaders"
  },
  {
    "id": 250,
    "categoryId": "cat_11",
    "name": "CRT / scanline shaders"
  },
  {
    "id": 251,
    "categoryId": "cat_11",
    "name": "Halftone shaders"
  },
  {
    "id": 252,
    "categoryId": "cat_11",
    "name": "Dither shaders"
  },
  {
    "id": 253,
    "categoryId": "cat_11",
    "name": "Pixel sorting approximations"
  },
  {
    "id": 254,
    "categoryId": "cat_11",
    "name": "Chromatic aberration procedural graphics"
  },
  {
    "id": 255,
    "categoryId": "cat_11",
    "name": "Kaleidoscope shaders"
  },
  {
    "id": 256,
    "categoryId": "cat_12",
    "name": "Paper grain generation"
  },
  {
    "id": 257,
    "categoryId": "cat_12",
    "name": "Ink noise textures"
  },
  {
    "id": 258,
    "categoryId": "cat_12",
    "name": "Watercolor bleed approximation"
  },
  {
    "id": 259,
    "categoryId": "cat_12",
    "name": "Gouache edge simulation"
  },
  {
    "id": 260,
    "categoryId": "cat_12",
    "name": "Risograph dot fields"
  },
  {
    "id": 261,
    "categoryId": "cat_12",
    "name": "Halftone dots"
  },
  {
    "id": 262,
    "categoryId": "cat_12",
    "name": "Stipple fields"
  },
  {
    "id": 263,
    "categoryId": "cat_12",
    "name": "Crosshatch generation"
  },
  {
    "id": 264,
    "categoryId": "cat_12",
    "name": "Engraving line textures"
  },
  {
    "id": 265,
    "categoryId": "cat_12",
    "name": "Woodcut-like procedural textures"
  },
  {
    "id": 266,
    "categoryId": "cat_12",
    "name": "Etching-style line density maps"
  },
  {
    "id": 267,
    "categoryId": "cat_12",
    "name": "Fiber textures"
  },
  {
    "id": 268,
    "categoryId": "cat_12",
    "name": "Stone / terrazzo patterns"
  },
  {
    "id": 269,
    "categoryId": "cat_12",
    "name": "Speckle patterns"
  },
  {
    "id": 270,
    "categoryId": "cat_12",
    "name": "Dust / film grain"
  },
  {
    "id": 271,
    "categoryId": "cat_12",
    "name": "Crackle patterns"
  },
  {
    "id": 272,
    "categoryId": "cat_12",
    "name": "Vein / marble patterns"
  },
  {
    "id": 273,
    "categoryId": "cat_12",
    "name": "Soap bubble interference"
  },
  {
    "id": 274,
    "categoryId": "cat_12",
    "name": "Oil slick procedural color fields"
  },
  {
    "id": 275,
    "categoryId": "cat_12",
    "name": "Cloud / smoke textures"
  },
  {
    "id": 276,
    "categoryId": "cat_13",
    "name": "Voxels"
  },
  {
    "id": 277,
    "categoryId": "cat_13",
    "name": "Isometric voxels"
  },
  {
    "id": 278,
    "categoryId": "cat_13",
    "name": "Pixel art generators"
  },
  {
    "id": 279,
    "categoryId": "cat_13",
    "name": "Dithered pixel fields"
  },
  {
    "id": 280,
    "categoryId": "cat_13",
    "name": "Mosaic tiles"
  },
  {
    "id": 281,
    "categoryId": "cat_13",
    "name": "LEGO-like block systems"
  },
  {
    "id": 282,
    "categoryId": "cat_13",
    "name": "Cubic cityscapes"
  },
  {
    "id": 283,
    "categoryId": "cat_13",
    "name": "Isometric architectural blocks"
  },
  {
    "id": 284,
    "categoryId": "cat_13",
    "name": "Procedural brick patterns"
  },
  {
    "id": 285,
    "categoryId": "cat_13",
    "name": "Quilting / patchwork systems"
  },
  {
    "id": 286,
    "categoryId": "cat_13",
    "name": "Bead / embroidery grid art"
  },
  {
    "id": 287,
    "categoryId": "cat_13",
    "name": "Cross-stitch generators"
  },
  {
    "id": 288,
    "categoryId": "cat_13",
    "name": "Tile-map landscapes"
  },
  {
    "id": 289,
    "categoryId": "cat_13",
    "name": "Low-res bitmap abstractions"
  },
  {
    "id": 290,
    "categoryId": "cat_13",
    "name": "ASCII / character mosaics"
  },
  {
    "id": 291,
    "categoryId": "cat_14",
    "name": "Text as particles"
  },
  {
    "id": 292,
    "categoryId": "cat_14",
    "name": "Text on curves"
  },
  {
    "id": 293,
    "categoryId": "cat_14",
    "name": "Text contour fills"
  },
  {
    "id": 294,
    "categoryId": "cat_14",
    "name": "Procedural monograms"
  },
  {
    "id": 295,
    "categoryId": "cat_14",
    "name": "Symbol systems"
  },
  {
    "id": 296,
    "categoryId": "cat_14",
    "name": "Icon swarms"
  },
  {
    "id": 297,
    "categoryId": "cat_14",
    "name": "Glyph-based textures"
  },
  {
    "id": 298,
    "categoryId": "cat_14",
    "name": "ASCII art"
  },
  {
    "id": 299,
    "categoryId": "cat_14",
    "name": "Unicode art"
  },
  {
    "id": 300,
    "categoryId": "cat_14",
    "name": "Procedural lettering skeletons"
  },
  {
    "id": 301,
    "categoryId": "cat_14",
    "name": "Generative calligraphy approximations"
  },
  {
    "id": 302,
    "categoryId": "cat_14",
    "name": "Grid typography systems"
  },
  {
    "id": 303,
    "categoryId": "cat_14",
    "name": "Kinetic type fields"
  },
  {
    "id": 304,
    "categoryId": "cat_14",
    "name": "Contour typography"
  },
  {
    "id": 305,
    "categoryId": "cat_14",
    "name": "Voronoi typography distortion"
  },
  {
    "id": 306,
    "categoryId": "cat_15",
    "name": "Node-link diagrams"
  },
  {
    "id": 307,
    "categoryId": "cat_15",
    "name": "Force-directed graphs"
  },
  {
    "id": 308,
    "categoryId": "cat_15",
    "name": "Sankey-like aesthetics"
  },
  {
    "id": 309,
    "categoryId": "cat_15",
    "name": "Radial graphs"
  },
  {
    "id": 310,
    "categoryId": "cat_15",
    "name": "Chord diagrams as illustration"
  },
  {
    "id": 311,
    "categoryId": "cat_15",
    "name": "Metro-map style graphics"
  },
  {
    "id": 312,
    "categoryId": "cat_15",
    "name": "Circuit diagrams as art"
  },
  {
    "id": 313,
    "categoryId": "cat_15",
    "name": "Topographic maps"
  },
  {
    "id": 314,
    "categoryId": "cat_15",
    "name": "Weather map style fields"
  },
  {
    "id": 315,
    "categoryId": "cat_15",
    "name": "Bathymetric contour styles"
  },
  {
    "id": 316,
    "categoryId": "cat_15",
    "name": "Star maps"
  },
  {
    "id": 317,
    "categoryId": "cat_15",
    "name": "Constellation diagrams"
  },
  {
    "id": 318,
    "categoryId": "cat_15",
    "name": "Network density maps"
  },
  {
    "id": 319,
    "categoryId": "cat_15",
    "name": "City-block procedural maps"
  },
  {
    "id": 320,
    "categoryId": "cat_15",
    "name": "Parcel / cadastral aesthetics"
  },
  {
    "id": 321,
    "categoryId": "cat_16",
    "name": "Isometric worlds"
  },
  {
    "id": 322,
    "categoryId": "cat_16",
    "name": "Axonometric projections"
  },
  {
    "id": 323,
    "categoryId": "cat_16",
    "name": "Wireframe structures"
  },
  {
    "id": 324,
    "categoryId": "cat_16",
    "name": "Procedural facades"
  },
  {
    "id": 325,
    "categoryId": "cat_16",
    "name": "Building massing blocks"
  },
  {
    "id": 326,
    "categoryId": "cat_16",
    "name": "Recursive room plans"
  },
  {
    "id": 327,
    "categoryId": "cat_16",
    "name": "Maze floorplans"
  },
  {
    "id": 328,
    "categoryId": "cat_16",
    "name": "Dungeon generation"
  },
  {
    "id": 329,
    "categoryId": "cat_16",
    "name": "Corridor graphs"
  },
  {
    "id": 330,
    "categoryId": "cat_16",
    "name": "Modular room tiling"
  },
  {
    "id": 331,
    "categoryId": "cat_16",
    "name": "City growth simulation"
  },
  {
    "id": 332,
    "categoryId": "cat_16",
    "name": "Road network growth"
  },
  {
    "id": 333,
    "categoryId": "cat_16",
    "name": "Parcel subdivision"
  },
  {
    "id": 334,
    "categoryId": "cat_16",
    "name": "Skyline silhouette systems"
  },
  {
    "id": 335,
    "categoryId": "cat_16",
    "name": "Geodesic structures"
  },
  {
    "id": 336,
    "categoryId": "cat_17",
    "name": "Moir\u00e9 patterns"
  },
  {
    "id": 337,
    "categoryId": "cat_17",
    "name": "Interference patterns"
  },
  {
    "id": 338,
    "categoryId": "cat_17",
    "name": "Op art waves"
  },
  {
    "id": 339,
    "categoryId": "cat_17",
    "name": "Stripe displacement illusions"
  },
  {
    "id": 340,
    "categoryId": "cat_17",
    "name": "Checkerboard warps"
  },
  {
    "id": 341,
    "categoryId": "cat_17",
    "name": "Radial vibration patterns"
  },
  {
    "id": 342,
    "categoryId": "cat_17",
    "name": "Depth illusion grids"
  },
  {
    "id": 343,
    "categoryId": "cat_17",
    "name": "Motion illusion patterns"
  },
  {
    "id": 344,
    "categoryId": "cat_17",
    "name": "Zebra stripe deformation"
  },
  {
    "id": 345,
    "categoryId": "cat_17",
    "name": "Glass refraction approximations"
  },
  {
    "id": 346,
    "categoryId": "cat_17",
    "name": "Prism dispersion visuals"
  },
  {
    "id": 347,
    "categoryId": "cat_17",
    "name": "Lens distortion fields"
  },
  {
    "id": 348,
    "categoryId": "cat_17",
    "name": "Ripple refraction fields"
  },
  {
    "id": 349,
    "categoryId": "cat_17",
    "name": "Caustic line nets"
  },
  {
    "id": 350,
    "categoryId": "cat_17",
    "name": "Mirage heat-distortion fields"
  },
  {
    "id": 351,
    "categoryId": "cat_18",
    "name": "River networks"
  },
  {
    "id": 352,
    "categoryId": "cat_18",
    "name": "Coastline generation"
  },
  {
    "id": 353,
    "categoryId": "cat_18",
    "name": "Mountain ridges"
  },
  {
    "id": 354,
    "categoryId": "cat_18",
    "name": "Terrain erosion approximations"
  },
  {
    "id": 355,
    "categoryId": "cat_18",
    "name": "Crack patterns"
  },
  {
    "id": 356,
    "categoryId": "cat_18",
    "name": "Dune patterns"
  },
  {
    "id": 357,
    "categoryId": "cat_18",
    "name": "Tree rings"
  },
  {
    "id": 358,
    "categoryId": "cat_18",
    "name": "Leaf venation"
  },
  {
    "id": 359,
    "categoryId": "cat_18",
    "name": "Animal skin patterns"
  },
  {
    "id": 360,
    "categoryId": "cat_18",
    "name": "Shell spirals"
  },
  {
    "id": 361,
    "categoryId": "cat_18",
    "name": "Crystal growth"
  },
  {
    "id": 362,
    "categoryId": "cat_18",
    "name": "Snowflake growth"
  },
  {
    "id": 363,
    "categoryId": "cat_18",
    "name": "Ice fracture patterns"
  },
  {
    "id": 364,
    "categoryId": "cat_18",
    "name": "Lava lamp metaballs"
  },
  {
    "id": 365,
    "categoryId": "cat_18",
    "name": "Cellular tissue patterns"
  },
  {
    "id": 366,
    "categoryId": "cat_18",
    "name": "Foam / bubble packing"
  },
  {
    "id": 367,
    "categoryId": "cat_18",
    "name": "Pebble / stone distributions"
  },
  {
    "id": 368,
    "categoryId": "cat_18",
    "name": "Branching lightning"
  },
  {
    "id": 369,
    "categoryId": "cat_18",
    "name": "Stalactite/stalagmite growth"
  },
  {
    "id": 370,
    "categoryId": "cat_18",
    "name": "Moss / colony spread"
  },
  {
    "id": 371,
    "categoryId": "cat_19",
    "name": "Poisson disk sampling visuals"
  },
  {
    "id": 372,
    "categoryId": "cat_19",
    "name": "Blue noise distributions"
  },
  {
    "id": 373,
    "categoryId": "cat_19",
    "name": "Monte Carlo point fields"
  },
  {
    "id": 374,
    "categoryId": "cat_19",
    "name": "Random subdivision"
  },
  {
    "id": 375,
    "categoryId": "cat_19",
    "name": "Jittered grids"
  },
  {
    "id": 376,
    "categoryId": "cat_19",
    "name": "Stochastic stippling"
  },
  {
    "id": 377,
    "categoryId": "cat_19",
    "name": "Randomized contour fill"
  },
  {
    "id": 378,
    "categoryId": "cat_19",
    "name": "Probabilistic branching"
  },
  {
    "id": 379,
    "categoryId": "cat_19",
    "name": "Weighted point placement"
  },
  {
    "id": 380,
    "categoryId": "cat_19",
    "name": "Markov pattern transitions"
  },
  {
    "id": 381,
    "categoryId": "cat_19",
    "name": "Random grammar systems"
  },
  {
    "id": 382,
    "categoryId": "cat_19",
    "name": "Procedural mutation loops"
  },
  {
    "id": 383,
    "categoryId": "cat_19",
    "name": "Weighted collage placement"
  },
  {
    "id": 384,
    "categoryId": "cat_19",
    "name": "Shuffle tilings"
  },
  {
    "id": 385,
    "categoryId": "cat_19",
    "name": "Constraint-satisfaction layouts"
  },
  {
    "id": 386,
    "categoryId": "cat_20",
    "name": "Voronoi + noise distortion"
  },
  {
    "id": 387,
    "categoryId": "cat_20",
    "name": "Delaunay + particle trails"
  },
  {
    "id": 388,
    "categoryId": "cat_20",
    "name": "SDF + morphing icons"
  },
  {
    "id": 389,
    "categoryId": "cat_20",
    "name": "L-system + reaction diffusion"
  },
  {
    "id": 390,
    "categoryId": "cat_20",
    "name": "Flow field + stippling"
  },
  {
    "id": 391,
    "categoryId": "cat_20",
    "name": "Metaballs + marching squares"
  },
  {
    "id": 392,
    "categoryId": "cat_20",
    "name": "Circle packing + typography"
  },
  {
    "id": 393,
    "categoryId": "cat_20",
    "name": "Fractal terrain + contour lines"
  },
  {
    "id": 394,
    "categoryId": "cat_20",
    "name": "Truchet + shader glow"
  },
  {
    "id": 395,
    "categoryId": "cat_20",
    "name": "Voxels + isometric city rules"
  },
  {
    "id": 396,
    "categoryId": "cat_20",
    "name": "Quasicrystal + chromatic shader"
  },
  {
    "id": 397,
    "categoryId": "cat_20",
    "name": "Boids + ink trails"
  },
  {
    "id": 398,
    "categoryId": "cat_20",
    "name": "Penrose tiling + parallax"
  },
  {
    "id": 399,
    "categoryId": "cat_20",
    "name": "Fourier curves + audio reactivity"
  },
  {
    "id": 400,
    "categoryId": "cat_20",
    "name": "Noise field + topographic cut-paper"
  }
];
