<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCounterStore } from '../stores/counter'

const router = useRouter()
const counter = useCounterStore()
const isCollapse = ref(false)

const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    router.push('/login')
}

const menuItems = [
    {
        index: '1',
        title: '首页',
        icon: 'House',
        path: '/home'
    },
    {
        index: '2',
        title: '用户管理',
        icon: 'User',
        children: [
            {
                index: '2-1',
                title: 'canvas',
                path: '/user/canvas'
            },
            {
                index: '2-2',
                title: 'slot插槽',
                path: '/user/slot'
            }
        ]
    },
    {
        index: '3',
        title: '系统设置',
        icon: 'Setting',
        path: '/settings'
    }
]

const handleMenuSelect = (index: string) => {
    const findPath = (items: any[]): string | undefined => {
        for (const item of items) {
            if (item.index === index) {
                return item.path
            }
            if (item.children) {
                const path = findPath(item.children)
                if (path) return path
            }
        }
    }
    
    const path = findPath(menuItems)
    if (path) {
        router.push(path)
    }
}
</script>

<template>
    <el-container class="layout-container">
        <!-- 头部 -->
        <el-header class="header">
            <div class="header-left">
                <el-icon class="toggle-icon" @click="isCollapse = !isCollapse">
                    <Fold v-if="!isCollapse" />
                    <Expand v-else />
                </el-icon>
                <h2>后台管理系统</h2>
            </div>
            <div class="header-right">
                <el-dropdown>
                    <span class="user-info">
                        <el-avatar :size="32"
                            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                        <span>管理员</span>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>个人信息</el-dropdown-item>
                            <el-dropdown-item>修改密码</el-dropdown-item>
                            <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </el-header>

        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '64px' : '200px'" class="aside">
                <el-menu 
                    :collapse="isCollapse" 
                    :collapse-transition="false" 
                    class="menu" 
                    default-active="1"
                    @select="handleMenuSelect"
                >
                    <template v-for="item in menuItems" :key="item.index">
                        <!-- 有子菜单的情况 -->
                        <el-sub-menu v-if="item.children" :index="item.index">
                            <template #title>
                                <el-icon>
                                    <component :is="item.icon" />
                                </el-icon>
                                <span>{{ item.title }}</span>
                            </template>
                            <el-menu-item 
                                v-for="child in item.children" 
                                :key="child.index" 
                                :index="child.index"
                            >
                                {{ child.title }}
                            </el-menu-item>
                        </el-sub-menu>
                        
                        <!-- 没有子菜单的情况 -->
                        <el-menu-item v-else :index="item.index">
                            <el-icon>
                                <component :is="item.icon" />
                            </el-icon>
                            <template #title>{{ item.title }}</template>
                        </el-menu-item>
                    </template>
                </el-menu>
            </el-aside>

            <!-- 主要内容区 -->
            <el-main class="main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang="less" scoped>
.layout-container {
    height: 100vh;
    width: 100vw;
}

.header {
    background-color: #fff;
    border-bottom: 1px solid #dcdfe6;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 60px;

    &-left {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    &-right {
        display: flex;
        align-items: center;
    }
}

.toggle-icon {
    font-size: 20px;
    cursor: pointer;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
}

.aside {
    background-color: #304156;
    transition: width 0.3s;
    overflow: hidden;
}

.menu {
    height: 100%;
    border-right: none;
}

.main {
    background-color: #f0f2f5;
    padding: 20px;
    height: calc(100vh - 60px); 
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }
}

.content-card {
    margin-bottom: 20px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.counter {
    text-align: center;
}

.buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;
}

:deep(.el-menu) {
    border-right: none;

    &--collapse {
        width: 64px;
    }
}

:deep(.el-menu-item) {
    display: flex;
    align-items: center;

    .el-icon {
        margin-right: 8px;
    }
}
</style>