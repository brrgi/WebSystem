var http=require('http');       //core module
var fs=require('fs');
var url = require('url');
var path=require('path');
var qs=require('querystring');

var cur_path=path.resolve('../fs');     //file module

var file_name='';
var file_content='';

var app = http.createServer(function(request,response){     //작업 시작
    var _url=request.url;
    var queryData=url.parse(_url, true).query;
    var pathname=url.parse(_url, true).pathname;
    if(pathname==='/')      //렌더링 부분 : 서버의 html 읽고 구분자들 채움
    {
        fs.readFile("../frontend/template.html", function(err, tmpl){
            fs.readdir(cur_path, function(err,data){
                lsinfo='';
                data.forEach(function(element){
                    lsinfo+="<li onclick='readfile(this);'>" +element+"</li>";
                })
                let html = tmpl.toString().replace('%',lsinfo);
                html=html.replace("?", file_name);
                html=html.replace("$", file_content);
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(html);
            })
        })
    }
    else if(pathname==='/readfile'){
        var body='';
        request.on('data', function(data){
            body=body+data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            file_name=post.file_name;
            console.log(file_name);
            var file_path=path.join(cur_path, file_name);
            fs.readFile(file_path, 'utf8', function(err, data){
                console.log(file_path);
                file_content=data;
                response.writeHead(302, {Location: 'http://localhost:3000/'});
                response.end('success');
            });
        });
    }
    else if(pathname==='/writefile'){       //input form을 읽고 파일 만듦
        var body='';
        request.on('data', function(data){
            body=body+data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var title=post.title;
            var description=post.description;
            var file_path=path.join(cur_path, title);
            fs.writeFile(file_path, description, function(err, data){
                response.writeHead(302, {Location: 'http://localhost:3000/'});
                response.end('success');
            });
        });
    }
});

app.listen(3000);