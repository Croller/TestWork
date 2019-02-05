

/**
 * Detect GL browser support
 * @param {*} canvas element
 */
function Detect(canvas) {
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (gl && gl instanceof WebGLRenderingContext) {
    return true;
  }
  return false;
}

/**
 * DrawScene canvas
 * @param canvas element
 * @return gl Gl context
 */
function DrawScene(canvas) {
  if (!Detect(canvas)) return false;

  const gl = canvas.getContext('webgl');

  // Set clear color
  gl.clearColor(0.999, 0.999, 0.999, 1.0);
  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);
  // Set view port
  gl.viewport(0, 0, canvas.width, canvas.height);

  // TODO
  // add click listner

  return gl;
}

/**
 * Create program and build
 * @param gl GL context
 * @param vsSource a vertex shader program from string
 * @param fsSource a fragment shader program from string
 * @return true
 */
function InitShaders(gl, vsSource, fsSource) {
  const program = createProgram(gl, vsSource, fsSource);
  if (!program) {
    console.log('Failed to create program');
    return false;
  }

  gl.useProgram(program);
  gl.program = program;

  return true;
}

/**
 * Clear gl
 * @param gl GL context
 */
function ClearGL(gl) {
  gl.clear(gl.COLOR_BUFFER_BIT);
  return true;
}

/**
 * Convet client mouse click to canvas coordinates
 * @param canvas
 * @param xClient from event client click
 * @param yClinet from event client click
 */
function ConvertCoords(xClient, yClinet, canvas) {
  const rect = canvas.getBoundingClientRect();
  const xCanvas = ((xClient - rect.left) - canvas.width / 2) / (canvas.width / 2);
  const yCanvas = (canvas.height / 2 - (yClinet - rect.top)) / (canvas.height / 2);
  return { x: xCanvas, y: yCanvas };
}

/**
 * Convert RGB to WebGL colors
 * @param red integer 0-255
 * @param green integer 0-255
 * @param blue integer 0-255
 */
function ConvertRGBtoGL(red, green, blue) {
  const redGL = (1 / 255) * red;
  const greenGL = (1 / 255) * green;
  const blueGL = (1 / 255) * blue;
  return { R: redGL, G: greenGL, B: blueGL };
}

/**
 * Create program
 * @param gl GL context
 * @param vsSource a vertex shader program from string
 * @param fsSource a fragment shader program from string
 * @return created program object, or null if error
 */
function createProgram(gl, vsSource, fsSource) {
  // Create shader object
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vertexShader || !fragmentShader) {
    return null;
  }

  // Create a program
  const program = gl.createProgram();
  if (!program) {
    return null;
  }

  // Attach the shader
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  // Link the program
  gl.linkProgram(program);

  // Check the result of linking
  const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    const error = gl.getProgramInfoLog(program);
    console.log(`Failed to link program: ${error}`);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    return null;
  }
  return program;
}

/**
 * Create a shader
 * @param gl GL context
 * @param type the type of the shader object to be created
 * @param source shader program from string
 * @return shader object or error
 */
function loadShader(gl, type, source) {
  // Create shader object
  const shader = gl.createShader(type);
  if (shader == null) {
    console.log(`Can not to create shader = ${shader}`);
    return null;
  }

  // Set the shader program
  gl.shaderSource(shader, source);

  // Compile the shader
  gl.compileShader(shader);

  // Check the result of compilation
  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    const error = gl.getShaderInfoLog(shader);
    console.log(`Failed to compile shader: ${error}`);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}


export {
  DrawScene,
  InitShaders,
  ClearGL,
  ConvertCoords,
  ConvertRGBtoGL,
};
