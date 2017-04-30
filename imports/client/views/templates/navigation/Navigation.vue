<template>
    <scroll-bar class="flex-fill-height">
        <router-link to="/dashboard" exact>
            <nav-list class="nav-item">
                <icon name="home"></icon> Viu Home
            </nav-list>
        </router-link>
        <router-link to="/dashboard/data-manage" exact>
            <nav-list class="nav-item">
                <icon name="home"></icon> Data Management
            </nav-list>
        </router-link>
    </scroll-bar>
</template>
