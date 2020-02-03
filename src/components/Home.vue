<template>
    <div class="home-page">
        <input @change="handlerFile" type="file" />
        <el-button @click="handlerUpload">上传</el-button>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import request from '../utils/request';
const SIZE: number = 1024 * 1024 * 2;
@Component
export default class Home extends Vue {
    conatiner: any = null;
    data: Array<any> = [];
    handlerFile(e) {
        //判断是否有文件信息
        if (e.target.files[0]) {
            this.conatiner = e.target.files[0];
        }
    }
    //切片方法
    createFileChunk(file, size = SIZE) {
        const fileChunkList = [];
        let cur = 0;
        while (cur < file.size) {
            fileChunkList.push({ file: file.slice(cur, cur + size) });
            cur += size;
        }
        return fileChunkList;
    }
    //点击上传
    async handlerUpload() {
        if (!this.conatiner) return;
        let formData = new FormData();
        formData.append('filename', this.conatiner.name);
        //传入数据 切片
        const fileChunkList = this.createFileChunk(this.conatiner);
        this.data = fileChunkList.map(({ file }, index: any) => {
            return {
                //每一片
                chunk: file,
                hash: this.conatiner.name + '-' + index,
            };
        });
        console.log(this.data);
        this.uploadChunks();
    }
    //上传所有片
    async uploadChunks() {
        //
        let requestList = this.data
            .map(({ chunk, hash }) => {
                //创建formData
                const formData = new FormData();
                formData.append('chunk', chunk);
                formData.append('hash', hash);
                formData.append('name', this.conatiner.name);
                return { formData };
            }) //全部上传
            .map(({ formData }) =>
                request({
                    url: 'http://localhost:3000',
                    data: formData,
                })
            );
        //并发
        await Promise.all(requestList);
    }
}
</script>

<style></style>
