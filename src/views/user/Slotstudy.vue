<template>
  <div class="slot-demo">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>Vue3 插槽示例 - 卡片组件</span>
        </div>
      </template>

      <!-- 卡片组件示例 -->
      <div class="card-container">
        <!-- 1. 基础用法 -->
        <div class="example-section">
          <h3>1. 基础用法</h3>
          <div class="card">
            <div class="card-header">
              <h4>用户信息卡片</h4>
            </div>
            <div class="card-content">
              <slot>默认内容：这里可以显示用户信息</slot>
            </div>
          </div>
          <div class="usage">
            <h4>使用方式：</h4>
            <pre><code>&lt;Card&gt;
          &lt;p&gt;用户名：张三&lt;/p&gt;
          &lt;p&gt;年龄：25岁&lt;/p&gt;
          &lt;/Card&gt;</code></pre>
          </div>
        </div>

        <!-- 2. 具名插槽 -->
        <div class="example-section">
          <h3>2. 具名插槽</h3>
          <div class="card">
            <div class="card-header">
              <slot name="header">
                <h4>默认标题</h4>
              </slot>
            </div>
            <div class="card-content">
              <slot name="content">
                <p>默认内容</p>
              </slot>
            </div>
            <div class="card-footer">
              <slot name="footer">
                <p>默认底部</p>
              </slot>
            </div>
          </div>
          <div class="usage">
            <h4>使用方式：</h4>
            <pre><code>&lt;Card&gt;
          &lt;template #header&gt;
          &lt;h4&gt;自定义标题&lt;/h4&gt;
          &lt;/template&gt;

          &lt;template #content&gt;
          &lt;p&gt;自定义内容&lt;/p&gt;
          &lt;/template&gt;

          &lt;template #footer&gt;
          &lt;button&gt;确认&lt;/button&gt;
          &lt;/template&gt;
          &lt;/Card&gt;</code></pre>
          </div>
        </div>

        <!-- 3. 实际效果展示 -->
        <div class="example-section">
          <h3>3. 实际效果</h3>
          <div class="card">
            <div class="card-header">
              <h4>用户信息</h4>
            </div>
            <div class="card-content">
              <p>用户名：张三</p>
              <p>年龄：25岁</p>
              <p>职业：工程师</p>
            </div>
            <div class="card-footer">
              <el-button type="primary">编辑</el-button>
              <el-button>删除</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
</script>

<style scoped>
.slot-demo {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-container {
    .example-section {
      margin-bottom: 30px;
      padding: 20px;
      background: #f5f7fa;
      border-radius: 8px;

      h3 {
        color: #303133;
        margin-bottom: 20px;
      }

      .card {
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;

        .card-header {
          padding: 15px;
          border-bottom: 1px solid #ebeef5;

          h4 {
            margin: 0;
            color: #409EFF;
          }
        }

        .card-content {
          padding: 15px;
          min-height: 100px;
        }

        .card-footer {
          padding: 15px;
          border-top: 1px solid #ebeef5;
          text-align: right;
        }
      }

      .usage {
        background: #f8f9fa;
        padding: 15px;
        border-radius: 4px;

        h4 {
          color: #606266;
          margin-bottom: 10px;
        }

        pre {
          margin: 0;

          code {
            color: #409EFF;
          }
        }
      }
    }
  }
}
</style>