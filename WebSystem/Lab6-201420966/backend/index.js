var http=require('http');       //core module
var fs=require('fs');
var url = require('url');
var path=require('path');
var qs=require('querystring');

var cur_path=path.resolve('../fs');     //file module

var file_name='';
var file_content='';
var dictObject={};
var today = new Date();
var year = today.getFullYear(); // 년도
var month = today.getMonth() + 1;  // 월
var date = today.getDate();  // 날짜

var todays=year+'-'+month+"-"+date;

var app = http.createServer(function(request,response){     //작업 시작
    var _url=request.url;
    var queryData=url.parse(_url, true).query;
    var pathname=url.parse(_url, true).pathname;
    if(pathname==='/')      //렌더링 부분 : 서버의 html 읽고 구분자들 채움
    {
        fs.readFile("../frontend/template.html", function(err, tmpl){
            fs.readdir(cur_path, function(err,data){
                lsinfo='';
                if (err){
                    let html = tmpl.toString();
                    html=html.replace("?", file_name);
                    html=html.replace("$", file_content);
                    response.writeHead(200, {'Content-Type': 'text/html'}); //type을 결정. html파일을 웹에 띄워준다고 생각
                    response.end(html);     //end 메소드를 이용해 html파일이나 소스를 포냄
                }

                else{
                    function getFileSize(filename) {
                        let stats = fs.statSync(filename);
                        let {size} = stats;
                        let i = Math.floor(Math.log(size) / Math.log(1024));
                        if (isNaN((size / Math.pow(1024, i)).toFixed(2) * 1)===true){
                            return '-';
                        }
                        return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
                    }

                        data.forEach(function(element){
                            if (getFileSize(path.join(cur_path,element))==='-'){
                                lsinfo+="<tr class='folder'>"
                            }
                            else{
                                lsinfo+="<tr class='file'>"
                            }
                            lsinfo+="   <td onclick='cd(this);'>" +element+"</td>";
                            lsinfo+=`   <td onclick='rmdir(this);' value = "${element}">` +'delete'+"</td>";
                            lsinfo+=`   <td onclick='rename(this);' value = "${element}">` +'rename'+"</td>";
                            lsinfo+="   <td>" +getFileSize(path.join(cur_path,element))+"</td>";
                            lsinfo+="   <td>" +todays+"</td>";
                            lsinfo+="</tr>"
                    })
                    let html = tmpl.toString().replace('<h5></h5>',lsinfo);
                    html=html.replace("?", file_name);
                    html=html.replace("$", file_content);
                    response.writeHead(200, {'Content-Type': 'text/html'}); //type을 결정. html파일을 웹에 띄워준다고 생각
                    response.end(html);     //end 메소드를 이용해 html파일이나 소스를 포냄
                }

            })
        })
    }
    else if(pathname==='/readfile'){
        var body='';
        request.on('data', function(data){      //서버로부터 응답 내용 읽고
            body=body+data;
        });
        request.on('end', function(){           //다 읽으면 파일 내용을 사용함
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
            year = today.getFullYear(); // 년도
            month = today.getMonth() + 1;  // 월
            date = today.getDate();  // 날짜
            todays=year+'-'+month+"-"+date;
            fs.writeFile(file_path, description, function(err, data){
                response.writeHead(302, {Location: 'http://localhost:3000/'});
                response.end('success');
            });
        });
    }
    else if(pathname==='/editfile'){
        /*
        wdqdqwdqwdwqdqwdwqdwdqwdqwd
         */
    }
    else if(pathname==='/cd'){
        var body='';
        request.on('data', function(data){
            body=body+data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            file_name=post.file_name;
            cur_path=path.join(cur_path, file_name);
            response.writeHead(302, {Location: 'http://localhost:3000/'});
            response.end('success');
        });
    }
    else if(pathname==='/mkdir'){
        var body='';
        request.on('data', function(data){
            body=body+data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var title=post.title;
            var file_path=path.join(cur_path, title);
            fs.mkdir(file_path, function(err){
                response.writeHead(302, {Location: 'http://localhost:3000/'});
                response.end('success');
            });
        });
    }
    else if(pathname==='/rmdir'){
        var body='';
        request.on('data', function(data){
            body=body+data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            file_name=post.file_name;
            files_name=post.files_name;
            cur_path=path.join(cur_path, file_name);
            fs.rmdir(cur_path, function(err){
                if (err){
                    fs.unlink(cur_path, function(err){
                        response.writeHead(302, {Location: 'http://localhost:3000/'});
                        response.end('success');
                    });
                }
                response.writeHead(302, {Location: 'http://localhost:3000/'});
                response.end('success');
            });
        });
    }
    else if(pathname==='/rmFile'){
        var body='';
        request.on('data', function(data){
            body=body+data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            file_name=post.file_name;
            cur_path=path.join(cur_path, file_name);
            fs.unlink(file_path, function(err){
                response.writeHead(302, {Location: 'http://localhost:3000/'});
                response.end('success');
            });
        });
    }
    else if(pathname==='/rename'){
        var body='';
        request.on('data', function(data){
            body=body+data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            file_name=post.file_name;
            var files_name=post.files_name;
            var next_path=path.join(cur_path, file_name);

            fs.rename(path.join(cur_path, file_name), path.join(cur_path, files_name),function(err){           //!!!!!!!!!!수정 필요 !!!!!!!!!!!!!!!!1
                response.writeHead(302, {Location: 'http://localhost:3000/'});
                response.end('success');
            });
        });
    }
});

app.listen(3000);