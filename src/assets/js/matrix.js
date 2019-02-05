/**
 * Constructor of Matrix4
 * If obj is specified, new matrix is initialized by obj.
 * Otherwise, new matrix is initialized by identity matrix.
 * @param obj source matrix(option)
 */
export default function Matrix4(obj) {
  let s = 0;
  const d = new Float32Array(16);
  if (obj && typeof obj === 'object' && 'elements' in obj) {
    s = obj.elements;
    for (let i = 0; i < 16; i += 1) {
      d[i] = s[i];
    }
    this.elements = d;
  } else {
    this.elements = new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]);
  }
  return this;
}

/**
 * Set the matrix for rotation.
 * The vector of rotation axis may not be normalized.
 * @param angle The angle of rotation (degrees)
 * @param x The X coordinate of vector of rotation axis.
 * @param y The Y coordinate of vector of rotation axis.
 * @param z The Z coordinate of vector of rotation axis.
 * @return this
 */
Matrix4.prototype.setRotate = function foo(angleRotate, xAsix, yAsix, zAsix) {
  let x = xAsix;
  let y = yAsix;
  let z = zAsix;
  const angle = Math.PI * angleRotate / 180;
  const e = this.elements;

  let s = Math.sin(angle);
  const c = Math.cos(angle);

  if (x !== 0 && y === 0 && z === 0) {
    // Rotation around X axis
    if (x < 0) {
      s = -s;
    }
    e[0] = 1; e[4] = 0; e[8] = 0; e[12] = 0;
    e[1] = 0; e[5] = c; e[9] = -s; e[13] = 0;
    e[2] = 0; e[6] = s; e[10] = c; e[14] = 0;
    e[3] = 0; e[7] = 0; e[11] = 0; e[15] = 1;
  } else if (x === 0 && y !== 0 && z === 0) {
    // Rotation around Y axis
    if (y < 0) {
      s = -s;
    }
    e[0] = c; e[4] = 0; e[8] = s; e[12] = 0;
    e[1] = 0; e[5] = 1; e[9] = 0; e[13] = 0;
    e[2] = -s; e[6] = 0; e[10] = c; e[14] = 0;
    e[3] = 0; e[7] = 0; e[11] = 0; e[15] = 1;
  } else if (x === 0 && y === 0 && z !== 0) {
    // Rotation around Z axis
    if (z < 0) {
      s = -s;
    }
    e[0] = c; e[4] = -s; e[8] = 0; e[12] = 0;
    e[1] = s; e[5] = c; e[9] = 0; e[13] = 0;
    e[2] = 0; e[6] = 0; e[10] = 1; e[14] = 0;
    e[3] = 0; e[7] = 0; e[11] = 0; e[15] = 1;
  } else {
    // Rotation around another axis
    const len = Math.sqrt(x * x + y * y + z * z);
    if (len !== 1) {
      const rlen = 1 / len;
      x *= rlen;
      y *= rlen;
      z *= rlen;
    }
    const nc = 1 - c;
    const xy = x * y;
    const yz = y * z;
    const zx = z * x;
    const xs = x * s;
    const ys = y * s;
    const zs = z * s;

    e[0] = x * x * nc + c;
    e[1] = xy * nc + zs;
    e[2] = zx * nc - ys;
    e[3] = 0;

    e[4] = xy * nc - zs;
    e[5] = y * y * nc + c;
    e[6] = yz * nc + xs;
    e[7] = 0;

    e[8] = zx * nc + ys;
    e[9] = yz * nc - xs;
    e[10] = z * z * nc + c;
    e[11] = 0;

    e[12] = 0;
    e[13] = 0;
    e[14] = 0;
    e[15] = 1;
  }

  return this;
};

/**
 * Multiply the matrix for translation from the right.
 * @param x The X value of a translation.
 * @param y The Y value of a translation.
 * @param z The Z value of a translation.
 * @return this
 */
Matrix4.prototype.translate = function foo(x, y, z) {
  const e = this.elements;
  e[12] += e[0] * x + e[4] * y + e[8] * z;
  e[13] += e[1] * x + e[5] * y + e[9] * z;
  e[14] += e[2] * x + e[6] * y + e[10] * z;
  e[15] += e[3] * x + e[7] * y + e[11] * z;
  return this;
};
