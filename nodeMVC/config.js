/**
 * Created with JetBrains WebStorm.
 * User: Tianyi(99)
 * Date: 13-3-28
 * Time: 上午10:45
 * To change this template use File | Settings | File Templates.
 */
/**
 * config
 */
exports.config = {
    debug:true,
    name:'Daoke.me',
    description:'Node Club 是用Node.js开发的社区软件',
    version:'0.2.2',

    // site settings
    host:'localhost.cnodejs.org',
    site_logo:'', // default is `name`
    site_static_host:'', // 静态文件存储域名
    site_enable_search_preview:false, // 开启google search preview
    site_google_search_domain:'cnodejs.org', // google search preview中要搜索的域名
    db:'mongodb://127.0.0.1/node_club_dev',
    session_secret:'daokeme',
    auth_cookie_name:'daokeme',
    port:3000,
    apiService:{
        'userLogin':{
            host:'192.168.1.3',
            port:'8080',
            path:'/mirrtalkApi/userInfo/index.php',
        }
    }
};