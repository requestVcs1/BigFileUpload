let request = function({ url, method = 'post', data, header = {} }) {
    return new Promise(reslove => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        Object.keys(header).forEach(key => xhr.setRequestHeader(key, header[key]));
        //发送请求
        xhr.send(data);
        //接受请求结果
        xhr.onload = e => {
            reslove({
                data: e.target.response,
            });
        };
    });
};
export default request;
