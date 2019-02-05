<template>
  <div>
    <div class="editor">
      <div class="controls">
        <div class="translate">
          <h4>Translate:</h4>
          <span>Translate:</span>
          <input type="text" v-model="translateVal"/>
          <input type="text" v-model="translateVal"/>
        </div>
        <div class="translate">
          <span>Rotate:</span>
          <input type="text" v-model="rotateVal"/>
        </div>
      </div>
      <div class="viewer">
        <canvas id="scene" ref="scene"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import * as GL from '@/assets/js/init';
import Matrix4 from '@/assets/js/matrix';

export default {
  name: 'MatrixTransfor',
  components: {},
  data() {
    return {
      translateVal: 0.0,
      rotateVal: 0.0,

      vsSource:
      'attribute vec4 a_Position; '
      + 'uniform mat4 u_Matrix; '
      + 'void main() {\n'
        + 'gl_Position = u_Matrix * a_Position;\n'
      + '}\n',
      fsSource:
      'precision mediump float; '
      + 'uniform vec4 u_FragColor; '
      + 'void main() {\n'
        + 'gl_FragColor = u_FragColor;\n'
      + '}\n',
      pointClick: [],
      vertices: new Float32Array([0.0, 0.3, -0.3, -0.3, 0.3, -0.3]),

    };
  },
  computed: {
  },
  mounted() {
    console.clear();
    // const self = this;
    const windowWidth = window.innerWidth - 210;
    const windowHeight = window.innerHeight + 6;

    const canvas = document.getElementById('scene');
    canvas.width = windowWidth;
    canvas.height = windowHeight - 82.5;

    // init gl and draw scene;
    const gl = GL.DrawScene(canvas);
    if (gl == null) {
      console.log('WebGL not support');
    }

    // create program using source vertex and fragment
    GL.InitShaders(gl, this.vsSource, this.fsSource);

    // get point attribution aPosition and change coordinates
    const aPosition = gl.getAttribLocation(gl.program, 'a_Position');
    if (aPosition < 0) {
      console.log('Cant get vertex storage');
    }
    const uMatrix = gl.getUniformLocation(gl.program, 'u_Matrix');
    if (uMatrix < 0) {
      console.log('Cant get vertex storage');
    }
    // get point uniform uFragColor and change color
    const uFragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if (!uFragColor) {
      console.log('Cant get fragment storage');
    }
    // create buffer and bind
    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Failed to create the buffer object ');
      return -1;
    }

    // matrix
    const modelMatrix = new Matrix4();
    modelMatrix.setRotate(60, 1, 0, 0);
    modelMatrix.translate(-0.5, 0, 0);

    GL.DrawScene(canvas);

    const newColor = GL.ConvertRGBtoGL(18, 98, 179);
    gl.uniform4f(uFragColor, newColor.R, newColor.G, newColor.B, 1.0);

    const n = 3;

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
    // Сохранить ссылку на буферный объект в переменной a_Position
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.uniformMatrix4fv(uMatrix, false, modelMatrix.elements);

    gl.enableVertexAttribArray(aPosition);
    gl.drawArrays(gl.TRIANGLES, 0, n);

    // debug
    // console.log(canvas.getBoundingClientRect());
    // console.log(Matrix4());
    return null;
  },
  methods: {

  },
};
</script>

<style lang="scss">

  $control-width: 210px;

  .editor {
    display: inline-flex;
    width: 100%;
    height: 100%;
  }

  .controls {
    width: $control-width;
    height: 931px;
    padding: 5px;
    border-right: 0.5px solid #ebebeb;
  }

  .translate span{
    float: left;
    margin-bottom: 5px;
  }

  .translate input{
    width: 100%;
    text-align: center;
    border: 0.5px solid #2c3e50;
    border-radius: 2px;
    padding: 4px 6px;
    box-sizing: border-box;
    &:focus{
      outline: none;
    }
  }

  .viewer{
    width: calc(100% - #{$control-width});
    background-color: #a8a8a8;
  }
</style>
