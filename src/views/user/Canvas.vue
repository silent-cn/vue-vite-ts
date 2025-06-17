<template>
  <div class="canvas-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>HTML5 Canvas 学习</span>
        </div>
      </template>

      <el-row :gutter="20">
        <!-- 左侧说明 -->
        <el-col :span="12">
          <div class="content-section">
            <h3>Canvas 基础介绍</h3>
            <p>Canvas 是 HTML5 提供的一个用于绘图的元素，它提供了一个画布，可以通过 JavaScript 在上面绘制各种图形。</p>
            
            <h4>基本用法：</h4>
            <ol>
              <li>创建 canvas 元素：<code>&lt;canvas id="myCanvas"&gt;&lt;/canvas&gt;</code></li>
              <li>获取绘图上下文：<code>const ctx = canvas.getContext('2d')</code></li>
              <li>使用绘图 API 进行绘制</li>
            </ol>

            <h4>常用方法：</h4>
            <ul>
              <li><code>beginPath()</code> - 开始一个新的绘制路径</li>
              <li><code>moveTo(x, y)</code> - 移动到指定坐标</li>
              <li><code>lineTo(x, y)</code> - 绘制直线到指定坐标</li>
              <li><code>arc(x, y, r, startAngle, endAngle)</code> - 绘制圆弧</li>
              <li><code>fill()</code> - 填充当前路径</li>
              <li><code>stroke()</code> - 描边当前路径</li>
            </ul>

            <h4>示例：绘制六边形</h4>
            <p>右侧示例展示了如何使用 Canvas 绘制一个六边形：</p>
            <ol>
              <li>计算六边形的顶点坐标</li>
              <li>使用 moveTo 移动到第一个点</li>
              <li>使用 lineTo 连接各个顶点</li>
              <li>使用 fill 填充六边形</li>
            </ol>
          </div>
        </el-col>

        <!-- 右侧示例 -->
        <el-col :span="12">
          <div class="canvas-section">
            <canvas ref="canvasRef" width="400" height="400" class="canvas"></canvas>
            <div class="canvas-controls">
              <el-button type="primary" @click="drawHexagon">绘制六边形</el-button>
              <el-button @click="clearCanvas">清除画布</el-button>
            </div>
          </div>
          <div class="canvas-signature">
            <h4>鼠标签名示例</h4>
            <canvas 
              ref="canvasRef1" 
              width="400" 
              height="200" 
              class="canvas1"
              @mousedown="startDrawing"
              @mousemove="draw"
              @mouseup="stopDrawing"
              @mouseleave="stopDrawing"
            ></canvas>
            <div class="canvas-controls">
              <el-button type="primary" @click="clearSignature">清除签名</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const canvasRef1 = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let ctx1: CanvasRenderingContext2D | null = null
let isDrawing = false
let lastX = 0
let lastY = 0

onMounted(() => {
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d')
    drawHexagon()
  }
  if (canvasRef1.value) {
    ctx1 = canvasRef1.value.getContext('2d')
    initSignature()
  }
})

// 初始化签名画布
const initSignature = () => {
  if (!ctx1 || !canvasRef1.value) return
  
  // 设置画布背景为白色
  ctx1.fillStyle = '#fff'
  ctx1.fillRect(0, 0, canvasRef1.value.width, canvasRef1.value.height)
  
  // 设置画笔样式
  ctx1.strokeStyle = 'red'
  ctx1.lineWidth = 2
  ctx1.lineCap = 'round'
  ctx1.lineJoin = 'round'
}

// 开始绘制
const startDrawing = (e: MouseEvent) => {
  if (!canvasRef1.value) return
  isDrawing = true
  const rect = canvasRef1.value.getBoundingClientRect()
  lastX = e.clientX - rect.left
  lastY = e.clientY - rect.top
}

// 绘制
const draw = (e: MouseEvent) => {
  if (!isDrawing || !ctx1 || !canvasRef1.value) return
  
  const rect = canvasRef1.value.getBoundingClientRect()
  const currentX = e.clientX - rect.left
  const currentY = e.clientY - rect.top
  
  ctx1.beginPath()
  ctx1.moveTo(lastX, lastY)
  ctx1.lineTo(currentX, currentY)
  ctx1.stroke()
  
  lastX = currentX
  lastY = currentY
}

// 结束绘制
const stopDrawing = () => {
  isDrawing = false
}

// 清除签名
const clearSignature = () => {
  if (!ctx1 || !canvasRef1.value) return
  ctx1.clearRect(0, 0, canvasRef1.value.width, canvasRef1.value.height)
  initSignature()
}

const drawHexagon = () => {
  if (!ctx || !canvasRef.value) return

  // 清除画布
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)

  // 设置样式
  ctx.fillStyle = '#409EFF'
  ctx.strokeStyle = '#303133'
  ctx.lineWidth = 2

  // 计算六边形的顶点
  const centerX = canvasRef.value.width / 2
  const centerY = canvasRef.value.height / 2
  const radius = 100
  const sides = 6
  const angle = (Math.PI * 2) / sides

  // 开始绘制
  ctx.beginPath()
  
  // 移动到第一个点
  ctx.moveTo(
    centerX + radius * Math.cos(0),
    centerY + radius * Math.sin(0)
  )

  // 绘制其他点
  for (let i = 1; i <= sides; i++) {
    ctx.lineTo(
      centerX + radius * Math.cos(angle * i),
      centerY + radius * Math.sin(angle * i)
    )
  }

  // 闭合路径
  ctx.closePath()

  // 填充和描边
  ctx.fill()
  ctx.stroke()

  // 添加中心点标记
  ctx.beginPath()
  ctx.arc(centerX, centerY, 5, 0, Math.PI * 2)
  ctx.fillStyle = '#F56C6C'
  ctx.fill()
}

const clearCanvas = () => {
  if (!ctx || !canvasRef.value) return
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
}
</script>

<style lang="less" scoped>
.canvas-container {
  // padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content-section {
  padding: 20px;

  h3 {
    margin-top: 0;
    color: #303133;
  }

  h4 {
    color: #606266;
    margin: 20px 0 10px;
  }

  p {
    color: #606266;
    line-height: 1.6;
  }

  code {
    background-color: #f5f7fa;
    padding: 2px 6px;
    border-radius: 4px;
    color: #409EFF;
  }

  ol,
  ul {
    color: #606266;
    padding-left: 20px;
    line-height: 1.8;
  }
}

.canvas-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.canvas {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: #fff;
}

.canvas-controls {
  display: flex;
  gap: 10px;
}

.canvas-signature {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  h4 {
    color: #303133;
    margin: 0;
  }
}

.canvas1 {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: #fff;
  cursor: crosshair;
}
</style> 