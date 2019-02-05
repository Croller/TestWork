<template>
  <div class="pointBuffer">
    <div class="editor">
      <div class="controls">
        <div class="translate">
          <span>Translate:</span>
          <input type="text" v-model="translateVal"/>
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

export default {
  name: 'Translate2D',
  components: {},
  data() {
    return {
      vsSource:
      'attribute vec4 a_Position; '
      + 'uniform vec4 u_Translate; '
      + 'void main() {\n'
        + 'gl_Position = a_Position + u_Translate;\n'
      + '}\n',
      fsSource:
      'precision mediump float; '
      + 'uniform vec4 u_FragColor; '
      + 'void main() {\n'
        + 'gl_FragColor = u_FragColor;\n'
      + '}\n',
      pointClick: [],
      pointBufferClick: [],

      translateVal: 0.1,
    };
  },
  computed: {
  },
  mounted() {
    console.clear();
    const self = this;
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
    const uTranslate = gl.getUniformLocation(gl.program, 'u_Translate');
    if (uTranslate < 0) {
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
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // canvas add click listener
    canvas.onmousedown = (e) => { self.clickEvent(e, gl, canvas, aPosition, uTranslate, uFragColor); };

    // debug
    // console.log(canvas.getBoundingClientRect());
    console.log(gl);
    return null;
  },
  methods: {
    clickEvent(e, gl, canvas, aPosition, uTranslate, uFragColor) {
      GL.DrawScene(canvas);
      const canvasCoords = GL.ConvertCoords(e.clientX, e.clientY, canvas);
      const newColor = GL.ConvertRGBtoGL(18, 98, 179);
      this.pointBufferClick.push(canvasCoords.x);
      this.pointBufferClick.push(canvasCoords.y);
      const n = this.pointBufferClick.length / 2;

      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.pointBufferClick), gl.STATIC_DRAW);
      // Сохранить ссылку на буферный объект в переменной a_Position
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
      gl.uniform4f(uTranslate, this.translateVal, 0.0, 0.0, 0.0);
      gl.uniform4f(uFragColor, newColor.R, newColor.G, newColor.B, 1.0);
      gl.enableVertexAttribArray(aPosition);
      gl.drawArrays(gl.TRIANGLES, 0, n);
    },
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
